(function randomCatan(){
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
})()

var n = [6,9,-7,3,8,-1,-6,-4,2,-7,7,-7,-1,4,7,9];
var m = [8,-7,-4,2];

(function sumaRectangle(n,m){
    if(!Array.isArray(n) || !Array.isArray(m)){return console.log("Els paràmetres no són arrays.");}
    if(m.length!=4){return console.log("El segon array ha de ser de mida 4 representant les 4 cantonades d'un rectangle.")}
    
    var a = n.length**(1/2);
    if(!Number.isInteger(a)){return console.log("De moment el primer array ha de representar un quadrat. No és el cas")}
    var b = a;
    var cantonades = new Array(4).fill(new Array)
    m.forEach((valor,index) => {
        var indexes = [], i = -1;
        while ((i = n.indexOf(valor, i+1)) != -1){
            indexes.push(i);
        }
        cantonades[index] = indexes
    })
    var rectangleValid=new Array();
    if(cantonades[0].length===0 || cantonades[1].length==0 || cantonades[2].length==0 || cantonades[3].length==0){return console.log("Vèrtexs no vàlids per a crear un rectangle.")}
    cantonades[0].forEach(cantonada1 => {
    cantonades[1].forEach(cantonada2 => {
    cantonades[2].forEach(cantonada3 => {
    cantonades[3].forEach(cantonada4 => {
        var rectangle = new Array();
        rectangle.push(cantonada1,cantonada2,cantonada3,cantonada4)
        rectangle.sort((a,b)=>{return a-b})
        if(Math.floor(rectangle[0]/a) == Math.floor(rectangle[1]/a) && Math.floor(rectangle[2]/a) == Math.floor(rectangle[3]/a) && Math.floor(rectangle[0]/a) != Math.floor(rectangle[2]/a)){
        if(rectangle[0]%b == rectangle[2]%b && rectangle[1]%b == rectangle[3]%b && rectangle[0]%b != rectangle[1]%b){
            rectangleValid.push(rectangle);
        }
        }
    })
    })
    })
    })
    if(rectangleValid.length == 0){return console.log("No s'ha trobat cap rectangle vàlid amb aquestes coordenades. No s'accepten rectangles d'alçada o amplada = 0")}
    rectangleValid.forEach(rectangle => {
        var suma = 0;
        xMin=rectangle[0]%b;                xMax=rectangle[1]%b;
        yMin=Math.floor(rectangle[0]/a);    yMax=Math.floor(rectangle[2]/a);
        for(x=xMin;x<=xMax;x++){
        for(y=yMin;y<=yMax;y++){
            suma+=n[y*a+x];
        }
        }
        console.log("La suma dels valors dins del rectangle és de "+suma)
    })
})(n,m)