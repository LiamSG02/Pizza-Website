// Skapar variablerna (pizzaData & ingrediensData) så att de är globala
let pizzaData = [];
let ingrediensData = [];

// Denna kallar funktionerna nedan (fetchIngredienser & fetchPizzor) när hemsidan sidan laddas in
window.onload = function () {
    fetchIngredienser();
    fetchPizzor();

    // Här tas allt som finns i sessionStorage bort när sidan laddas in
    sessionStorage.clear();
};

// Funktionerna hämtar json filerna när de blir kallad asyncroniserat (samtidigt som annan kod)
async function fetchPizzor() {
    const pizzaRes = await fetch('js-and-json/pizzor.json');
    let nyPizzaRes = await pizzaRes.json();
    pizzaData = nyPizzaRes.pizza;

    console.log(pizzaData, 'har laddats in!')
}
async function fetchIngredienser() {
    const ingrediensRes = await fetch('js-and-json/ingredienser.json');
    let nyIngrediensRes = await ingrediensRes.json();
    ingrediensData = nyIngrediensRes.ingrediens;

    console.log(ingrediensData, 'har laddats in!')
}

// Definierar variabel för totalpriset
var totPris = 0;
var pizzaPris = 0;

// Definierar den aktuella pizzan
var aktuellPizza;

// Skapar variabel för antal till de olika ingredienserna
let quantityAdd;
let quantityDel;

// Skapar en array som de dennaVald ingredienserna kan läggas i
let dennaVald = [];

// Denna funktion återställer ingredienserna i modalen och öppnar därefter modalen med nya värden
function openModal(namn) {
    resetItems();
    checkPizza(namn);
}

// Denna funktionen kallas när modalen stängs ner och återställer alla "quantitys" till 0
function resetItems() {
    for (let i = 0; i < ingrediensData.length; i++) {
        document.getElementById('quantity-' + ingrediensData[i].namn).innerHTML = 0;
    }
    dennaVald = [];
}

// Denna funktionen kollar vilken pizza som är dennaVald och lägger till de ingredienser som finns på
// pizzan i arrayen "dennaVald" och sätter deras "quantity" till 1
function checkPizza(namn) {
    for (i in pizzaData) {
        if (namn == pizzaData[i].namn) {
            let pizzaIngrediens = pizzaData[i].ingredienser;

            // Lägger till pizzapriset på totala priset och uppdaterar pizzaPris till samma
            totPris = pizzaData[i].pris;
            pizzaPris = pizzaData[i].pris;

            aktuellPizza = pizzaData[i].namn;

            console.log(pizzaPris)

            // Uppdaterar totala priset i HTML dokumentet
            document.getElementById('total-price').innerHTML = totPris + ':-';

            // Denna loop jämför alla element i arrayen ingredienser och arrayen till pizzans ingredienser
            for (let n = 0; n < pizzaData[i].ingredienser.length; n++) {
                for (let j = 0; j < ingrediensData.length; j++) {
                    if (pizzaIngrediens[n] === ingrediensData[j].namn) {

                        // Lägger in ingrediensen i arrayen "dennaVald"
                        dennaVald.push(ingrediensData[j].namn);

                        // Uppdaterar "quantityn" på varje ingrediens som är finns i båda arraysen till 1
                        document.getElementById('quantity-' + ingrediensData[j].namn).innerHTML = 1;
                    }
                }
            }
        }
    }
}

// Funktionen kallas när man klickar på knappen (+) med onclick funktionen addItem
function addItem(namn) {
    // Variabler som inte är globala (som bara finns i denna funktionen)
    quantityAdd = 0;

    // En forin loop som kollar om ingrediensen finns i JSON filen och lägger till den i arrayen dennaVald
    for (let i = 0; i < ingrediensData.length; i++) {
        if (namn == ingrediensData[i].namn) {
            // Lägger till priset på ingrediensen i det totala priset
            totPris = totPris + ingrediensData[i].pris;

            // Lägger till namnet på ingrediensen i en lista
            dennaVald.push(namn);

            // Uppdaterar antalet av just denna ingrediensen (QUANTITY)
            for (n in dennaVald) {
                if (namn == dennaVald[n])
                    quantityAdd++;
            }
            document.getElementById('quantity-' + namn).innerHTML = quantityAdd;

            // Uppdaterar totala priset
            document.getElementById('total-price').innerHTML = totPris + ':-';
        }
    }
}

// Funktionen kallas när man klickar på knappen (-) med onclick funktionen delItem
function delItem(namn) {
    // Variabler som inte är globala (som bara finns i denna funktionen)
    let senastdennaVald = 0;
    quantityDel = 0;

    // En forin loop som kollar om ingrediensen finns i JSON filen och tar bort den arrayen dennaValds
    for (let i = 0; i < ingrediensData.length; i++) {

        if (namn == ingrediensData[i].namn) {

            // Kollar antalet ingredienser (quantity)
            for (n in dennaVald) {
                if (namn == dennaVald[n]) {
                    quantityDel++;
                    senastdennaVald = n;
                }
            }

            // Kollar så att man inte kan ta bort en ingrediens om den inte fins med i arrayen dennaVald
            if (quantityDel > 0) {

                if (totPris > pizzaPris) {
                    // Lägger till priset på ingrediensen i det totala priset
                    totPris = totPris - ingrediensData[i].pris;
                }

                // Tar bort namnet på ingrediensen i en lista
                dennaVald.splice(senastdennaVald, 1);

                // Sätter antalet till 0 för att sedan kunna gå genom
                quantityDel = 0;

                for (n in dennaVald) {
                    if (namn == dennaVald[n]) {
                        quantityDel++;
                    }
                }

                document.getElementById('quantity-' + namn).innerHTML = quantityDel;

                // Uppdaterar totala priset
                document.getElementById('total-Pris').innerHTML = totPris + ':-';

                return;
            } else {
                return;
            }
        }
    }
}