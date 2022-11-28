function passarPortes(n,nombrePassades){
    //casos trivials
    if(n==0 || nombrePassades==0){return 0;}    //o no hi ha portes o no passem cap vegada a obrir-les
    else if(nombrePassades==1){return n;}       //obrim totes els portes un cop i ja està
    else if(n==1){return 1;}                    //aquest és així per que ja descartem el cas de 0 passades. I un cop obrim la primera porta, ja no la tocarem més al futur.
    else if(nombrePassades>n){
        /* Un cop fem la n-passada i per tant movem la n-porta, al fer la passada n+1 intentem obrir la porta n+1, que
        no existeix, sense canviar les anteriors. Per tant, arribats a aquest punt, per més passades que fem, el
        resultat no canvia.*/
        nombrePassades=n;
    }

    //inicialitzem l'array portes amb totes les portes tancades, tancat=0
    var portes = Array(n).fill(0);
    
    for(let i=1;i<=nombrePassades;i++){
        for(let p=(i-1);p<portes.length;p+=i){
            portes[p]=(portes[p]+1)%2;
        }
    }
    //sumem els valors de l'array porta, ja que cada porta oberta té valor de 1
    return portes.reduce((sumaPrevia,porta)=>sumaPrevia+porta);
}

console.log(passarPortes(9,1000));