# HOW JAVASCRIPT WORKS — THE COMPLETE STORY

---

# The Big Question

→ You write `let x = 10;` and it works.

→ But HOW? What happens behind the scenes?

→ Who reads your code? Who stores the variable? Who runs the logic?

→ If you don't understand this, you'll never truly understand `var`, hoisting, scope, closures, or async.

→ This is the ENGINE room of JavaScript. Let's open it up.

---

---

# CHAPTER 1: WHAT HAPPENS WHEN YOU RUN JAVASCRIPT CODE?

---

## The Simple Answer

→ JavaScript is executed by a **JavaScript Engine**.

→ Every browser has one:

```text
┌────────────────────────────────────────┐
│          BROWSER                       │
│                                        │
│   Chrome   →  V8 Engine               │
│   Firefox  →  SpiderMonkey Engine      │
│   Safari   →  JavaScriptCore Engine    │
│   Edge     →  V8 Engine (same as Chrome)│
│   Node.js  →  V8 Engine               │
│                                        │
└────────────────────────────────────────┘
```

→ When you run JavaScript, the engine does NOT read and execute line by line blindly.

→ It follows a very specific, structured process.

→ That process starts with creating something called an **Execution Context**.

---

---

# CHAPTER 2: WHAT IS AN EXECUTION CONTEXT?

---

## Definition

→ An **Execution Context** is an environment where JavaScript code is evaluated and executed.

→ Think of it like a **room** where your code runs.

→ The room has everything needed to run your code:
→ Where to store variables (Memory)
→ What code to execute (Code)

→ Every time JavaScript runs, it creates an Execution Context.

---

## Types of Execution Contexts

```text
┌──────────────────────────────────────────────────┐
│                                                  │
│   1. GEC  →  Global Execution Context            │
│              Created when the program starts     │
│              Only ONE per program                │
│                                                  │
│   2. FEC  →  Function Execution Context          │
│              Created when a function is CALLED    │
│              One per function call               │
│                                                  │
│   3. Eval →  Eval Execution Context              │
│              Created inside eval() function      │
│              Rarely used, avoid eval()           │
│                                                  │
└──────────────────────────────────────────────────┘
```

→ For now, we focus on GEC and FEC. These are what matter.

---

---

# CHAPTER 3: GLOBAL EXECUTION CONTEXT (GEC) — THE MAIN ROOM

---

## When is GEC Created?

→ The MOMENT your JavaScript file starts running.

→ Before even a single line of your code executes.

→ The engine creates the GEC first, then starts reading your code.

→ There is always exactly ONE GEC. It is the base. The foundation.

---

## What Does the GEC Contain?

→ Every Execution Context (including GEC) has **TWO components**:

