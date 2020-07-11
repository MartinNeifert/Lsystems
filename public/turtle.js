
var Turtle = function() {
    this.position;
    this.direction;

    this.walk = function() {
        this.direction.rotateDeg(sin(millis() * data.rate/1000) * data.amplitude * data.amplitude * .005);
        this.position.add(this.direction);
    }
    
    this.turn = function(char) {
        switch(char) {
            case '+':
                this.direction.rotateDeg(-data.angle + sin(millis() /1000 * 5) * .6);
                break;
            case '-':
                this.direction.rotateDeg(data.angle + sin(millis() /1000 * 4) * .6);
                break;
        }
    }

    this.clone = function() {
        var clone = new Turtle();
        clone.position = this.position.clone();
        clone.direction = this.direction.clone();
        return clone;
    }
};