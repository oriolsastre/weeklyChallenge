function fillLeadZero(coded,upTo=3){
    while(coded.length<upTo){
        coded='0'+coded;
    }
    return coded;
}

function convert(text){
    //const charCode = [" ",'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s']
    let a = '';
    for(let char of text){
        let codedChar = fillLeadZero(char.charCodeAt().toString())
        a+=codedChar
    }
    a='0.'+a;
    //console.log(a);
    let stickLength = 200;
    let ratio = Math.ceil(parseFloat(a)*stickLength)
    let stick = '[';
    for(i=1;i<=stickLength;i++){
        if(i===ratio){stick+='X'}else{stick+='-'}
    }
    stick+=']'
    console.log(`With the text: '${text}', your stick would roughly look like this:`)
    console.log(stick)
}

convert(`El meu nom és Oriol`)
convert(`2023 és l'any que comença`)
convert(`És l'inici de l'any`)