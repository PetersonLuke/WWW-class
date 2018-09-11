var myGamePiece;    //lawn mower
var house;          //house
var mowerSize = 30; //Size of the mower
var ranStump;       //places a random stump

//changes the size of the mower from 1-100
function sliderChange() 
{
    //gets the value from the slider and puts it into the text box
    document.getElementById("slText").value = document.getElementById("slider").value;
    mowerSize = document.getElementById("slider").value;
    myGameArea.stop();  //needed to start the game for reset of size
    startGame();        //needed to start the game for reset of size
}

function ranPlace()
{
    var rwidth = 50;
    //var rHeight = 50;
}

//starts the game
function startGame() 
{
    var ranWidth = Math.floor((Math.random() * 750));  //random number for width
    var ranHeight = Math.floor((Math.random() * 700)); //random number for height
    var stumpSize = Math.floor((Math.random() * 40) + 10)
    
    //maybe i need to use a button to get the value into the thing also
    myGamePiece = new component(mowerSize, mowerSize, "blue", 0, 800);  //size, color, and start location of lawnmower
    house = new component(100, 100, "grey", 450, 250);       //size, color and start location of house
    ranStump = new component(stumpSize, stumpSize, "black", ranPlace(), ranHeight); //places a stump in a random location even in the house xD
    myGameArea.start();
    
}

//creates the game area
var myGameArea = 
{
    canvas : document.createElement("canvas"),
    start : function() 
    {
        this.canvas.width = 800;    //size of the width for the canvas
        this.canvas.height = 800;   //size of the height for the canvas
        this.context = this.canvas.getContext("2d");
        
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        
        //the infomation the canvas needs to allow movment with the keys
        window.addEventListener('keydown', function (e) 
        {
            e.preventDefault();
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) 
        {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
    },
    stop : function() 
    {
        clearInterval(this.interval);
    },    
    clear : function() 
    {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

//component
function component(width, height, color, x, y, type) 
{

    this.type = type;
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.angle = 0;
    this.moveAngle = 0;
    this.x = x;
    this.y = y;
    
    //updates the component
    this.update = function() 
    {
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore();
        
    }
    
    this.newPos = function() 
    {
        this.angle += this.moveAngle * Math.PI / 180;
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
        this.hitBottom();   //for hitting the bottom of the canvas
        this.hitTop();      //for hitting the top of the canvas
        this.hitLeft();     //for hitting the left of the canvas
        this.hitRight();    //for hitting the right of the canvas
        this.paintRect();   //call the function to paint the background
    }
    
    //Checks to see if the mower has crashed into any other objects
    this.crashWith = function(otherobj) {
        var myleft = this.x - (this.width / 2);                 //mower width - 1/2 mower width to get right area
        var myright = this.x + (this.width / 2);                //mower width + 1/2 mower width to get right area
        var mytop = this.y - (this.height / 2);                 //mower height - 1/2 mower height to get right area
        var mybottom = this.y + (this.height / 2);              //mower height + 1/2 mower height to get right area
        var otherleft = otherobj.x - (otherobj.width /2);       //otherobj width + 1/2 otherobj width to get right area
        var otherright = otherobj.x + (otherobj.width / 2);     //otherobj width + 1/2 otherobj width to get right area
        var othertop = otherobj.y - (otherobj.height / 2);      //otherobj height + 1/2 otherobj height to get right area
        var otherbottom = otherobj.y + (otherobj.height / 2);   //otherobj height + 1/2 otherobj height to get right area
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
     
    //paints under the component
    this.paintRect = function() 
    {
        var sub = 25;           //used to subtract the location to be panted
        sub = mowerSize / 2;    //makes sub = half the size of the mower
        var ctx = myGameArea.context;   //gets the context for the back ground
        ctx.fillStyle = "green";    //makes the back ground become green
        ctx.rect(this.x - sub, this.y - sub, this.width, this.height);  //puts new background color under the lower mower
        ctx.fill(); //fills it in
    }
    
    //makes the object hit the bottom of the canvas
    this.hitBottom = function() 
    {
        var bottom = myGameArea.canvas.height - (this.height / 2) + 5; //canvas hight - 1/2 mower height to hit bottom
        if (this.y > bottom)
        {
            this.y = bottom;
        }
    }
    //makes the object hit the top
    this.hitTop = function()
    {
        var top = myGameArea.canvas.clientTop + (this.height / 2) - 5;  //canvas hight + 1/2 mower height to hit top
        if (this.y < top)
        {
            this.y = top;
        }
    }
    
    //makes the object hit the left of the canvas
    this.hitLeft = function()
    {
        var left = myGameArea.canvas.clientLeft + (this.width / 2) - 5;   //left of canvas + 1/2 mower width
        if (this.x < left)
        {
            this.x = left;
        }
    }
    
    //makes the object hit the right of the canvas
    this.hitRight = function()
    {
        var right = myGameArea.canvas.width - (this.width / 2) + 5;   //right of canvas - 1/2 mower width
        if (this.x > right)
        {
            this.x = right;
        }
    }   
}

function updateGameArea() 
{
    //checks to see if the mower has indeed crashed into the house or stump
    if (myGamePiece.crashWith(house) || myGamePiece.crashWith(ranStump)) {
        gameScore();    //if there is a crash it calls the gamescore function 
    } else {
    myGameArea.clear();
    myGameArea.frameNo += 1;
    myGamePiece.moveAngle = 0;
    myGamePiece.speed = 0;
    
    //the speed and angle to move the piece depending on the key pressed
    if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.moveAngle = -3; }
    if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.moveAngle = 3; }
    if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speed= 3; }
    if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speed= -3; }
    
    myGamePiece.newPos();
    myGamePiece.update();
    house.update();
    ranStump.update();
    }
}

//restarts the game but keeps the piece moving after you crash
function restart()
{
    myGameArea.stop();  //stops the game
    startGame();        //restarts the game
    
}

function gameScore()
{
    myGameArea.stop();
    var imgData = ctx.getImageData(0, 0, myGameArea.canvas.width, myGameArea.canvas.height)
    var i;  //counting variable
    var score = 640000;  //the scout amount
    for (i = 0; i < imgData.data.length; i+=4)  //loops through as long as 'i' is less than the canvas area
        {
            red = imgData.data[i];      //looks for red value
            green = imgData.data[i+1];  //looks for the green value
            blue = imgData.data[i+2];   //looks for the blue value
            alph = imgData.data[i+3];   //looks for the transparance
            
            if(green == 128)    //looks to see if the green = 128
            {
                score = score - 1;  //subtracts 1 to the score if it does
            }
        }

    alert('Game over!\nYou missed: '+ score + ' blades of grass!\n' + 'You mowed for ' + myGameArea.frameNo / 50 + ' seconds!');    //gives and alert with the score upon hitting end game button
    
}