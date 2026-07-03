# DAY-3 : TOPIC 1 — VARIABLES IN TYPESCRIPT

---

# Why Are We Talking About Variables Again?

→ You already know variables from JavaScript.

→ `var`, `let`, `const` — you've used them before.

→ So why discuss them again in TypeScript?

→ Because TypeScript CHANGES how variables behave.

→ In JavaScript, a variable is just a box — throw anything in it.

→ In TypeScript, a variable is a **labeled box with a lock** — once you decide what goes in, only THAT type is allowed.

→ Same keywords. Same syntax. Completely different rules underneath.

---

---

# What is a Variable?

→ A variable is a named container that stores a value in memory.

→ Think of it like a box with a label on top.

```text
┌─────────────┐
│     25      │   ← value (what's inside)
└─────────────┘
     age          ← name (the label)
```

→ You create it, give it a name, put something inside.

→ Later you can read it, change it, or pass it somewhere.

---

## In JavaScript — The Box is Open

```js
let age = 25;           // put a number in
age = "twenty five";    // now put a string — JS says OK
age = true;             // now a boolean — JS says OK
age = [1, 2, 3];        // now an array — JS says OK
age = null;             // now null — JS says OK
```

→ The box has no rules. Anything goes in.

→ This is called **Dynamic Typing** — the type can change at any time.

→ Feels flexible. But in a project with 1000 files and 10 developers, this is chaos.

---

## In TypeScript — The Box is Locked

```ts
let age: number = 25;
age = "twenty five";    // ERROR: Type 'string' is not assignable to type 'number'
```

→ You declared `age` as `number`.

→ TypeScript locked it. Forever.

→ Now only numbers can go in. Strings, booleans, arrays — all rejected.

→ This is called **Static Typing** — the type is fixed at declaration.

→ Less flexible? Yes. Fewer bugs? Absolutely.

---

---

# The Three Ways to Declare Variables

→ JavaScript has three keywords: `var`, `let`, `const`.

→ TypeScript uses the EXACT same three keywords.

→ But TypeScript adds **type safety** on top of each.

→ Let's go through each one deeply.

---

---

## 1. var — The Old Way (NEVER Use in TypeScript)

```ts
var name: string = "Alex";
```

→ `var` was the ONLY way to declare variables before ES6 (2015).

→ It worked for 20 years. But it has serious problems.

---

### Problem 1: var is Function-Scoped, NOT Block-Scoped

→ A "scope" is the area where a variable is accessible.

→ `var` doesn't respect blocks like `if`, `for`, `while`.

→ It only respects function boundaries.

```ts
if (true) {
    var leaked: string = "I'm inside an if block";
}

console.log(leaked);   // "I'm inside an if block"  ← var ESCAPED the block!
```

→ The variable was created INSIDE the `if` block.

→ But it's accessible OUTSIDE.

→ This is because `var` is function-scoped — it only stops at the function boundary, not at `{}`.

Compare with `let`:

```ts
if (true) {
    let safe: string = "I stay inside";
}

console.log(safe);   // ERROR: 'safe' is not defined  ← let stays in the block
```

→ `let` respects the `{}`. It stays where you put it.

---

### Problem 2: var Allows Re-declaration

```ts
var count: number = 10;
var count: number = 20;   // No error! var allows this!
```

→ You accidentally created the same variable twice.

→ JavaScript silently overwrites the first one.

→ In a big file with hundreds of lines, you won't notice this.

→ With `let`:

```ts
let count: number = 10;
let count: number = 20;   // ERROR: Cannot re-declare block-scoped variable 'count'
```

→ TypeScript immediately tells you: "This variable already exists."

---

### Problem 3: var Gets Hoisted

→ Hoisting means JavaScript moves `var` declarations to the top of the function BEFORE execution.

```ts
console.log(name);    // undefined (not an error!)
var name: string = "Alex";
```

→ You used `name` BEFORE declaring it.

→ JavaScript didn't crash. It just returned `undefined`.

