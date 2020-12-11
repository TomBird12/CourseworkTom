

function leaderboard() {
    var table = document.getElementById("leaderboard");
    table.style.border = "1px solid black";
    table.style.backgroundColor = "black";

    let header = table.insertRow(0)
    header.style.color = "white";
    header.style.fontSize = "80px";
    header.style.fontFamily = "Montserrat Light";

    let usernameColumn = header.insertCell(0)
    usernameColumn.innerHTML = "USERNAME";
    usernameColumn.style.textAlign = "center";
    usernameColumn.style.paddingLeft = "75px";
    usernameColumn.style.paddingRight = "75px";

    let scoreColumn = header.insertCell(1)
    scoreColumn.innerHTML = "SCORE";
    scoreColumn.style.textAlign = "center";
    scoreColumn.style.paddingLeft = "75px";
    scoreColumn.style.paddingRight = "75px";

    getLeaderboard().then(response => {
        leaderboardData = response;

        for(x = 0; x < 5; x++){
            console.log(x);
            let row = table.insertRow(x+1);
            row.style.color = "white";
            row.style.fontSize = "80px";
            row.style.fontFamily = "Montserrat Light";
            row.style.textAlign = "center";

            let username = row.insertCell(0);
            username.innerHTML = leaderboardData["Username"+(x+1)];

            let score = row.insertCell(1)
            score.innerHTML = leaderboardData["Score"+(x+1)];

        }
    })

}

function mainmenu(){
    window.open("mainmenu.html","_self");
}