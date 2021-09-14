function addValue() {
    let dataInput = document.getElementById("data")
    let prisInput = document.getElementById("tot-pris")

    for (let i = 0; i < sessionStorage.length; i++) {
        thisStored = sessionStorage.getItem(sessionStorage.key(i))

        if (typeof thisStored == "string") {

            output = output + thisStored;
        }
    }

    dataInput.value = output
    prisInput.value = totPris
}