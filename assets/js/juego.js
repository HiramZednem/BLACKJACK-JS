const miModulo = (() => {
    'use strict'
    
    let   deck       = [];
    const tipos      = ['C','D','H','S'],
          especiales = ['A','J','Q','K'];

    let puntosJugadores = [];

    //Referencias de HTML:
    const btnPedir   = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo   = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartaas'),
          puntosHTML         = document.querySelectorAll('small');


    //Esta funcion inicializa el juego
    const inicializarJuego = ( numJugadores = 2 )=>{
            deck = crearDeck();
            puntosJugadores =[];
            for ( let i=0; i<numJugadores; i++ ){
                puntosJugadores.push(0);
                puntosHTML[i].innerText = 0;
                divCartasJugadores[i].innerText ='';
            }

            btnPedir.disabled = false;
            btnDetener.disabled = false;
        
        }

    // Esta funcion crea una nueva baraja
    const crearDeck = ()=>{
        deck=[]
        for ( let i=2; i<=10; i++ ){
            for ( let tipo of tipos ){
                deck.push( i + tipo );
            }
        }

        for ( let tipo of tipos ){
            for (let especial of especiales){
                deck.push(especial + tipo);
            }
        }
        return _.shuffle(deck);
    }

    const pedirCarta = () => ( deck.length === 0 ) ? console.error('No hay cartas en el deck') : deck.pop();

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        let puntos = (!isNaN(valor)) ? valor * 1 :
                     (valor === 'A') ? 11 : 10;
        return puntos;

    }

    //Turno 0 es el primer jugador and ultimo es la compu
    const acumularPuntos = ( carta,turno ) => {
        puntosJugadores[turno] += valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = ( carta, turno ) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append( imgCarta );

    }

    const determinarGanador = () =>{
        const [puntosMinimos, puntosComputadora] = puntosJugadores;
        setTimeout(() => {
            if(puntosMinimos === puntosComputadora){
                alert('Empate');
            }else if( puntosMinimos <= 21 && puntosComputadora > 21){
                alert('Jugador Gana');
            }else{
                alert('Computador Gana');
            }
        }, 150);
    }

    //turno computadora
    const turnoComputadora = ( puntosMinimos ) => {
        let puntosComputadora = 0;
        do{
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos( carta, puntosJugadores.length-1 );
            crearCarta    ( carta, puntosJugadores.length-1 );
            
        }while( ( puntosComputadora < puntosMinimos ) && (puntosMinimos <= 21));
        determinarGanador();
    }


    //Eventos
    btnPedir.addEventListener('click',() => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos( carta, 0);
        crearCarta(carta, 0);

        if ( puntosJugador > 21 ){
            console.warn('Perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
            
        }else if( puntosJugador === 21 ){
            console.warn('21, genial');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
            
        }
    });


    btnDetener.addEventListener('click',() =>{
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugadores[0] );
    
    });


    btnNuevo.addEventListener('click', ()=>{       
        inicializarJuego();
    });

    return {
        nuevoJuego: inicializarJuego
    }

})();












