function printHighscores() {
    //Obtain highscores from local storage
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    //Sorts highscores from highest to lowest
    highscores.sort(function(a, b) {
        return b.score - a.score;
    });

    //Creates the list of highscores
    highscores.forEach(function(score){
    var highscoreList = document.createElement("li")
    highscoreList.textContent = score.initials + " - " + score.score;

    //Displays the list on the page
    var olEl = document.getElementById("highscores");
    olEl.appendChild(highscoreList);
    });
}

function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
}

document.getElementById("clear-highscores").onclick = clearHighscores;

printHighscores();