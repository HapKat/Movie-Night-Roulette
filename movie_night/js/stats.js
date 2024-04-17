document.addEventListener("DOMContentLoaded", function() {

    var movieCounts = JSON.parse(localStorage.getItem("movieCounts")) || {kathi: 1, marvin: 2, salva: 4, chris: 3};
    var Strikes = JSON.parse(localStorage.getItem("Strikes")) ||{kathi: 0, marvin: 0, salva: 2, chris: 1
    };

    var Success = JSON.parse(localStorage.getItem("Success")) || {kathi: 0, marvin: 2, salva: 1, chris: 1
    };
    displayCharts();

    // Event-Listener für den Button "Add film"
    document.getElementById("add_movie").addEventListener("click", function() {
        addMovieToList();
    });

    // Dataset erstellen, das zählt von wem wie viele Filme kamen

    // Funktion zum Hinzufügen eines Films zur Liste
    function addMovieToList() {
        // Erfasse die eingegebenen Werte aus dem Formular
        var movieName = document.getElementById("new_name").value;
        var avgRating = document.getElementById("avg_rating").value;
        var who = document.getElementById("who").value;
        var link = document.getElementById("link").value;

        // Überprüfe, ob die Werte korrekt sind (hier könnten zusätzliche Validierungen erfolgen)
        if (movieName && avgRating && who && link) {

            movieCounts[who]++;
            localStorage.setItem("movieCounts", JSON.stringify(movieCounts));
            
            if (avgRating <= 2.5){
                Strikes[who]++
            } else if (avgRating >= 3.5){
                Success[who]++;
            }

            // Erstelle ein Objekt mit den eingegebenen Werten
            var newMovie = {
                name: movieName,
                avg_rating: parseFloat(avgRating),
                who: who,
                link: link
            };

            // Füge das Filmobjekt zum lokalen Speicher hinzu
            localStorage.setItem(movieName, JSON.stringify(newMovie));
            

            // Rufe die Funktion zum Anzeigen der Filme auf
            displayMovies();
            displayCharts();

            // Leere das Formular
            document.getElementById("new_name").value = "";
            document.getElementById("avg_rating").value = "";
            document.getElementById("who").value = "";
            document.getElementById("link").value = "";
        } else {
            alert("Bitte füllen Sie alle Felder korrekt aus.");
        }
    }

    // Funktion zum Anzeigen der Filme auf der Website
    function displayMovies() {
        // Ziel-UL-Element auswählen
        var movieListContainer = document.getElementById("allMovies");
    
        // Leere die vorhandenen Listenelemente
        movieListContainer.innerHTML = "";
    
        // Rufe die Funktion auf, um die sortierten Filme zu erhalten
        var sortedMovies = getSortedMovies();
    
        // Iteriere durch die sortierten Filme und füge sie zur Liste hinzu
        sortedMovies.forEach(function (storedMovie) {
            // Füge ein Listenelement mit dem Namen des Films hinzu
            var listItem = document.createElement("li");
            listItem.textContent = storedMovie.name;
            movieListContainer.appendChild(listItem);
        });
    }
    
    // Funktion zum Abrufen und Sortieren der Filme aus dem lokalen Speicher
    function getSortedMovies() {
        var movies = [];
    
        // Iteriere durch den lokalen Speicher und füge die Filme zur Liste hinzu
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            var storedMovieValue = localStorage.getItem(key);
    
            // Überprüfen Sie, ob der Wert definiert ist, bevor Sie ihn parsen
            if (storedMovieValue !== null && storedMovieValue !== "undefined") {
                var storedMovie = JSON.parse(storedMovieValue);
                movies.push(storedMovie);
            }
        }
    
        // Sortiere die Filme alphabetisch nach dem Namen
        movies.sort(function (a, b) {
            // Überprüfe, ob die Filmtitel definiert sind, bevor du sie vergleichst
            if (a.name !== undefined && b.name !== undefined) {
                return a.name.localeCompare(b.name);
            }
            return 0;
        });
    
        return movies;
    }

    displayMovies();
});

