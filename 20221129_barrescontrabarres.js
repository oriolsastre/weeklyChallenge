function verticalShalsh(barres){
    var decalatge = 0;
    var minDecalatge = 0;
    for(let i=0;i<barres.length;i++){
        if(barres.charAt(i)=='/'){decalatge++;if(decalatge>minDecalatge){minDecalatge=decalatge;}}
        else if(barres.charAt(i)=='\\'){decalatge--;}
        else{return console.log("L'input només poden ser barres '/' i contrabarres '\\'");}
    }
    for(let i=0;i<barres.length;i++){
        if(barres.charAt(i)=='\\'){console.log(" ".repeat(minDecalatge)+" "+barres.charAt(i));minDecalatge++;}
        else if(barres.charAt(i)=='/'){console.log(" ".repeat(minDecalatge)+barres.charAt(i));minDecalatge--;}
    }
}

barres = String.raw`//\///\\`
verticalShalsh(barres)