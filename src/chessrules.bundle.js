'use strict';

class Judge {
    fen;
}

function rook(from, state, moves) {
    for (let i = 1; i <= 8; i++) {
        let p = state.positions.find(pos => pos.raw.row === from.raw.row - i && pos.raw.col === from.raw.col);
        if (!p) {
            break;
        }
        if (!p.piece) {
            moves.push(p);
            continue;
        }
        if (p.color !== from.color) {
            moves.push(p);
            break;
        }
        if (p.color === from.color) {
            break;
        }
        if (p.color === from.color) {
            break;
        }
    }
    for (let i = 1; i <= 8; i++) {
        let p = state.positions.find(pos => pos.raw.row === from.raw.row + i && pos.raw.col === from.raw.col);
        if (!p) {
            break;
        }
        if (!p.piece) {
            moves.push(p);
            continue;
        }
        if (p.color !== from.color) {
            moves.push(p);
            break;
        }
        if (p.color === from.color) {
            break;
        }
    }
    for (let i = 1; i <= 8; i++) {
        let p = state.positions.find(pos => pos.raw.row === from.raw.row && pos.raw.col === from.raw.col - i);
        if (!p) {
            break;
        }
        if (!p.piece) {
            moves.push(p);
            continue;
        }
        if (p.color !== from.color) {
            moves.push(p);
            break;
        }
        if (p.color === from.color) {
            break;
        }
    }
    for (let i = 1; i <= 8; i++) {
        let p = state.positions.find(pos => pos.raw.row === from.raw.row && pos.raw.col === from.raw.col + i);
        if (!p) {
            break;
        }
        if (!p.piece) {
            moves.push(p);
            continue;
        }
        if (p.color !== from.color) {
            moves.push(p);
            break;
        }
        if (p.color === from.color) {
            break;
        }
    }
}
function bishop(from, state, moves) {
    for (let i = 1; i <= 8; i++) {
        let p = state.positions.find(pos => pos.raw.row === from.raw.row - i && pos.raw.col === from.raw.col - i);
        if (!p) {
            break;
        }
        if (!p.piece) {
            moves.push(p);
            continue;
        }
        if (p.color !== from.color) {
            moves.push(p);
            break;
        }
        if (p.color === from.color) {
            break;
        }
    }
    for (let i = 1; i <= 8; i++) {
        let p = state.positions.find(pos => pos.raw.row === from.raw.row + i && pos.raw.col === from.raw.col + i);
        if (!p) {
            break;
        }
        if (!p.piece) {
            moves.push(p);
            continue;
        }
        if (p.color !== from.color) {
            moves.push(p);
            break;
        }
        if (p.color === from.color) {
            break;
        }
    }
    for (let i = 1; i <= 8; i++) {
        let p = state.positions.find(pos => pos.raw.row === from.raw.row - i && pos.raw.col === from.raw.col + i);
        if (!p) {
            break;
        }
        if (!p.piece) {
            moves.push(p);
            continue;
        }
        if (p.color !== from.color) {
            moves.push(p);
            break;
        }
        if (p.color === from.color) {
            break;
        }
    }
    for (let i = 1; i <= 8; i++) {
        let p = state.positions.find(pos => pos.raw.row === from.raw.row + i && pos.raw.col === from.raw.col - i);
        if (!p) {
            break;
        }
        if (!p.piece) {
            moves.push(p);
            continue;
        }
        if (p.color !== from.color) {
            moves.push(p);
            break;
        }
        if (p.color === from.color) {
            break;
        }
    }
}
function knight(from, state, moves) {
    let pos = state.positions.find(p => p.raw.row === from.raw.row + 2 && p.raw.col === from.raw.col + 1);
    moves.push(pos);
    pos = state.positions.find(p => p.raw.row === from.raw.row + 2 && p.raw.col === from.raw.col - 1);
    moves.push(pos);
    pos = state.positions.find(p => p.raw.row === from.raw.row - 2 && p.raw.col === from.raw.col + 1);
    moves.push(pos);
    pos = state.positions.find(p => p.raw.row === from.raw.row - 2 && p.raw.col === from.raw.col - 1);
    moves.push(pos);
    pos = state.positions.find(p => p.raw.row === from.raw.row + 1 && p.raw.col === from.raw.col - 2);
    moves.push(pos);
    pos = state.positions.find(p => p.raw.row === from.raw.row - 1 && p.raw.col === from.raw.col - 2);
    moves.push(pos);
    pos = state.positions.find(p => p.raw.row === from.raw.row + 1 && p.raw.col === from.raw.col + 2);
    moves.push(pos);
    pos = state.positions.find(p => p.raw.row === from.raw.row - 1 && p.raw.col === from.raw.col + 2);
    moves.push(pos);
}
function queen(from, state, moves) {
    bishop(from, state, moves);
    rook(from, state, moves);
}
function pawn(from, state, moves) {
    let dir = -1;
    if (from.color === Color.BLACK) {
        dir = 1;
    }
    let startrow = from.color === Color.WHITE ? 7 : 2;
    let pos = state.positions.find(p => p.raw.row === from.raw.row + dir && p.raw.col === from.raw.col);
    if (pos && !pos.piece) {
        moves.push(pos);
    }
    if (from.raw.row === startrow) {
        pos = state.positions.find(p => p.raw.row === from.raw.row + dir * 2 && p.raw.col === from.raw.col);
        if (!pos.piece) {
            moves.push(pos);
        }
    }
    let take1 = state.positions.find(p => p.raw.row === from.raw.row + dir && p.raw.col === from.raw.col + 1);
    if (take1 && take1.piece && take1.color !== from.color) {
        moves.push(take1);
    }
    let take2 = state.positions.find(p => p.raw.row === from.raw.row + dir && p.raw.col === from.raw.col - 1);
    if (take2 && take2.piece && take2.color !== from.color) {
        moves.push(take2);
    }
    if (state.enPassant !== "-") {
        if (take1 && take1.notation === state.enPassant) {
            moves.push(take1);
        }
        if (take2 && take2.notation === state.enPassant) {
            moves.push(take2);
        }
    }
}
function king(from, state, moves) {
    let pos;
    for (let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 8; j++) {
            if (Math.abs(from.raw.row - i) <= 1 && Math.abs(from.raw.col - j) <= 1) {
                pos = state.positions.find(p => p.raw.row === i && p.raw.col === j);
                moves.push(pos);
            }
        }
    }
    if (state.castling.whiteKingSide && from.color === Color.WHITE) {
        pos = state.positions.find(p => p.raw.row === from.raw.row && p.raw.col === from.raw.col + 2);
        moves.push(pos);
    }
    if (state.castling.whiteQueenSide && from.color === Color.WHITE) {
        pos = state.positions.find(p => p.raw.row === from.raw.row && p.raw.col === from.raw.col - 2);
        moves.push(pos);
    }
    if (state.castling.blackKingSide && from.color === Color.BLACK) {
        pos = state.positions.find(p => p.raw.row === from.raw.row && p.raw.col === from.raw.col + 2);
        moves.push(pos);
    }
    if (state.castling.blackQueenSide && from.color === Color.BLACK) {
        pos = state.positions.find(p => p.raw.row === from.raw.row && p.raw.col === from.raw.col - 2);
        moves.push(pos);
    }
}
function pieceMoves(state, from) {
    let moves = new Array();
    if (state.onMove !== from.color) {
        return moves;
    }
    switch (from.piece) {
        case Piece.B:
            bishop(from, state, moves);
            break;
        case Piece.R:
            rook(from, state, moves);
            break;
        case Piece.N:
            knight(from, state, moves);
            break;
        case Piece.Q:
            queen(from, state, moves);
            break;
        case Piece.P:
            pawn(from, state, moves);
            break;
        case Piece.K:
            king(from, state, moves);
            break;
    }
    moves = moves.filter(move => move || false);
    moves = moves.filter(move => move.color !== from.color);
    return moves;
}
function isCheck(from, to, state, color) {
    let fromPiece = from.piece;
    let toPiece = to.piece;
    let fromColor = from.color;
    let toColor = to.color;
    let onMove = state.onMove;
    let check = false;
    let moves;
    let pos;
    let king = state.positions.find(p => p.piece && p.piece === Piece.K && p.color === color);
    to.piece = from.piece;
    to.color = from.color;
    from.piece = null;
    from.color = null;
    state.onMove = color === Color.WHITE ? Color.BLACK : Color.WHITE;
    for (let i in state.positions) {
        pos = state.positions[i];
        if (pos.piece && pos.color !== color) {
            moves = pieceMoves(state, pos);
            king = state.positions.find(p => p.piece && p.piece === Piece.K && p.color === color);
            if (king && moves.find(m => m.notation === king.notation)) {
                check = true;
                break;
            }
        }
    }
    from.piece = fromPiece;
    to.piece = toPiece;
    from.color = fromColor;
    to.color = toColor;
    state.onMove = onMove;
    return check;
}
function pieceMovesWithCheck(state, piece) {
    let moves = new Array();
    moves = pieceMoves(state, piece);
    moves = moves.filter(move => isCheck(piece, move, state, piece.color) === false);
    return moves;
}
function getAllValidMoves(state) {
    state.validMoves = new Map();
    state.positions.forEach(p => {
        if (p.piece) {
            state.validMoves.set(p, pieceMovesWithCheck(state, p));
        }
    });
}

