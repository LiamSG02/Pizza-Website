// Skapar variabel för att göra (data) användbar globalt
let data;

// Definierar variabel för totalpriset
var totPrice = 0;

// Skapar variabel för antal till de olika ingredienserna
let quantityAdd;
let quantityDel;

// Skapar en array som de valda ingredienserna kan läggas i
let vald = [];

// Denna kallar funktionen nedan (fetchData) när sidan laddas
window.onload = function () {
    fetchData();
};

// Funktionen hämtar json filen när den blir kallad asyncroniserat (samtidigt som annan kod)
async function fetchData() {
    const res = await fetch('ingredienser.json');
    newRes = await res.json();
    data = newRes.ingrediens;

    console.log('async function is loaded', data);
}

// Funktionen kallas när man klickar på knappen (+) med onclick funktionen addItem
function addItem(name) {
    // Variabler som inte är globala (som bara finns i denna funktionen)
    quantityAdd = 0;
    i = 0;

    // En forin loop som kollar om ingrediensen finns i JSON filen och lägger till den i arrayen vald
    for (i in data) {
        while (i <= data.length) {
            if (name == data[i].iname) {
                // Lägger till priset på ingrediensen i det totala priset
                totPrice = totPrice + data[i].price;

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

                return;
            } else {
                i++
            }
        }
    }
}

// Funktionen kallas när man klickar på knappen (-) med onclick funktionen delItem
function delItem(name) {
    // Variabler som inte är globala (som bara finns i denna funktionen)
    let senastVald = 0;
    quantityDel = 0;
    i = 0;

    // En forin loop som kollar om ingrediensen finns i JSON filen och tar bort den arrayen valds
    for (i in data) {
        while (i <= data.length) {
            if (name == data[i].iname) {

                // Kollar antalet ingredienser (quantity)
                for (n in vald) {
                    if (name == vald[n]){
                        quantityDel++;
                        senastVald = n;
                    }
                }

                // Kollar så att man inte kan ta bort en ingrediens om den inte fins med i arrayen vald
                if (quantityDel > 0) {
                    // Lägger till priset på ingrediensen i det totala priset
                    totPrice = totPrice - data[i].price;

                    // Tar bort namnet på ingrediensen i en lista
                    vald.splice(senastVald, 1);

                    // Sätter antalet till 0 för att sedan kunna gå genom
                    quantityDel = 0;

                    for (n in vald) {
                        if (name == vald[n]){
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
            } else {
                i++;

            }
        }
    }
}