```text
┌─────────────────────────────────────────────────────┐
│              GLOBAL EXECUTION CONTEXT (GEC)          │
│                                                     │
│   ┌──────────────────┐   ┌──────────────────────┐   │
│   │                  │   │                      │   │
│   │  MEMORY          │   │  CODE                │   │
│   │  COMPONENT       │   │  COMPONENT           │   │
│   │                  │   │                      │   │
│   │  (Variable       │   │  (Thread of          │   │
│   │   Environment)   │   │   Execution)         │   │
│   │                  │   │                      │   │
│   │  Stores:         │   │  Executes:           │   │
│   │  - variables     │   │  - code line by line │   │
│   │  - functions     │   │  - one line at a time│   │
│   │  - values        │   │  - top to bottom     │   │
│   │                  │   │                      │   │
│   └──────────────────┘   └──────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

### Component 1: MEMORY COMPONENT (Variable Environment)

→ This is where JavaScript stores all your variables and function definitions.

→ Think of it as a **cupboard with labeled shelves**.

→ Each shelf has a **key** (variable name) and a **value** (what's stored).

```text
┌───────────────────────────────┐
│       MEMORY COMPONENT        │
│       (Variable Environment)  │
│                               │
│   Key          │   Value      │
│   ─────────────│──────────    │
│   a            │   undefined  │
│   b            │   undefined  │
│   add          │   fn {...}   │
│   name         │   undefined  │
│                               │
└───────────────────────────────┘
```

→ Notice: variables start as `undefined`. Functions are stored completely.

→ We'll see WHY in the next section (Two Phases).

---

### Component 2: CODE COMPONENT (Thread of Execution)

→ This is where JavaScript actually RUNS your code.

→ It reads one line, executes it, moves to the next line.

→ **One line at a time. In order. Top to bottom.**

→ This is why JavaScript is called a **Single-Threaded** language.

```text
Single-Threaded means:
→ One command at a time
→ One line at a time
→ No multitasking
→ Must finish current line before moving to next
```

→ Think of it like a single worker reading a recipe — step 1, then step 2, then step 3. Can't do step 1 and step 3 at the same time.

---

---

# CHAPTER 4: THE TWO PHASES OF EXECUTION

---

## The Most Important Concept

→ When JavaScript runs your code, it doesn't just start executing immediately.

→ It goes through the code **TWICE**.

→ Yes, TWICE. Two complete passes.

```text
┌───────────────────────────────────────────────────┐
│                                                   │
│   PHASE 1  →  MEMORY CREATION PHASE              │
│               (also called "Creation Phase")      │
│               Allocates memory for variables      │
│               and functions                       │
│                                                   │
│   PHASE 2  →  CODE EXECUTION PHASE               │
│               (also called "Execution Phase")     │
│               Actually runs the code line by line │
│                                                   │
└───────────────────────────────────────────────────┘
```

→ Understanding these two phases is the KEY to understanding hoisting, `undefined`, and scope.

---

## Let's Watch It Happen — Step by Step

Take this code:

```js
var a = 10;
var b = 20;

function add(x, y) {
    var result = x + y;
    return result;
}

var sum = add(a, b);
console.log(sum);
```

---

### PHASE 1: MEMORY CREATION PHASE

→ JavaScript scans the ENTIRE code from top to bottom.

→ It does NOT execute anything.

→ It only looks for **variable declarations** and **function declarations**.

→ For every `var` variable → stores `undefined`

→ For every `function` → stores the **entire function code**

```text
┌─────────────────────────────────────────────┐
│     PHASE 1: MEMORY CREATION                │
│                                             │
│     JavaScript scans the code...            │
│                                             │
│     Line: var a = 10;                       │
│     Action: Store  a → undefined            │
│                                             │
│     Line: var b = 20;                       │
│     Action: Store  b → undefined            │
│                                             │
│     Line: function add(x, y) {...}          │
│     Action: Store  add → entire function    │
│                                             │
│     Line: var sum = add(a, b);              │
│     Action: Store  sum → undefined          │
│                                             │
└─────────────────────────────────────────────┘
```

→ After Phase 1, the Memory looks like:

```text
┌───────────────────────────────┐
│       MEMORY (after Phase 1)  │
│                               │
│   Key     │   Value           │
│   ────────│──────────────     │
│   a       │   undefined       │
│   b       │   undefined       │
│   add     │   fn(x,y){...}   │
│   sum     │   undefined       │
│                               │
└───────────────────────────────┘
```

→ Variables are `undefined` — NOT their actual values.

→ The function `add` is stored completely — the entire body.

→ This is exactly why **hoisting** works for `var` and functions.

→ This is exactly why `console.log(a)` before `var a = 10` gives `undefined`, not an error.

---

### PHASE 2: CODE EXECUTION PHASE

→ NOW JavaScript goes through the code again, this time EXECUTING each line.

→ Line by line. Top to bottom.

```text
┌────────────────────────────────────────────────────────┐
│     PHASE 2: CODE EXECUTION                           │
│                                                       │
│     Line 1: var a = 10;                               │
│     Action: a was undefined → now a = 10              │
│                                                       │
│     Memory: a = 10, b = undefined, sum = undefined    │
│                                                       │
│     ──────────────────────────────────────             │
│                                                       │
│     Line 2: var b = 20;                               │
│     Action: b was undefined → now b = 20              │
│                                                       │
│     Memory: a = 10, b = 20, sum = undefined           │
│                                                       │
│     ──────────────────────────────────────             │
│                                                       │
│     Line 3-5: function add(x, y) {...}                │
│     Action: SKIP — already stored in Phase 1          │
│                                                       │
│     ──────────────────────────────────────             │
│                                                       │
│     Line 7: var sum = add(a, b);                      │
│     Action: FUNCTION IS CALLED! → new context created │
│             (explained in next chapter)               │
│                                                       │
└────────────────────────────────────────────────────────┘
```

---

## The Full Picture — Both Phases Together

```text
YOUR CODE:                    PHASE 1 (Memory)        PHASE 2 (Execution)
────────────                  ──────────────────       ───────────────────
var a = 10;                   a → undefined            a → 10
var b = 20;                   b → undefined            b → 20
function add(x,y){...}       add → fn(x,y){...}      (skip, already stored)
var sum = add(a, b);          sum → undefined          sum → (calls add → 30)
console.log(sum);             (nothing)                prints 30
```

---

---

# CHAPTER 5: FUNCTION EXECUTION CONTEXT (FEC) — A NEW ROOM

---

## What Happens When a Function is CALLED?

→ Every time a function is invoked (called), JavaScript creates a **brand new Execution Context** just for that function.

→ This new context also has the same two components: **Memory** and **Code**.

→ It is created, used, and then **destroyed** after the function finishes.

---

## Let's Trace: `add(a, b)` is Called

```js
function add(x, y) {
    var result = x + y;
    return result;
}