→ This is extremely confusing and causes silent bugs.

→ With `let`:

```ts
console.log(name);    // ERROR: Cannot access 'name' before initialization
let name: string = "Alex";
```

→ `let` throws a clear error. Much safer.

→ This error zone is called the **Temporal Dead Zone (TDZ)** — the area between the start of the block and the `let` declaration where the variable exists but can't be accessed.

---

### Problem 4: var in Loops (Classic Bug)

```ts
for (var i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i);
    }, 1000);
}

// Expected: 0, 1, 2
// Actual:   3, 3, 3    ← all three print 3!
```

→ Because `var` is function-scoped, there's only ONE `i` shared by all iterations.

→ By the time `setTimeout` fires, the loop is done and `i` is 3.

With `let`:

```ts
for (let i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i);
    }, 1000);
}

// Output: 0, 1, 2    ← correct!
```

→ `let` creates a NEW `i` for each iteration. Each `setTimeout` captures its own copy.

---

### Verdict on var

```text
→ Function-scoped         → confusing and leaky
→ Allows re-declaration   → silent overwrites
→ Gets hoisted            → undefined before declaration
→ Loop bug                → shared variable across iterations

RULE: NEVER use var in TypeScript. Pretend it doesn't exist.
```

---

---

## 2. let — For Values That Change

```ts
let age: number = 25;
age = 26;    // allowed — value can change
age = 27;    // allowed — value can change again
```

→ `let` creates a variable whose **value can be reassigned**.

→ But the **type stays locked**.

```ts
let age: number = 25;
age = "twenty six";    // ERROR: cannot assign string to number
```

→ The value changed (25 → 26). That's fine.

→ The type changed (number → string). That's blocked.

---

### let is Block-Scoped

```ts
{
    let secret: string = "hidden";
    console.log(secret);   // "hidden" — accessible inside the block
}

console.log(secret);   // ERROR: 'secret' is not defined — can't access outside
```

→ `let` lives and dies inside its `{}` block.

→ Works correctly in `if`, `for`, `while`, `switch`, and standalone blocks.

---

### let Does NOT Allow Re-declaration

```ts
let name: string = "Alex";
let name: string = "John";   // ERROR: Cannot re-declare block-scoped variable
```

→ You can't create the same variable twice in the same scope.

→ This prevents accidental overwrites.

---

### When to Use let

```text
→ When the value WILL change later
→ Counters in loops
→ Accumulators (totals, sums)
→ Flags that toggle (isLoading, isOpen)
→ Values updated by user input
→ Values reassigned inside conditionals
```

Examples:

```ts
let count: number = 0;
count++;                         // 1 — counter changes

let isLoggedIn: boolean = false;
isLoggedIn = true;               // user logged in — flag changes

let userName: string = "";
userName = "Alex";               // updated after input

let total: number = 0;
for (let i = 1; i <= 5; i++) {
    total += i;                  // accumulating sum
}
// total = 15
```

---

---

## 3. const — For Values That Never Change (DEFAULT Choice)

```ts
const PI: number = 3.14159;
PI = 3.14;    // ERROR: Cannot assign to 'PI' because it is a constant
```

→ `const` creates a variable whose **value CANNOT be reassigned**.

→ Once set, it's locked. Forever.

---

### const MUST Be Initialized

```ts
const name: string;   // ERROR: 'const' declarations must be initialized
```

→ You must give it a value at the time of declaration.

→ Makes sense — if you can't change it later, when would you set it?

---

### const is Block-Scoped (Same as let)

```ts
{
    const secret: string = "locked";
    console.log(secret);   // accessible here
}

console.log(secret);   // ERROR: not defined outside the block
```

---

### const Does NOT Allow Re-declaration

```ts
const name: string = "Alex";
const name: string = "John";   // ERROR: Cannot re-declare
```

---

### IMPORTANT: const Locks the REFERENCE, Not the VALUE (For Objects/Arrays)

