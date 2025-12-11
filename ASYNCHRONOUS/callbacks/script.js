  console.log("Async JS Code - callback");

/*
// By default Js is Synchrounous
console.log("1");
console.log("2");
console.log("3");
function greet(){
  console.log("Good Morning !");
}
greet();
console.log("4");

*/
/*
{
  console.log("start");
  console.log("middle");
  console.log("End");
}
*/

/*
// setTimeOut is one of the web API to achieve Asynchronous
{
  console.log("start");
  setTimeout(()=>{
    console.log("middle");
  },2000);
  console.log("end");
}
*/

/*
// callBacks : callBack func, Passing one function ,argument to another function that executes later
{

function fn(arg){
  arg();
}
fn(function(){
  console.log("call back func");
})

}
*/

/*
{
  // This is still synchronous
function greet(name,callback){
  console.log("Hello "+name);
    callback();
}
function sayBye(){
  console.log("Bye");
}

greet("Ganesh", sayBye);
}
*/

/*
{
  // To handle async with callback use setTimeout web api
function greet(name,callback){
  console.log("Hello "+name);
  setTimeout(()=>{
    callback();
  },2000);
    console.log("Iam still hanging here !");
}
function sayBye(){
  console.log("Bye");
}

greet("Ganesh", sayBye);
}
// In setTimeOut itself contains callback fucn and time that means after sometime do this
*/


console.log("Async JavaScript - Callback Hell Example\n");

// ---------------------------
// SIMULATED ASYNC QUERY FUNCTION
// ---------------------------
function query(url, callback, options) {
    console.log(`Fetching: ${url} ...`);

    setTimeout(() => {
        // Fake database responses
        const mockData = {
            "api/pizzahub/": ["store-101"],

            "api/pizzahub/pizzas/store-101": [
                { id: 1, type: "veg", name: "Margherita" },
                { id: 2, type: "veg", name: "Farmhouse" },
                { id: 3, type: "non-veg", name: "Pepperoni" }
            ],

            "api/pizzahub/beverages/1": [
                { id: 101, name: "Coke" }
            ],

            "api/order": {
                createdAt: Date.now()
            }
        };

        // Simulate success
        callback(mockData[url], null);

    }, 1000);
}

// ---------------------------
// CALLBACK HELL: orderPizza()
// ---------------------------
function orderPizza(type, name) {
    console.log("\n🔎 Locating nearest pizza store...");

    query("api/pizzahub/", function (result, error) {
        if (!error) {
            const shopId = result[0];
            console.log(`✔ Store Located: ${shopId}`);

            console.log("\n📦 Loading pizza menu...");
            query(`api/pizzahub/pizzas/${shopId}`, function (pizzas, error) {
                if (!error) {
                    console.log("Available pizzas:", pizzas);

                    const myPizza = pizzas.find(
                        p => p.type === type && p.name === name
                    );

                    console.log(`✔ You ordered: ${myPizza.type} ${myPizza.name}`);

                    console.log("\n🥤 Checking free add-ons...");
                    query(`api/pizzahub/beverages/${myPizza.id}`, function (beverageList, error) {
                        if (!error) {
                            const beverage = beverageList[0];
                            console.log(`✔ Free Add-On: ${beverage.name}`);

                            console.log("\n🛒 Preparing final order...");
                            query(
                                "api/order",
                                function (orderResult, error) {
                                    if (!error) {
                                        console.log(`\n🎉 Your final order is placed!`);
                                        console.log(`Pizza: ${type} ${name}`);
                                        console.log(`Add-On: ${beverage.name}`);
                                        console.log(`Time: ${new Date(orderResult.createdAt).toLocaleTimeString()}`);
                                    } else {
                                        console.log("\n❌ Order failed. Try again!");
                                    }
                                },
                                {
                                    method: "POST",
                                    body: JSON.stringify({
                                        pizzaId: myPizza.id,
                                        beverageId: beverage.id
                                    })
                                }
                            );
                        }
                    });
                }
            });
        }
    });
}

// ---------------------------
// RUN THE PROGRAM
// ---------------------------
orderPizza("veg", "Margherita");
