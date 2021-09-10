if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(name) {

    let data = document.getElementById('pizza-item-' + name).innerHTML
    console.log(name)
    data = data.split(' ')
    data.pop();

    for (let i = 0; i < sessionStorage.length; i++) {

        var storedItem = sessionStorage.getItem(sessionStorage.key(i))
        console.log(storedItem)

        if (typeof storedItem === "string") {

            var storedItem = JSON.parse(storedItem)
            console.log(storedItem)

            console.log(storedItem.name, '-', name)
            console.log(storedItem.ingredienser, '-', data)

            if (storedItem[0].name == name && storedItem[0].ingredienser == data) {
                console.log('hej')
                sessionStorage.removeItem(sessionStorage.key(i))
            }
        }
    }

    var buttonClicked = document.getElementById('remove-' + name)

    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked() {
    let currentPizzaCount = 0;

    for (let i = 0; i < sessionStorage.length; i++) {

        let keys = sessionStorage.key(i).split('-')

        if (keys[1] == currentPizza) {
            currentPizzaCount++
        }
    }

    let thisPizzaData = [
        {
            "name": currentPizza,
            "price": totPrice,
            "ingredienser": vald
        }
    ];

    sessionStorage.setItem('pizza-' + currentPizza + '-' + currentPizzaCount, JSON.stringify(thisPizzaData))

    var data = thisPizzaData

    addItemToCart(data)
    updateCartTotal()
}

function firstLetterUpper(string) {

    let chars = string.split('')
    let firstChar = chars[0].toUpperCase();
    chars[0] = firstChar;

    string = chars.join('');
    return string;
}

function generateDropdown(name, data) {

    var dropRow = document.createElement('div')

    for (let i = 0; i < data.length; i++) {
        var dropContent = `${data[i] + ' '}`

        dropRow.innerHTML = dropRow.innerHTML + dropContent;
    };

    HTMLtext = `
        <div class="container">
            <h4>Ingredienser</h4>
            <div class="pizza-items" id="pizza-item-${name}">${dropRow.innerHTML}</div>
        </div>
        `

    return HTMLtext;
}

var cartItemNames = [];
var cartItemIngredienser = [];

function addItemToCart(data) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')

    let dataName = data[0].name;
    let name = firstLetterUpper(dataName);

    let pizzaItems = data[0].ingredienser;

    let price = data[0].price;

    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == name) {
            alert('This item is already added to the cart')
            return
        }
    }

    var nameAndPrice = `
        <div class="cart-item cart-column">
            <span class="cart-item-title">${name}</span>
        </div>
        <span class="cart-price cart-column">${price + ":-"}</span>s`;

    var ingrediensDrop = generateDropdown(dataName, pizzaItems);

    console.log(pizzaItems)

    var lastPart = `
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" id="remove-${dataName}" onclick="removeCartItem('${dataName}')" type="button">REMOVE</button>
        </div>`;
    cartRow.innerHTML = nameAndPrice + ingrediensDrop + lastPart;
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = total + ':-'
}