var Piece;
(function (Piece) {
    Piece["P"] = "p";
    Piece["R"] = "r";
    Piece["B"] = "b";
    Piece["N"] = "n";
    Piece["K"] = "k";
    Piece["Q"] = "q";
})(Piece || (Piece = {}));
var Color;
(function (Color) {
    Color["WHITE"] = "w";
    Color["BLACK"] = "b";
})(Color || (Color = {}));
function getNotation(row, col) {
    let notation = "";
    switch (col) {
        case 1:
            notation += 'a';
            break;
        case 2:
            notation += 'b';
            break;
        case 3:
            notation += 'c';
            break;
        case 4:
            notation += 'd';
            break;
        case 5:
            notation += 'e';
            break;
        case 6:
            notation += 'f';
            break;
        case 7:
            notation += 'g';
            break;
        case 8:
            notation += 'h';
            break;
    }
    notation += 9 - row;
    return notation;
}
function getPiece(str) {
    switch (str.toLowerCase()) {
        case 'p': return Piece.P;
        case 'r': return Piece.R;
        case 'b': return Piece.B;
        case 'n': return Piece.N;
        case 'k': return Piece.K;
        case 'q': return Piece.Q;
        default: return null;
    }
}
function getMoveNotation(from, to, state) {
    let not = "";
    let canMoveThere = new Array();
    state.validMoves.forEach((v, k) => {
        for (let i in v) {
            if (v[i].notation === to.notation && k.notation !== from.notation) {
                canMoveThere.push(k);
                break;
            }
        }
    });
    if (from.piece === Piece.P) {
        if (to.piece) {
            not += from.notation.charAt(0);
            not += "x";
        }
    }
    else {
        if (canMoveThere.length === 0) {
            not += from.color === Color.WHITE ? from.piece.toLocaleUpperCase() : from.piece.toLocaleLowerCase();
        }
        else {
            if (canMoveThere[0].notation.charAt(0) === from.notation.charAt(0)) {
                not += from.notation.charAt(1);
            }
            else {
                not += from.notation.charAt(0);
            }
        }
        if (to.piece) {
            not += "x";
        }
    }
    not += to.notation;
    if (isCheck(from, to, state, from.color === Color.WHITE ? Color.BLACK : Color.WHITE)) {
        not += "+";
    }
    return not;
}

