function verticalShalsh(barres){
    var rawbarres = String.raw`${barres}`
    console.log(rawbarres)
    var decalatge = 0;
    var minDecalatge = 0;
    for(let i=0;i<rawbarres.length;i++){
        if(rawbarres.charAt(i)=='/'){decalatge++;if(decalatge>minDecalatge){minDecalatge=decalatge;}}
        else if(rawbarres.charAt(i)=='\\'){decalatge--;}
        else{return console.log("L'input només poden ser barres '/' i contrabarres '\\'");}
    }
    for(let i=0;i<rawbarres.length;i++){
        if(rawbarres.charAt(i)=='\\'){console.log(" ".repeat(minDecalatge)+" "+rawbarres.charAt(i));minDecalatge++;}
        else if(rawbarres.charAt(i)=='/'){console.log(" ".repeat(minDecalatge)+rawbarres.charAt(i));minDecalatge--;}
    }
}

verticalShalsh('//\///a\\')