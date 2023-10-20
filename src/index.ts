import { Chess, DEFAULT_FEN } from "./Chess.js";

const board = document.getElementById("board");

var chess = new Chess(DEFAULT_FEN);
chess.initiateDraw(board,window,600,600);
chess.initiatePieceMovers();

//var judge = new ChessRules();

// @ts-ignore
//chess.attachJudge(judge);
chess.state.validateMoves = false