var sum = add(10, 20);
```

→ When `add(10, 20)` is called:

```text
┌──────────────────────────────────────────────────────────┐
│        GLOBAL EXECUTION CONTEXT                          │
│                                                          │
│   Memory:                    Code:                       │
│   a = 10                    (currently at line 7:        │
│   b = 20                     var sum = add(a, b))        │
│   add = fn(x,y){...}                                    │
│   sum = undefined            ↓ FUNCTION CALLED!          │
│                              ↓ Creates new context       │
│                                                          │
│   ┌──────────────────────────────────────────────────┐   │
│   │    FUNCTION EXECUTION CONTEXT for add(10, 20)    │   │
│   │                                                  │   │
│   │  ┌──────────────┐   ┌────────────────────────┐   │   │
│   │  │   MEMORY     │   │   CODE                 │   │   │
│   │  │              │   │                        │   │   │
│   │  │  PHASE 1:    │   │   PHASE 2:             │   │   │
│   │  │  x → undefined   │   x → 10              │   │   │
│   │  │  y → undefined   │   y → 20              │   │   │
│   │  │  result → undef  │   result → 30         │   │   │
│   │  │              │   │   return 30            │   │   │
│   │  └──────────────┘   └────────────────────────┘   │   │
│   │                                                  │   │
│   │  → Function finishes → returns 30                │   │
│   │  → This entire context is DESTROYED              │   │
│   └──────────────────────────────────────────────────┘   │
│                                                          │
│   sum = 30  (received the return value)                  │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

### Step-by-Step Inside the Function Context

**Phase 1 (Memory Creation):**

```text
x      → undefined
y      → undefined
result → undefined
```

**Phase 2 (Code Execution):**

```text
Step 1: x = 10          (argument value assigned)
Step 2: y = 20          (argument value assigned)
Step 3: result = x + y  → result = 30
Step 4: return result   → returns 30 to the caller
Step 5: CONTEXT DESTROYED — memory wiped clean
```

→ The return value (30) goes back to the GEC.

→ In the GEC, `sum` receives the value `30`.

→ The function's entire execution context is **deleted from memory**.

---

---

# CHAPTER 6: THE CALL STACK — Managing Multiple Contexts

---

## The Problem

→ What if you have functions calling other functions?

→ Function A calls Function B, which calls Function C.

→ How does JavaScript keep track of WHERE it is?

→ How does it know which context to go back to?

---

## The Solution: Call Stack

→ JavaScript uses a **Call Stack** to manage execution contexts.

→ A stack is like a pile of plates:

```text
→ You add plates on TOP (push)
→ You remove plates from TOP (pop)
→ Last In, First Out (LIFO)
```

