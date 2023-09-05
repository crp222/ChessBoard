import { State } from "./State";

export function handleDrag(state : State) {

    state.window.addEventListener("mousemove",(e) => {
        let mouseX = e.clientX-state.pieceWidth/2-state.boardPosX;
        let mouseY = e.clientY-state.pieceHeight/2-state.boardPosY;
        state.mouseX = e.clientX;
        state.mouseY = e.clientY;
        if(state.drag === true && state.draggedElement){
            state.draggedElement.style.position = "absolute";
            state.draggedElement.style.left = mouseX + "px";
            state.draggedElement.style.top = mouseY + "px";
            state.draggedElement.style.transitionProperty = "none";
            state.draggedElement.style.pointerEvents = "none";
        }
    })

    state.window.addEventListener("mouseup",()=>{
        if(state.drag == true){
            state.drag = false;
            state.moved = true;
        }
    })
}