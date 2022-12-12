/*(function randomCatan(){
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
                    if(proves > 5*hexagons.length){validTile=true;continuar=false;}
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
})()*/

var n = [6,9,-7,3,8,-1,-6,-7,5,-7,7,-7,-1,4,7,9];
var m = [-1,8,-7,2];

(function sumaRectangle(n,m){
    if(!Array.isArray(n) || !Array.isArray(m)){return console.log("Els paràmetres no són arrays.");}
    if(m.length!=4){return console.log("El segon array ha de ser de mida 4 representant les 4 cantonades d'un rectangle.")}
    
    var a = n.length**(1/2);
    if(!Number.isInteger(a)){return console.log("De moment el primer array ha de representar un quadrat. No és el cas")}
    var b = a;
    



})(n,m)