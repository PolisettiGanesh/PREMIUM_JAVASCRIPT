# HOISTING — THE COMPLETE STORY

---

# Why Are We Learning This?

→ You just learned how JavaScript works — GEC, two phases, memory, code, call stack.

→ Hoisting is the DIRECT consequence of that knowledge.

→ If you understood the two phases (Memory Creation → Code Execution), hoisting will make perfect sense.

→ If you didn't, hoisting will feel like magic, and you'll memorize rules instead of understanding them.

→ Let's make sure you UNDERSTAND it, not memorize it.

---

---

# CHAPTER 1: WHAT IS HOISTING?

---

## The Mysterious Behavior

→ Look at this code carefully:

```js
console.log(age);
var age = 25;
```

→ You're using `age` BEFORE you created it.

→ In any logical world, this should crash. Error. Done.

→ But in JavaScript:

```text
Output: undefined
```

→ No error. No crash. Just `undefined`.

→ How? WHY?

---

## Another Example — Even More Surprising

```js
greet();

function greet() {
    console.log("Hello!");
}
```

→ You're CALLING a function BEFORE you defined it.

→ Output:

```text
Hello!
```

→ It works perfectly. As if the function existed before its own declaration.

→ What kind of sorcery is this?

---

## The Word "Hoisting"

→ "Hoist" means to **lift something up** — like hoisting a flag to the top of a pole.

→ Many tutorials say: "JavaScript moves your declarations to the top of the file."

→ **This is WRONG.**

→ JavaScript does NOT move any code anywhere.

→ No line of code changes position. Nothing is rearranged.

→ So what actually happens?

---

## The Real Answer

→ You already know it from Chapter 4 of "How JavaScript Works."

→ JavaScript executes code in **TWO PHASES**.

→ **Phase 1 (Memory Creation):** The engine scans the entire code and allocates memory for all variables and functions BEFORE executing anything.

→ **Phase 2 (Code Execution):** The engine runs the code line by line.

→ Hoisting is NOT the engine moving code.

→ Hoisting is the RESULT of Phase 1 putting things in memory before Phase 2 runs the code.

→ By the time any code executes, variables and functions already exist in memory.

→ That's it. That's the whole secret.

---

---

# CHAPTER 2: HOW var HOISTING WORKS — DEEP DIVE

---

## The Code

```js
console.log(a);
console.log(b);
var a = 10;
var b = "hello";
console.log(a);
console.log(b);
```

---

## Phase 1: Memory Creation (Before ANY code runs)

→ Engine scans the entire file. Finds `var a` and `var b`.

→ Stores them in memory with the value `undefined`.

```text
┌─────────────────────────────────┐
│   MEMORY (After Phase 1)        │
│                                 │
│   a  →  undefined               │
│   b  →  undefined               │
│                                 │
│   (NOT 10, NOT "hello")         │
│   (just undefined)              │
└─────────────────────────────────┘
```

→ Notice: the VALUES (10, "hello") are NOT stored yet.

→ Only the NAMES are registered. Values come later in Phase 2.

→ This is the key insight. Phase 1 sees `var a = 10` and does:

```text
Phase 1 reads:  var a = 10;
Phase 1 does:   store a → undefined
Phase 1 ignores: = 10  (the assignment is for Phase 2)
```

→ Phase 1 only cares about the LEFT side of `=`. Not the right side.

---

## Phase 2: Code Execution (Line by Line)

```text
Line 1: console.log(a);
→ Look up 'a' in memory → found → value is undefined
→ Output: undefined

Line 2: console.log(b);
→ Look up 'b' in memory → found → value is undefined
→ Output: undefined

Line 3: var a = 10;
→ a already exists in memory (from Phase 1)
→ Now assign the value: a = 10
→ Memory updated: a → 10

Line 4: var b = "hello";
→ b already exists in memory (from Phase 1)
→ Now assign the value: b = "hello"
→ Memory updated: b → "hello"

Line 5: console.log(a);
→ Look up 'a' in memory → found → value is 10
→ Output: 10

Line 6: console.log(b);
→ Look up 'b' in memory → found → value is "hello"
→ Output: hello
```

---

## Final Output

```text
undefined
undefined
10
hello
```

