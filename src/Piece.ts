import { Position } from "./Utils";


export enum Color {
    WHITE = "white",
    BLACK = "black"
}

export enum Type {
    P = "pawn",
    R = "rook",
    B = "bishop",
    N = "knight",
    K = "king",
    Q = "queen",
}

export class Piece {
    position : Position | undefined;
    color : Color | undefined;
    type : Type | undefined
}

export function getType(str : string) : Type {
    switch(str.toLowerCase()){
        case 'p' : return Type.P;
        case 'r' : return Type.R;
        case 'b' : return Type.B;
        case 'n' : return Type.N;
        case 'k' : return Type.K;
        case 'q' : return Type.Q;
        default : return null;
    }
}