→ This is a very common interview question and a common source of confusion.

→ For primitive types (number, string, boolean), `const` truly locks the value.

→ For objects and arrays, `const` locks the **reference** (the variable points to the same object) but the **contents can change**.

```ts
const person = { name: "Alex", age: 25 };

person.age = 26;           // ALLOWED — changing a property inside
person.name = "John";      // ALLOWED — changing a property inside

person = { name: "New" };  // ERROR — can't reassign the entire object
```

```ts
const numbers: number[] = [1, 2, 3];

numbers.push(4);         // ALLOWED — modifying the array contents
numbers[0] = 99;         // ALLOWED — changing an element

numbers = [5, 6, 7];     // ERROR — can't reassign the entire array
```

→ Think of it like this:

```text
const = "You can't move the box to a different shelf"
         BUT
         "You CAN change what's inside the box"
```

→ For truly immutable objects, use `as const` (covered in advanced topics):

```ts
const config = {
    port: 3000,
    host: "localhost"
} as const;

config.port = 4000;   // ERROR — now the properties are also locked
```

---

### When to Use const

```text
→ DEFAULT choice for everything
→ Configuration values
→ API URLs
→ Imported modules
→ Function declarations (arrow functions)
→ Any value you don't plan to reassign
```

Examples:

```ts
const API_URL: string = "https://api.example.com";
const MAX_RETRIES: number = 3;
const IS_PRODUCTION: boolean = true;
const COLORS: string[] = ["red", "green", "blue"];

const greet = (name: string): string => {
    return `Hello, ${name}!`;
};
```

→ When in doubt, start with `const`. If you later need to change the value, switch to `let`.

---

---

# Summary: var vs let vs const

| Feature            | var              | let              | const            |
| ------------------ | ---------------- | ---------------- | ---------------- |
| Scope              | Function         | Block `{}`       | Block `{}`       |
| Re-declaration     | Allowed          | Not allowed      | Not allowed      |
| Reassignment       | Allowed          | Allowed          | Not allowed      |
| Hoisting           | Yes (`undefined`)| Yes (TDZ error)  | Yes (TDZ error)  |
| Must initialize?   | No               | No               | Yes              |
| Use in TypeScript? | NEVER            | When value changes | DEFAULT choice |

---

## The Decision Flow

```text
Do I need to reassign this variable later?
│
├── NO  → use const
│
└── YES → use let
│
Never use var.
```

---

---

# Type Annotation vs Type Inference (With Variables)

---

## Two Ways to Give a Variable Its Type

→ In every example above, we wrote the type explicitly: `let age: number = 25`.

→ But TypeScript can also FIGURE OUT the type on its own.

---

### Type Annotation — YOU Tell TypeScript

```ts
let age: number = 25;
let name: string = "Alex";
let isActive: boolean = true;
```

→ The `: number`, `: string`, `: boolean` is YOU telling TypeScript the type.

→ This is called **explicit typing** or **type annotation**.

---

### Type Inference — TypeScript Figures It Out

```ts
let age = 25;          // TypeScript infers → number
let name = "Alex";     // TypeScript infers → string
let isActive = true;   // TypeScript infers → boolean
```

→ No `: type` written anywhere.

→ TypeScript looks at the value `25` and says: "That's a number."

→ The type is still locked:

```ts
let age = 25;
age = "hello";   // ERROR — TypeScript inferred 'number', string not allowed
```

→ Inference does NOT mean "no type." It means "TypeScript guessed it for you."

---

### How to Check What TypeScript Inferred?

→ In VS Code: **hover your mouse** over the variable.

→ A tooltip will show the inferred type:

```text
let age = 25;
      ↑ hover here → tooltip: "let age: number"
```

→ Build this habit. Always hover to verify.

---

### When to Use Annotation vs Inference?

