
var Turtle = function() {
    this.position;
    this.direction;

    this.walk = function() {
        this.position.add(this.direction);
    }
    
    this.turn = function(char) {
        switch(char) {
            case '+':
                this.direction.rotateDeg(-data.angle);
                break;
            case '-':
                this.direction.rotateDeg(data.angle);
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