→ The Call Stack works the same way with execution contexts.

---

## How the Call Stack Works

```js
var a = 10;

function first() {
    var b = 20;
    second();
    console.log("first done");
}

function second() {
    var c = 30;
    console.log("second done");
}

first();
console.log("program done");
```

---

### Step-by-Step Stack Changes

```text
STEP 1: Program starts
┌─────────────────┐
│                 │
│                 │
│                 │
│      GEC        │ ← Global Execution Context pushed
└─────────────────┘
  CALL STACK
```

```text
STEP 2: first() is called
┌─────────────────┐
│                 │
│   first() EC    │ ← first's context pushed on top
│                 │
│      GEC        │
└─────────────────┘
  CALL STACK
```

```text
STEP 3: Inside first(), second() is called
┌─────────────────┐
│  second() EC    │ ← second's context pushed on top
│                 │
│   first() EC    │
│                 │
│      GEC        │
└─────────────────┘
  CALL STACK
```

```text
STEP 4: second() finishes → "second done" printed
┌─────────────────┐
│                 │
│   first() EC    │ ← second's context POPPED (destroyed)
│                 │
│      GEC        │
└─────────────────┘
  CALL STACK
  (second() EC removed)
```

```text
STEP 5: first() finishes → "first done" printed
┌─────────────────┐
│                 │
│                 │
│                 │
│      GEC        │ ← first's context POPPED (destroyed)
└─────────────────┘
  CALL STACK
  (first() EC removed)
```

```text
STEP 6: Program finishes → "program done" printed
┌─────────────────┐
│                 │
│                 │
│                 │
│     (empty)     │ ← GEC also POPPED
└─────────────────┘
  CALL STACK
  (completely empty — program over)
```

---

## Call Stack — The Timeline View

```text
TIME →→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→

GEC    ████████████████████████████████████████
                                               ↑ program ends

first()      ████████████████████████████
                                         ↑ first() returns

second()          ██████████████
                               ↑ second() returns

Output:  ─────────────── "second done" ─── "first done" ─── "program done"
```

---

## Call Stack — Other Names (Interview)

→ The Call Stack is also known as:

```text
→ Execution Context Stack
→ Program Stack
→ Control Stack
→ Runtime Stack
→ Machine Stack
```

→ All refer to the same thing.

---

---

# CHAPTER 7: THIS EXPLAINS HOISTING

---

## Now You Can Understand WHY Hoisting Works

```js
console.log(a);   // undefined (not error!)
var a = 10;
```

→ Before, this seemed magical. Now you know:

```text
PHASE 1 (Memory Creation):
→ Engine scans code
→ Finds "var a = 10"
→ Stores: a → undefined

PHASE 2 (Code Execution):
→ Line 1: console.log(a) → a is undefined (from Phase 1) → prints undefined
→ Line 2: a = 10 → now a becomes 10
```

→ Hoisting is NOT the engine "moving" your code to the top.

→ Hoisting is the RESULT of Phase 1 storing variables in memory before execution.

---

## Function Hoisting

```js
greet();   // "Hello!" — works even though function is below!

function greet() {
    console.log("Hello!");
}
```

→ Why does this work?

```text
PHASE 1: Engine finds function greet → stores ENTIRE function in memory
PHASE 2: Line 1 → calls greet() → function is already in memory → executes
```

→ Functions declared with `function` keyword are stored COMPLETELY in Phase 1.

→ That's why you can call them before their declaration.

---

## Why let and const Don't "Hoist" the Same Way

```js
console.log(x);   // ReferenceError!
let x = 10;
```

→ Technically, `let` and `const` ARE hoisted (they exist in Phase 1).

→ But they are placed in a **Temporal Dead Zone (TDZ)**.

→ They are NOT initialized to `undefined` like `var`.

→ You CANNOT access them until the engine reaches the actual declaration line.

```text
PHASE 1:
→ var a   → stored as undefined    (accessible immediately)
→ let b   → stored but in TDZ      (NOT accessible until declaration)
→ const c → stored but in TDZ      (NOT accessible until declaration)
```

