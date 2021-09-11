// En funktion som gör första bokstaven i en string
// till stor bokstav
function firstLetterUpper(string) {
    let chars = string.split('')
    let firstChar = chars[0].toUpperCase();
    chars[0] = firstChar;

    string = chars.join('');
    return string;
}

// Detta kallar på funktionen "ready" när sidan har laddat in
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

// Kallas när sidan laddat in
function ready() {
    // Skapar en array som håller alla element med klassen "btn-danger"
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')

    // För varje element med klassen "btn-danger" lägg en eventlistener
    // som kallar "removeCartItem" när knappen klickas på
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    // Skapar en array som håller alla element med klassen "cart-quantity-input"
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')

    // För varje element med klassen "cart-quantity-input" lägg en eventlistener
    // som kallar "quantityChanged" när knappen klickas på
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    // Skapar en array som håller alla element med klassen "shop-item-button"
    var addToCartButtons = document.getElementsByClassName('shop-item-button')

    // För varje element med klassen "shop-item-button" lägg en eventlistener
    // som kallar "addToCartClicked" när knappen klickas på
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    // Lägger en eventlistener på köp-knappen/ knappar med klassen "btn-purchase"
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

// När man klickar på add to cart på din pizza
function addToCartClicked() {
    // Definierar variabeln "aktuellPizzaCount"
    let aktuellPizzaCount = 0;

    // Kollar igenom sessionStorage och kollar hur många av samma
    // pizza som finns där
    for (let i = 0; i < sessionStorage.length; i++) {
        let keys = sessionStorage.key(i).split('-')
        if (keys[1] == aktuellPizza) {
            // Lägger till 1 i "aktuellPizzaCount"
            aktuellPizzaCount++
        }
    }

    // Skapar en (JSON fil) som ska innehålla pizzans
    // namn, pris och ingredienser
    let aktuellPizzaData = [
        {
            "name": aktuellPizza,
            "price": totPris,
            "ingredienser": dennaVald
        }
    ];

    // Lägger in pizzan i sessionStorage för att kunna använda den senare
    sessionStorage.setItem('pizza-' + aktuellPizza + '-' + aktuellPizzaCount, JSON.stringify(aktuellPizzaData))

    // Skickar med pizzans data till "addItemToCart" funktionen
    var data = aktuellPizzaData
    addItemToCart(data)

    // Uppdaterar kundvagnens totala pris
    updateCartTotal()
}

// Lägger till pizzan och dess ingredienser i kundvagnen
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

    var ingrediensDrop = genereraIngredienser(dataName, pizzaItems);

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

// Genererar ingredienserna till den spesifika pizzan
// så att de kan läggas i kundvagnen
function genereraIngredienser(name, data) {

    var dropRow = document.createElement('div')

    for (let i = 0; i < data.length; i++) {
        var dropContent = `${data[i] + ' '}`

        dropRow.innerHTML = dropRow.innerHTML + dropContent;
    };

    HTMLtext = `
        <div class="container">
            <h4>Ingredienser</h4>
            <div class="pizza-items" id="pizza-item-${name}">${dropRow.innerHTML}</div>
        </div>`
    
    return HTMLtext;
}

// Tar bort pizzan och dess ingredienser från kundvagnen
// samt sessionStorage
function removeCartItem(name) {

    let data = document.getElementById('pizza-item-' + name).innerHTML
    console.log(name)
    data = data.split(' ')
    data.pop();

    for (let i = 0; i < sessionStorage.length; i++) {

        var storedItem = sessionStorage.getItem(sessionStorage.key(i))
        console.log(storedItem)

        if (typeof storedItem === "string") {

            storedItem = JSON.parse(storedItem)
            storedIngredienser = JSON.stringify(storedItem[0].ingredienser)
            data = JSON.stringify(data)

            console.log(storedItem[0].name, name)
            console.log(storedIngredienser, data)

            if (storedItem[0].name == name && storedIngredienser == data) {
                console.log('hej')
                sessionStorage.removeItem(sessionStorage.key(i))
            }
        }
    }

    var buttonClicked = document.getElementById('remove-' + name)

    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

// Denna kallas när antalet på någon av pizzorna i
// kundvagnen uppdateras
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

// Kallas när kundvagnens totala pris ska uppdateras
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

// När man klickar på köp-knappen med klassen "btn-purchase" på
function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}