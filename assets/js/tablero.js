import { Chess } from './chess.js';

const piezaEmoji = {
    p: '♙', r: '♜', n: '♞', b: '♝', q: '♛', k: '♚',
    P: '♙', R: '♖', N: '♘', B: '♗', Q: '♕', K: '♔'
};
const letraPieza = {
  p: '',   // pawn
  r: 'R',  // rook
  n: 'N',  // knight
  b: 'B',  // bishop
  q: 'Q',  // queen
  k: 'K'   // king
};


const game = new Chess();
const tablero = document.getElementById('tablero');
const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
let selectedSquare = null;

const ultimaJugada = document.getElementById('ultima-jugada');
const botonReiniciar = document.getElementById('reiniciar-tablero');

// Dibujar el tablero inicial
for (let rank = 8; rank >= 1; rank--) {
    for (let i = 0; i < files.length; i++) {
        const squareId = files[i] + rank;
        const square = document.createElement('div');
        square.classList.add('square');
        square.classList.add((rank + i) % 2 === 0 ? 'white' : 'black');
        square.setAttribute('data-square', squareId);
        square.addEventListener('click', () => handleClick(squareId));
        tablero.appendChild(square);
    }
}

/*version refinada para mostrar incicial en ultima jugada */
function handleClick(squareId) {
  if (!selectedSquare) {
    selectedSquare = squareId;
    highlight(squareId);
  } else {
    const resultado = game.move({ from: selectedSquare, to: squareId, promotion: 'q' });

    if (resultado) {
      renderBoard();
      marcarCasilla(resultado.to);


      const pieza = game.get(squareId);
      const tipo = pieza ? letraPieza[pieza.type] : '';
      const notacion = `${tipo}${resultado.to}`;

      ultimaJugada.textContent = `Última jugada: ${tipo}${resultado.from} → ${notacion}`;
    }

    clearHighlight();
    selectedSquare = null;
  }
}
/*Nueva funcion para marcar casilla en azul de la ultima jugada  */
function marcarCasilla(squareId) {
  // Elimina marcador anterior
  document.querySelectorAll('.square').forEach(sq => {
    sq.classList.remove('ultima');
  });

  // Marca la casilla destino
  const casilla = document.querySelector(`[data-square="${squareId}"]`);
  if (casilla) {
    casilla.classList.add('ultima');
  }
}


botonReiniciar.addEventListener('click', () => {
    game.reset();
    renderBoard();
    ultimaJugada.textContent = 'Última jugada: —';
});

function highlight(squareId) {
    document.querySelector(`[data-square="${squareId}"]`)
        .style.boxShadow = 'inset 0 0 5px 3px yellow';
}

function clearHighlight() {
    document.querySelectorAll('.square')
        .forEach(sq => (sq.style.boxShadow = ''));
}

function renderBoard() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(sq => (sq.innerHTML = ''));

    const fen = game.fen().split(' ')[0];
    const ranks = fen.split('/');

    let index = 0;
    ranks.forEach(rank => {
        for (const char of rank) {
            if (isNaN(char)) {
                const square = squares[index];
                const colorClass = char === char.toUpperCase() ? 'blanca' : 'negra';
                square.innerHTML = `<span class="pieza ${colorClass}">${piezaEmoji[char] || ''}</span>`;
                index++;
            } else {
                index += parseInt(char);
            }
        }
    });
}

renderBoard();
