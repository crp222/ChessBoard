import { State } from "./State";


export class Animator {

    state : State;

    constructor(state : State){
        this.state = state;
    }

    animatechanges() {
        if(this.state.fastDraw || this.state.fastDrawOnce){
            this.justdraw();
            this.state.fastDrawOnce = false;
            return;
        }
        let childs = this.state.dom.children;
        let pieces = new Array<HTMLElement>();
        for(let i in childs){
            if(childs[i].children && childs[i].children[0]){
                pieces.push(childs[i].children[0] as HTMLElement);
            }
        }
        if(pieces.length == 0){
            this.justdraw();
            return;
        }

        pieces.forEach(original => {
           let changedPosition = this.state.positionElements.find(p => p.id == original.parentElement.id);
           if(changedPosition.childElementCount == 0){
                let dest = this.findDest(original,pieces);
                if(dest){
                    this.animatechange(original,dest,changedPosition);
                    dest.setAttribute("animated","");
                }
           }
        })
        setTimeout(() => {
            this.justdraw();
        }, 310);
    }

    private findDest(from : HTMLElement,pieces : Array<HTMLElement>) : HTMLElement{
        let opositeColor = "white";
        if(from.className.includes("white")){
            opositeColor = "black";
        }
        let candidate = this.state.pieceElements.find(e => {
            let prev = pieces.find(prev => e.getAttribute("row") === prev.getAttribute("row") &&
            e.getAttribute("col") == prev.getAttribute("col"));
            return e.className === from.className && (!prev || prev.className.includes(opositeColor))
            && !e.hasAttribute("animated");  
        })
        return candidate;
    }

    private animatechange(from : HTMLElement,to : HTMLElement,startPoint : HTMLElement){
        from.style.display = "absolute";
        let x  = (parseInt(to.getAttribute("row"))-1)*(this.state.boardHeight/8);
        let y = (parseInt(to.getAttribute("col"))-1)*(this.state.boardWidth/8);
        let sx  = (parseInt(startPoint.getAttribute("row"))-1)*(this.state.boardHeight/8);
        let sy = (parseInt(startPoint.getAttribute("col"))-1)*(this.state.boardWidth/8);
        x = x-sx;
        y = y-sy;
        from.style.transform = `translate(${y}px,${x}px)`;
    }

    private justdraw() {
        this.state.dom.innerHTML = "";
        this.state.positionElements.forEach(e => {
            this.state.dom.appendChild(e);
        })
    }
}