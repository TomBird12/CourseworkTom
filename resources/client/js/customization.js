var UserData;
var colour1;
var colour2;
var colour1Button;
var colour2Button;
var coins;
var Healthstat;
var Shieldstat;
var Speedstat;
var HealthPrice;
var ShieldPrice;
var SpeedPrice;

function start(){
    UserID = Cookies.get("UserID");
    getUser(UserID).then(UserData => {
        this.UserData = UserData;
        colour1 = UserData.Colour1;
        colour2 = UserData.Colour2
        coins = UserData.Coins;
        Healthstat = UserData.Healthstat;
        Shieldstat = UserData.Shieldstat;
        Speedstat = UserData.Speedstat;

        HealthPrice = Healthstat*10;
        ShieldPrice = Shieldstat*10;
        SpeedPrice = Speedstat*10;
        document.getElementById("healthPrice").innerHTML = HealthPrice;
        document.getElementById("shieldPrice").innerHTML = ShieldPrice;
        document.getElementById("speedPrice").innerHTML = SpeedPrice;

        //Setting purchased upgrades
        for(i = 1; i <= Healthstat; i++){
            document.getElementById("health"+i).style.backgroundColor = "lawngreen";
            document.getElementById("health"+i).disabled = true;
        }
        for(i = 1; i <= Shieldstat; i++){
            document.getElementById("shield"+i).style.backgroundColor = "lawngreen";
            document.getElementById("shield"+i).disabled = true;
        }
        for(i = 1; i <= Speedstat; i++){
            document.getElementById("speed"+i).style.backgroundColor = "lawngreen";
            document.getElementById("speed"+i).disabled = true;
        }



        document.getElementById("coins").innerHTML = "COINS: "+coins;

        colour1Button = document.getElementById(colour1.toString())
        colour1Button.style.outlineStyle = "solid";
        colour1Button.style.outlineColor = "white";
        colour1Button.style.outlineWidth = "4px";

        colour2Button = document.getElementById("R"+colour2.toString())
        colour2Button.style.outlineStyle = "solid";
        colour2Button.style.outlineColor = "white";
        colour2Button.style.outlineWidth = "4px";
        draw();
    });

    canvas = document.getElementById("canvas");


}

function selectColour(element){
    id = element.id;
    if(id[0] == "R"){
        colour2 = id.substring(1);

        //Removing selected outline from previously selected colour
        colour2Button.style.outline = "none";

        colour2Button = element;
        colour2Button.style.outlineStyle = "solid";
        colour2Button.style.outlineColor = "white";
        colour2Button.style.outlineWidth = "4px";

        //Saving to database
        UserData.Colour2 = colour2;
        save(UserData);
    }
    else {
        colour1 = id;

        colour1Button.style.outline = "none";

        colour1Button = element;
        colour1Button.style.outlineStyle = "solid";
        colour1Button.style.outlineColor = "white";
        colour1Button.style.outlineWidth = "4px";

        //Saving to database
        UserData.Colour1 = colour1;
        save(UserData);
    }
    draw();
}

function draw(){
    let ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;
    let centreX = canvas.width*0.5;
    let centreY = canvas.width*0.5;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = colour1
    ctx.beginPath();
    ctx.moveTo(centreX, centreY);
    ctx.lineTo(centreX,centreY+100);
    ctx.lineTo(centreX+150,centreY);
    ctx.lineTo(centreX, centreY-100);
    ctx.lineTo(centreX,centreY);
    ctx.fill();

    //ctx.fillRect(canvas.width*0.5,canvas.height*0.5,200,200);

    ctx.fillStyle = colour2
    ctx.beginPath();
    ctx.moveTo(centreX,centreY);
    ctx.lineTo(centreX,centreY+50);
    ctx.lineTo(centreX-150,centreY);
    ctx.lineTo(centreX,centreY-50);
    ctx.lineTo(centreX,centreY);
    ctx.fill();

    //ctx.fillRect(canvas.width*0.5-20, canvas.height*0.5-20,100,100);
}

function purchase(element){
    id = element.id;
    if(id.includes("health")){
        if(coins >= HealthPrice){
            coins = coins - HealthPrice;
            document.getElementById("coins").innerHTML = "COINS: "+coins;
            Healthstat++;
            HealthPrice = Healthstat*10;
            document.getElementById("healthPrice").innerHTML = HealthPrice;
            element.style.backgroundColor = "lawngreen"
            element.disabled = true;

            //saving to database
            UserData.Coins = coins;
            UserData.Healthstat = Healthstat;
            save(UserData);
        }
        else{
            document.getElementById("coins").style.color = "red";
            document.getElementById("coins").style.fontWeight = "bold";
        }
    }
    else if(id.includes("shield")){
        if(coins >= ShieldPrice){
            coins = coins - ShieldPrice;
            document.getElementById("coins").innerHTML = "COINS: "+coins;
            Shieldstat++;
            ShieldPrice = Shieldstat*10;
            document.getElementById("shieldPrice").innerHTML = ShieldPrice;
            element.style.backgroundColor = "lawngreen"
            element.disabled = true;

            //saving to database
            UserData.Coins = coins;
            UserData.Shieldstat = Shieldstat;
            save(UserData);
        }
        else{
            document.getElementById("coins").style.color = "red";
            document.getElementById("coins").style.fontWeight = "bold";
        }
    }
    else if(id.includes("speed")){
        if(coins >= SpeedPrice){
            coins = coins - SpeedPrice;
            document.getElementById("coins").innerHTML = "COINS: "+coins;
            Speedstat++;
            SpeedPrice = Speedstat*10;
            document.getElementById("speedPrice").innerHTML = SpeedPrice;
            element.style.backgroundColor = "lawngreen"
            element.disabled = true;

            //saving to database
            UserData.Coins = coins;
            UserData.Speedstat = Speedstat;
            save(UserData);
        }
        else{
            document.getElementById("coins").style.color = "red";
            document.getElementById("coins").style.fontWeight = "bold";
        }
    }
    yourFunction()
}

const delay = ms => new Promise(res => setTimeout(res, ms));
const yourFunction = async () => {
    await delay(250);
    document.getElementById("coins").style.color = "black";
    document.getElementById("coins").style.fontWeight = "normal";
};

function mainmenu(){
    window.open("mainmenu.html","_self");
}