---

---

# CHAPTER 8: WHAT IS THE GLOBAL OBJECT?

---

## Along With GEC, JavaScript Also Creates Two Things

→ When the GEC is created, JavaScript also creates:

```text
1. The Global Object
2. The "this" keyword
```

---

### The Global Object

→ In browsers: the global object is `window`

→ In Node.js: the global object is `global`

→ All global variables and functions are attached to this object.

```js
var name = "Alex";

console.log(name);          // "Alex"
console.log(window.name);   // "Alex" (same thing in browser)
```

→ `var` variables are added to `window`.

→ `let` and `const` are NOT added to `window` (another reason to avoid `var`).

```js
var a = 10;
let b = 20;
const c = 30;

console.log(window.a);   // 10     ← var is on window
console.log(window.b);   // undefined  ← let is NOT on window
console.log(window.c);   // undefined  ← const is NOT on window
```

---

### The "this" Keyword

→ In the GEC, `this` points to the global object.

```js
console.log(this);              // window (in browser)
console.log(this === window);   // true
```

→ Inside a function, `this` depends on HOW the function is called (covered in advanced topics).

---

---

# CHAPTER 9: JAVASCRIPT IS SINGLE-THREADED AND SYNCHRONOUS

---

## Single-Threaded

→ JavaScript has ONE Call Stack.

→ ONE thread of execution.

→ It can do only ONE thing at a time.

```text
Multi-threaded (Java, C++):
→ Can run multiple tasks simultaneously
→ Like a kitchen with 5 chefs cooking different dishes at once

Single-threaded (JavaScript):
→ Can run only one task at a time
→ Like a kitchen with 1 chef cooking one dish, then the next
```

---

## Synchronous

→ JavaScript executes code line by line, in order.

→ Each line must finish before the next one starts.

```js
console.log("A");   // prints first
console.log("B");   // prints second
console.log("C");   // prints third
```

→ Always: A → B → C. Never out of order.

---

## Then How Does JavaScript Handle async, setTimeout, fetch?

→ JavaScript itself is single-threaded and synchronous.

→ But the BROWSER provides extra features:

```text
┌─────────────────────────────────────────────┐
│              BROWSER                        │
│                                             │
│   ┌─────────────┐  ┌────────────────────┐   │
│   │  JS Engine  │  │  Web APIs          │   │
│   │  (V8)       │  │  (provided by      │   │
│   │             │  │   browser, NOT JS) │   │
│   │  Call Stack │  │                    │   │
│   │             │  │  - setTimeout      │   │
│   │             │  │  - fetch           │   │
│   │             │  │  - DOM APIs        │   │
│   │             │  │  - Event Listeners │   │
│   └─────────────┘  └────────────────────┘   │
│                                             │
│   ┌─────────────┐  ┌────────────────────┐   │
│   │  Callback   │  │  Microtask Queue   │   │
│   │  Queue      │  │  (Promises)        │   │
│   └─────────────┘  └────────────────────┘   │
│                                             │
│   ┌─────────────────────────────────────┐   │
│   │         EVENT LOOP                  │   │
│   │   Checks: is Call Stack empty?      │   │
│   │   If yes → push next from Queue     │   │
│   └─────────────────────────────────────┘   │
│                                             │
└─────────────────────────────────────────────┘
```

→ `setTimeout`, `fetch`, `DOM events` are NOT part of JavaScript.

→ They are Web APIs provided by the browser.

→ The **Event Loop** coordinates between the Call Stack and the Callback Queue.

→ This is an advanced topic (Event Loop) — but now you know the big picture.

---

---

# CHAPTER 10: COMPLETE EXECUTION WALKTHROUGH

---

## Let's Trace This Entire Program

```js
var x = 5;
var y = 10;

function multiply(a, b) {
    var result = a * b;
    return result;
}

var product = multiply(x, y);
console.log(product);
```

---

### STEP 1: GEC Created → Phase 1 (Memory)