```text
USE INFERENCE when:
→ You assign a value immediately AND the type is obvious
→ let age = 25                    → clearly number
→ let name = "Alex"               → clearly string
→ const PI = 3.14                 → clearly number

USE ANNOTATION when:
→ Declaring WITHOUT a value:       let age: number;
→ Function parameters:             function add(a: number, b: number)
→ The type is not obvious:         let data: string | null = null;
→ You want to be extra clear for readability
```

---

### The Trap: No Value + No Annotation = any

```ts
let value;   // TypeScript infers → any (DANGEROUS)
```

→ No value. No annotation. TypeScript gives up and assigns `any`.

→ `any` disables ALL type checking. Your variable becomes wild.

→ With `strict: true` in tsconfig.json, this becomes an error:

```text
error TS7043: Variable 'value' implicitly has an 'any' type
```

→ Fix:

```ts
let value: number;   // now TypeScript knows the type
```

---

### const and Inference — A Special Behavior

→ When you use `const` with a primitive, TypeScript infers a **literal type**, not a general type.

```ts
let x = 10;       // TypeScript infers → number (can be any number)
const y = 10;     // TypeScript infers → 10 (the literal value 10, nothing else)
```

```ts
let color = "red";       // type: string
const color2 = "red";    // type: "red" (literal type)
```

→ Why? Because `const` can never change. TypeScript knows it will ALWAYS be `10` or `"red"`.

→ So instead of the broad type `number`, it assigns the narrow type `10`.

→ This is called a **Literal Type**. Covered in depth in advanced topics.

---

---

# Interview Questions — Variables

---

### What is the difference between var, let, and const?

→ `var` is function-scoped, allows re-declaration, gets hoisted with `undefined`. `let` is block-scoped, no re-declaration, value can change. `const` is block-scoped, no re-declaration, value cannot be reassigned. In TypeScript, never use `var`.

---

### Why should we avoid var in TypeScript?

→ Because var is function-scoped (leaks out of blocks), allows re-declaration (causes silent overwrites), gets hoisted (causes confusion), and has the classic loop bug with closures. `let` and `const` solve all these problems.

---

### What is the Temporal Dead Zone (TDZ)?

→ The area between the start of a block and the `let`/`const` declaration. Accessing the variable in this zone throws a ReferenceError. This prevents the confusing behavior of `var` hoisting.

---

### Can you change properties of a const object?

→ Yes. `const` locks the reference (you can't reassign the variable to a new object), but you CAN change properties inside the object. To make properties immutable, use `as const`.

---

### What is Type Annotation?

→ Explicitly writing the type after the variable name using colon syntax: `let age: number = 25`.

---

### What is Type Inference?

→ TypeScript automatically determines the type by looking at the assigned value. `let age = 25` → TypeScript infers `number`. The type is still enforced.

---

### When does TypeScript infer `any`?

→ When a variable is declared without a value AND without a type annotation: `let x;` → inferred as `any`. With `strict: true`, this becomes a compile error.

---

### What is a Literal Type?

→ When `const` is used with a primitive, TypeScript infers the exact value as the type, not the general type. `const x = 10` has type `10`, not `number`. `const c = "red"` has type `"red"`, not `string`.

---

---

# Final Revision — Variables

→ Variable = named container for a value

→ JavaScript variables are dynamically typed — type can change anytime

→ TypeScript variables are statically typed — type is locked at declaration

→ `var` = function-scoped, hoisted, re-declarable → NEVER use

→ `let` = block-scoped, no re-declaration, value CAN change

→ `const` = block-scoped, no re-declaration, value CANNOT change → DEFAULT choice

→ `const` locks reference, not contents (objects/arrays can still be modified inside)

→ `as const` makes even the contents immutable

→ Type Annotation = you write the type: `let age: number = 25`

→ Type Inference = TS guesses the type: `let age = 25` → infers `number`

→ No value + no annotation = `any` (dangerous, caught by strict mode)

→ `const` with primitives infers **literal types**: `const x = 10` → type is `10`, not `number`

→ Decision: need to reassign? → `let`. Otherwise → `const`. Never → `var`.