---

## Visual Timeline

```text
                PHASE 1                    PHASE 2
                (Memory)                   (Execution)
                                     
var a           a → undefined              
var b           b → undefined              
                                     Line 1: console.log(a) → undefined
                                     Line 2: console.log(b) → undefined
                                     Line 3: a = 10
                                     Line 4: b = "hello"
                                     Line 5: console.log(a) → 10
                                     Line 6: console.log(b) → "hello"
```

---

## What People THINK Happens (The Wrong Mental Model)

→ Many tutorials teach that JavaScript "rearranges" your code like this:

```js
// They say JS converts your code to:
var a;              // "moved" to top
var b;              // "moved" to top
console.log(a);     // undefined
console.log(b);     // undefined
a = 10;             // assignment stays
b = "hello";        // assignment stays
console.log(a);     // 10
console.log(b);     // "hello"
```

→ The OUTPUT is the same, so this mental model "works."

→ But the code is NOT actually rearranged.

→ The real reason is the two-phase execution model.

→ The "moving to the top" explanation breaks down in complex scenarios.

→ Understanding the real mechanism helps you reason about edge cases.

---

---

# CHAPTER 3: HOW FUNCTION HOISTING WORKS — DEEP DIVE

---

## Functions Are Treated DIFFERENTLY Than Variables

→ When Phase 1 encounters a `var` variable → stores `undefined`.

→ When Phase 1 encounters a `function declaration` → stores the **ENTIRE function body**.

→ This is the critical difference.

---

## The Code

```js
greet();

function greet() {
    console.log("Hello, World!");
}
```

---

## Phase 1: Memory Creation

```text
┌─────────────────────────────────────┐
│   MEMORY (After Phase 1)            │
│                                     │
│   greet  →  function greet() {      │
│               console.log("...");   │
│             }                       │
│                                     │
│   (The ENTIRE function is stored!)  │
│   (NOT undefined like variables!)   │
│                                     │
└─────────────────────────────────────┘
```

→ The function is stored **completely** — name, parameters, body, everything.

→ It's ready to be called from the very first line of execution.

---

## Phase 2: Code Execution

```text
Line 1: greet();
→ Look up 'greet' in memory → found → it's a complete function
→ Call the function
→ Output: "Hello, World!"

Lines 3-5: function greet() {...}
→ Already stored in Phase 1 → SKIP
```

→ Output:

```text
Hello, World!
```

→ It works because the function was fully loaded into memory during Phase 1.

---

## Why This Matters — var vs function in Phase 1

```text
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   What Phase 1 does:                                         │
│                                                              │
│   DECLARATION TYPE          │  WHAT IS STORED IN MEMORY     │
│   ──────────────────────────│──────────────────────────────  │
│   var x = 10;               │  x → undefined                │
│   let y = 20;               │  y → (TDZ, can't access)      │
│   const z = 30;             │  z → (TDZ, can't access)      │
│   function foo() {...}      │  foo → entire function body    │
│   var bar = function(){..}  │  bar → undefined  (NOT the fn!)│
│   var baz = () => {...}     │  baz → undefined  (NOT the fn!)│
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

→ Only `function declarations` (the `function` keyword at the start) get fully hoisted.

→ Function expressions and arrow functions are treated as `var` variables.

→ This leads to important differences (covered next).

---

---

# CHAPTER 4: FUNCTION DECLARATION vs FUNCTION EXPRESSION HOISTING

---

## The Three Ways to Create Functions

```js
// 1. Function Declaration
function add(a, b) {
    return a + b;
}

// 2. Function Expression (stored in a variable)
var multiply = function(a, b) {
    return a * b;
};

// 3. Arrow Function (stored in a variable)
var divide = (a, b) => {
    return a / b;
};
```

→ These three look similar, but hoisting treats them VERY differently.

---

## Test: Call All Three BEFORE Their Declaration

```js
console.log(add(2, 3));
console.log(multiply(2, 3));
console.log(divide(6, 3));

function add(a, b) {
    return a + b;
}

var multiply = function(a, b) {
    return a * b;
};

