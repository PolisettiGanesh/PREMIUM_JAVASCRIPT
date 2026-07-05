// ============================================================
//  HOISTING & CALL STACK — DEBUGGING PRACTICE
//  Open hoisting-debug.html in Chrome → F12 → Sources tab
// ============================================================


// ============================================================
// EXAMPLE 1: var HOISTING — See undefined in debugger
// ============================================================

console.log("=== EXAMPLE 1: var Hoisting ===");

console.log("Before declaration, a =", a);   // Put breakpoint here (Line 12)
var a = 10;
console.log("After declaration, a =", a);

// WHAT TO OBSERVE IN DEBUGGER:
// → Line 12: hover over 'a' → it shows "undefined" (not error!)
// → Line 13: step over → now 'a' becomes 10
// → Line 14: hover over 'a' → it shows 10
// → This PROVES Phase 1 stored 'a' as undefined before code ran


// ============================================================
// EXAMPLE 2: FUNCTION HOISTING — Function works before declaration
// ============================================================

console.log("=== EXAMPLE 2: Function Hoisting ===");

var result = add(5, 3);                       // Put breakpoint here (Line 27)
console.log("add(5, 3) =", result);

function add(x, y) {                          // Put breakpoint here (Line 30)
    var sum = x + y;                          // Put breakpoint here (Line 31)
    return sum;                               // Put breakpoint here (Line 32)
}

// WHAT TO OBSERVE IN DEBUGGER:
// → Line 27: we call add() BEFORE its declaration — it works!
// → Step Into (F11) → jumps INTO the add function (Line 30)
// → Watch panel: x = 5, y = 3
// → Step over Line 31: sum = 8
// → Step over Line 32: return 8 → jumps back to Line 28
// → result = 8


// ============================================================
// EXAMPLE 3: CALL STACK — Watch the stack grow and shrink
// ============================================================

console.log("=== EXAMPLE 3: Call Stack ===");

function first() {                            // Put breakpoint here (Line 47)
    console.log("first() START");
    second();                                 // Put breakpoint here (Line 49)
    console.log("first() END");
}

function second() {                           // Put breakpoint here (Line 52)
    console.log("second() START");
    third();                                  // Put breakpoint here (Line 54)
    console.log("second() END");
}

function third() {                            // Put breakpoint here (Line 57)
    console.log("third() runs");              // Put breakpoint here (Line 58)
}

first();                                      // Put breakpoint here (Line 61)

// WHAT TO OBSERVE IN DEBUGGER:
//
// Step through with F11 (Step Into) and watch the CALL STACK panel:
//
// Line 61: first() called
//   Call Stack: [ (anonymous) → first ]
//
// Line 49: second() called inside first()
//   Call Stack: [ (anonymous) → first → second ]
//
// Line 54: third() called inside second()
//   Call Stack: [ (anonymous) → first → second → third ]
//
// Line 58: third() finishes
//   Call Stack: [ (anonymous) → first → second ]  ← third popped off!
//
// second() finishes
//   Call Stack: [ (anonymous) → first ]            ← second popped off!
//
// first() finishes
//   Call Stack: [ (anonymous) ]                    ← first popped off!


// ============================================================
// EXAMPLE 4: SCOPE — var leaks, let stays
// ============================================================

console.log("=== EXAMPLE 4: Scope ===");

if (true) {
    var leaked = "I escaped the if block!";   // Put breakpoint here (Line 88)
    let stayed = "I stayed inside!";          // Put breakpoint here (Line 89)
    console.log("Inside block - leaked:", leaked);
    console.log("Inside block - stayed:", stayed);
}

console.log("Outside block - leaked:", leaked);  // Put breakpoint here (Line 93)
// console.log("Outside block - stayed:", stayed); // Uncomment to see ReferenceError

// WHAT TO OBSERVE IN DEBUGGER:
// → Line 88-89: both variables exist inside the block
// → Step to Line 93: 'leaked' still exists! (var escapes)
// → If you uncomment Line 94: 'stayed' will throw ReferenceError (let is block-scoped)
// → Check Scope panel on the right: you'll see "Block" scope vs "Script" scope


