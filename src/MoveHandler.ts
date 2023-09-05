import { FenUtils } from "./FenUtils.js";
import { Piece } from "./Piece.js";
import { State } from "./State.js";
import { Move, Position, moveToString } from "./Utils.js";

export class MoveHandler {

    state : State;

    constructor(state : State){
        this.state = state;
    }

    updateState() {
        this.state.judge.setfen(this.state.fen);
        this.state.fen = this.state.judge.fenAfterMove(moveToString(this.state.lastMove));
        FenUtils.syncFromFen(this.state);
    }

    valid(lastmove : Move) : boolean {
        return this.state.judge.isValid(moveToString(lastmove));
    }

    listen() {
        if(this.state.moved){
            var element : HTMLElement;
            var from : Piece;
            var to : Position;
            this.state.fastDrawOnce = true;
            if(this.state.dragged){
                element = this.state.draggedElement;
                from = this.state.dragStart;
                to = this.state.dropZone;
            }else 
            if(this.state.clicked){
                element = document.createElement("div");
                from = this.state.clickedPiece;
                to = this.state.clickedPosition;
            }
            
            if(this.state.forcedMove){
                element = document.createElement("div");
                from = this.state.forcedPiece;
                to = this.state.forcedPoisition;
            }

            if(element) {
                element.style.pointerEvents = "";
            }
            if(from && to && element && (from.position.row !== to.row || from.position.col !== to.col)){
                if(this.state.clicked){
                    this.state.fastDrawOnce = false;
                }
                let lastMove = {
                    from : from.position.row + "" + from.position.col,
                    to : to.row + "" + to.col,
                    piece : from.type,
                }
                if(!this.state.validateMoves || this.valid(lastMove)){
                    let dest = this.state.pieces.find(p => p.position.col === to.col && p.position.row === to.row);
                    if(dest){
                        this.state.pieces.splice(this.state.pieces.indexOf(dest),1);
                    }
                    from.position.col = to.col;
                    from.position.row = to.row;
                    this.state.lastMove = lastMove;
    
                    this.state.clickedPiece = null;
                    this.state.clickedPosition = null;

                    this.updateState();
                }else {
                    this.state.clickedPiece = null;
                }
            }

            this.state.drawBoard = true;
            this.state.dropZone = null;
            this.state.dragStart = null;
            this.state.draggedElement = null;
            this.state.dragged = false;
            this.state.clicked = false;
            this.state.forcedMove = false;
            this.state.forcedPoisition = null;
            this.state.forcedPiece = null;
            this.state.moved = false;
        }
    }
}