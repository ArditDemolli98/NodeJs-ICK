// 0
// null
// undefined
// NaN
// ""

/* Krijoni nje program qe tregon per nje numer se a eshte cift apo tek dhe 
    e ruan rezultatin ne nje variabel, me pas shfaqni rezultatin ne console

const vlera = 10;
let rezultati;

if(vlera % 2){
    rezultati = "Tek"
} else {
    rezultati = "Cift";
}


const rezultatiTernary = vlera % 2 ? "Tek" : "Cift";

console.log(rezultati + " pa Ternary");
console.log(rezultatiTernary + " me Ternary");
*/
/*
Steven wants to build a very simple tip calculator for whenever he goes eating
 in a resturant. In his country, it's usual to tip 15% if the bill value is 
 between 50 and 300. If the value is different, the tip is 20%.

Your task is to caluclate the tip, depending on the bill value. Create a 
variable called 'tip' for this. Print a string to the console containing the 
bill value, the tip, and the final value (bill + tip). 

Example: 'The bill was 275, the tip was 41.25, and the total value 316.25'
TEST DATA: Test for bill values 275, 40 and 430

HINT: To calculate 20% of a value, simply multiply it by 20/100 = 0.2 HINT: 
Value X is between 50 and 300, 
if it's >= 50 && <= 300 😉


const bill = 10;
let tip;

if(bill > 50 && bill < 300) {
    tip = bill * 0.15;
} else {
    tip = bill * 0.20;
}
console.log(`Fatura: ${bill}; Bakshishi: ${tip}; Totali: ${tip + bill}`);


const bill = 275;

// Ternary operator
const tip = bill > 50 && bill < 300 ? bill * 0.15 : bill * 0.2;
console.log(`Fatura: ${bill}; Bakshishi: ${tip}; Totali: ${tip + bill}`);
// String functions

const emri = "ArditArditArditArditArditArditsdasdW";

console.log(emri)
console.log(emri.toLowerCase())
console.log(emri.toUpperCase())
console.log(emri.length)
console.log(emri.charAt(4))
// Per me iu qas karakterit te fundit
console.log(emri.charAt(emri.length - 1))
console.log(emri.substring(0, 5))


// DRY - Don't repeat yourself
// Functions 

// Funksion pa parameter
function sayHello() {
    console.log("Hello there");
}

sayHello();


// Funksion me parameter

function sayHello(fullName) {
    console.log(`Hello ${fullName}`);
}
// "Everybody" ne kete rast quhet argument
sayHello("Everybody")
sayHello("Ardit")
sayHello("Ardit Demolli")


function tipCalculator(bill) {
    let tip;

    if(bill > 50 && bill < 300) {
        tip = bill * 0.15;
    } else {
        tip = bill * 0.20;
    }
    return `Fatura: ${bill}; Bakshishi: ${tip}; Totali: ${tip + bill}`;
}

const tip1 = tipCalculator(200)
console.log(tip1)
*/

/*
Krijoni nje funksion te quajtur espressoMachine i cili pranon nje parameter
size dhe e kthen nje vlere:
"s" - "Short Espresso"
"m" - "Medium Espresso"
"l" - "Large Espresso"
"d" - "Double Espresso"
"Input has to be one of: "s", "m", "l", "d"


function espressoMachine(size){
    size = size.toLowerCase(); // Data filtering
    switch(size){
        case "s":
            return "Short Espresso";
        case "m":
            return "Medium Espresso";
        case "l":
            return "Large Espresso";
        case "d":
            return "Double Espresso";
        default:
            return 'Input has to be one of: "s", "m", "l", "d"'
    }
}
const shortEspresso = espressoMachine("S");
const mediumEspresso = espressoMachine("m");
console.log(shortEspresso)
console.log(mediumEspresso)

function tipCalculator(bill) {
    let tip;
    bill = Number(bill) // Data filtering

    if(bill > 50 && bill < 300) {
        tip = bill * 0.15;
    } else {
        tip = bill * 0.20;
    }
    return `Fatura: ${bill}; Bakshishi: ${tip}; Totali: ${tip + bill}`;
}

console.log(tipCalculator("200"));

// Metodat per deklarimin e funksioneve

console.log(emriIFunksionit("Hello from function 1"))

function emriIFunksionit(parametri){
    return parametri;
}

const emriIFunksionit2 = function(parametri) {
    return parametri;
}

console.log(emriIFunksionit2("Hello from function 2"))

// Arrow function
const emriIFunksionit3 = (parametri) => parametri;

console.log(emriIFunksionit3("Hello from function 3"))
*/

const ageCalculator = (birthYear) => 2024 - birthYear;

// console.log(ageCalculator(1998))

const yearsToRetirement = (birthYear) =>{
    const age = ageCalculator(birthYear);
    return 65 - age;
}
// One liner
// const yearsToRetirement = (birthYear) => 65 - ageCalculator(birthYear);

console.log(yearsToRetirement(1998))