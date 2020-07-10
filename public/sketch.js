var data = DataSingleton.getInstance();
var turtle;
var turtles = [];

var locationA;
var locationB;
var direction;

var myWidth = 800;
var myHeight = 800;

var xOffset = 400;
var yOffset = 800;

var angle;

function setup() {
    createCanvas(myWidth, myHeight).mousePressed(() => {
        xOffset = mouseX;
        yOffset = mouseY;
    });
    angle = data.angle * PI /180;

    turtle = new Turtle();
    dataInit();
    data.iterate();
};

function draw() {
    //scale(Math.abs(sin(Date.now()/10000)));
    turtle.position = new Victor(0, 0);
    turtle.direction = new Victor(0, data.d);
    background(220);
    feedTurtle();
};

function feedTurtle() {
    for(let char of data.lString){
        switch(char) {
            case '[':
                temp = turtle.clone();
                turtles.push(turtle);
                turtle = temp;
                break;
            case ']':
                turtle = turtles.pop();
                break;
            case 'F':
                let turtleStart = turtle.position.clone();
                turtle.walk();
                let turtleEnd = turtle.position.clone();
                line(xOffset - turtleStart.x, yOffset - turtleStart.y,
                     xOffset - turtleEnd.x, yOffset - turtleEnd.y); 
                break;
            default:
                turtle.turn(char);
        }
    }
};

