//+++++++++++++++++++++++++++++++++++++++
//POST Sections
//=======================================
//DOM selections POST
const orderForm = document.querySelector('[data-form]');
const orderComplete = document.querySelector('[data-completed]');

//=======================================
// Helper functions POST
//=======================================
// ask chris about not specifically referencing the 'data' arguement
function orderCompleted(data) {
	let newOrder = document.createElement('p');
	newOrder.textContent = `Your order of ${data.coffee} coffee has been processed`;
	orderComplete.appendChild(newOrder);
	// debugger;
	console.log(data.coffee);
}

function handleSubmit(event) {
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
			'Content-Type': 'application/json; charset=utf-8'
		},
		body: JSON.stringify(data)
	})
		.then((r) => r.json())
		.then(orderCompleted(data))
}

//=======================================
// Main Event Listeners POST

orderForm.addEventListener('submit', handleSubmit);

//+++++++++++++++++++++++++++++++++++++++
// GET COFFEE ORDER SECTION ----------------------
//========================================
// DOM selectors GET
const outputElement = document.querySelector('[data-output]');

//========================================
//Order Helper functions
function err() { //err for catch
	console.log(`an Error has occurred BEEP BOOP`);
}

function getOrdersFromShop() { //get all the existing orders from server 
	fetch(`https://dc-coffeerun.herokuapp.com/api/coffeeOrders`)
		.then((r) => r.json())
		.then(extractToDiv)
		.catch(err);
}

function extractToDiv(data) {
	//draw to area
	let pendingCoffeeOrders = Object.values(data);
	pendingCoffeeOrders.forEach(function (aCoffeeOrder) {
		putToOrderForm(
			`Order: ${aCoffeeOrder.emailAddress}, ${aCoffeeOrder.coffee}, ${aCoffeeOrder.flavor}, ${aCoffeeOrder.strength}, ${aCoffeeOrder.size}: will be ready soon!`
		);
	});
}

//put orders to bottom div
function putToOrderForm(data) {
	let existingOrders = document.createElement('li');
	existingOrders.textContent = `${data}`;
	outputElement.appendChild(existingOrders);
}

//========================================
//Main Event Listeners for GET
getOrdersFromShop();
