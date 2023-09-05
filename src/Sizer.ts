import { State } from "./State";

export class Mover {
    state : State;

    dot : HTMLElement;

    move : boolean;

    dotSize = 25;

    constructor(state : State){
        this.state = state;
        this.createSizerButton();
    }

    private createSizerButton() {
        const body = document.querySelector("body");
        const dot  = document.createElement("div");
        dot.id = "mover-dot";
        dot.className = "mover dot";
        dot.innerHTML = `<?xml version="1.0" ?><svg baseProfile="tiny" height="${this.dotSize}px" id="Layer_1" version="1.2" viewBox="0 0 ${this.dotSize} ${this.dotSize}" width="${this.dotSize}px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M17.707,8.293c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414L17.586,11H13V6.414l1.293,1.293   C14.488,7.902,14.744,8,15,8s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414L12,2.586L8.293,6.293   c-0.391,0.391-0.391,1.023,0,1.414s1.023,0.391,1.414,0L11,6.414V11H6.414l1.293-1.293c0.391-0.391,0.391-1.023,0-1.414   s-1.023-0.391-1.414,0L2.586,12l3.707,3.707C6.488,15.902,6.744,16,7,16s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414   L6.414,13H11v4.586l-1.293-1.293c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414L12,21.414l3.707-3.707   c0.391-0.391,0.391-1.023,0-1.414s-1.023-0.391-1.414,0L13,17.586V13h4.586l-1.293,1.293c-0.391,0.391-0.391,1.023,0,1.414   C16.488,15.902,16.744,16,17,16s0.512-0.098,0.707-0.293L21.414,12L17.707,8.293z"/></g></svg>`;
        body.appendChild(dot);
        this.dot = dot;

        dot.addEventListener("mousedown",() => {
            this.move = true;
        })

        dot.addEventListener("mouseup",()=>{
            this.move = false;
        })
    }

    update() {
        if(this.state.canMove){
            if(!this.move){
                this.dot.style.left = this.state.boardPosX-this.dotSize/2 + "px";
                this.dot.style.top = this.state.boardPosY-this.dotSize/2 + "px";
            }else {
                this.dot.style.left = this.state.mouseX-this.dotSize/2 + "px";
                this.dot.style.top = this.state.mouseY-this.dotSize/2 + "px";
    
                this.state.boardPosX = this.state.mouseX;
                this.state.boardPosY = this.state.mouseY;
                this.state.drawBoard = true;
                this.state.fastDrawOnce = true;
            }
        }
    }
}

export class Sizer {

    state : State;

    dot : HTMLElement;

    resize : boolean;

    dotSize = 25;

    constructor(state : State){
        this.state = state;

        this.createSizerButton();
    }

    private createSizerButton() {
        const body = document.querySelector("body");
        const dot  = document.createElement("div");
        dot.id = "sizer-dot";
        dot.className = "sizer dot";
        dot.innerHTML = `<?xml version="1.0" ?><svg height="${this.dotSize}px" width="${this.dotSize}px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="resize, navigation, full, size, move, editing, maximize" id="resize_navigation_full_size_move_editing_maximize"><path d="M29,2H3A1,1,0,0,0,2,3V29a1,1,0,0,0,1,1H29a1,1,0,0,0,1-1V3A1,1,0,0,0,29,2ZM28,28H4V4H28Z"/><path d="M7,26h5a1,1,0,0,0,0-2H9.41L16,17.41,22.59,24H20a1,1,0,0,0,0,2h5a1,1,0,0,0,1-1V20a1,1,0,0,0-2,0v2.59L17.41,16,24,9.41V12a1,1,0,0,0,2,0V7a1,1,0,0,0-1-1H20a1,1,0,0,0,0,2h2.59L16,14.59,9.41,8H12a1,1,0,0,0,0-2H7A1,1,0,0,0,6,7v5a1,1,0,0,0,2,0V9.41L14.59,16,8,22.59V20a1,1,0,0,0-2,0v5A1,1,0,0,0,7,26Z"/></g></svg>`
        body.appendChild(dot);
        this.dot = dot;

        dot.addEventListener("mousedown",() => {
            this.resize = true;
        })

        dot.addEventListener("mouseup",()=>{
            this.resize = false;
        })
    }

    update() {
        if(this.state.canResize){
            if(!this.resize){
                this.dot.style.left = (this.state.boardPosX + this.state.boardWidth)-this.dotSize/2 + "px";
                this.dot.style.top = (this.state.boardPosY + this.state.boardHeight)-this.dotSize/2 + "px";
            }else {
                this.dot.style.left = this.state.mouseX-this.dotSize/2 + "px";
                this.dot.style.top = this.state.mouseY-this.dotSize/2 + "px";
    
                this.state.boardWidth = this.state.mouseX-this.state.boardPosX;
                this.state.boardHeight = this.state.mouseY-this.state.boardPosY;
                this.state.drawBoard = true;
                this.state.fastDrawOnce = true;
            }
        }
        
    }
}