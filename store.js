if (document.readyStateState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

function ready(){
    var removeCartItemButtons = document.getElementsByClassName("btn-danger") 
console.log(removeCartItemButtons)
for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    button.addEventListener("click", function(event) {
        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
    })    
    
}
    var quantityInputs = document.getElementsByClassName("cart-quantity-input")
    for (var i = 0; i < quantityInput.length; i++) {
        var input = quantityInput[i]
        input.addEventListener("change", quantityChange)
    }
}

function quantityChange(event){
    var input = event.target
    if (isNaN(input.value) input.value <= 0){
        input.value = 1
    }
    updateCartTotal()
}

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName("cart-item")[0]
    var cartRows = cartItemContainer.getElementsByClassName("cart-row")
    var total = 0
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var cartRow = cartRow[i]
        var priceElement = cartRow.getElementsByClassName("cart-price")[0]
        var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0]
        var price = parseFloat(priceElement.innerText.replace("$", ""))
        var quantity = quantityElement.value
        total = total + (price * quantity)
        document.getElementsByClassName("cart-total-price")[i].innerText = "$" + total

    }
}