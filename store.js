var removeCartItemButtons = document.getElementsByClassName("btn-danger") 
console.log(removeCartItemButtons)
for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    button.addEventListener("click", function(event) {
        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
    })    
    
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