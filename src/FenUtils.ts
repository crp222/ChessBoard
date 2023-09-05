import { Color, Piece, getType } from "./Piece.js";
import { State } from "./State.js";

export class FenUtils {
    
    static syncFromFen(state : State){
        FromFen.sync(state);
    }
}

class FromFen {

    static sync(state : State) : void {
        let parts = state.fen.split(" ");
        FromFen.syncPieces(parts[0],state);
        if(parts[1] === "w"){
            state.onMove = Color.WHITE;
        }else {
            state.onMove = Color.BLACK;
        }
        FromFen.syncCastling(parts[2],state);
        FromFen.syncHalfMoves(parts[4],parts[5],state);
        FromFen.syncEnPassant(parts[3],state);
    }

    private static syncPieces(str : string,state : State) {
        state.pieces = new Array<Piece>;
        let rows = str.split("/");

        let col = 1;

        rows.forEach((rowStr,row) => {
            col = 1;
            for(let i = 0;i<rowStr.length;i++){
                let c = rowStr.charAt(i);
                if(!Number.isNaN(Number(c))){ // if c is a number
                    col += parseInt(c);
                }else {
                    let piece = new Piece();
                    piece.position = {
                        row : row+1,
                        col : col
                    };
                    if(c == c.toLocaleLowerCase()){
                        piece.color = Color.BLACK;
                    }else {
                        piece.color = Color.WHITE;
                    }
                    piece.type = getType(c);
                    state.pieces.push(piece);
                    col++;
                }
            }
        })
    }

    private static syncCastling(str : string,state : State) {
        state.castling = {
            whiteKingSide: false,
            whiteQueenSide: false,
            blackKingSide: false,
            blackQueenSide: false,
        };

        str.split("").forEach(c => {
            if(c == 'K'){
                state.castling.whiteKingSide = true;
            }
            if(c == 'Q'){
                state.castling.whiteQueenSide = true;
            }
            if(c == 'k'){
                state.castling.blackKingSide = true;
            }
            if(c == 'q'){
                state.castling.blackQueenSide = true;
            }
        })
    }

    private static syncEnPassant(str : string,state : State) {
        if(str === "-"){
            state.enPassant = "-";
        }else {
            state.enPassant = str;
        }
    }

    private static syncHalfMoves(white : string,black : string,state : State) {
        state.halfMoves = {
            white : 0,
            black : 0,
        };
        state.halfMoves.white = parseInt(white);
        state.halfMoves.black = parseInt(black);
    }
}
