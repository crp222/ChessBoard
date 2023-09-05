import { State } from "./State.js";
import { Position, notationToPosition, positionToNotation } from "./Utils.js";

export class ValidMoves {

    state : State;

    constructor(state : State){
        this.state = state;
    }

    
    update() {
        if(this.state.clickedPiece || this.state.dragStart){
            let piece = this.state.clickedPiece ? this.state.clickedPiece : this.state.dragStart;
            if(piece === this.state.selectedPiece){
                return;
            }else {
                this.state.selectedPiece = piece;
            }
            let not = positionToNotation(this.state.selectedPiece.position);
            this.state.judge.setfen(this.state.fen);
            let movesInNotation = this.state.judge.validMoves(not).split(" ");
            movesInNotation = movesInNotation.filter(m => m != "");
            this.state.selectedValidMoves = new Array<Position>();
            movesInNotation.forEach(m => {
                this.state.selectedValidMoves.push(notationToPosition(m));
            })
            this.draw();
        }else {
            this.state.selectedValidMoves = new Array<Position>();
            this.state.selectedPiece = null;
            this.draw();
        }
    }

    private draw() {
        if(!this.state.validMovesDom){
            this.state.validMovesDom = document.createElement("div");
            this.state.validMovesDom.id = "valid-moves-container";
            document.querySelector("body").appendChild(this.state.validMovesDom);
        }else {
            this.state.validMovesDom.innerHTML = "";
        }

        this.state.validMoveElements = new Array<HTMLElement>();
        this.state.selectedValidMoves ? this.state.selectedValidMoves.forEach(m => {
            let element = document.createElement("div");
            element.className = "valid-move";
            element.style.left = this.state.boardPosX + (m.col-1)*this.state.pieceWidth + this.state.pieceWidth/4 + "px";
            element.style.top = this.state.boardPosY + (m.row-1)*this.state.pieceHeight + this.state.pieceHeight/4 + "px";
            element.style.width = this.state.pieceWidth/4 + "px";
            element.style.height = this.state.pieceHeight/4 + "px";
            this.state.validMoveElements.push(element);
            this.state.validMovesDom.appendChild(element);
        }) : null;
    }
}