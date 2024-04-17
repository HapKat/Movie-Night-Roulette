//Chart für wer wie viele FIlme vorgeschlagen
var movieCounts = JSON.parse(localStorage.getItem("movieCounts")) || {kathi: 1, marvin: 2, salva: 4, chris: 3};

var Strikes = JSON.parse(localStorage.getItem("Strikes")) ||{kathi: 0, marvin: 0, salva: 2, chris: 1
};

var Success = JSON.parse(localStorage.getItem("Success")) || {kathi: 0, marvin: 2, salva: 1, chris: 1
};

function displayCharts() {

    displayChart();
    displayAverageRatings();
    displayTop3();
    displayTable();
}

function displayChart() {
    var ctx = document.getElementById('myChart').getContext('2d');

    // Zerstöre das vorherige Diagramm, wenn es existiert
    Chart.getChart(ctx)?.destroy();

    // Erstelle das Diagramm
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(movieCounts),
            datasets: [{
                label: 'Number of Movies',
                data: Object.values(movieCounts),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    stepSize: 1,
                },
            },
        },
    });
}



    // Funktion zum Berechnen und Anzeigen der durchschnittlichen Bewertungen nach Person
function displayAverageRatings() {
    // Ein Objekt zum Sammeln der Bewertungen und Anzahl der Filme pro Person
    var ratingData = {};

    // Iteriere durch den lokalen Speicher
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var storedMovie = JSON.parse(localStorage.getItem(key));

        if (!isNaN(storedMovie.avg_rating)) {
        // Initialisiere ratingData, wenn es noch nicht existiert
        if (!(storedMovie.who in ratingData)) {
            ratingData[storedMovie.who] = { totalRating: 0, movieCount: 0 };
        }


            ratingData[storedMovie.who].totalRating += storedMovie.avg_rating;
            ratingData[storedMovie.who].movieCount++;
    }
}


    // Ziel-UL-Element auswählen
    var ratingsListContainer = document.getElementById("ratings");

    // Leere die vorhandenen Listenelemente
    ratingsListContainer.innerHTML = "";

    // Iteriere durch die gesammelten Bewertungen und berechne den Durchschnitt
    for (var person in ratingData) {
        if (ratingData.hasOwnProperty(person)) {
            var averageRating = ratingData[person].totalRating / ratingData[person].movieCount;

            // Füge ein Listenelement mit dem Durchschnitt hinzu
            var listItem = document.createElement("li");
            listItem.textContent = person + ": " + averageRating.toFixed(2);
            ratingsListContainer.appendChild(listItem);
        }
    }
    }


     // Beste 3 Filme
    function displayTop3() {

        // Sammle alle Filme aus dem lokalen Speicher
        var allMovies = [];
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            var storedMovie = JSON.parse(localStorage.getItem(key));
            allMovies.push(storedMovie);
        }
    
        // Sortiere die Filme nach dem Durchschnittsrating in absteigender Reihenfolge
        allMovies.sort(function (a, b) {
            return b.avg_rating - a.avg_rating;
        });
    
        // Begrenze die Anzahl der anzuzeigenden Filme auf die Top 3
        var top3Movies = allMovies.slice(0, 3);
    
        // Ziel-UL-Element auswählen
        var top3ListContainer = document.getElementById("top3");
    
        // Leere die vorhandenen Listenelemente
        top3ListContainer.innerHTML = "";
    
        // Iteriere durch die Top 3 Filme und füge sie zur Liste hinzu
        top3Movies.forEach(function (movie) {
            var listItem = document.createElement("li");
            listItem.textContent = movie.name + ": " + movie.avg_rating.toFixed(2);
            top3ListContainer.appendChild(listItem);
        });
    }


function displayTable(){

        for (var person in Strikes) {
        if (Strikes.hasOwnProperty(person)) {
            // Access the DOM element corresponding to the person
            var personElement = document.getElementById(person + "_bad");

            // Check if the element exists before trying to update its content
            if (personElement) {
                personElement.innerHTML = "";
                // Add dots based on the number of Strikes
                for (var i = 0; i < 3; i++) {
                    var dot = document.createElement("span");
                    dot.className = "dot" + (i < Strikes[person] ? " filled" : ""); 
                    personElement.appendChild(dot);

                    if (Strikes[person] == 3){
                        var punishedButton = document.getElementById(person + "_punishment")
                        punishedButton.style.display = "block";
                    }
                }
            } else {
                console.error("Element with id '" + person + "_bad' not found");
            }
        }
    }
}

    // Similar loop for Success object
    for (var person in Success) {
        if (Success.hasOwnProperty(person)) {
            var personElement = document.getElementById(person + "_good");
            if (personElement) {
                personElement.innerHTML = "";

                for (var i = 0; i < 3; i++) {
                    var dot = document.createElement("span");
                    dot.className = "dot" + (i < Success[person] ? " filled" : ""); // Add "filled" class for filled circles
                    personElement.appendChild(dot);

                    if (Success[person] == 3){
                        var reinforcedButton = document.getElementById(person + "_reinforcement");
                        reinforcedButton.style.display = "block";
                    }
                }
            } else {
                console.error("Element with id '" + person + "_good' not found");
            }
        }
    }


// Punishment & Reinforcement buttons


    