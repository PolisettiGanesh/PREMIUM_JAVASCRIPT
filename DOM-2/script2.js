// Remove Items
/*
{
  let list = document.getElementById("myList");
  console.log(list.children); // will return HTML Collection Array
}

*/

/*
{
  let list = document.getElementById("myList");
  let itemToRemove = list.children[0];
  console.log(itemToRemove);
}
*/

/*
{
  let list = document.getElementById("myList");
  let itemToRemove = list.children[0];
  list.removeChild(itemToRemove);
}
*/

/*
//particular element to remove
{
  document.getElementById("removeDiv").remove();
}
*/

/*
// to remove entire list this is simple approach
{
  let list = document.getElementById("myList");
  list.innerText="";
  //list.textContent="";
}
*/

/*
//one more method recently introduced to remove that list
{
   let list = document.getElementById("myList");
   list.replaceChildren();
}
*/

/*
//to replace the children in ul tag with div either static or dynamic, we can pass multiple elements
{
   let list = document.getElementById("myList");
   list.replaceChildren("<div>This is a div</div>"); //static way
   let divELem = document.querySelector("div");
   list.replaceChildren(divELem); //dynamic way
}
*/