var divide = (a, b) => {
    return a / b;
};
```

---

## Phase 1: Memory Creation

```text
┌──────────────────────────────────────────────┐
│   MEMORY (After Phase 1)                     │
│                                              │
│   add      →  function add(a,b){return a+b}  │
│               (ENTIRE function stored!)      │
│                                              │
│   multiply →  undefined                      │
│               (it's a var! NOT the function) │
│                                              │
│   divide   →  undefined                      │
│               (it's a var! NOT the function) │
│                                              │
└──────────────────────────────────────────────┘
```

---

## Phase 2: Code Execution

```text
Line 1: add(2, 3)
→ 'add' is a complete function → call it → returns 5
→ Output: 5  ✅

Line 2: multiply(2, 3)
→ 'multiply' is undefined (not a function yet!)
→ ERROR: multiply is not a function  ❌

Line 3: divide(6, 3)
→ 'divide' is undefined (not a function yet!)
→ ERROR: divide is not a function  ❌
```

→ The program crashes at Line 2 and never reaches Line 3.

---

## The Rule

```text
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│   Function DECLARATION        →  FULLY hoisted (entire body)  │
│   function foo() {...}           Can call before declaration   │
│                                                                │
│   Function EXPRESSION         →  Only var name is hoisted     │
│   var foo = function() {...}     Name is undefined, NOT the fn │
│                                  Calling it = TypeError        │
│                                                                │
│   Arrow FUNCTION              →  Only var name is hoisted     │
│   var foo = () => {...}          Same as expression — undefined│
│                                  Calling it = TypeError        │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## Visual Comparison

```text
BEFORE DECLARATION LINE:

function add() {...}          →  ✅ works! (fully stored in memory)
var multiply = function(){}   →  ❌ TypeError (multiply is undefined)
var divide = () => {}         →  ❌ TypeError (divide is undefined)
const greet = function(){}    →  ❌ ReferenceError (TDZ — can't access)
let hello = () => {}          →  ❌ ReferenceError (TDZ — can't access)
```

→ With `let`/`const` it's even stricter — not `undefined`, but a hard ReferenceError.

---

---

# CHAPTER 5: let AND const HOISTING — THE TEMPORAL DEAD ZONE (TDZ)

---

## The Myth

→ "let and const are not hoisted."

→ **This is WRONG.**

→ `let` and `const` ARE hoisted. They ARE placed in memory during Phase 1.

→ But they are placed in a special state called the **Temporal Dead Zone (TDZ)**.

→ In TDZ, the variable EXISTS in memory but CANNOT be accessed.

→ Any attempt to access it before the declaration line → **ReferenceError**.

---

## Proof That let IS Hoisted

```js
let x = 10;

{
    console.log(x);   // What do you expect?
    let x = 20;
}
```

→ If `let` was NOT hoisted, Line 3 would print `10` (from the outer `x`).

→ But instead:

```text
ReferenceError: Cannot access 'x' before initialization
```

→ The inner `let x = 20` WAS hoisted — JavaScript KNOWS there's a local `x` in this block.

→ It doesn't fall back to the outer `x`. It says "this `x` exists but you can't touch it yet."

→ This proves hoisting happened. The variable was registered in Phase 1.

→ But it's in TDZ — inaccessible until the declaration line.

---

## The Temporal Dead Zone Explained

→ TDZ is the time period between:
→ The START of the block (where the variable is hoisted to)
→ The LINE where the variable is declared

→ During this period, the variable is "dead" — it exists but cannot be used.

```text
{
    // ─── TDZ for 'name' STARTS here ───
    //
    // name exists in memory (hoisted)
    // but accessing it = ReferenceError
    //
    console.log(name);   // ❌ ReferenceError
    //
    // ─── TDZ for 'name' ENDS here ───
    let name = "Alex";   // NOW it's alive and accessible
    //
    console.log(name);   // ✅ "Alex"
}
```

---

## Visual: var vs let vs const in Phase 1

```text
WHAT HAPPENS IN PHASE 1 (Memory Creation):

┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   var age = 25;                                                 │
│   ┌──────────────────────────────────────────────────┐          │
│   │  Phase 1: age → undefined                        │          │
│   │  Status:  ACCESSIBLE (gives undefined)           │          │
│   │  Color:   🟡 Yellow — exists but no real value   │          │
│   └──────────────────────────────────────────────────┘          │
│                                                                 │
│   let name = "Alex";                                            │
│   ┌──────────────────────────────────────────────────┐          │
│   │  Phase 1: name → <TDZ>                           │          │
│   │  Status:  NOT ACCESSIBLE (ReferenceError)        │          │
│   │  Color:   🔴 Red — exists but completely blocked │          │
│   └──────────────────────────────────────────────────┘          │
│                                                                 │
│   const PI = 3.14;                                              │
│   ┌──────────────────────────────────────────────────┐          │
│   │  Phase 1: PI → <TDZ>                             │          │
│   │  Status:  NOT ACCESSIBLE (ReferenceError)        │          │
│   │  Color:   🔴 Red — exists but completely blocked │          │
│   └──────────────────────────────────────────────────┘          │
│                                                                 │
│   function greet() {...}                                        │
│   ┌──────────────────────────────────────────────────┐          │
│   │  Phase 1: greet → full function body stored      │          │
│   │  Status:  FULLY ACCESSIBLE (can call immediately)│          │
│   │  Color:   🟢 Green — ready to use                │          │
│   └──────────────────────────────────────────────────┘          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Comparison: Accessing Before Declaration

```js
// TEST 1: var
console.log(a);    // undefined (no crash)
var a = 10;

// TEST 2: let
console.log(b);    // ReferenceError: Cannot access 'b' before initialization
let b = 20;

// TEST 3: const
console.log(c);    // ReferenceError: Cannot access 'c' before initialization
const c = 30;

// TEST 4: function declaration
greet();           // "Hello!" (works perfectly)
function greet() { console.log("Hello!"); }

// TEST 5: undeclared variable (never declared anywhere)
console.log(d);    // ReferenceError: d is not defined
```

→ Notice the ERROR MESSAGES are different:

```text
let/const before declaration:
→ "Cannot access 'b' before initialization"
→ (It EXISTS but is in TDZ)

Never declared at all:
→ "d is not defined"
→ (It does NOT exist in memory at all)
```

→ These are two DIFFERENT errors. This proves `let`/`const` ARE hoisted (they exist), they're just blocked.

---

---

# CHAPTER 6: HOISTING IN REAL SCENARIOS — TRICKY EXAMPLES

---

## Scenario 1: var Inside an if Block

```js
console.log(x);

if (true) {
    var x = 100;
}

console.log(x);
```

### Phase 1:

→ Engine scans. Finds `var x`. Stores `x → undefined`.

→ `var` is function-scoped (or global if no function). The `if` block doesn't matter.

### Phase 2:

```text
Line 1: console.log(x)  → undefined (x exists from Phase 1)
Line 3-5: if (true) → enters block → x = 100
Line 7: console.log(x)  → 100
```

### Output:

```text
undefined
100
```

→ `var` ignores the `if` block. It's hoisted to the global scope.

---

## Scenario 2: let Inside an if Block

```js
console.log(x);

if (true) {
    let x = 100;
    console.log(x);
}

console.log(x);
```

### What Happens:

```text
Line 1: console.log(x)
→ Is there a global 'x'? NO.
→ ReferenceError: x is not defined
```

→ Program crashes at Line 1.

→ `let x = 100` is scoped INSIDE the `if` block. It doesn't exist outside.

→ There is no global `x` at all.

---

## Scenario 3: Function and Variable with the Same Name

```js
console.log(foo);

var foo = "hello";

function foo() {
    console.log("I am foo function");
}

console.log(foo);
```

### Phase 1:

→ Engine finds `var foo` → stores `foo → undefined`

→ Engine finds `function foo()` → stores `foo → entire function`

→ The function OVERWRITES the `undefined` because function declarations take priority.

```text
Memory after Phase 1:
foo → function foo() { console.log("I am foo function"); }
```

### Phase 2:

```text
Line 1: console.log(foo)
→ foo is the function → prints: [Function: foo]

Line 3: var foo = "hello"
→ foo was the function → now foo = "hello" (overwritten by assignment)

Lines 5-7: function foo() {...}
→ Already stored in Phase 1 → SKIP

Line 9: console.log(foo)
→ foo is "hello" → prints: hello
```

### Output:

```text
[Function: foo]
hello
```

### The Rule:

```text
When var and function have the SAME name:
→ Phase 1: function wins (stored as function, not undefined)
→ Phase 2: var assignment overwrites (assignment always runs in Phase 2)
```

---

## Scenario 4: Two Functions with the Same Name

```js
greet();

function greet() {
    console.log("First greet");
}

function greet() {
    console.log("Second greet");
}
```

### Phase 1:

→ Engine finds first `function greet()` → stores it.

→ Engine finds second `function greet()` → OVERWRITES the first.

→ Last function declaration wins.

```text
Memory after Phase 1:
greet → function greet() { console.log("Second greet"); }
```

### Phase 2:

```text
Line 1: greet() → calls the function → "Second greet"
```

### Output:

```text
Second greet
```

### The Rule:

```text
When two function declarations have the same name:
→ The LAST one in the code wins (overwrites the previous)
→ This happens in Phase 1 itself
```

---

## Scenario 5: Hoisting Inside a Function

```js
function outer() {
    console.log(a);
    var a = 50;
    console.log(a);
}

outer();
console.log(a);
```

### What Happens:

→ `outer()` is called → new Function Execution Context created.

→ Inside that context, Phase 1 runs → finds `var a` → stores `a → undefined`.

→ Phase 2 runs:

```text
console.log(a) → undefined
a = 50
console.log(a) → 50
```

→ After `outer()` finishes → context destroyed → `a` no longer exists.

→ `console.log(a)` in global scope → ReferenceError: a is not defined.

### Output:

```text
undefined
50
ReferenceError: a is not defined
```

→ Hoisting is SCOPED. Variables are hoisted within their OWN execution context.

→ `var a` inside a function is hoisted to the top of THAT function, not to the global scope.

---

## Scenario 6: The Classic Interview Trap

```js
var x = 1;

function test() {
    console.log(x);
    var x = 2;
    console.log(x);
}

test();
```

→ Most people expect Line 4 to print `1` (the global `x`).

→ But the answer is:

```text
undefined
2
```

→ WHY?

→ When `test()` is called → new execution context → Phase 1 scans for `var` inside the function.

→ Phase 1 finds `var x = 2` → stores `x → undefined` in the LOCAL memory.

→ Now the function has its OWN `x`. It shadows (hides) the global `x`.

→ Line 4: looks up `x` → finds LOCAL `x` → it's `undefined` (not yet assigned).

→ Line 5: `x = 2` → now local `x` is 2.

→ Line 6: `console.log(x)` → prints `2`.

```text
┌────────────────────────────────────────────┐
│  GLOBAL MEMORY:  x = 1                    │
│                                            │
│  ┌────────────────────────────────────┐    │
│  │  test() LOCAL MEMORY:             │    │
│  │  x → undefined (Phase 1)         │    │
│  │                                    │    │
│  │  console.log(x) → undefined      │    │
│  │  x = 2                           │    │
│  │  console.log(x) → 2             │    │
│  │                                    │    │
│  │  (local x SHADOWS global x)      │    │
│  └────────────────────────────────────┘    │
│                                            │
└────────────────────────────────────────────┘
```

→ This is the most common interview trick question on hoisting.

---

## Scenario 7: let in a Loop

```js
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 1000);
}
```

→ Output (after 1 second):

```text
0
1
2
```

→ Each iteration of the loop creates a NEW block scope.

→ Each block scope has its OWN `i` (fresh copy).

→ Each `setTimeout` captures its own `i`.

Now with `var`:

```js
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 1000);
}
```

→ Output:

```text
3
3
3
```

→ `var` is function/global scoped. There's only ONE `i`.

→ By the time `setTimeout` fires, the loop is done and `i = 3`.

→ All three callbacks share the same `i`.

```text
let in loop:
┌──────────┐  ┌──────────┐  ┌──────────┐
│ i = 0    │  │ i = 1    │  │ i = 2    │   ← 3 separate copies
│ (own)    │  │ (own)    │  │ (own)    │
└──────────┘  └──────────┘  └──────────┘

