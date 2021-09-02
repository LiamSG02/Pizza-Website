
let data;

/* window.onload = function () {
    getIngredienser();
}; */

async function getIngredienser() {
    let url = 'ingredienser.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}
async function renderIngredienser() {
    let ingredienser = await getIngredienser();
    let html = '';
    ingredienser.forEach(ingrediens => {
        let htmlSegment = `<div class="ingrediens">
                            <h2>${ingrediens.iname}</h2>
                            <p>${ingrediens.price}</p>
                            <hr>
                        </div>`;

        html += htmlSegment;
    });

    let container = document.querySelector('.container');
    container.innerHTML = html;
}

function addItem(name) {

}
function delItem(name) {

}

/* function checkBoxClick(name) {

    var checkBox = document.getElementById(name);

    if (checkBox.checked == true) {
        vald.push(name);
        console.log(vald);
    } else {
        for (i in vald) {
            while (i <= vald.length) {
                if (name == vald[i]) {
                    vald.splice(i, 1);
                    console.log(vald)
                    return
                } else {
                    i++
                }
            }
        }
    }
} */