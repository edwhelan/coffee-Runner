//=======================================
//DOM selections
const orderForm = document.querySelector('[data-form]');


//=======================================
// Helper functions
//=======================================

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


}


//=======================================
// Main Event Listeners

orderForm.addEventListener('submit', handleSubmit)