var in loop:
┌──────────────────────────────────────┐
│              i = 3                   │   ← 1 shared variable
│  (shared by all 3 iterations)       │
└──────────────────────────────────────┘
```

---

---

# CHAPTER 7: HOISTING IN TYPESCRIPT — WHAT CHANGES?

---

## TypeScript Uses let and const by Default

→ In TypeScript, you should NEVER use `var`.

→ You use `let` and `const`.

→ Both have TDZ behavior.

→ So most `var` hoisting issues simply DON'T EXIST in TypeScript.

---

## TypeScript Catches Hoisting Bugs at Compile Time

```ts
console.log(name);
let name: string = "Alex";
```

→ In JavaScript, you'd get a runtime ReferenceError.

→ In TypeScript, you get a **compile-time error** BEFORE running:

```text
error TS2448: Block-scoped variable 'name' used before its declaration.
```

→ You see the error in VS Code immediately (red underline).

→ You fix it before the code ever runs.

→ This is TypeScript protecting you from hoisting bugs.

---

## TypeScript Still Allows Function Declaration Hoisting

```ts
greet();

function greet(): void {
    console.log("Hello!");
}
```

→ This works in TypeScript. Function declarations are still fully hoisted.

→ TypeScript doesn't block this because it's intentional and safe behavior.

---

## TypeScript Blocks Function Expression Hoisting

```ts
greet();

