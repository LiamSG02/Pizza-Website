// Skapar variabel för att göra (data) användbar globalt
let data;

// Definierar variabel för totalpriset
var totPrice = 0;
var pizzaPrice = 0;

// Skapar variabel för antal till de olika ingredienserna
let quantityAdd;
let quantityDel;

// Skapar en array som de valda ingredienserna kan läggas i
let vald = [];

// Denna kallar funktionen nedan (fetchData) när sidan laddas
window.onload = function () {
    fetchIngredienser();
    fetchPizzor();
};

// Funktionerna hämtar json filen när den blir kallad asyncroniserat (samtidigt som annan kod)
async function fetchPizzor() {
    const pizzaRes = await fetch('js-and-json/pizzor.json');
    newPizzaRes = await pizzaRes.json();
    pizzaData = newPizzaRes.pizza;

    console.log('Pizza data:', pizzaData);
}
async function fetchIngredienser() {
    const itemRes = await fetch('js-and-json/ingredienser.json');
    newItemRes = await itemRes.json();
    itemData = newItemRes.ingrediens;

    console.log('Item data:', itemData);
}

// Denna funktionen kallas när modalen stängs ner och återställer alla "wuantitys" till 0
function resetItems() {
    for (let i = 0; i < itemData.length; i++) {
        document.getElementById('quantity-' + itemData[i].iname).innerHTML = 0;
    }
    vald = [];
}

// Denna funktionen kollar vilken pizza som är vald och lägger till de ingredienser som finns på
// pizzan i arrayen "vald" och sätter deras "quantity" till 1
function checkPizza(name) {
    for (i in pizzaData) {
        if (name == pizzaData[i].pname) {
            let pizzaIngrediens = pizzaData[i].ingredienser;

            // Lägger till pizzapriset på totala priset och uppdaterar pizzaPrice till samma
            totPrice = pizzaData[i].price;
            pizzaPrice = pizzaData[i].price;

            // Uppdaterar totala priset i HTML dokumentet
            document.getElementById('total-price').innerHTML = totPrice + ':-';

            // Denna loop jämmför alla element i arrayen ingredienser och arrayen till pizzans ingredienser
            for (let n = 0; n < pizzaData[i].ingredienser.length; n++) {
                for (let j = 0; j < itemData.length; j++) {
                    if (pizzaIngrediens[n].iname === itemData[j].iname) {
                        vald.push(itemData[j].iname);

                        // Uppdaterar "quantityn" på varje ingrediens som är finns i båda arraysen till 1
                        document.getElementById('quantity-' + itemData[j].iname).innerHTML = 1;
                    }
                }
            }
        }
    }
}

// Funktionen kallas när man klickar på knappen (+) med onclick funktionen addItem
function addItem(name) {
    // Variabler som inte är globala (som bara finns i denna funktionen)
    quantityAdd = 0;

    // En forin loop som kollar om ingrediensen finns i JSON filen och lägger till den i arrayen vald
    for (let i = 0; i < itemData.length; i++) {
        if (name == itemData[i].iname) {
            // Lägger till priset på ingrediensen i det totala priset
            totPrice = totPrice + itemData[i].price;

            // Lägger till namnet på ingrediensen i en lista
            vald.push(name);

            // Uppdaterar antalet av just denna ingrediensen (QUANTITY)
            for (n in vald) {
                if (name == vald[n])
                    quantityAdd++;
            }
            document.getElementById('quantity-' + name).innerHTML = quantityAdd;

            // Uppdaterar totala priset
            document.getElementById('total-price').innerHTML = totPrice + ':-';
        }
    }
}

// Funktionen kallas när man klickar på knappen (-) med onclick funktionen delItem
function delItem(name) {
    // Variabler som inte är globala (som bara finns i denna funktionen)
    let senastVald = 0;
    quantityDel = 0;

    // En forin loop som kollar om ingrediensen finns i JSON filen och tar bort den arrayen valds
    for (let i = 0; i < itemData.length; i++) {

        if (name == itemData[i].iname) {

            // Kollar antalet ingredienser (quantity)
            for (n in vald) {
                if (name == vald[n]) {
                    quantityDel++;
                    senastVald = n;
                }
            }

            // Kollar så att man inte kan ta bort en ingrediens om den inte fins med i arrayen vald
            if (quantityDel > 0) {

                if (totPrice > pizzaPrice) {
                    // Lägger till priset på ingrediensen i det totala priset
                    totPrice = totPrice - itemData[i].price;
                }

                // Tar bort namnet på ingrediensen i en lista
                vald.splice(senastVald, 1);

                // Sätter antalet till 0 för att sedan kunna gå genom
                quantityDel = 0;

                for (n in vald) {
                    if (name == vald[n]) {
                        quantityDel++;
                    }
                }

                document.getElementById('quantity-' + name).innerHTML = quantityDel;

                // Uppdaterar totala priset
                document.getElementById('total-price').innerHTML = totPrice + ':-';

                return;
            } else {
                return;
            }
        }
    }
}

// "Köp" de ingredienser som är valda
function purchase() {
    if (totPrice > 0) {
        alert(
            'Du betalade ' + totPrice + ':- för dina ingredienser!'
        );
        resetItems();
        document.getElementById('total-price').innerHTML = pizzaPrice + ':-';
    } else {
        alert('Du måste lägga till minst en ingrediens för att köpa!');
    }
}