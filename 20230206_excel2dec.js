const excel2dec = excel => {
    const alphabet = [0,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    let power=0;
    let dec = 0;
    for(let i=(excel.length-1);i>=0;i--){
        let num = alphabet.indexOf(excel[i]);
        dec += num*Math.pow(26,power)
        power++;
    }
    return dec;
}