const greet = (): void => {
    console.log("Hello!");
};
```

→ Error:

```text
error TS2448: Block-scoped variable 'greet' used before its declaration.
```

→ TypeScript catches it at compile time. You never run into a runtime crash.

---

---

# CHAPTER 8: THE COMPLETE HOISTING HIERARCHY

---

## Everything in One Place

```text
┌──────────────────────────────────────────────────────────────────────┐
│                    HOISTING HIERARCHY                                │
│                                                                      │
│  WHAT YOU WROTE              PHASE 1 STORES         ACCESS BEFORE?  │
│  ─────────────────────       ──────────────────      ──────────────  │
│                                                                      │
│  function foo() {...}        entire function         ✅ YES — works  │
│                              fully callable          (fully hoisted) │
│                                                                      │
│  var x = 10;                 x → undefined           ⚠️ YES but      │
│                                                      gives undefined │
│                                                                      │
│  var fn = function(){}       fn → undefined          ❌ TypeError     │
│                                                      (not a function)│
│                                                                      │
│  var fn = () => {}           fn → undefined          ❌ TypeError     │
│                                                      (not a function)│
│                                                                      │
│  let x = 10;                 x → TDZ                 ❌ ReferenceError│
│                                                      (can't access)  │
│                                                                      │
│  const x = 10;               x → TDZ                 ❌ ReferenceError│
│                                                      (can't access)  │
│                                                                      │
│  class Foo {}                Foo → TDZ               ❌ ReferenceError│
│                                                      (same as let)   │
│                                                                      │
│  (never declared)            does not exist           ❌ ReferenceError│
│                                                      (not defined)   │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Priority When Names Collide (Phase 1)

```text
If var and function have the SAME name:
→ function wins in Phase 1 (stored as function, not undefined)
→ var assignment can overwrite in Phase 2

If two functions have the SAME name:
→ last one in the code wins

If var is declared twice:
→ second declaration is ignored (already exists)
→ second assignment updates the value in Phase 2

If let/const is declared twice:
→ compile error: Cannot re-declare block-scoped variable
```

---

---

# CHAPTER 9: HOW TO AVOID HOISTING BUGS

---

## Rule 1: NEVER Use var

```ts
// ❌ BAD
var name = "Alex";

// ✅ GOOD
let name = "Alex";
const name = "Alex";
```

→ `let` and `const` have TDZ. You CANNOT use them before declaration.

→ This makes hoisting bugs impossible.

---

## Rule 2: Always Declare Variables at the TOP of Their Scope

```ts
// ❌ BAD — declaration buried somewhere in the middle
function process() {
    // 50 lines of code...
    let result = calculate();
    // 50 more lines...
}

// ✅ GOOD — declarations at the top
function process() {
    let result: number;
    // now use result wherever needed
    result = calculate();
}
```

---

## Rule 3: Use const by Default, let Only When Needed

```ts
const API_URL = "https://api.example.com";   // won't change
const MAX = 100;                              // won't change
let count = 0;                                // will change in a loop
```

---

## Rule 4: Use TypeScript with strict Mode

→ `strict: true` in tsconfig.json catches implicit `any` and hoisting issues.

→ TypeScript shows errors in your editor BEFORE you run the code.

→ If your code compiles without errors, hoisting bugs are nearly impossible.

---

---

# INTERVIEW QUESTIONS — HOISTING

---

### What is hoisting?

→ Hoisting is JavaScript's behavior of allocating memory for variables and functions during Phase 1 (Memory Creation Phase) before any code executes in Phase 2. It makes declarations accessible before their line in the code.

---

### Does JavaScript actually move code to the top?

→ No. JavaScript does NOT rearrange or move any code. The term "hoisting" is a mental model. What actually happens is the two-phase execution: Phase 1 stores declarations in memory, Phase 2 runs the code. By the time code runs, declarations already exist in memory.

---

### What is the difference between var hoisting and function hoisting?

→ `var` is hoisted with the value `undefined`. Function declarations are hoisted with the entire function body. So you can call a function before its declaration, but a `var` variable will give `undefined` before its assignment.

---

### Are let and const hoisted?

→ Yes, they ARE hoisted — they are registered in memory during Phase 1. But they are placed in the Temporal Dead Zone (TDZ) and cannot be accessed until the declaration line is reached. Accessing them before declaration throws a ReferenceError.

---

### What is the Temporal Dead Zone (TDZ)?

→ The period between the start of a block scope and the line where `let`/`const` is declared. During this period, the variable exists in memory but cannot be accessed. Any attempt throws `ReferenceError: Cannot access 'x' before initialization`.

---

### What happens when a var variable and function have the same name?

→ In Phase 1, the function takes priority (stored as the complete function, not `undefined`). In Phase 2, the `var` assignment overwrites it if it runs after the function declaration.

---

### Why does var in a loop with setTimeout print the same value?

→ Because `var` is function-scoped, only ONE variable exists shared across all iterations. By the time `setTimeout` callbacks execute, the loop has finished and the variable holds the final value. `let` creates a new variable per iteration, so each callback captures its own copy.

---

### What is the output of this code?

```js
var x = 1;
function test() {
    console.log(x);
    var x = 2;
}
test();
```

→ Output: `undefined`. The function has its own `var x`, which is hoisted to the top of the function as `undefined`, shadowing the global `x`. So `console.log(x)` sees the local `x` (undefined), not the global `x` (1).

---

### How does TypeScript help with hoisting?

→ TypeScript catches hoisting issues at compile time. Using `let`/`const` before declaration shows an error in the editor immediately. Since TypeScript discourages `var`, most hoisting bugs simply cannot occur.

---

### Are classes hoisted?

→ Yes, like `let`/`const`, classes are hoisted but placed in the TDZ. You cannot instantiate a class before its declaration. `ReferenceError` will be thrown.

---

---

# FINAL REVISION — HOISTING

→ Hoisting = variables and functions being stored in memory BEFORE code execution

→ JavaScript does NOT move code. It runs in two phases: Memory Creation → Code Execution

→ `var` → hoisted as `undefined` → accessible before declaration (gives `undefined`)

→ `function declaration` → hoisted COMPLETELY → callable before declaration

→ `function expression` / `arrow function` with `var` → hoisted as `undefined` → TypeError if called

→ `let` / `const` → hoisted but in TDZ → ReferenceError if accessed before declaration

→ TDZ = Temporal Dead Zone = period between block start and actual declaration line

→ `class` → same as `let`/`const` → hoisted into TDZ

→ When `var` and `function` share a name → function wins in Phase 1, `var` assignment can overwrite in Phase 2

→ Two functions with same name → last one wins in Phase 1

→ Hoisting is SCOPED → `var` hoists to function/global, `let`/`const` hoist to their block

→ `var` in loop + setTimeout = classic bug (shared variable, all callbacks see final value)

→ `let` in loop + setTimeout = correct (fresh variable per iteration)

→ TypeScript catches hoisting bugs at compile time

→ Rules: never use `var`, always declare at top, use `const` by default, enable `strict` mode
