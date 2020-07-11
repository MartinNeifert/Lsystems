var data = DataSingleton.getInstance();
var turtle;
var turtles = [];

var locationA;
var locationB;
var direction;

var myWidth = 800;
var myHeight = 1600;

var absXOffset = 400;
var absYOffset = 1200;

var xOffset = 400;
var yOffset = 800;

function setup() {
    createCanvas(myWidth, myHeight);

    turtle = new Turtle();
    dataInit();
    data.iterate();

    xOffset = absXOffset / (data.scaleBy / 400);
    yOffset = absYOffset / (data.scaleBy / 400);
};

function performScale() {
    xOffset = absXOffset / (data.scaleBy / 400);
    yOffset = absYOffset / (data.scaleBy / 400);
}

function draw() {
    scale(data.scaleBy / 400);
    turtle.position = new Victor(0, 0);
    turtle.direction = new Victor(0, data.d);
    background(220);
    feedTurtle();
};

var vertices = [];
var currentShape = null;

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
            case 'E':
                endShape();
                break;
            default:
                turtle.turn(char);
        }
    }
};

