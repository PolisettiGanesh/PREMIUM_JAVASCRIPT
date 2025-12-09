// Manipulating Styles

/*
{
  const pElem = document.querySelector(".styling");
  console.log(pElem.style);
  console.log(pElem.style.color);
  console.log(pElem.style.backgroundColor);
  pElem.style.color = "white";
  pElem.style.backgroundColor = "red";
}
*/

/*
{
  const divElem = document.querySelector(".first-class");
  console.log(divElem.className);
  console.log(divElem.classList);

}
  */

/*
{
  const divElem = document.querySelector(".first-class");
  divElem.className="second-class";
  console.log(divElem);
  divElem.classList.add("third-class");
  divElem.classList.remove("first-class");
  divElem.classList.replace("third-class","3rd-class");
 console.log("Does it have ?",divElem.classList.contains("3rd-class"));
  console.log("Does it have ?",divElem.classList.contains("1st-class"));
  divElem.classList.toggle("test");
  divElem.classList.toggle("test");
}
*/

{
  const divElem = document.querySelector(".first-class");
   divElem.className="second-class";

  //  divElem.style.display="none"; //permanently none no space avilable
  // divElem.style.display="block";

  //  divElem.style.visibility="hidden" // this will show that div but it hides it sopace everyhting will be available
  //divElem.style.opacity ="0.1"; //opacity light visible
  divElem.style.opacity ="1"; // visible
}
