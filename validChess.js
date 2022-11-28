//moviment correcte, independentment de condicions com si hi ha peces pel mig, o no pot enrocar o tal.
function movimentPeca(peca,moviment){
    peca = peca.toLowerCase();
    if(peca == 'a'){
        if(moviment[0]==moviment[1]){return true;}
        else{return false;}
    }else if(peca == 'c'){
        if(Math.abs(moviment[0])==2 && Math.abs(moviment[1])==1){return true;}
        else if(Math.abs(moviment[0])==1 && Math.abs(moviment[1])==2){return true;}
        else{return false;}
    }else if(peca == 't'){
        if(moviment[0]==0 || moviment[1]==0){return true;}
        else{return false;}
    }else if(peca == 'd'){
        if(moviment[0]==moviment[1]){return true;}
        if(moviment[0]==0 || moviment[1]==0){return true;}
        else{return false;}
    }else if(peca == 'r'){
        if(Math.abs(moviment[0])<2 && Math.abs(moviment[1])<2){return true;}
        if(Math.abs(moviment[0])==2 && moviment[1]==0){return true;} //enroc del rei.
        else{return false;}
    }else{return false;}
}

function movimentValid(taulell, peca, moviment, fen=false){
    /*
    Majúscules blanques, minúscules negres
    P Peó   R Rei   D Dama  A Alfil     C Cavall    T Torre
    */
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
    if(pecesB.includes(peca.charAt(0))){const color = -1}         //negres és -1
    else if(pecesN.includes(peca.charAt(0))){const color = 1}     //blanques és 1
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

    //la casella que vull moure ha d'estar al tauler.
    if(pecesPosicio[peca.charAt(0)].length == 0){console.log('La peça que vols moure no es troba al tauler.'); return false;}
    
    if(moviment.length != 2 && !('abcdefgh'.includes(moviment.charAt(0))) && !('12345678'.includes(moviment.charAt(1)))){throw new Error('Moviment no reconegut en notació algebraica. No cal marcar amb una \'x\' la captura d\'una peça');}
    const filaANum = {a:0,b:1,c:2,d:3,e:4,f:5,g:6,h:7}

    const destiX = filaANum[moviment.charAt(0)];
    const destiY = moviment.charAt(1)-1;
    const casellaDesti = taulellArray[destiX][destiY];

    ambigu={numPeces: 0, comentari: ''};
    pecesPosicio[peca.charAt(0)].forEach(element => {
        const dX = element.fila-destiX;
        const dY = element.columna-destiY;
        //const movimentXY = [dX,dY];
        if(dX!= 0 && dY != 0){
            if(peca.charAt(0).toLowerCase() == 'p'){
                if(Math.abs(dX)==1 && Math.abs(dY)==1){
                    //caputra de peo
                    if(color == dY){
                        if((color == 1 && pecesN.includes(casellaDesti)) || color == -1 && pecesB.includes(casellaDesti)){ambigu.numPeces++;ambigu.comentari = 'El peó ha capturat una peça correctament.'}
                        else if(casellaDesti == '~' && ((color == 1 && taulellArray[destiX][destiY-color] == 'p') || (color == -1 && taulellArray[destiX][destiY-color] == 'P'))){ambigu++;}
                        else{return false;}
                    }else{console.log("El peons capturen, relativament, endavant, no enrere");return false;}
                }else if(dX==0 && Math.abs(dY)==1){
                    if(color == dY){
                        if(taulellArray[element.fila][element.columna+dY] === '~'){return true;}
                        else{console.log("El peó no es pot moure a una casella ocupada");return false;}
                    }else{console.log("El peons van, relativament, endavant, no enrere");return false;}
                }else if(dX==0 && Math.abs(dY)==2){
                    if((color===1 && dY==2 && element.fila==1) || (color===-1 && dY==-2 && element.fila==6)){
                        if(taulellArray[element.fila][element.columna+dY] === '~' && taulellArray[element.fila][element.columna+(dY/2)] === '~'){return true;}
                        else{console.log("El peó no es pot moure a una casella ocupada");return false;}
                    }else{console.log("El peó només pot avançar dues caselles des de la posició inicial, 2na o 7a fila per blanques i negres respectivament"); return false;}
                }else{console.log("Els peons no es mouen així.");return false;}
            }else if(peca.charAt(0).toLowerCase() == 'c'){
                if((Math.abs(dX)==2 && Math.abs(dY)==1) || (Math.abs(dX)==1 && Math.abs(dY)==2)){
                    if(casellaDesti=="~"){ambigu++;}
                    else if((color == 1 && pecesN.includes(casellaDesti)) || (color == -1 && pecesB.includes(casellaDesti))){console.log("Has capturat una peça rival amb el cavall.");return true;}
                    else{return;}
                }else{return;}
            }else if(peca.charAt(0).toLowerCase() == 'a'){
                if(dX==dY){

                }else{return;}
            }else if(peca.charAt(0).toLowerCase() == 't'){
            }else if(peca.charAt(0).toLowerCase() == 'd'){
            }else if(peca.charAt(0).toLowerCase() == 'r'){
                if(Math.abs(dX)==1 || Math.abs(dY) == 1){
                    if(casellaDesti=="~"){return true;}
                    else if((color == 1 && pecesN.includes(casellaDesti)) || (color == -1 && pecesB.includes(casellaDesti))){console.log("Has capturat una peça rival amb el rei.");return true;}
                    else{console.log("No pots capturar una peça pròpia.");return false;}
                }else if(Math.abs(dX)==2 && dY==0){
                    //enroc! L'enroc és un moviment de rei
                    if(color == 1){
                        if(element.fila==0 && element.columna == 4 && ((dX==2 && taulellArray[0][7]=='T') || (dX==-2 && taulellArray[0][0]=='T'))){
                            if(dX==2 && taulellArray[0][5]=='~' && taulellArray[0][6]=='~'){console.log("Enroc curt correcte, sempre i quant el rei i la torre no s'han mogut anteriorment.");return true;}
                            else if(dX==-2 && taulellArray[0][3]=='~' && taulellArray[0][2]=='~' && taulellArray[0][1]=='~'){console.log("Enroc llarg correcte, sempre i quant el rei i la torre no s'han mogut anteriorment.");return true;}
                            else{console.log("No tens via lliure per fer enroc");return false;}
                        }
                    }else{
                        if(element.fila==7 && element.columna == 4 && ((dX==2 && taulellArray[7][7]=='t') || (dX==-2 && taulellArray[7][0]=='t'))){
                            if(dX==2 && taulellArray[7][5]=='~' && taulellArray[7][6]=='~'){console.log("Enroc curt correcte, sempre i quant el rei i la torre no s'han mogut anteriorment.");return true;}
                            else if(dX==-2 && taulellArray[7][3]=='~' && taulellArray[7][2]=='~' && taulellArray[7][1]=='~'){console.log("Enroc llarg correcte, sempre i quant el rei i la torre no s'han mogut anteriorment.");return true;}
                            else{console.log("No tens via lliure per fer enroc");return false;}
                        }
                    }
                }
            }
        }
    })

}


let board = `~r~~~~~~~P~~~C~~c~R~~A~~~~~~~~~~~~~~~~~~~~~~~~~pppp~~~~~~~~~~~~~`
movimentValid(board, 'C', 'a4')