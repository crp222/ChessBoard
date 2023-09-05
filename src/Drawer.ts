import { State } from "./State.js";
import { Animator } from "./Animator.js";
import { addEvents } from "./events.js";
import { positionToNotation } from "./Utils.js";

export class Drawer {

    state : State;

    animator : Animator;

    constructor(state : State){
        this.state = state;
        this.animator = new Animator(this.state);
    }

    draw(){
        if(this.state.drawBoard){
            this.state.dom.style.width = this.state.boardWidth + "px";
            this.state.dom.style.height = this.state.boardHeight + "px";
            this.state.pieceWidth = this.state.boardWidth/8;
            this.state.pieceHeight = this.state.boardHeight/8;
            this.state.dom.style.left = this.state.boardPosX + "px";
            this.state.dom.style.top = this.state.boardPosY + "px";

            if(this.state.notationContainerDom) {
                this.state.notationContainerDom.innerHTML = "";
            }else {
                this.state.notationContainerDom = document.createElement("div");
                this.state.notationContainerDom.id = "notationContainer";
                document.querySelector("body").appendChild(this.state.notationContainerDom);
            }
          
            this.updateStateElements();
            this.animator.animatechanges();
            addEvents(this.state);
            this.state.drawBoard = false;
        }
    }

    private updateStateElements() {
        this.state.pieceElements = new Array<HTMLElement>()
        this.state.positionElements = new Array<HTMLElement>()
        for(let i=1;i<=8;i++){
            for(let j=1;j<=8;j++){
                let positionElement = document.createElement("div");
                positionElement.id = "position-"+i+"-"+j;
                positionElement.setAttribute("row",i+"");
                positionElement.setAttribute("col",j+"");
                positionElement.style.width = this.state.pieceWidth + "px";
                positionElement.style.height = this.state.pieceHeight + "px";
                positionElement.className = "position";
                if((i+j)%2 == 0){
                    positionElement.classList.add("light");
                }else {
                    positionElement.classList.add("dark");
                }

                if(this.state.lastMove){
                    let lastMoveFromRow = parseInt(this.state.lastMove.from.charAt(0));
                    let lastMoveFromCol =  parseInt(this.state.lastMove.from.charAt(1));
                    let lastMoveToRow =  parseInt(this.state.lastMove.to.charAt(0));
                    let lastMoveToCol =  parseInt(this.state.lastMove.to.charAt(1));
    
                    if(i === lastMoveFromRow && j === lastMoveFromCol){
                        positionElement.classList.add("lastmove");
                    }
                    if(i === lastMoveToRow && j === lastMoveToCol){
                        positionElement.classList.add("lastmove");
                    }
                }

                //notation
                if(i === 8) {
                    this.addNotation(i,j,false);
                }
                if(j === 1) {
                    this.addNotation(i,j,true);
                }
                
                if(this.state.clickedPiece &&
                    this.state.clickedPiece.position.col === j && this.state.clickedPiece.position.row === i){
                        positionElement.classList.add("clicked");
                   }

                let piece = this.state.pieces.find(p => p.position.row == i && p.position.col == j);
                if(piece){
                    let pieceElement = document.createElement("div");
                    pieceElement.className = "piece " + piece.type + "-" + piece.color;
                    pieceElement.setAttribute("row",i+"");
                    pieceElement.setAttribute("col",j+"");
                    pieceElement.style.width = this.state.pieceWidth + "px";
                    pieceElement.style.height = this.state.pieceHeight + "px";
                    pieceElement.setAttribute("piece","true");
                    positionElement.appendChild(pieceElement);
                    this.state.pieceElements.push(pieceElement);
                }
                this.state.positionElements.push(positionElement);
            }
        }
    }

    private addNotation(i : number, j : number,row : boolean) {
        let notation = positionToNotation({row : i,col : j});
        let notationElement = document.createElement("div");
        notationElement.classList.add("notation");
        notationElement.classList.add((i+j)%2 == 0 ? "dark-notation" : "light-notation");
        notationElement.style.fontSize = this.state.pieceHeight/5+"px";
        if(row){
            notationElement.style.top = this.state.boardPosY + i*this.state.pieceHeight-this.state.pieceHeight+this.state.pieceHeight/10 + "px";
            notationElement.style.left = this.state.boardPosX + "px";
            notationElement.textContent = notation.charAt(1);
        }else {
            notationElement.style.left = this.state.boardPosX + j*this.state.pieceWidth-this.state.pieceWidth+this.state.pieceWidth/10 + "px";
            notationElement.style.top =  this.state.boardPosY + this.state.boardHeight-this.state.pieceHeight + this.state.pieceHeight-this.state.pieceHeight/5 + "px";
            notationElement.textContent = notation.charAt(0);
        }
        this.state.notationContainerDom.appendChild(notationElement);
    }

}