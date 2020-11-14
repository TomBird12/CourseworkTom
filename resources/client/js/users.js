"use strict";
function getUser() {
    debugger;
    let UserID = document.getElementById("UserID").value;
    console.log("Invoked getUser() with UserID of "+UserID);     //console.log your BFF for debugging client side - also use debugger statement
    const url = "/users/get/"+UserID;    		// API method on web server will be in Users class, method list                       ADD Input for UserID into get
    fetch(url, {
        method: "GET",				//Get method
    }).then(response => {
        return response.json();                 //return response as JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) { //checks if response from the web server has an "Error"
            alert(JSON.stringify(response));    // if it does, convert JSON object to string and alert (pop up window)
        } else {
            formatUser(response);          //this function will create an HTML table of the data (as per previous lesson)
        }
    });
}

function formatUser(item){
    let dataHTML = "<tr><td>" + item.UserID + "<td><td>" + item.UserName + "<tr><td>";
    document.getElementById("UsersTable").innerHTML = dataHTML;
}

function UsersLogin() {
    //debugger;
    console.log("Invoked UsersLogin() ");
    let url = "/users/attemptlogin";
    if(document.forms["LoginForm"]["Username"].value == "" || document.forms["LoginForm"]["Password"].value == ""){
        alert("Please enter a username and password")
        return;
    }
    else{
        var formData = new FormData(document.getElementById('LoginForm'));
    }


    fetch(url, {
        method: "POST",
        body: formData,
    }).then(response => {
        return response.json();                 //now return that promise to JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));        // if it does, convert JSON object to string and alert
        } else {
            Cookies.set("LoginToken", response.LoginToken);
            Cookies.set("Username", response.Username);
            //window.open("mainmenu.html", "_self");       //open index.html in same tab
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

