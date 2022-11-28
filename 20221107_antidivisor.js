function antiDivisor(n){
    if(!Number.isInteger(n)){throw new Error("Només accepto nombres enters.")}
    var antiDivisors = new Array();
    if(n<3){return antiDivisors;}
    for(let k=2;k<n;k++){
        if(k%2==0){
            if(n%k==k/2){antiDivisors.push(k)}
        }else{
            if(Math.abs((n%k)-(k/2))==0.5){antiDivisors.push(k)}
        }
    }
    return antiDivisors;
}

console.log(antiDivisor(234))