// ============================================================
// EXAMPLE 5: FUNCTION EXECUTION CONTEXT — Watch memory change
// ============================================================

console.log("=== EXAMPLE 5: Function Execution Context ===");

var globalVar = "I am global";               // Put breakpoint here (Line 105)

function multiply(a, b) {                    // Put breakpoint here (Line 107)
    var localResult = a * b;                 // Put breakpoint here (Line 108)
    console.log("globalVar inside fn:", globalVar);
    return localResult;                      // Put breakpoint here (Line 110)
}

var answer = multiply(6, 7);                 // Put breakpoint here (Line 112)
console.log("answer:", answer);

// WHAT TO OBSERVE IN DEBUGGER:
// → Line 112: Step Into (F11) → enters multiply function
// → Check SCOPE panel on the right side:
//   → "Local" section: a = 6, b = 7, localResult = undefined (Phase 1!)
//   → "Global" section: globalVar = "I am global"
// → Step to Line 108: localResult changes from undefined → 42
// → Step to Line 110: return 42
// → Back to Line 113: answer = 42
// → SCOPE panel: "Local" section disappears (function context destroyed!)


// ============================================================
// EXAMPLE 6: THE CLASSIC INTERVIEW TRAP — var shadowing
// ============================================================

console.log("=== EXAMPLE 6: var Shadowing (Interview Trap) ===");

var x = 1;

function test() {
    console.log("x inside test (before var):", x);   // Put breakpoint here (Line 131)
    var x = 2;                                        // Put breakpoint here (Line 132)
    console.log("x inside test (after var):", x);     // Put breakpoint here (Line 133)
}

test();                                               // Put breakpoint here (Line 135)
console.log("x in global:", x);

// WHAT TO OBSERVE IN DEBUGGER:
// → Line 135: Step Into test()
// → Line 131: hover over x → it's UNDEFINED (not 1!)
//   → Why? The local 'var x = 2' was hoisted inside test()
//   → Local x shadows global x
//   → Check SCOPE panel: Local section has x = undefined
//   → Global section has x = 1 (but function doesn't see it)
// → Line 132: x becomes 2
// → Line 133: x is 2
// → Line 136: back to global → x is 1 (global was never changed)


// ============================================================
// EXAMPLE 7: HOISTING ORDER — var vs function same name
// ============================================================

console.log("=== EXAMPLE 7: var vs function Same Name ===");

console.log("foo before everything:", typeof foo);    // Put breakpoint here (Line 152)

var foo = "I am a string";                            // Put breakpoint here (Line 154)

function foo() {                                      // Put breakpoint here (Line 156)
    return "I am a function";
}

console.log("foo after everything:", foo);             // Put breakpoint here (Line 159)

// WHAT TO OBSERVE IN DEBUGGER:
// → Line 152: typeof foo → "function" (function wins in Phase 1!)
// → Line 154: foo = "I am a string" (var assignment overwrites in Phase 2)
// → Line 159: foo is "I am a string"


// ============================================================
// EXAMPLE 8: LOOP + setTimeout — var vs let
// ============================================================

console.log("=== EXAMPLE 8: Loop + setTimeout ===");

console.log("With var:");
for (var i = 0; i < 3; i++) {                        // Put breakpoint here (Line 171)
    setTimeout(function() {
        console.log("var i =", i);                    // Put breakpoint here (Line 173)
    }, 2000);
}

console.log("With let:");
for (let j = 0; j < 3; j++) {                        // Put breakpoint here (Line 178)
    setTimeout(function() {
        console.log("let j =", j);                    // Put breakpoint here (Line 180)
    }, 3000);
}

// WHAT TO OBSERVE IN DEBUGGER:
// → The var loop runs immediately (i goes 0,1,2,3)
// → The let loop runs immediately (j goes 0,1,2)
// → Wait 2 seconds: var callbacks fire → all print 3 (shared i!)
// → Wait 3 seconds: let callbacks fire → print 0, 1, 2 (separate j!)
// → Check Scope panel on Line 173: only one 'i' exists (global)
// → Check Scope panel on Line 180: 'j' is in "Block" scope (unique per iteration)


console.log("=== ALL EXAMPLES COMPLETE ===");
console.log("Check the console output and use the debugger to explore!");
