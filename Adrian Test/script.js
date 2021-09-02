
let ingredienser = ["köttfärssås", "tonfisk", "lök", "sardeller", "kapris", "oliver", "bacon", "ägg", "räkor", "kronärtskocka", "vitlök", "skinka", "gorgonzola", "tomat", "peperoni", "mozzarella", "parmesan", "soltorkad tomat", "basilika", "musslor", "crabfish", "svart kaviar"];

let vald = [];

function myFunction(name){

    var checkBox = document.getElementById(name);
    console.log(checkBox)
    
    if (checkBox.checked == true){
        vald.push(name);
        alert(vald);
    } else{
        for (i in vald){
            while (i <= vald.length){
                if (name == vald[i]){
                    vald.splice(i, 1);
                    alert(vald)
                    return
                } else{
                    i++
                }
            }
        }
    }
}