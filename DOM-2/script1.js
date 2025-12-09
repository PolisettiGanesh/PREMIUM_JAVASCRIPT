// Modify Content

/*
{
  const pElem = document.querySelector("p");
  //pElem.innerHTML = "Hello How are You !"; // this will overide already present content in pElem then you think that innerHTML and innerText doing same thing but notice

}
*/

/*

{
 const pElem = document.querySelector("p");
 //pElem.innerHTML = "<u>Hello </u> How are You !"; // now observe UI this will treat as HTML but innerText not
 pElem.innerText= "<u>Hello </u> How are You !"; // now observe this treat as normal text
}
//Note: Don't use innerHtml it will give securty risks ,malicious dat some attackers can chnage without permission that is XSS ,if you want to use DOM purify library to clean up . ....!! Read more about this
*/


{
  const divELem = document.querySelector("div");
  console.log("Inner text : ",divELem.innerText);
  console.log("Text content :",divELem.textContent);
  // innerText care about css visibility so its not showing "test" ,but textContent dont care about visibility so its showing "test" in console
}
