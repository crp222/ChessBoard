
import { Judge } from "./JudgeUtils.js";
import { Color, Piece } from "./Piece.js";
import { Move, Position } from "./Utils.js";

export class State {
    fen : string;
    pieces : Array<Piece>;
    onMove : Color
    castling : {
        whiteKingSide: boolean;
        whiteQueenSide: boolean;
        blackKingSide: boolean;
        blackQueenSide: boolean;
    }    
    enPassant : string = "-";
    halfMoves : {
        white : number;
        black : number;
    };

    boardWidth : number;
    boardHeight : number;

    boardPosX : number;
    boardPosY : number;

    pieceWidth : number;
    pieceHeight : number;

    drawBoard : boolean = false;
    fastDrawOnce : boolean = false;
    fastDraw : boolean = false;
    dom : HTMLElement;
    window : Window;

    positionElements : Array<HTMLElement>;
    pieceElements : Array<HTMLElement>;

    dragged : boolean = false;
    drag : boolean = false;
    draggedElement : HTMLElement;
    dragStart : Piece;
    dropZone : Position;

    clicked : boolean = false;
    clickedPosition : Position;
    clickedPiece : Piece;

    forcedMove : boolean = false;
    forcedPoisition : Position;
    forcedPiece : Piece;

    moved : boolean = false;
    lastMove : Move;
    lastMoveNotation : string;

    mouseX : number;
    mouseY : number;

    canResize : boolean = true;
    canMove : boolean = true;

    notationContainerDom : HTMLElement;

    // judge stuff
    validateMoves : boolean;
    judge : Judge;

    selectedPiece : Piece;
    validMovesDom : HTMLElement;
    validMoves : Map<Position,Array<Position>>;
    lastMoveValid : false;
    selectedValidMoves : Array<Position>;
    validMoveElements : Array<HTMLElement>;

}