function parsePieces(str, state) {
    state.positions = new Array;
    for (let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 8; j++) {
            state.positions.push({
                piece: null,
                color: null,
                notation: getNotation(i, j),
                raw: {
                    row: i,
                    col: j,
                }
            });
        }
    }
    let rows = str.split("/");
    let col = 1;
    rows.forEach((rowStr, row) => {
        col = 1;
        for (let i = 0; i < rowStr.length; i++) {
            if (col > 8) {
                break;
            }
            let c = rowStr.charAt(i);
            if (!Number.isNaN(Number(c))) {
                let num = parseInt(c);
                col += num;
            }
            else {
                let pos = state.positions.find(p => p.raw.col === col && p.raw.row === row + 1);
                if (c == c.toLocaleLowerCase()) {
                    pos.color = Color.BLACK;
                }
                else {
                    pos.color = Color.WHITE;
                }
                pos.piece = getPiece(c);
                col++;
            }
        }
    });
}
function parseCastling(str, state) {
    state.castling = {
        whiteKingSide: false,
        whiteQueenSide: false,
        blackKingSide: false,
        blackQueenSide: false,
    };
    str.split("").forEach(c => {
        if (c == 'K') {
            state.castling.whiteKingSide = true;
        }
        if (c == 'Q') {
            state.castling.whiteQueenSide = true;
        }
        if (c == 'k') {
            state.castling.blackKingSide = true;
        }
        if (c == 'q') {
            state.castling.blackQueenSide = true;
        }
    });
}
function parseFen(state, fen) {
    state.fen = fen;
    let parts = fen.split(" ");
    parsePieces(parts[0], state);
    if (parts[1] === "w") {
        state.onMove = Color.WHITE;
    }
    else {
        state.onMove = Color.BLACK;
    }
    parseCastling(parts[2], state);
    state.halfMoves = parseInt(parts[4]);
    state.movesCount = parseInt(parts[5]);
    state.enPassant = parts[3];
}
function stringifyFen(state) {
    let fen = "";
    let col = 0;
    state.positions.forEach((p, i) => {
        if (i % 8 === 0 && i != 0) {
            if (col !== 0) {
                fen += col;
            }
            fen += "/";
            col = 0;
        }
        if (p.piece) {
            if (col !== 0) {
                fen += col;
            }
            if (p.color === Color.WHITE) {
                fen += p.piece.toUpperCase();
            }
            else {
                fen += p.piece;
            }
            col = 0;
        }
        else {
            col++;
        }
    });
    if (col != 0) {
        fen += col;
    }
    fen += " ";
    fen += state.onMove;
    fen += " ";
    if (state.castling.whiteKingSide) {
        fen += "K";
    }
    if (state.castling.whiteQueenSide) {
        fen += "Q";
    }
    if (state.castling.blackKingSide) {
        fen += "k";
    }
    if (state.castling.blackQueenSide) {
        fen += "q";
    }
    if (fen.charAt(fen.length - 1) === " ") {
        fen += "-";
    }
    fen += " ";
    fen += state.enPassant;
    fen += " ";
    fen += state.halfMoves;
    fen += " ";
    fen += state.movesCount;
    return fen;
}

