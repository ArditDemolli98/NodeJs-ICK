/*
// String
// Menyrat e te shkruarit te Stringut

let day = "Thursday"; // Double Quote String
let month = 'November'; // Single Quote String
let year = `2024`; // Backtics String

let summary = 'Dita: "Day" ' + day + " Muaji " + month + " Viti " + year;
let summary2 = `Dita: "Day" 'Dicka' ${day}, Muaji: ${month}, Viti: ${year}`;

console.log(summary);
console.log(summary2);

// Let vs Const
const firstName = "Arditi";
let lastName = "Demolli";

lastName = "Demolliii";

let myName = firstName;

console.log(myName);

// Nderrimi i vlerave te dy variablave me njera-tjetren
let a = "0";
let b = "1";
let c; // Variabel ndihmese

console.log(a, b);

c = a;
a = b;
b = c;
console.log(a, b);

// Operatoret aritmetik - Arithmetical Operators
console.log(5+5) // Mbledhja
console.log(5-5) // Zbritja
console.log(5*5) // Shumezimi
console.log(5/5) // Pjestimi
console.log(7 % 4) // Mbetja

// Operatoret Aritmetik me Stringje
console.log("5" + 4) // Type Coercion - Konvertimi i tipit te dhenave ne menyre implicite
console.log("5" - "4") // Variablat konvertohen nga string ne number
console.log("5" % "4")
console.log("Ardit" - "Demolli") 
console.log(typeof NaN)

// Operatoret Krahasimorë - Comparison Operators
console.log(5 > 4);
console.log(5 < 4);
console.log(5 == "5"); // Loosly Equal
console.log(String(5) === "5"); // Strictly Equal 

// Assignmet Operator
let a = 10; // Operatori i percaktimit te vleres


// Type Conversion
console.log(typeof Number("5"));
console.log(typeof String(5));
console.log(Boolean(-5));

// Falsy Values
console.log(Boolean(0));
console.log(Boolean(NaN));
console.log(Boolean(""));
console.log(Boolean(undefined));
console.log(Boolean(null));


// If/Else Statement
const day = false;

if(day) {
    console.log("Miredita!");
} else {
    console.log("Mirembrema!");
}

const dayOfTheWeek = "Wednesday";

if(dayOfTheWeek === "Monday") {
    console.log("E Hane");
} else if(dayOfTheWeek === "Tuesday"){
    console.log("E Marte");
} else {
    console.log("Dita nuk eshte e definuar");
}
//Te krijohen kushtet per te gjitha ditet e javes

// Switch statement

const dayOfTheWeek = "Monday";

switch(dayOfTheWeek){
    case "Monday":
        console.log("E Hane");
        break;
    case "Tuesday":
        console.log("E Marte");
        break;
    case "Wednesday":
        console.log("E Merkure");
        break;
    case "Thursday":
        console.log("E Enjte");
        break;
    case "Friday":
        console.log("E Premte");
        break;
    case "Saturday":
        console.log("E Shtune");
        break;
    case "Sunday":
        console.log("E Diel");
        break;
    default:
        console.log("Dita nuk ekziston");
}
*/
// Operatoret Logjik - Logical Operators

// AND - &&
// OR - ||
// NOT - !

const hasCar = true;
const hasDrivingLicense = false;

console.log(!hasCar || hasDrivingLicense);

// Te krijohet nje if/else per rastin e mesiperm

if(hasCar && hasDrivingLicense) {
    console.log("Mund te vozisni veturen!");
} else {
    console.log("Nuk i plotesoni kushtet per te vozitur veturen!");
}