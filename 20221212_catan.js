function randomCatan(){
    var hexagons = [2,3,3,4,4,5,5,6,6,8,8,9,9,'A','A','B','B','C','.'];
    const filesTauler = [3,4,5,4,3];
    var taulerArray = [[],[],[],[],[]]; 
    var taulerString = ["  ", " ", "", " ", "  "];
    var continuar = true;

    filesTauler.forEach((fila, index) => {
        for(i=0;i<fila;i++){
            var hexagonRnd = Math.floor(Math.random() * hexagons.length)
            if(index>0){
                var proves = 0;
                var validTile = false;
                while(!validTile){
                    if(proves > hexagons.length){validTile=true;continuar=false;}
                    if(hexagons[hexagonRnd]===8 || hexagons[hexagonRnd]===6){
                        if(hexagons[hexagonRnd]===8){var oposite = 6;}else{var oposite = 8;}
                        if(i>0 && taulerArray[index][i-1]!=oposite){
                            if(taulerArray[index-1][i]!=oposite){
                                let offset = fila-filesTauler[index-1];
                                if(taulerArray[index-1][i-offset]!=oposite){
                                    validTile=true;
                                }else{
                                    proves++;
                                    hexagonRnd = Math.floor(Math.random() * hexagons.length)
                                }
                            }else{
                                proves++;
                                hexagonRnd = Math.floor(Math.random() * hexagons.length)
                            }
                        }
                        else{
                            proves++;
                            hexagonRnd = Math.floor(Math.random() * hexagons.length)
                        }

                    }else{validTile=true;}
                }
            }
            if(continuar){
                taulerArray[index][i]=hexagons[hexagonRnd];
                taulerString[index]=taulerString[index]+hexagons[hexagonRnd]+" "
                hexagons.splice(hexagonRnd,1)
            }else{break;}
        }
        if(!continuar){return}
    })
    if(continuar){
        taulerString.forEach(fila => {console.log(fila)})
    }else{
        randomCatan()
    }
}

randomCatan();