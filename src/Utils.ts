import { Piece } from "./Piece";
import { State } from "./State";

export interface Position {
    row : number;
    col : number;
}

export interface Move {
    from : string,
    to : string,
    piece : string,
}

export function positionToNotation(pos : Position) : string{
    let notation = "";
    switch(pos.col){
        case 1 : notation += 'a';break;
        case 2 : notation += 'b';break;
        case 3 : notation += 'c';break;
        case 4 : notation += 'd';break;
        case 5 : notation += 'e';break;
        case 6 : notation += 'f';break;
        case 7 : notation += 'g';break;
        case 8 : notation += 'h';break;
    }
    notation += 9-pos.row;
    return notation;
}

export function notationToPosition(not : string) : Position {
    let parts = not.split("");
    if(parts[parts.length-1] === "+" || parts[parts.length-1] === "#" || parts[parts.length-1] === " "){
        parts.pop();
    }
    let row = 9 - parseInt(parts[parts.length-1]);
    let col = 0;
    let colNot = parts[parts.length-2];
    switch(colNot) {
        case 'a' : col = 1;break;
        case 'b' : col = 2;break;
        case 'c' : col = 3;break;
        case 'd' : col = 4;break;
        case 'e' : col = 5;break;
        case 'f' : col = 6;break;
        case 'g' : col = 7;break;
        case 'h' : col = 8;break;
    }
    return {
        col : col,
        row : row,
    }
}

export function moveToString(move : Move) : string {
    let posfrom = {
        row : parseInt(move.from.charAt(0)),
        col : parseInt(move.from.charAt(1))
    }
    let posto = {
        row : parseInt(move.to.charAt(0)),
        col : parseInt(move.to.charAt(1))
    }
    return positionToNotation(posfrom) + " " + positionToNotation(posto);
}

export function pieceToString(piece : Piece) : string {
    return piece.position.row + " " + piece.position.col + " " + piece.type + piece.color;
}