console.log(document);

let titleElem = document.getElementById("heading");
console.log(titleElem);

let infoElems = document.getElementsByClassName("info");
console.log(infoElems);
console.log(infoElems[0],infoElems[1]);

[...infoElems].forEach((elem)=>{
    console.log(elem);
})


let pTagElems = document.getElementsByTagName("p");
console.log(pTagElems);

let pInfo = document.querySelector(".info");
console.log(pInfo);

let pInfos = document.querySelectorAll(".info");
console.log(pInfos);

let hOne = document.querySelector("#heading");
console.log(hOne);


//-----------------------------------------------------
//1.Mini Project

function highlightText(){
    let elements = document.querySelectorAll("p.info");
    elements.forEach((element)=>{
        //console.log(element);
        element.style.backgroundColor = "yellow";
    })
}



//2.Mini Project

function filterList(){
    let inputElem = document.getElementById("searchInput");
    let input =  inputElem.value;
    let items = document.querySelectorAll("ul#itemList li");
    items.forEach((item)=>{
        // item.style.backgroundColor = item.innerText.toLowerCase().includes(input.toLowerCase())?"green":""
        item.style.display = item.innerText.toLowerCase().includes(input.toLowerCase())? "block":"none" ;
    })
}


















