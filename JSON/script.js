let stringJson =`{
    "name":"Ganesh",
    "age":21,
    "is Married":false,
    "department":"CSE",
    "func":null
}`

console.log(stringJson);

let json = JSON.parse(stringJson);
console.log(json);

// let newStringJson = Object.toString(json); // wont maintain format

let newStringJson = JSON.stringify(json);
console.log(newStringJson);

//Json methods maintain format 
            // 1. JSON.parse()
            // 2. JSON.stringify()

/*

let json =`{
    "name":"Ganesh",
    "age":21,
    "is Married":false,
    "department":"CSE",
    "func":null
}`

browser console output
----------------------
{
    "name":"Ganesh",
    "age":21,
    "is Married":false,
    "department":"CSE",
    "func":null
}

json.name
undefined

json.age
undefined

typeof json
'string'

JSON.parse(json);
{name: 'Ganesh', age: 21, is Married: false, department: 'CSE', func: null}

typeof json
'string'


*/





/*


let stringJson ={
    "name":"Ganesh",
    "age":21,
    "is Married":false,
    "department":"CSE",
    "func":null
}
 // Browser Console output  

{name: 'Ganesh', age: 21, is Married: false, department: 'CSE', func: null}

json["is Married"]   // -- bad practise
false

json.name
'Ganesh'

json.age
21

typeof json
'object'

*/