let board = `~r~~~~~~~P~~~C~~c~R~~A~~~~~~~~~~~~~~~~~~~~~~~~~pppp~~~~~~~~~~~~~`

function movimentValid(taulell, peca, moviment){
    /*
    Majúscules blanques, minúscules negres
    P Peó   R Rei   D Dama  A Alfil     C Cavall    T Torre
    */
    const peces = '~pcatdrPCATDR';
    var pecesMoviment = {
        P: {
            posicio: new Array(),
            moviment: []
        },
        C: {
            posicio: new Array(),
            moviment: []
        },
        A: {
            posicio: new Array(),
            moviment: []
        },
        T: {
            posicio: new Array(),
            moviment: []
        },
        D: {
            posicio: new Array(),
            moviment: []
        },
        R: {
            posicio: new Array(),
            moviment: []
        },
        p: {
            posicio: new Array(),
            moviment: []
        },
        c: {
            posicio: new Array(),
            moviment: []
        },
        a: {
            posicio: new Array(),
            moviment: []
        },
        t: {
            posicio: new Array(),
            moviment: []
        },
        d: {
            posicio: new Array(),
            moviment: []
        },
        r: {
            posicio: new Array(),
            moviment: []
        }
    }

    if(taulell.length != 64){throw new Error('Tauler incorrecte. Ha de representar un tauler d\'escacs de 8x8')}
    //creo una matriu de 8x8 buida on hi guardarem la posició que hem rebut de l'string.
    var taulellArray =  new Array();
    for(i=0;i<8;i++){
        taulellArray.push(new Array(8).fill(null))
    }

    //mirem quina peça movem i si som blanques o negres. charAt(0) ja que hi ha casos on s'ha d'especificar la peça en concret. p.e. Cdd4
    if('pcatdr'.includes(peca.charAt(0))){const color = 'n'}
    else if('PCATDR'.includes(peca.charAt(0))){const color = 'b'}
    else {throw new Error('Peça no reconeguda')}

    //omplim el tauler, amb alguna comprovació bàsica
    var fila=0;
    var columna=0;
    for(let i=0; i<taulell.length; i++){
        var casella = taulell.charAt(i);
        if(!peces.includes(casella) || (casella.toLowerCase()==='p' && (i<8 || i>55)) ){throw new Error('Peça incorrecte o peo a 1a o 8a fila.')} //no hi pot haver peons de cap color a la 1a ni 8a fila.
        taulellArray[fila][columna] = casella;
        if(casella != '~'){
            pecesMoviment[casella].posicio.push({fila: fila, columna: columna})
        }
        columna++;
        if(columna == 8){fila++;columna=0;}
    }

    //només hi pot haver un rei per banda
    if(pecesMoviment['R'].posicio.length>1 || pecesMoviment['r'].posicio.length>1){throw new Error('Només hi pot haver un rei per banda, per normativa.')}

    //la casella que vull moure ha d'estar al tauler.
    if(pecesMoviment[peca.charAt(0)].posicio.length == 0){throw new Error('La peça que vols moure no es troba al tauler.')}
    
    if(moviment.length != 2 && !('abcdefgh'.includes(moviment.charAt(0))) && !('12345678'.includes(moviment.charAt(1)))){throw new Error('Moviment no reconegut en notació algebraica. No cal marcar amb una \'x\' la captura d\'una peça');}
    const filaANum = {a:0,b:1,c:2,d:3,e:4,f:5,g:6,h:7}

    const destiX = filaANum[moviment.charAt(0)];
    const destiY = moviment.charAt(1)-1;


    pecesMoviment[peca.charAt(0)].posicio.forEach(element => {
        const dX = element.fila-destiX;
        const dY = element.columna-destiY;
        const movimentXY = [dX,dY];
        //if(pecesMoviment[peca.charAt(0)].moviment.includes(movimentXY))
    })

}

movimentValid(board, 'C', 'b5')