

function leaderboard() {
    let boardData = getLeaderboard();
    console.log(boardData);
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



    for(i = 1; i < 6; i++){
        let row = table.insertRow(i);
        row.style.color = "white";
        row.style.fontSize = "80px";
        row.style.fontFamily = "Montserrat Light";
        row.style.textAlign = "center";

        let username = row.insertCell(0);
        username.innerHTML = "tomb12";

        let score = row.insertCell(1)
        score.innerHTML = "43";

    }
}
