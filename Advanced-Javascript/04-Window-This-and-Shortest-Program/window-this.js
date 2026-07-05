// ============================================================
//  WINDOW, THIS & SHORTEST PROGRAM — DEBUG PRACTICE
//  Open window-this.html in Chrome → F12 → Sources tab
// ============================================================


// ============================================================
// EXAMPLE 1: THE SHORTEST PROGRAM — Even before this line,
//            window and this already exist!
// ============================================================

debugger;  // ← Pauses automatically! No need to set breakpoint.
           //   Check SCOPE panel → Global → expand → see window
           //   Check: this === window → true
           //   YOU WROTE NOTHING YET. But window and this exist!


// ============================================================
// EXAMPLE 2: var goes on window, let/const do NOT
// ============================================================

var iAmVar = "I live on window";
let iAmLet = "I do NOT live on window";
const iAmConst = "I also do NOT live on window";

debugger;  // PAUSE: Check SCOPE panel:
           //   Global → iAmVar = "I live on window" ← var IS here
           //   Script → iAmLet = "..." , iAmConst = "..." ← let/const are HERE
           //
           // Now type in Console:
           //   window.iAmVar    → "I live on window"
           //   window.iAmLet    → undefined
           //   window.iAmConst  → undefined

console.log("=== var vs let/const on window ===");
console.log("window.iAmVar:", window.iAmVar);       // "I live on window"
console.log("window.iAmLet:", window.iAmLet);       // undefined
console.log("window.iAmConst:", window.iAmConst);   // undefined


// ============================================================
// EXAMPLE 3: this === window in global scope
// ============================================================

console.log("=== this in global scope ===");
console.log("this === window:", this === window);    // true

debugger;  // PAUSE: Hover over 'this' in the code → you'll see the window object
           // Type in Console: this === window → true
           // Type in Console: this.iAmVar → "I live on window"
           // Type in Console: this.iAmLet → undefined (let not on window!)


// ============================================================
// EXAMPLE 4: Function declarations go on window too
// ============================================================

function globalFunction() {
    return "I am a global function";
}

debugger;  // PAUSE: Type in Console:
           //   window.globalFunction    → shows the function
           //   window.globalFunction()  → "I am a global function"
           //   typeof window.globalFunction → "function"

console.log("=== function on window ===");
console.log("window.globalFunction:", typeof window.globalFunction);  // "function"


// ============================================================
// EXAMPLE 5: "this" inside an Object Method
// ============================================================

console.log("=== this inside object method ===");

var car = {
    brand: "Toyota",
    year: 2024,
    describe: function() {
        debugger;  // PAUSE HERE!
                   // Check SCOPE → Local:
                   //   this = { brand: "Toyota", year: 2024, describe: f }
                   //   this is the 'car' object, NOT window!
                   //
                   // Hover over 'this' → tooltip shows the car object
                   //
                   // WHY? Because we called: car.describe()
                   //   ↑ object before the dot = this

        console.log("this inside car.describe():", this);
        console.log("this.brand:", this.brand);    // "Toyota"
        console.log("this.year:", this.year);      // 2024
    }
};

car.describe();  // calling with dot → this = car


// ============================================================
// EXAMPLE 6: "this" inside a standalone function
// ============================================================

console.log("=== this inside standalone function ===");

function standalone() {
    debugger;  // PAUSE HERE!
               // Check SCOPE → Local:
               //   this = Window object!
               //
               // WHY? Because we called: standalone()
               //   ↑ no object before it, no dot → this = window

    console.log("this inside standalone():", this);
    console.log("this === window:", this === window);  // true
}

standalone();  // calling without dot → this = window


// ============================================================
// EXAMPLE 7: SAME function, DIFFERENT this (depends on HOW you call)
// ============================================================

console.log("=== same function, different this ===");

function showName() {
    debugger;  // PAUSE: Each time this hits, check what 'this' is!
               // 1st hit: this = window (standalone call)
               // 2nd hit: this = dog object
               // 3rd hit: this = cat object

    console.log("this.name =", this.name);
}

var dog = { name: "Buddy", show: showName };
var cat = { name: "Whiskers", show: showName };

showName();     // standalone → this = window → this.name = "" (window.name)
dog.show();     // dog.show() → this = dog → this.name = "Buddy"
cat.show();     // cat.show() → this = cat → this.name = "Whiskers"


// ============================================================
// EXAMPLE 8: The Nested Function Trap
// ============================================================

console.log("=== nested function trap ===");

var person = {
    name: "Alex",
    greet: function() {
        console.log("Outer this.name:", this.name);  // "Alex"

        debugger;  // PAUSE: this = person object ✅
                   // Check SCOPE → Local → this = { name: "Alex", ... }

        function inner() {
            debugger;  // PAUSE: this = window! ❌
                       // Check SCOPE → Local → this = Window
                       // Inner function called standalone → this = window

            console.log("Inner this.name:", this.name);  // "" (window.name)
        }

        inner();  // standalone call → this = window, NOT person!

        // Arrow function solution:
        var innerArrow = () => {
            debugger;  // PAUSE: this = person object ✅
                       // Arrow functions inherit this from outer scope!
                       // Check SCOPE → this = { name: "Alex", ... }

            console.log("Arrow this.name:", this.name);  // "Alex" ✅
        };

        innerArrow();
    }
};

person.greet();


// ============================================================
// EXAMPLE 9: Losing "this" when extracting a method
// ============================================================

console.log("=== losing this ===");

var user = {
    name: "John",
    sayHi: function() {
        debugger;  // Check what 'this' is each time this hits

        console.log("Hi, I am", this.name);
    }
};

user.sayHi();        // this = user → "Hi, I am John"

var extracted = user.sayHi;  // just copying the function reference
extracted();                  // this = window → "Hi, I am " (window.name = "")

// WHY?
// user.sayHi()  → called with dot → this = user
// extracted()   → called without dot → this = window
// The function is the SAME, but how you call it changes 'this'


console.log("=== ALL EXAMPLES COMPLETE ===");
console.log("Go back and step through each debugger; statement!");
