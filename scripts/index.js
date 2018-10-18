//=======================================
//DOM selections
const orderForm = document.querySelector('[data-form]');
const orderComplete = document.querySelector('[data-completed]');


//=======================================
// Helper functions
//=======================================
// ask chris about not specifically referencing the 'data' arguement
function orderCompleted(data){
let newOrder = document.createElement('p')
newOrder.textContent= `Your order of ${data.coffee} coffee has been processed`;
orderComplete.appendChild(newOrder)
// debugger;
console.log(data.coffee);
}


function handleSubmit(event){
    event.preventDefault();
    console.log('coffee get');
    console.log(event.target);
    // AJAX that thing
    //call fetch
    // pass it the url
    // and an object with a method and a body
    const url = event.target.action;
    const method = event.target.method;
    const elements = event.target.elements;
    const data = {
        strength: elements.strength.value,
        flavor: elements.flavor.value,
        size: elements.size.value,
        coffee: elements.coffee.value,
        emailAddress: elements.emailAddress.value
    };

    fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(data)

    })
        .then(r => r.json())
        .then(orderCompleted(data))
        .then(console.log)

}


//=======================================
// Main Event Listeners

orderForm.addEventListener('submit', handleSubmit)