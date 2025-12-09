// Traversing/ Navigating DOM
/*
//From child to Parent Traversing
{
    // ParentNode and ParentElement
  const span = document.getElementById("text");
  console.log(span);
  console.log("parent Element :",span.parentElement);
  console.log("Parent Node :",span.parentNode);

  //Element: Element is just Html elements but Node: contains commentnode,textnode,docuemntnode everyhting
}
*/

/*
{
  const span = document.getElementById("text");
  console.log(span);
  console.log("Grand parent Element :",span.parentElement.parentElement);
  console.log("Grand Parent Node :",span.parentNode.parentNode);
}
*/

/*
// children and childNodes
// children return HTML collection and only elements present we need to convert to array and use array methods
// childNodes return NodeList [array] and including alltypes of nodes like text,comment,\n,attribute we can use directly Array methods
{
const mainElem = document.getElementById("main-id");
console.log("children : ",mainElem.children);
console.log("child Nodes : ",mainElem.childNodes);
}
*/

/*
{
const mainElem = document.getElementById("main-id");
console.log("First Child : ",mainElem.firstChild); // \n that means text
console.log("First Node : ",mainElem.firstElementChild); // p element
}
*/

// nextSibling
//nextSiblingElement
//previousSibling
//previousSiblingElement
{
const divElem = document.getElementById("container");
console.log(divElem.previousSibling) // node reference - text (\n)
console.log(divElem.previousElementSibling); // element before div
console.log(divElem.nextElementSibling) // element after div
console.log(divElem.nextSibling)// node reference - text(\n)
}
