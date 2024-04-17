let array = JSON.parse(localStorage.getItem("personArray")) || ["Kathi", "Marvin", "Salva", "Chris"];

//array einträge mit html verbinden
let first_person = document.getElementById("first_person");
first_person.textContent = array[0];

let second_person = document.getElementById("second_person");
second_person.textContent = array[1];

let third_person = document.getElementById("third_person");
third_person.textContent = array[2];

let forth_person = document.getElementById("forth_person");
forth_person.textContent = array[3];

function updateNames() {
    document.getElementById("first_person").textContent = array[0];
    document.getElementById("second_person").textContent = array[1];
    document.getElementById("third_person").textContent = array[2];
    document.getElementById("forth_person").textContent = array[3];
}




document.getElementById("rotate").onclick = function(){

    // Verschiebe die Namen um eine Stelle
    const temp = array[3];
    array[3] = array[2];
    array[2] = array[1];
    array[1] = array[0];
    array[0] = temp;

    // Speichere die aktualisierte Reihenfolge
    localStorage.setItem("personArray", JSON.stringify(array));

    // Aktualisiere die angezeigten Namen
    updateNames();
};

// Initialisiere die Namen beim Laden der Seite
updateNames();