```text
┌──────────────────────────────────────────────────┐
│         GLOBAL EXECUTION CONTEXT                 │
│                                                  │
│   MEMORY (Phase 1):         CODE:                │
│   ┌──────────────────┐      (not yet running)    │
│   │ x    → undefined │                           │
│   │ y    → undefined │                           │
│   │ multiply → fn()  │  ← entire function stored │
│   │ product → undef  │                           │
│   └──────────────────┘                           │
│                                                  │
│   Call Stack: [ GEC ]                            │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

### STEP 2: Phase 2 — Execute Line 1: `var x = 5`

```text
│   MEMORY:                    CODE:               │
│   ┌──────────────────┐      Line 1: x = 5  ✅   │
│   │ x    → 5         │  ← updated!              │
│   │ y    → undefined │                           │
│   │ multiply → fn()  │                           │
│   │ product → undef  │                           │
│   └──────────────────┘                           │
```

---

### STEP 3: Execute Line 2: `var y = 10`

```text
│   MEMORY:                    CODE:               │
│   ┌──────────────────┐      Line 2: y = 10  ✅  │
│   │ x    → 5         │                           │
│   │ y    → 10        │  ← updated!              │
│   │ multiply → fn()  │                           │
│   │ product → undef  │                           │
│   └──────────────────┘                           │
```

---

### STEP 4: Lines 4-7 — Function Declaration (SKIP)

→ Already stored in Phase 1. Nothing to do.

---

### STEP 5: Line 9: `var product = multiply(x, y)` — FUNCTION CALL!

→ `multiply(5, 10)` is called.

→ A NEW Execution Context is created and pushed onto the Call Stack.

```text
┌──────────────────────────────────────────────────────┐
│          GEC                                         │
│   Memory: x=5, y=10, multiply=fn, product=undefined  │
│                                                      │
│   ┌──────────────────────────────────────────────┐   │
│   │     FUNCTION EC: multiply(5, 10)             │   │
│   │                                              │   │
│   │  PHASE 1 (Memory):    PHASE 2 (Execution):  │   │
│   │  a → undefined        a → 5                 │   │
│   │  b → undefined        b → 10                │   │
│   │  result → undefined   result → 5 * 10 = 50  │   │
│   │                       return 50              │   │
│   │                                              │   │
│   └──────────────────────────────────────────────┘   │
│                    ↓                                  │
│   product = 50  (received return value)              │
│   multiply's context → DESTROYED                     │
│                                                      │
│   Call Stack: [ GEC ]  (multiply popped off)         │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

### STEP 6: Line 10: `console.log(product)` → prints 50

```text
│   MEMORY:                    CODE:                    │
│   ┌──────────────────┐      Line 10: console.log ✅  │
│   │ x    → 5         │                                │
│   │ y    → 10        │      Output: 50                │
│   │ multiply → fn()  │                                │
│   │ product → 50     │                                │
│   └──────────────────┘                                │
```

---

### STEP 7: Program Ends → GEC Destroyed → Call Stack Empty

```text
Call Stack: [ ] → empty → program over
```

---

---

# CHAPTER 11: NESTED FUNCTION CALLS — STACK IN ACTION

---

```js
function a() {
    console.log("a start");
    b();
    console.log("a end");
}

function b() {
    console.log("b start");
    c();
    console.log("b end");
}

function c() {
    console.log("c runs");
}

a();
```

### Call Stack Changes:

```text
Step 1:  [ GEC ]                         → program starts
Step 2:  [ GEC, a() ]                    → a() called
Step 3:  prints "a start"
Step 4:  [ GEC, a(), b() ]              → b() called inside a()
Step 5:  prints "b start"
Step 6:  [ GEC, a(), b(), c() ]         → c() called inside b()
Step 7:  prints "c runs"
Step 8:  [ GEC, a(), b() ]              → c() finishes, popped
Step 9:  prints "b end"
Step 10: [ GEC, a() ]                   → b() finishes, popped
Step 11: prints "a end"
Step 12: [ GEC ]                         → a() finishes, popped
Step 13: [ ]                             → GEC popped, program over
```

### Output:

```text
a start
b start
c runs
b end
a end
```

→ Last function called = first to finish (LIFO — Last In, First Out).

---

---

