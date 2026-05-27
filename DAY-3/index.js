/*
Operator - symbols  + - * /
operands - x+y  => x,y are operands
expression x = 2+3/4


OPERATORS
|
|-- Arithmetic (+ - * / % ** ++ --)
|
|-- Assignment (= += -= *= /= %= **=)
|
|-- Comparison (== != === !== > < >= <=)
|
|-- Logical (&& || !)
|
|-- String (+ +=)
|
|-- Type (typeof, instanceof)
|
|-- Ternary ( ? : )
|
|-- Bitwise (& | ^ ~ << >> >>>)
|
|-- Special
|      |-- Spread (...)
|      |-- Rest (...)
|      |-- Optional Chaining (?.)
|      |-- Nullish (??)

*/

/*

console.log("*********Arithmetic Operator **************");
console.log("Post Increment :");
let count = 10;
console.log(count++); // 10
console.log(count); //11

console.log("Pre Increment :");
let number = 10;
console.log(++number); // 11
console.log(number);  //11

*/

/*

console.log("************Comparision Operators**********");
console.log("Loose Equality :");  // values check
console.log(0 == false); //true
console.log(3 == "3"); //true
console.log("Strict Equality : "); //Both datatype + value checks
console.log(0 === false); //false
console.log(3 === "3"); //false
console.log(null === null); //true
console.log(undefined === undefined); //true

//NaN = Not a Number

*/

/*
console.log("**************Logical Operators***************")
console.log("cow" && "Horse");
console.log("cow" || "Horse");
console.log(!"cow");
console.log(!1);

console.log(3 ?? "java"); //3
console.log(undefined ?? 3); //3
console.log(null ?? 3); //3
console.log(false ?? "tapascript"); //tapascript
console.log(0 ?? "javascript") //0

*/



console.log("**************Bit-Wise Operators***************");
console.log(" & | ^ ~ << >>");
/*
15 & 9
1111 & 1001 = 1001 => 1*(2**0) + 0*(2**1) + 0*(2**2) + 1*(2**3)

15 / 2 = 7 (1)
7 / 2 = 3(1)
3 / 2 = 1 (1)

9 / 2 = 4(1)
4 / 2 = 2 (0)
2 / 2 = 1(0)

*/
console.log( 15 & 9);   // and gate perform
console.log( 15 | 9);   // or gate perform

// ^ - xor => If any one of them is true - true , If both true -false
console.log(111 ^ 111);
console.log(111 ^ 110);

// >>2 => it move right side to 2 positions that means left side bits 2 remove and add zero
console.log(15 >> 2); // 0011

// <<2 =>it move left side to 2 positions
console.log(15 << 2);// 111100 => 0*(2**0) +0*(2**1) +1*(2**2) +1*(2**3) +1*(2**4) +1*(2**5)

/*
// This operator follows precedence like bodmas rule in maths
console.log("Grouping operator:");
let p =1;
let q =2;
let r = 3;
console.log(p+(q*r));
console.log((p+q)*r);
console.log(p+q*r);

*/
console.log("typeOf operator :");
let age =13;
console.log(typeof age);
let name = "Ganesh";
console.log(typeof name);
console.log(typeof null);
console.log(typeof undefined);
console.log(typeof false);

let arr = [1,2,3,4];
console.log(typeof arr);
