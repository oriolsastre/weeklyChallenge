function printTree(n){
    if(!Number.isInteger(n) || n<1){return console.log("L'input ha de ser un nombre enter positiu >0.")}
    else if(n===1){return console.log("·")}
    
    const nivells = Math.ceil(Math.log2(n));
    const midaInferior = 2**nivells; //la potencia de 2 més gran més propera
    
    var espaisBlancs = (midaInferior/2)-1;
    var espaiEntrePares = 0;
    // i son els nivells;j quantes linies cal per pintar el nivell ben espaiat
    for(let i=1;i<nivells;i++){
        var liniaXNivell = 2**(nivells-1-i);
        var espaiInterior=0;
        for(let j=1;j<=liniaXNivell;j++){
            var linia ="";
            linia = linia+" ".repeat(espaisBlancs);
            for(let k=0;k<2**(i-1);k++){
                if(k>0){linia = linia+" ".repeat(espaiEntrePares);}
                linia = linia+"/";
                linia = linia+" ".repeat(espaiInterior);
                linia = linia+"\\";
            }
            linia = linia+" ".repeat(espaisBlancs);

            console.log(linia);
            espaiInterior+=2;
            espaiEntrePares-=2;
            espaisBlancs--;
        }
        espaiEntrePares=espaiInterior-2;
    }
    liniaFinal="";
    const extres = n-(midaInferior/2);
    var f=0;
    for(f;f<extres;f++){
        liniaFinal=liniaFinal+"/\\";
    }
    const queden = midaInferior-n;
    for(let fill = queden;fill>0;fill--){
        if(fill%2===0){
            liniaFinal=liniaFinal+"/ ";
        }else{
            liniaFinal=liniaFinal+" \\";
        }
    }
    console.log(liniaFinal);
}