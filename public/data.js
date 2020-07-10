
var Data = function() {
    this.n = 1;
    this.d = 10;
    this.angle = 0;;
    this.start = 'X';

    this.ruleF;
    this.ruleX;

    this.lString = '';

    this.iterate = function() {
        var string = this.start;
        var list;
        for(var i = 0; i < this.n; i ++){
            list = [];
            for(let char of string){
                switch(char){
                    case 'F':
                        list.push(this.ruleF.out);
                        break;
                    case 'X':
                        list.push(this.ruleX.out);
                        break;
                    default:
                        list.push(char);
                        break;
                }
            }
            charArray = [...list];
            string = charArray.join();
        }
        this.lString = string;
    };
};

function Rule(input, output) {
    this.in = input;
    this.out = output;
};

var DataSingleton = (function() {
    var instance;

    function createInstance() {
        var data = new Data();
        return data;
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

var Rule = function() {
    this.in;
    this.out;
};

function dataInit (){
    var data = DataSingleton.getInstance();
    var ruleF = new Rule();
    ruleF.in = 'F';
    ruleF.out = 'FF'
    data.ruleF = ruleF;

    var ruleX = new Rule();
    ruleX.in = 'X';
    ruleX.out = 'F[+X]F[-X]+X'
    data.ruleX = ruleX;
    var gui = new dat.GUI();

    var nControl = gui.add(data, 'n').min(0).max(8).step(1);
    nControl.onChange(function(){
        data.iterate();
    });

    gui.add(data, 'd').min(1).max(50).step(1);

    gui.add(data, 'angle').min(0).max(360);

    var startControl = gui.add(data, 'start');
    startControl.onChange(function(){
        data.iterate();
    });

    var fFolder = gui.addFolder('F production')

    var inControl = fFolder.add(data.ruleF, 'in');
    inControl.onChange(function(){
        data.iterate();
    });
    
    var outControl = fFolder.add(data.ruleF, 'out');
    outControl.onChange(function(){
        data.iterate();
    });

    var xFolder = gui.addFolder('X production')
    xFolder.add(data.ruleX, 'in');
    xFolder.add(data.ruleX, 'out');
};