
/*
async function fetchData(){
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    console.log( await response.json());
}

fetchData();

*/

async function fetchData(){
    let response = await fetch("https://jsonplaceholder.typicode.com/users/2");
    console.log( await response.json());
}

fetchData();

/*
- work with news Api
- work with whether api
- build projects related to this

*/