export class ChessRules extends Judge {
    state;
    constructor() {
        super();
        this.state = {
            fen: "",
            positions: [],
            onMove: null,
            castling: null,
            enPassant: null,
            movesCount: 0,
            halfMoves: 0,
            validMoves: new Map(),
            nextPromotion: Piece.Q,
        };
    }
    setfen(fen) {
        this.fen = fen;
        parseFen(this.state, fen);
        getAllValidMoves(this.state);
        this.state.nextPromotion = Piece.Q;
    }
    getfen() {
        return stringifyFen(this.state);
    }
    allValidMoves() {
        let str = "";
        for (let i in this.state.positions) {
            let pos = this.state.positions[i];
            if (pos.piece) {
                let moves = pieceMoves(this.state, pos);
                moves.forEach(move => {
                    str += getMoveNotation(pos, move, this.state);
                });
            }
        }
        return str;
    }
    isValid(move) {
        let notation = this.moveToNotation(move);
        let moves = this.validMoves(move.split(" ")[0]);
        if (moves.includes(notation)) {
            return true;
        }
        return false;
    }
    validMoves(piece) {
        let piecePos = this.state.positions.find(p => p.notation === piece);
        let moves = this.state.validMoves.get(piecePos);
        let movesstr = " ";
        moves.forEach(m => {
            movesstr += getMoveNotation(piecePos, m, this.state);
            movesstr += " ";
        });
        movesstr = movesstr.trim();
        return movesstr;
    }
    moveToNotation(move) {
        let parts = move.split(" ");
        let from = this.state.positions.find(p => p.notation === parts[0]);
        let to = this.state.positions.find(p => p.notation === parts[1]);
        return getMoveNotation(from, to, this.state);
    }
    fenAfterMove(move) {
        let parts = move.split(" ");
        let from = this.state.positions.find(p => p.notation === parts[0]);
        let to = this.state.positions.find(p => p.notation === parts[1]);
        let prevState = JSON.stringify(this.state);
        if (from.color === Color.BLACK) {
            this.state.movesCount++;
        }
        this.state.halfMoves++;
        if (from.piece === Piece.P) {
            this.state.halfMoves = 0;
            this.state.enPassant = "-";
            if ((from.raw.row === 2 || from.raw.row === 7) && (Math.abs(to.raw.row - from.raw.row) === 2)) {
                let enpassant1 = this.state.positions.find(p => p.raw.row === to.raw.row && p.raw.col === to.raw.col - 1);
                let enpassant2 = this.state.positions.find(p => p.raw.row === to.raw.row && p.raw.col === to.raw.col + 1);
                if (enpassant1 && enpassant1.piece === Piece.P) {
                    this.state.enPassant = getNotation(from.raw.row === 2 ? to.raw.row - 1 : to.raw.row + 1, to.raw.col);
                }
                if (enpassant2 && enpassant2.piece === Piece.P) {
                    this.state.enPassant = getNotation(from.raw.row === 2 ? to.raw.row - 1 : to.raw.row + 1, to.raw.col);
                }
            }
        }
        if (from.piece === Piece.K) {
            if (from.color === Color.WHITE) {
                this.state.castling.whiteKingSide = false;
                this.state.castling.whiteQueenSide = false;
            }
            else {
                this.state.castling.blackKingSide = false;
                this.state.castling.blackQueenSide = false;
            }
        }
        if (from.piece === Piece.R) {
            if (from.color === Color.WHITE) {
                if (from.raw.col === 1) {
                    this.state.castling.whiteQueenSide = false;
                }
                if (from.raw.col === 8) {
                    this.state.castling.whiteKingSide = false;
                }
            }
            else {
                if (from.raw.col === 1) {
                    this.state.castling.blackQueenSide = false;
                }
                if (from.raw.col === 8) {
                    this.state.castling.blackKingSide = false;
                }
            }
        }
        console.log(this.state.enPassant);
        if (to && !to.piece && from.piece === Piece.P && from.raw.col !== to.raw.col) {
            let passanted = this.state.positions.find(p => p.raw.row === to.raw.row + (from.color === Color.WHITE ? 1 : -1) && p.raw.col === to.raw.col);
            passanted.color = null;
            passanted.piece = null;
        }
        if (from.piece === Piece.K && Math.abs(from.raw.col - to.raw.col) > 1) {
            to.piece = from.piece;
            to.color = from.color;
            let rook = this.state.positions.find(p => p.raw.row === from.raw.row && p.raw.col === to.raw.col + 1);
            let rookNewPos = this.state.positions.find(p => p.raw.row === from.raw.row && p.raw.col === from.raw.col + 1);
            if (!rook || !rook.piece) {
                rook = this.state.positions.find(p => p.raw.row === from.raw.row && p.raw.col === to.raw.col - 2);
                rookNewPos = this.state.positions.find(p => p.raw.row === from.raw.row && p.raw.col === from.raw.col - 1);
            }
            from.piece = null;
            from.color = null;
            rookNewPos.piece = rook.piece;
            rookNewPos.color = rook.color;
            rook.piece = null;
            rook.color = null;
        }
        else {
            to.piece = from.piece;
            to.color = from.color;
            from.piece = null;
            from.color = null;
        }
        if (to.piece === Piece.P && (to.raw.row === 1 || to.raw.row === 8)) {
            to.piece = this.state.nextPromotion;
        }
        this.state.onMove = this.state.onMove === Color.WHITE ? Color.BLACK : Color.WHITE;
        let str = stringifyFen(this.state);
        this.state = JSON.parse(prevState);
        return str;
    }
}
