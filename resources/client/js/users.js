"use strict";
function getUser() {
    debugger;
    console.log("Invoked getUser()");     //console.log your BFF for debugging client side - also use debugger statement
    const url = "/users/get/";    		// API method on web server will be in Users class, method list                       ADD Input for UserID into get
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
