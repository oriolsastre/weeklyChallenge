function capitalAfterVowel(frase){
    if(typeof frase === 'string' || frase instanceof String){    
        const vocals = ['a', 'e', 'i', 'o', 'u', 'à', 'è', 'é', 'í', 'ò', 'ó', 'ú'];
        const puntuacio = [' ','.',',','!','?','-']
        let prevVocal = false;
        let resultat = new String;

        for(let caracter of frase){
            if(vocals.includes(caracter.toLowerCase())){
                prevVocal = true;
                resultat+=caracter;
            }else{
                if(puntuacio.includes(caracter)){resultat+=caracter;}
                else{
                    if(prevVocal){
                        resultat+=caracter.toUpperCase();
                        prevVocal=false;
                    }else{resultat+=caracter;}
                }
            }
        }
        return resultat;
    }else{throw new Error("L'input no és un String")}
}
console.log(capitalAfterVowel('A veure per on em falles. I, què men dius de vocals despres de comes?'));

function sumEveryOther(nombre,index=1){
    if(isNaN(nombre)){throw new Error("L'input ha de ser un número")}
    let suma = 0;
    for(i=0;i<nombre.toString().length;i++){
        if(nombre.toString().charAt(i)!='.'){
            if(index%2===0){suma+=parseInt(nombre.toString().charAt(i));}
            index++
        }
    }
    return suma;
}
//console.log(sumEveryOther(1010.11));

function maxSubArray(m,n){
    if((typeof m === 'array' || m instanceof Array) && !isNaN(n)){
        const sizeM = m.length;
        if(n>=m){
            console.log("Has demanat un subarray més llarg que l'array. Se't retorna tot.")
            return m;
        }else{
            let resultat = [-Infinity,0];
            for(i=0;i<=sizeM-n;i++){
                let temp = m.slice(i,i+n).reduce((acc, a) => acc+a,0);
                if(temp>resultat[0]){resultat[0]=temp;resultat[1]=i}
            }
            return m.slice(resultat[1],resultat[1]+n)
        }
    }else{throw new Error("Input incorrecte")}
}

//console.log(maxSubArray([-4,2,-5,1,2,3,6,-5,2],5));

function replaceZeros(stringNumeric){
    if(!(typeof stringNumeric === 'string' || stringNumeric instanceof String)){throw new Error("L'input ha de ser un string")}
    let prevZero = false;
    let numZero = 0;
    let resultat = new String();
    for(let char of stringNumeric){
        if(char === '0'){prevZero=true;numZero++}
        else{
            if(prevZero){
                resultat+=numZero;
                prevZero=false;
                numZero=0;
            }
            resultat+=char;
        }
    }
    if(prevZero){
        resultat+=numZero;
        prevZero=false;
        numZero=0;
    }

    return resultat;
}

console.log(replaceZeros('123450036200440'));