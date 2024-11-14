// Arrays
/*
Arrays jane struktura te te dhenave qe na mundesojne te ruajme nje 
grumbull/koleksion te te dhenave
*/
/*
const fruit1 = "Strawberry";
const fruit2 = "Apple";
const fruit3 = "Orange";
const fruit4 = "Peach";

// console.log(fruit1);

const fruits = ["Strawberry", "Apple", "Orange", "Peach"];

console.log(fruits);
console.log(fruits[3]);

// Metodat e array
console.log(fruits.length)
console.log(fruits[fruits.length - 1])

// Metodat per shtimin e elementeve ne nje array
fruits.push("Pineapple"); // Shton elementin ne fund te arrayt
fruits.unshift("Lemon"); // Shton elementin ne fillim te arrayt

console.log(fruits);

// Metodat per largimin e elementeve ne nje array
fruits.shift(); // Largon elementin e pare nga nje array
fruits.pop();   // Largon elementin e fundit nga nje array

console.log(fruits);

console.log(fruits.includes("Lemon")) // Per me e shiku a ekziston ky element ne array


console.log(fruits.indexOf("Orange")) // Per me e dit sa e ka indexin nje element


Can you find the needle in the haystack?

Write a function findNeedle() that takes an array full of junk but contains 
one "needle".
After your function finds the needle it should return a message (as a string)
 that says: 
"found the needle at position " plus the index it found the needle.

Test Case(Input --> Output)  
["hay", "junk", "hay", "hay", "more junk", "needle", "random junk"] 
--> "found the needle at position 5"

const junk = ["hay", "junk", "hay", "hay", "needle", "more junk", "random junk"];

// const findNeedle = arr => `Found the needle at position ${arr.indexOf("needle")}`
function findNeedle(arr){
    if(arr.includes("needle")) {
        return `Found the needle at position ${arr.indexOf("needle")}`
    } else{
        return "There is no needle in this haystack";
    }
} 
console.log(findNeedle(junk))

// Mund te ruajme vlera te tipeve te ndryshme me nje array
const mixedArray = [1, "Hello", undefined, null, true, NaN];
// console.log(mixedArray);

console.log(findNeedle(mixedArray));


// Objects

const personArr = [
      "Filan",
      "Fisteku",
      30, 
      "German", 
      ["France", ["Paris", "London"],"England"]
    ];
console.log(personArr[4][1][1]);

const personObj = {
    firstName: "Filan",
    lastName: "Fisteku",
    age: 30,
    nationality: "German",
    visitedPlaces: ["England", "France"],

    eat: function(){
        return `${this.firstName} ${this.lastName} is eating!`;
    }
}

console.log(personObj.firstName)
console.log(personObj.lastName)
console.log(personObj["age"])

// Rast perdorimi per menyren obj[]
function logProperty(prop) {
    console.log(personObj[prop]);
}

logProperty("visitedPlaces")

// Krijoni nje variabel summary qe mbane vleren:
// Filan Fisteku eshte 30 vjeqar me nacionalitet German dhe ka vizituar keto
// vende: France, England

const summary = `${personObj.firstName} ${personObj.lastName} eshte ${personObj.age} vjeqar me nacionalitet ${personObj.nationality} dhe ka vizituar keto vende ${personObj.visitedPlaces}`
console.log(summary);

console.log(personObj.eat());

// coffeMachine
// brand = Gaggia
// model = Classic Pro
// color = White

// makeEspresso
// coffeMachine.about() -> This is a White Gaggia Classic Pro


const coffeMachine = {
    brand: "Gaggia",
    model: "Classic Pro",
    color: "white",

    about: function(){
        return `This is a ${this.color} ${this.brand} ${this.model}`;
    },

    espressoMachine: function(size){
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
}

console.log(coffeMachine.about())


// Loops

// console.log(1)
// console.log(2)
// console.log(3)
// console.log(4)
// console.log(5)

// let x = 1;
// console.log(x--); // Decrement - e zvogelon vleren per 1 
// console.log(x++); // Increment - e rrit vleren per 1
// console.log(x);

// i += 2 eshte ekuivalente me i = i + 2

const arr = ["hay", "junk", "hay", "hay", "more junk", "needle", "random junk"]; 

// console.log(arr[0])
// console.log(arr[1])
// console.log(arr[2])
// console.log(arr[3])
// console.log(arr[4])
// console.log(arr[5])
// console.log(arr[6])


// for(let i = 10; i > arr.length; ++i){
//     console.log(i)
// }

const numbersArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                  //0, 4, 2, 6, 4, 8, 6, 10, 8, 12

for(let i = 0; i < numbersArr.length; i++) {
    if(numbersArr[i] % 2 === 0){
        console.log(numbersArr[i] + 2);
    } else {
        console.log(numbersArr[i] - 1);
    }
}
*/
const numbersArr = ["a", "b", "c", "d", "e"];

for(let i = 0; i <= 10; i++){
    if(i % 2 !== 0) continue;
    console.log(i)
}