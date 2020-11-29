var myGamePiece;
var UserID;
var Score;
var Health;
var ScoreVal = 0;
var HealthVal = 10;
var isColliding = false;
var isCollidingSwitch = false;
var isCollidingLock = false;
var isGameOver = false;
var screenWidth = window.innerWidth - 30;
var screenHeight = window.innerHeight - 30;

function startGame() {
    myGameArea.start();
    myGamePiece = new component(30, 30, "red", 10, 120, true);
    Score = new textComponent("Score: ", 500, 200, 20, 60);
    Health = new textComponent("Health: ", 500, 200, 400, 60)
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        UserID = Cookies.get("UserID");
        console.log(UserID);
        getUser(UserID).then(UserData => {
            HealthVal = UserData.Healthstat;
        });

        ////////////////////////////////////////////////////////////////////////
        this.canvas.width = screenWidth;
        this.canvas.height = screenHeight;
        this.context = this.canvas.getContext("2d");
        this.canvas.style.border = '3px solid #000';
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);

        //sets interval for newObstacle function to be called every 0.5 seconds
        this.interval = setInterval(gameObstacles.newObstacle, 500);

        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
    },
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, isPhysicsEnabled) {
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.gravity = 0.1;
    this.gravitySpeed = 0;
    this.isPhysicsEnabled = isPhysicsEnabled;
    this.color = color;
    this.update = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function () {
        if (isPhysicsEnabled == true) {
            this.gravitySpeed += this.gravity;
            this.x += this.speedX;
            this.y += this.speedY + this.gravitySpeed;
            this.hitSides();
        } else {
            this.x += this.speedX;
            this.y += this.speedY;
        }
    }
    this.hitSides = function () {
        //bottom
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
        }

        //top
        if(this.y < 0){
            this.y = 0;
            this.gravitySpeed = 0;
        }

        //left
        if(this.x < 0){
            this.x = 0;
        }

        //right
        var rightboundary = myGameArea.canvas.width - this.width;
        if(this.x > rightboundary){
            this.x = rightboundary;
        }
    }
}

function textComponent(text, width, height, x, y) {
    this.gamearea = myGameArea;
    this.text = text;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;

    this.update = function (text, color) {
        ctx = myGameArea.context;
        ctx.globalAlpha = 0.6
        ctx.fillStyle = "white";
        ctx.fillRect(x,15,300,60);
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = color;
        ctx.font = "50px Montserrat Light";
        ctx.fillText(text, x, y, width);
    }
}

//notes: keep gamearea.clear() at top, keep myGamePiece stuff at bottom so it renders on top of other components
function updateGameArea() {
    myGameArea.clear();

    //Obstacles-------------------------------------------------------------------------------
    for(x = 0; x < gameObstacles.Obstacles.length; x++){
        let obstacle = gameObstacles.Obstacles[x];
        if(obstacle.x < -100){
            gameObstacles.Obstacles.splice(x, 1);
        }
        obstacle.speedX = -3;
        obstacle.newPos();
        obstacle.update();
        if(boxCollision(obstacle, myGamePiece)) {
            obstacle.color = 'green';
            isCollidingSwitch = true;

            //Top collision
            if((myGamePiece.y + myGamePiece.height > obstacle.y) && (myGamePiece.x + myGamePiece.width*0.5 > obstacle.x) && (myGamePiece.x + myGamePiece.width*0.5 < obstacle.x + obstacle.width) && (myGamePiece.y + myGamePiece.height*0.5 < obstacle.y)){
                myGamePiece.y = obstacle.y - myGamePiece.height
                myGamePiece.gravitySpeed = 0;
            }

            //Bottom collision
            if((myGamePiece.y < obstacle.y + obstacle.height) && (myGamePiece.y + myGamePiece.height*0.5 > obstacle.y + obstacle.height) && (myGamePiece.x + myGamePiece.width*0.5 > obstacle.x) && (myGamePiece.x + myGamePiece.width*0.5 < obstacle.x + obstacle.width)){
                myGamePiece.y = obstacle.y + obstacle.height;
                myGamePiece.gravitySpeed = 0;
            }

            //Left hand side collision
            if ((myGamePiece.y + myGamePiece.height*0.5 > obstacle.y) && (myGamePiece.x < obstacle.x) && ((myGamePiece.x + myGamePiece.width) > obstacle.x) && (myGamePiece.y + myGamePiece.height*0.5 < obstacle.y + obstacle.height)) {
                myGamePiece.x = obstacle.x - myGamePiece.width;
            }

            //Right hand side collision
            if ((myGamePiece.y + myGamePiece.height*0.5 > obstacle.y) && (myGamePiece.x > obstacle.x + obstacle.width*0.5) && (myGamePiece.x < obstacle.x + obstacle.width) && (myGamePiece.y + myGamePiece.height*0.5 < obstacle.y + obstacle.height)) {
                myGamePiece.x = obstacle.x + obstacle.width;
            }
        }
    }

    if(isCollidingSwitch == true && isCollidingLock == false){
        isColliding = true;
        isCollidingLock = true;
    }
    else {
        isColliding = false;
    }
    if(isCollidingSwitch == false){
        isCollidingLock = false;
    }
    isCollidingSwitch = false;

    //myGamePiece ----------------------------------------------------------------------------
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.keys && myGameArea.keys[37] && isGameOver == false) {myGamePiece.speedX = -4; }
    if (myGameArea.keys && myGameArea.keys[39] && isGameOver == false) {myGamePiece.speedX = 4; }


    if (myGameArea.keys && myGameArea.keys[38] && isGameOver == false){
        /*if(myGamePiece.gravitySpeed >= -0.8){
            myGamePiece.gravity = -0.2;

        }*/
        if(myGamePiece.gravitySpeed > 0){
            myGamePiece.gravitySpeed = 0;
        }
        myGamePiece.gravity = -0.2;
        myGamePiece.speedY = -1;
    }
    else {myGamePiece.gravity = 0.1}

    myGamePiece.newPos();
    myGamePiece.update();

    //Text components
    if(isGameOver == false) {
        ScoreVal += 1;
    }
    Score.update("Score: " + (ScoreVal * 0.1).toFixed(0), "black");
    if(isColliding == true && isGameOver == false) {
        HealthVal--;
    }
    Health.update("Health: " + HealthVal, "black");

    //Code for game over
    if(HealthVal <= 0){
        gameOver();
    }
}

function boxCollision(rect1, rect2){
    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width >= rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y) {
        return true;
    }
    else {
        return false;
    }
}


var gameObstacles = {
    Obstacles : [],
    newObstacle : function (){
        var obst = new component((Math.floor(Math.random() * 120) + 40), (Math.floor(Math.random() * 120) + 40), "black", myGameArea.canvas.width, Math.floor(Math.random() * (myGameArea.canvas.height + 30)), false);
        gameObstacles.Obstacles.push(obst);
        var test = 0;
    },
}

function gameOver(){
    ctx = myGameArea.context
    ctx.fillStyle = "black"
    ctx.font = "100px Montserrat Light"
    ctx.fillText("GAME OVER", screenWidth*0.5 - 400, screenHeight*0.5, 800);
    ctx.globalAlpha = 0.4;

    const delay = ms => new Promise(res => setTimeout(res, ms));
    const yourFunction = async () => {
        await delay(2500);
        window.open("mainmenu.html", "_self");
    };
    if(isGameOver == false){
        yourFunction();
    }
    isGameOver = true;
}