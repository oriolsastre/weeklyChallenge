function fen2string(posicioFEN){
    const eng2cat = {P:'P', p:'p',N:'C',n:'c', B:'A', b:'a', R:'T', r:'t', Q:'D', q:'d', K:'R', k:'r'}
    var posicio = "";
    var linia = "";
    var caracter = "";
    posicioFEN=posicioFEN+'/'
    for(let i=0;i<posicioFEN.length;i++){
        caracter = posicioFEN.charAt(i);
        if(!isNaN(caracter)){linia= linia+"~".repeat(parseInt(caracter))}
        else if(typeof eng2cat[caracter.toString()] != 'undefined'){linia = linia+eng2cat[caracter.toString()]}
        else if(caracter == '/'){posicio = linia+posicio; linia = ""}
    }
    return posicio;
}

function taulellEscac(taulell, rei, color){
    if(color==1){pecesRivals = {P:'p',C:'c',A:'a',T:'t',D:'d',R:'r'}}
    else if(color == -1){pecesRivals = {P:'P',C:'C',A:'A',T:'T',D:'D',R:'R'}}

    if(taulell[rei[0]+1][rei[1]+color]==pecesRivals.P || taulell[rei[0]-1][rei[1]+color]==pecesRivals.P){return true;}
    for(let i=-1;i<2;i+=2){
    for(let j=-1;j<2;j+=2){
        if(taulell[(rei[0]+2)*i][(rei[1]+1)*j]==pecesRivals.C || taulell[(rei[0]+1)*i][(rei[1]+2)*j]==pecesRivals.C){return true;}
    }
    }
    for(let i=-1;i<2;i++){
    for(let j=-1;j<2;j++){
        if(taulell[rei[0]+i][rei[1]+j]==pecesRivals.R){return true;}
    }
    }
    for(let i=-1;i<2;i+=2){
    for(let j=-1;j<2;j+=2){
        var viaLliure=true;
        var k=1;
        while(viaLliure && k<8){
            if(taulell[rei[0]+(k*i)][rei[1]+(k*j)] == pecesRivals.D || taulell[rei[0]+(k*i)][rei[1]+(k*j)] == pecesRivals.A){return false;}
            else if(taulell[rei[0]+(k*i)][rei[1]+(k*j)] != '~'){viaLliure=false;}
            k++;
        }
    }
    }
}

