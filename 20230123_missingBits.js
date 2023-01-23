const missingBits = arrayBits => {
    if(!(typeof arrayBits === 'array' || arrayBits instanceof Array)) throw new Error("Input ha de ser un array")
    let output = new Array()
    for(let i=0;i<(arrayBits.length-1);i++){
        output.push(arrayBits[i]);
        if(arrayBits[i+1]-arrayBits[i]===2) output.push(arrayBits[i]+1)
        else if(arrayBits[i+1]-arrayBits[i]>2) output.push('...')
    }
    output.push(arrayBits[arrayBits.length])
    return output;
}

const missingBits2 = arrayBits => {
    let output = new Array();
    let prev = arrayBits.shift();
    output.push(prev);
    while(arrayBits.length>0){
        let current = arrayBits.shift();
        if(current-prev==2) output.push(prev+1)
        if(current-prev>2) output.push('...')
        output.push(current)
        prev=current;
    }
    return output;
}

let arrayProva=[1,3,20,27]
let arrayProva2=[...arrayProva]
console.log(`Input: ${arrayProva}\nResultat:${missingBits(arrayProva)}\nModificat:${arrayProva}`);
console.log(`Input: ${arrayProva2}\nResultat:${missingBits2(arrayProva2)}\nModificat:${arrayProva2}`)