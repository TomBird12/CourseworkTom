var myGamePiece;
var myGamePiece2;

function startGame() {
    myGameArea.start();
    myGamePiece = new component(30, 30, "red", 10, 120, true);
    myGamePiece2 = new component(30, 80, "red", 400, 50, false);
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1580;
        this.canvas.height = 670;
        this.context = this.canvas.getContext("2d");
        this.canvas.style.border = '3px solid #000';
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
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
    }
}

//notes: keep gamearea.clear() at top, keep myGamePiece stuff at bottom so it renders on top of other components
function updateGameArea() {
    myGameArea.clear();

    //myGamePiece2 --------------------------------------------------------------------------
    myGamePiece2.newPos();
    myGamePiece2.update();
    myGamePiece2.speedX = -1;

    //myGamePiece ----------------------------------------------------------------------------
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -4; }
    if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 4; }


    if (myGameArea.keys && myGameArea.keys[38]){
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
    if(boxCollision(myGamePiece, myGamePiece2)){
        myGamePiece.color = "green";
    }
    else {
        myGamePiece.color = "red";
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