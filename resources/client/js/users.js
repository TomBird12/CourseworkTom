"use strict";
async function getUser(UserID) {
    console.log("Invoked getUser() with UserID of "+UserID);     //console.log your BFF for debugging client side - also use debugger statement
    const url = "/users/get/"+UserID;    		// API method on web server will be in Users class, method list                       ADD Input for UserID into get

    const response = await fetch(url, {method: "GET"});
    if (response.hasOwnProperty("Error")) { //checks if response from the web server has an "Error"
        alert(JSON.stringify(response));    // if it does, convert JSON object to string and alert (pop up window)
    } else {
        const data = await response.json();
        return JSON.parse(JSON.stringify(data))
    }
}


function UsersLogin() {
    //Console message to indicate function has been called, useful for debugging
    console.log("Invoked UsersLogin() ");
    let url = "/users/attemptlogin";
    //Validation to ensure user has entered a username and password
    if(document.forms["LoginForm"]["Username"].value == "" || document.forms["LoginForm"]["Password"].value == ""){
        alert("Please enter a username and password")
        return;
    }
    else{
        //Puts the username and password into a formdata object so it can be used by the API
        var formData = new FormData(document.getElementById('LoginForm'));
    }

    fetch(url, {
        method: "POST",
        //FormData object that contains username and password
        body: formData,
    }).then(response => {
        //Returns promise as JSON
        return response.json();
    }).then(response => {
        //checks if response has an error
        if (response.hasOwnProperty("Error")) {
            // if it does, convert JSON object to string and alert
            alert(JSON.stringify(response));
        } else {
            //Saves LoginToken and UserID as cookies
            Cookies.set("LoginToken", response.LoginToken);
            Cookies.set("UserID", response.UserID);
            console.log("Login Successful");
            //Open mainmenu.html in same tab
            window.open("mainmenu.html", "_self");
        }
    });
}

function logout() {
    //debugger;
    console.log("Invoked logout");
    let url = "/users/logout";
    fetch(url, {method: "POST"
    }).then(response => {
        return response.json();                 //now return that promise to JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));        // if it does, convert JSON object to string and alert
        } else {
            Cookies.remove("LoginToken", response.LoginToken);    //UserName and Token are removed
            Cookies.remove("Username", response.Username);
            //window.open("login.html", "_self");       //open index.html in same tab
        }
    });
}

function save(UserData){
    console.log("Invoked save");
    let url = "/users/save";

    let data = new FormData();
    for(name in UserData){
        data.append(name, UserData[name]);
    }

    fetch(url, {
        method: "POST",
        body: data,
    }).then(response => {
        return response.json();
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));        // if it does, convert JSON object to string and alert
        } else {
            console.log("Successfully Saved");
        }
    })
}


function saveInstance(Username, Score){
    console.log("Invoked saveInstance");
    let url = "/users/saveInstance";

    let data = new FormData();
    data.append("Username", Username);
    data.append("Score", Score);

    fetch(url, {
        method: "POST",
        body: data,
    }).then(response => {
        return response.json();
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));        // if it does, convert JSON object to string and alert
        } else {
            console.log("Successfully Saved Instance");
        }
    })
}

async function getLeaderboard() {
    console.log("Invoked getLeaderboard()");     //console.log your BFF for debugging client side - also use debugger statement
    let url = "/users/getLeaderboard";    		// API method on web server will be in Users class, method list                       ADD Input for UserID into get

    const response = await fetch(url, {method: "GET"});
    if (response.hasOwnProperty("Error")) { //checks if response from the web server has an "Error"
        alert(JSON.stringify(response));    // if it does, convert JSON object to string and alert (pop up window)
    } else {
        const data = await response.json();
        return JSON.parse(JSON.stringify(data))
        console.log("Successfully retrieved Leaderboard");
    }
}