# CHAPTER 12: STACK OVERFLOW — WHEN THE STACK BREAKS

---

## What Happens If a Function Calls Itself Forever?

```js
function infinite() {
    infinite();   // calls itself forever
}

infinite();
```

```text
Call Stack:
[ GEC ]
[ GEC, infinite() ]
[ GEC, infinite(), infinite() ]
[ GEC, infinite(), infinite(), infinite() ]
[ GEC, infinite(), infinite(), infinite(), infinite() ]
...
...keeps growing...
...until...

❌ Maximum call stack size exceeded
```

→ The stack has a limit (usually ~10,000-25,000 frames depending on the engine).

→ When you exceed it → **Stack Overflow** error.

→ This is why infinite recursion crashes your program.

→ The famous website StackOverflow.com is named after this error!

---

---

# INTERVIEW QUESTIONS

---

### What is an Execution Context?

→ An environment where JavaScript code is evaluated and executed. It has two components: Memory Component (stores variables and functions) and Code Component (executes code line by line).

---

### What are the types of Execution Context?

→ Global Execution Context (GEC) — created when the program starts, only one exists. Function Execution Context (FEC) — created every time a function is called, destroyed when it returns.

---

### What are the two phases of an Execution Context?

→ Phase 1: Memory Creation Phase — scans code, stores variables as `undefined` and functions as complete code. Phase 2: Code Execution Phase — runs code line by line, assigns actual values.

---

### What is hoisting and why does it happen?

→ Hoisting is the ability to use variables and functions before their declaration. It happens because Phase 1 (Memory Creation) stores `var` variables as `undefined` and stores functions completely BEFORE Phase 2 executes any code.

---

### What is the Call Stack?

→ A data structure (LIFO — Last In, First Out) that JavaScript uses to manage execution contexts. When a function is called, its context is pushed onto the stack. When it returns, the context is popped off.

---

### Why is JavaScript single-threaded?

→ Because it has only ONE Call Stack. It can execute only one piece of code at a time, line by line, in order.

---

### What is a Stack Overflow?

→ When the Call Stack exceeds its limit, usually caused by infinite recursion (a function calling itself forever without a stopping condition).

---

### What is the Global Object?

→ An object created automatically with the GEC. In browsers it's `window`, in Node.js it's `global`. `var` variables are attached to it, but `let` and `const` are NOT.

---

### What is the difference between `var` and `let`/`const` in Phase 1?

→ `var` is stored as `undefined` and is accessible (gives `undefined`). `let`/`const` are stored but placed in the Temporal Dead Zone — accessing them before declaration throws a ReferenceError.

---

---

# FINAL REVISION

→ JavaScript engine (V8, SpiderMonkey) executes your code

→ Before running anything, it creates a **Global Execution Context (GEC)**

→ Every Execution Context has **two components**: Memory + Code

→ Memory Component (Variable Environment) = stores variables & functions as key:value pairs

→ Code Component (Thread of Execution) = runs code line by line, one at a time

→ Execution happens in **two phases**: Memory Creation → Code Execution

→ Phase 1: `var` → `undefined`, functions → stored completely

→ Phase 2: code runs line by line, values assigned, functions called

→ When a function is called → a **new Function Execution Context** is created

→ Function context also has Memory + Code, also runs two phases

→ After function returns → its context is **destroyed**

→ JavaScript uses a **Call Stack** (LIFO) to track all execution contexts

→ GEC sits at the bottom, function contexts stack on top

→ When function returns → popped off stack. When program ends → GEC popped → stack empty

→ JavaScript is **single-threaded** (one call stack) and **synchronous** (one line at a time)

→ Async behavior (setTimeout, fetch) comes from **browser Web APIs + Event Loop**, not JS itself

→ Hoisting = result of Phase 1 storing variables/functions in memory before code runs

→ `var` hoists as `undefined`, `let`/`const` hoist into **TDZ** (not accessible)

→ Infinite recursion → Stack Overflow (stack exceeds its size limit)

→ Global Object = `window` (browser) / `global` (Node.js)

→ `var` attaches to global object, `let`/`const` do NOT
