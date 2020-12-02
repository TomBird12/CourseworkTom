var UserData;
var colour1;
var colour2;
var colour1Button;
var colour2Button;

function start(){
    UserID = Cookies.get("UserID");
    getUser(UserID).then(UserData => {
        this.UserData = UserData;
        colour1 = UserData.Colour1;
        colour2 = UserData.Colour2

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