import inquirer from 'inquirer';

let ruletaSize = 20;
let money = 100;
let maxMoney = 500;
let plays = 0;

const jugaRuleta = async (money, maxMoney, ruletaSize, plays) => {
    console.clear();
    console.log(`Benvingut a la ruleta! Tens ${money}€ i el teu objectiu és sortir-ne amb ${maxMoney}€ o tornar a casa amb 0€. Com? Molt fàcil. Davant teu tens una ruleta amb ${ruletaSize} números (0-${(ruletaSize-1)}). Aposta els diners al teu número de la sort i... guanya increïbles premis!
    1. Si encertes el número exacte, enduu-te la teva aposta multiplicada per x5!
    2. Si només falles d'1, guanyes els diners apostats!
    3. Si encertes si és parell o senar, et retornem els diners, ni tu ni jo. No podem ser més generosos.
    4. En la resta de casos, ens enduem la teva aposta. D'alguna cosa haig de viure jo també, no?
Apa! Ja saps com funciona. Alea jacta est.
`)
    const options = [
        {
            type: 'input',
            name: 'diners',
            message: `Tens ${money}€ després de ${plays} partides. Quants diners vols apostar?`,
            validate(value){
                if(isNaN(value)){return "M'has de dir un número."}
                else if(value>money){return "No tens tants diners!"}
                return true;
            }
        },
        {
            type: 'input',
            name: 'numero',
            message: `A quin número vols apostar aquests diners?`,
            validate(value){
                const valid = (value == Math.round(value)) && value<ruletaSize;
                return valid || `La teva aposta ha de ser un número entre 1 i ${(ruletaSize-1)}`
            }
        }
    ];
    
    return await inquirer.prompt(options)
}

const main = async (ruletaSize, money, maxMoney, plays) => {
    while(money>0 && money<1000){
        let aposta = await jugaRuleta(money, maxMoney, ruletaSize, plays);
        plays++;
        let resultatRuleta = Math.floor(Math.random()*ruletaSize);
        if(resultatRuleta === 0){
            money-=aposta.diners;
            await inquirer.prompt({type: 'input', name: 'confirm', message: `Ha sortit el 0, guanya la banca! Perds els ${aposta.diners}€ apostats.`});
        }else if(resultatRuleta == aposta.numero){
            let guanys = aposta.diners*5;
            money+=guanys;
            await inquirer.prompt({type: 'input', name: 'confirm', message: `Ha sortit el ${resultatRuleta}!!! L'has encertat! Guanyes ${guanys}€!`});
        }else if(Math.abs(resultatRuleta-aposta.numero)<2){
            money+=parseFloat(aposta.diners); //sinó em concatenava strings en aquest cas.
            await inquirer.prompt({type: 'input', name: 'confirm', message: `Ha sortit el ${resultatRuleta}! Quasi l'encertes, has fallat només d'1. Guanyes ${aposta.diners}€!`})
        }else if(resultatRuleta%2 == aposta.numero%2){
            let parellSenar = resultatRuleta%2==0 ? 'parell' : 'senar'
            await inquirer.prompt({type: 'input', name: 'confirm', message: `Ha sortit el ${resultatRuleta}! Has sortit ${parellSenar} com la teva aposta. Et retornem els diners.`})
        }else{
            money-=aposta.diners;
            await inquirer.prompt({type: 'input', name: 'confirm', message: `Ha sortit el ${resultatRuleta}! Perds els ${aposta.diners}€ apostats.`})
        }

    }
    if(money>1000){console.log(`Has guanyat el joc! Has necessitat ${plays} tirades de ruleta per fer-ho. Enhorabona m'has escurat les butxaques!`)}
    else{console.log(`Ho has perdut tot a la ruleta amb ${plays} tirades. Que tinguis més sort a la pròxima. Gràcies per jugar.`);}
}

main(ruletaSize, money, maxMoney, plays)