function movimentValid(taulell, peca, moviment, fen=false){
    /*
    Majúscules blanques, minúscules negres
    P Peó   R Rei   D Dama  A Alfil     C Cavall    T Torre
    */
    if(fen){taulell = fen2string(taulell)}
    const peces = '~pcatdrPCATDR';
    const pecesB = 'PCATDR';
    const pecesN = pecesB.toLowerCase();

    var pecesPosicio = {
        P: new Array(),
        C: new Array(),
        A: new Array(),
        T: new Array(),
        D: new Array(),
        R: new Array(),
        p: new Array(),
        c: new Array(),
        a: new Array(),
        t: new Array(),
        d: new Array(),
        r: new Array()
    }

    if(taulell.length != 64){throw new Error('Tauler incorrecte. Ha de representar un tauler d\'escacs de 8x8')}
    //creo una matriu de 8x8 buida on hi guardarem la posició que hem rebut de l'string.
    var taulellArray =  new Array();
    for(i=0;i<8;i++){
        taulellArray.push(new Array(8).fill(null))
    }

    //mirem quina peça movem i si som blanques o negres. charAt(0) ja que hi ha casos on s'ha d'especificar la peça en concret. p.e. Cdd4
    if(pecesB.includes(peca.charAt(0))){var color = 1}         //negres és -1
    else if(pecesN.includes(peca.charAt(0))){var color = -1}     //blanques és 1
    else {throw new Error('Peça no reconeguda')}

    //omplim el tauler, amb alguna comprovació bàsica
    var fila=0;
    var columna=0;
    for(let i=0; i<taulell.length; i++){
        var casella = taulell.charAt(i);
        if(!peces.includes(casella) || (casella.toLowerCase()==='p' && (i<8 || i>55)) ){throw new Error('Peça incorrecte o peo a 1a o 8a fila.')} //no hi pot haver peons de cap color a la 1a ni 8a fila.
        taulellArray[fila][columna] = casella;
        if(casella != '~'){
            pecesPosicio[casella].push({fila: fila, columna: columna})
        }
        columna++;
        if(columna == 8){fila++;columna=0;}
    }

    //només hi pot haver un rei per banda
    if(pecesPosicio['R'].length>1 || pecesPosicio['r'].length>1){throw new Error('Només hi pot haver un rei per banda, per normativa.')}

    if(taulellEscac(taulellArray,[pecesPosicio['R'][0].fila,pecesPosicio['R'][0].columna],1)){console.log("El rival està en escac");return false;}

    //la casella que vull moure ha d'estar al tauler.
    if(pecesPosicio[peca.charAt(0)].length == 0){console.log('La peça que vols moure no es troba al tauler.'); return false}
    
    if(moviment.length != 2 && !('abcdefgh'.includes(moviment.charAt(0))) && !('12345678'.includes(moviment.charAt(1)))){throw new Error('Moviment no reconegut en notació algebraica. No cal marcar amb una \'x\' la captura d\'una peça');}
    const filaANum = {a:0,b:1,c:2,d:3,e:4,f:5,g:6,h:7}

    const destiX = filaANum[moviment.charAt(0)];
    const destiY = moviment.charAt(1)-1;
    const casellaDesti = taulellArray[destiY][destiX];

    if((color == 1 && pecesB.includes(casellaDesti)) || (color == -1 && pecesN.includes(casellaDesti))){console.log("No pots capturar una peça pròpia"); return false;}

    ambigu={numPeces: 0, comentari: ''};
    pecesPosicio[peca.charAt(0)].forEach(element => {
        const dX = destiX-element.columna;
        const dY = destiY-element.fila;
        if(dX!= 0 || dY != 0){
            if(peca.charAt(0).toLowerCase() == 'p'){
                if(Math.abs(dX)==1 && Math.abs(dY)==1){
                    //caputra de peo
                    if(color == dY){
                        if((color == 1 && pecesN.includes(casellaDesti)) || (color == -1 && pecesB.includes(casellaDesti))){ambigu.numPeces++;ambigu.comentari = 'El peó ha capturat una peça correctament.'}
                        else if(casellaDesti == '~' && ((color == 1 && taulellArray[destiX-color][destiY] == 'p') || (color == -1 && taulellArray[destiX][destiY-color] == 'P'))){ambigu.numPeces++; ambigu.comentari = "Has capturat en passant!"}
                        else{return}
                    }else{console.log("El peons capturen, relativament, endavant, no enrere");return}
                }else if(dX==0 && Math.abs(dY)==1){
                    if(color == dY){
                        if(taulellArray[element.fila+dY][element.columna] === '~'){ambigu.numPeces++}
                        else{console.log("El peó no es pot moure a una casella ocupada");return}
                    }else{console.log("El peons van, relativament, endavant, no enrere");return}
                }else if(dX==0 && Math.abs(dY)==2){
                    if((color===1 && dY==2 && element.fila==1) || (color===-1 && dY==-2 && element.fila==6)){
                        if(taulellArray[element.fila+dY][element.columna] === '~' && taulellArray[element.fila+(dY/2)][element.columna] === '~'){ambigu.numPeces++;ambigu.comentari = 'El peó ha avançat correctament.'}
                        else{console.log("El peó no es pot moure a una casella ocupada");return}
                    }else{console.log("El peó només pot avançar dues caselles des de la posició inicial, 2na o 7a fila per blanques i negres respectivament"); return}
                }//else{console.log("Els peons no es mouen així.");return}
            }else if(peca.charAt(0).toLowerCase() == 'c'){
                if((Math.abs(dX)==2 && Math.abs(dY)==1) || (Math.abs(dX)==1 && Math.abs(dY)==2)){
                    if(casellaDesti=="~"){ambigu.numPeces++;}
                    else if((color == 1 && pecesN.includes(casellaDesti)) || (color == -1 && pecesB.includes(casellaDesti))){console.log("Has capturat una peça rival amb el cavall.");}
                    //else{return;}
                }//else{return;}
            }else if(peca.charAt(0).toLowerCase() == 'a'){
                if(Math.abs(dX)==Math.abs(dY)){
                    for(let i=1;i<Math.abs(dX);i++){
                        if(taulellArray[element.fila + i*(Math.sign(dY))][element.columna+ i*(Math.sign(dX))] != '~'){return; break;}
                    }
                    if(ambigu.numPeces!=-1){ambigu.numPeces++}
                }//else{console.log("L'alfil no es mou així.");return}
            }else if(peca.charAt(0).toLowerCase() == 't'){
                if((dX==0 && dY!=0) || (dX!=0 && dY==0)){
                    dX == 0 ? dd=dY : dd=dX
                    for(let i=1;i<Math.abs(dd);i++){
                        if(taulellArray[element.fila + i*(Math.sign(dY))][element.columna+ i*(Math.sign(dX))] != '~'){return; break;}
                    }
                    if(ambigu.numPeces!=-1){ambigu.numPeces++}
                }//else{console.log("La torre no es mou així.");return}
            }else if(peca.charAt(0).toLowerCase() == 'd'){
                if((dX==0 && dY!=0) || (dX!=0 && dY==0) || Math.abs(dX)==Math.abs(dY)){
                    for(let i=1;i<Math.abs(dX);i++){
                        if(taulellArray[element.fila + i*(Math.sign(dY))][element.columna+ i*(Math.sign(dX))] != '~'){return; break;}
                    }
                    if(ambigu.numPeces!=-1){ambigu.numPeces++}
                }//else{console.log("La dama no es mou així.");return}
            }else if(peca.charAt(0).toLowerCase() == 'r'){
                if(Math.abs(dX)==1 || Math.abs(dY) == 1){
                    if(casellaDesti=="~"){ambigu.numPeces++;}
                    else if((color == 1 && pecesN.includes(casellaDesti)) || (color == -1 && pecesB.includes(casellaDesti))){console.log("Has capturat una peça rival amb el rei.");ambigu.numPeces++;}
                    //else{console.log("No pots capturar una peça pròpia.");return}
                }else if(Math.abs(dX)==2 && dY==0){
                    //enroc! L'enroc és un moviment de rei
                    if(color == 1){
                        if(element.fila==0 && element.columna == 4 && ((dX==2 && taulellArray[0][7]=='T') || (dX==-2 && taulellArray[0][0]=='T'))){
                            if(dX==2 && taulellArray[0][5]=='~' && taulellArray[0][6]=='~'){console.log("Enroc curt correcte, sempre i quant el rei i la torre no s'han mogut anteriorment.");ambigu.numPeces++;}
                            else if(dX==-2 && taulellArray[0][3]=='~' && taulellArray[0][2]=='~' && taulellArray[0][1]=='~'){console.log("Enroc llarg correcte, sempre i quant el rei i la torre no s'han mogut anteriorment.");ambigu.numPeces++;}
                            else{console.log("No tens via lliure per fer enroc");return}
                        }
                    }else{
                        if(element.fila==7 && element.columna == 4 && ((dX==2 && taulellArray[7][7]=='t') || (dX==-2 && taulellArray[7][0]=='t'))){
                            if(dX==2 && taulellArray[7][5]=='~' && taulellArray[7][6]=='~'){console.log("Enroc curt correcte, sempre i quant el rei i la torre no s'han mogut anteriorment.");ambigu.numPeces++;}
                            else if(dX==-2 && taulellArray[7][3]=='~' && taulellArray[7][2]=='~' && taulellArray[7][1]=='~'){console.log("Enroc llarg correcte, sempre i quant el rei i la torre no s'han mogut anteriorment.");ambigu.numPeces++;}
                            else{console.log("No tens via lliure per fer enroc");return}
                        }
                    }
                }
            }
        }
    })
    //if ambigu
    if(ambigu.numPeces==0){return false};
    if(ambigu.numPeces>0){console.log(ambigu.comentari); return true;}

}


let board = `~r~~~~~~~P~~~C~~c~R~~A~~~~~~~~~~~~~~~~~~~~~~~~~pppp~~~~~~~~~~~~~`
let boardFEN = 'r1bqkbnr/ppppp1pp/2n5/4Pp2/8/8/PPPP1PPP/RNBQKBNR'
console.log(movimentValid(boardFEN, 'P', 'f6', true))

//console.log(fen2string('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'))