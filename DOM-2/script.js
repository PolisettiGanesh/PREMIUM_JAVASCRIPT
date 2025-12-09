console.log("DAY-18 : DOM Manipulation :");

/*
{
const pElem = document.createElement("p");
console.log(pElem);
}
*/

/*
{
const pElem = document.createElement("p");
pElem.innerText= "This is paragraph text added dynamically !";
console.log(pElem);
}
*/

/*
{
const pElem = document.createElement("p");
pElem.innerText= "This is paragraph text added dynamically !";
// To append this in Html page  document -> body -> h1,p
document.body.appendChild(pElem);
console.log(pElem);
}
*/

//Insert Elements

{
// const span = document.createElement("span");
// span.innerText = "This is a span tag";

// const pElem = document.querySelector("p");
// document.body.insertBefore(span,pElem);

/*
 Take my span element and insert it before pElem that means we have to check that
 parent of PElem then use this
                    document.body.insertBefore(span,pElem);
        Here PElem of parent is body so Heirarchy : document-->body
 */
}

// 2. This is for After inserting there is no such method
/*
{
const span = document.createElement("span");
span.innerText = "This is a span tag";

const pElem = document.querySelector("p");
console.log(pElem.nextElementSibling);
document.body.insertBefore(span,pElem);
}

*/

/*
{
const span = document.createElement("span");
span.innerText = "This is a span tag";

const h2Elem = document.querySelector("h2");
document.body.insertBefore(span,null);
//1st way: This will insert at last of the body that means after to h2Elem
}
*/

/*
{
const span = document.createElement("span");
span.innerText = "This is a span tag";

const h2Elem = document.querySelector("h2");
document.body.insertBefore(span,h2Elem.nextElementSibling);
// 2nd way : This will insert at last of the body that means after to h2Elem
}

*/
