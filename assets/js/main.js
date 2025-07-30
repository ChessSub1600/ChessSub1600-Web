import { Chess } from './chess.js';

const game = new Chess();

const piezasImg = {
  w: {
    p: 'piezas/wP.svg',
    r: 'piezas/wR.svg',
    n: 'piezas/wN.svg',
    b: 'piezas/wB.svg',
    q: 'piezas/wQ.svg',
    k: 'piezas/wK.svg'
  },
  b: {
    p: 'piezas/bP.svg',
    r: 'piezas/bR.svg',
    n: 'piezas/bN.svg',
    b: 'piezas/bB.svg',
    q: 'piezas/bQ.svg',
    k: 'piezas/bK.svg'
  }
};



const tablero = document.getElementById('chessboard');
let origenSeleccionado = null;
const letras = 'abcdefgh';

// 📝 Muestra la última jugada en notación simple
function mostrarUltimaJugada(mov) {
    if (!mov) return;

    let notacion;

    if (mov.flags.includes('k')) {
        notacion = 'O-O';
    } else if (mov.flags.includes('q')) {
        notacion = 'O-O-O';
    } else {
        let inicial;

        if (mov.piece === 'p') {
            inicial = mov.captured ? mov.from[0] : '';
        } else {
            inicial = mov.piece.toUpperCase();
        }

        const captura = mov.captured ? 'x' : '';
        notacion = `${inicial}${captura}${mov.to}`;
    }

    // 👉 Detectar jaque o mate DESPUÉS del movimiento
    let sufijo = '';
    if (game.in_checkmate()) {
        sufijo = '#'; // Mate
    } else if (game.in_check()) {
        sufijo = '+'; // Jaque
    }

    const etiqueta = document.getElementById('ultima-jugada');
    if (etiqueta) etiqueta.textContent = `Última jugada: ${notacion}${sufijo}`;
}





// 🔁 Movimiento + render
function moverPieza(from, to) {
    const mov = game.move({ from, to });
    if (mov) {
        mostrarUltimaJugada(mov);
        renderTablero();
    }
}

// ♟️ Manejo de clics
function manejarClick(square) {
    const posiblesMovs = game.moves({ square, verbose: true });

    if (!origenSeleccionado && posiblesMovs.length) {
        origenSeleccionado = square;
    } else if (origenSeleccionado) {
        moverPieza(origenSeleccionado, square);
        origenSeleccionado = null;
    }

    renderTablero();
}

// 🖼️ Renderiza tablero con interacción por clic y drag
function renderTablero() {
    tablero.innerHTML = '';
    const board = game.board();

    for (let i = 0; i < 8; i++) {
        const fila = document.createElement('div');
        fila.classList.add('fila');

        for (let j = 0; j < 8; j++) {
            const coord = `${letras[j]}${8 - i}`;
            const casilla = document.createElement('div');
            casilla.classList.add('casilla', (i + j) % 2 === 0 ? 'blanca' : 'negra');
            casilla.setAttribute('data-square', coord);

            if (origenSeleccionado === coord) {
                casilla.classList.add('seleccionada');
            }

            const pieza = board[i][j];
            if (pieza) {
                const img = document.createElement('img');
                img.src = piezasImg[pieza.color][pieza.type];
                img.alt = `${pieza.color}-${pieza.type}`;
                img.classList.add('pieza-img');
                casilla.appendChild(img);
                casilla.setAttribute('draggable', true);

                casilla.addEventListener('dragstart', (e) => {
                    e.dataTransfer.setData('text/plain', coord);
                });
            }

            casilla.addEventListener('dragover', (e) => e.preventDefault());

            casilla.addEventListener('drop', (e) => {
                e.preventDefault();
                const desde = e.dataTransfer.getData('text/plain');
                moverPieza(desde, coord);
            });

            casilla.addEventListener('click', () => manejarClick(coord));

            fila.appendChild(casilla);
        }

        tablero.appendChild(fila);
    }
}

// ♻️ Reinicio público
window.resetTablero = () => {
    game.reset();
    origenSeleccionado = null;
    document.getElementById('ultima-jugada').textContent = `Última jugada: —`;
    renderTablero();
};

// 🚀 Inicializa tablero al cargar
renderTablero();
