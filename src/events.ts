import { State } from "./State";


export function addEvents(state : State) {
    state.positionElements.forEach((e,i) => {
        e.addEventListener("mousedown", (e)=>{
            let target = e.target;
        })

        e.addEventListener("mouseenter",(e)=>{
            let target = e.target as HTMLElement;
            let row = parseInt(target.getAttribute("row"));
            let col = parseInt(target.getAttribute("col"));
            state.dropZone = {
                row : row,
                col : col
            }
        })

        e.addEventListener("click",(e)=>{
            let target = e.target as HTMLElement;
            let row = parseInt(target.getAttribute("row"));
            let col = parseInt(target.getAttribute("col"));
            state.clickedPosition = {
                row : row,
                col : col
            }
            state.clicked = true;
            state.moved = true;
            state.dragged = false;
        })
    })

    state.pieceElements.forEach((e,i) => {
        e.addEventListener("mousedown", (e)=>{
            let target = e.target as HTMLElement;
            let row = parseInt(target.getAttribute("row"));
            let col = parseInt(target.getAttribute("col"));
            let piece = state.pieces.find(p => p.position.col === col && p.position.row === row);
            if(piece){
                state.dragStart = piece;
                state.draggedElement = target;
                state.drag = true;
                state.dragged = true;
            }
        })

        e.addEventListener("click",(e) => {
            let target = e.target as HTMLElement;
          
            let row = parseInt(target.getAttribute("row"));
            let col = parseInt(target.getAttribute("col"));
            state.clickedPosition = {
                row : row,
                col : col
            }
            let piece = state.pieces.find(p => p.position.col === col && p.position.row === row);
            if(piece && !state.clickedPiece || piece.color === state.clickedPiece.color) {
                if(piece === state.clickedPiece) {
                    state.clickedPiece = null;
                }else {
                    state.clickedPiece = piece;
                }
            }
            state.clicked = true;
            state.moved = true;
            state.dragged = false;
        })        
    })
}