import { Drawer } from "./Drawer.js";
import { State } from "./State.js";
import { FenUtils } from "./FenUtils.js";
import { MoveHandler } from "./MoveHandler.js";
import { handleDrag } from "./drag.js";
import { Mover, Sizer } from "./Sizer.js";
import { Judge } from "./JudgeUtils.js";
import { ValidMoves } from "./ValidMoves.js";


export const DEFAULT_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export class Chess {

    state : State;

    moveHandler : MoveHandler;

    drawer : Drawer;

    sizer : Sizer;

    mover : Mover;
    
    slowIntervalRef : number;
    fastIntervalRef : number;
    
    validMoves : ValidMoves;

    constructor(fen : string) {
        this.state = new State();
        this.state.fen = fen;
        FenUtils.syncFromFen(this.state);
        this.drawer = new Drawer(this.state);
        this.moveHandler = new MoveHandler(this.state);
        this.sizer = new Sizer(this.state);
        this.mover = new Mover(this.state);
        
        this.validMoves = new ValidMoves(this.state);

        this.slowIntervalRef = setInterval(()=>{
            this.slowInterval();
        },10)

        this.fastIntervalRef = setInterval(()=>{
            this.fastInterval();
        },2)
    }

    reDraw(fen : string) {
        this.state.fen = fen;
        FenUtils.syncFromFen(this.state);
        this.state.drawBoard = true;
    }

    initiateDraw(dom : HTMLElement,window : Window,width:number,height:number){
        this.state.window = window;
        this.state.dom = dom;
        this.state.boardWidth = width;
        this.state.boardHeight = height;
        this.state.pieceWidth = width/8;
        this.state.pieceHeight = height/8;
        this.state.boardPosX = dom.getBoundingClientRect().x;
        this.state.boardPosY = dom.getBoundingClientRect().y;
        dom.style.width = width + "px";
        dom.style.height = height + "px";
        this.state.drawBoard = true;
    }

    initiatePieceMovers() {
        handleDrag(this.state);
    }

    private slowInterval() {
        this.drawer.draw();
        this.sizer.update();
        this.mover.update();
        if(this.state.judge){
            this.validMoves.update();
        }
    }

    private fastInterval() {
        this.moveHandler.listen();
    }

    attachJudge(judge : Judge) {
        this.state.judge = judge;
    }

    delete() {
        delete this.sizer;
        delete this.state;
        delete this.mover;
        delete this.moveHandler;
        delete this.drawer;
        clearInterval(this.slowIntervalRef);
        clearInterval(this.fastIntervalRef);
    }
}
