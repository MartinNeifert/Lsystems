
var Data = function () {
    this.n = 1;
    this.d = 10;
    this.angle = 0;;
    this.start = 'X';
    this.scaleBy = 400;

    this.ruleF;
    this.ruleX;

    this.rate = 0;
    this.amplitude = 1;

    this.lString = '';

    this.iterate = function () {
        var string = this.start;
        var list;
        for (var i = 0; i < this.n; i++) {
            list = [];
            for (let char of string) {
                switch (char) {
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

function Rule() {
    this.in;
    this.out;
};

var DataSingleton = (function () {
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

function dataInit() {
    var data = DataSingleton.getInstance();
    var ruleF = new Rule();
    ruleF.in = 'F';
    ruleF.out = 'FF'
    data.ruleF = ruleF;

    var ruleX = new Rule();
    ruleX.in = 'X';
    ruleX.out = 'F[+X]F[-X]+X'
    data.ruleX = ruleX;

    var gui = new dat.GUI({
        load: getPresets(),
        preset: 'a'
    });

    gui.remember(data);
    gui.remember(ruleF);
    gui.remember(ruleX);

    var nControl = gui.add(data, 'n').min(0).max(8).step(1);
    nControl.onChange(function () {
        data.iterate();
    });

    gui.add(data, 'd').min(1).max(50).step(1);
    var scaleControl = gui.add(data, 'scaleBy').min(0).max(1000);
    scaleControl.onChange(function () {
        performScale();
    });

    gui.add(data, 'rate').min(0);
    gui.add(data, 'amplitude').min(0);

    gui.add(data, 'angle').min(0).max(360);

    var startControl = gui.add(data, 'start');
    startControl.onChange(function () {
        data.iterate();
    });

    var fFolder = gui.addFolder('F production')

    var inControl = fFolder.add(data.ruleF, 'in');
    inControl.onChange(function () {
        data.iterate();
    });

    var outControl = fFolder.add(data.ruleF, 'out');
    outControl.onChange(function () {
        data.iterate();
    });

    var xFolder = gui.addFolder('X production')
    var inControl = xFolder.add(data.ruleX, 'in');
    inControl.onChange(function () {
        data.iterate();
    })
    var outControl = xFolder.add(data.ruleX, 'out');
    outControl.onChange(function () {
        data.iterate();
    });
};

function getPresets() {
    return {
        "preset": "a",
        "remembered": {
            "a": {
                "0": {
                    "n": 5,
                    "d": 3,
                    "angle": 25.7,
                    "start": 'F'
                },
                "1": {
                    "in": "F",
                    "out": "F[+F]F[-F]F"
                },
                "2": {
                    "in": "",
                    "out": ""
                }
            },
            "b": {
                "0": {
                    "n": 5,
                    "d": 11,
                    "angle": 20,
                    "start": 'F',

                },
                "1": {
                    "in": "F",
                    "out": "F[+F]F[-F][F]"
                },
                "2": {
                    "in": "",
                    "out": ""
                }
            },
            "c": {
                "0": {
                    "n": 4,
                    "d": 13,
                    "angle": 22.5,
                    "start": 'F',

                },
                "1": {
                    "in": "F",
                    "out": "FF-[-F+F+F]+[+F-F-F]"
                },
                "2": {
                    "in": "",
                    "out": ""
                }
            },
            "d": {
                "0": {
                    "n": 7,
                    "d": 3,
                    "angle": 20,
                    "start": 'X',

                },
                "1": {
                    "in": "F",
                    "out": "FF"
                },
                "2": {
                    "in": "X",
                    "out": "F[+X]F[-X]+X"
                }
            },
            "e": {
                "0": {
                    "n": 7,
                    "d": 3,
                    "angle": 25.7,
                    "start": 'X',

                },
                "1": {
                    "in": "F",
                    "out": "FF"
                },
                "2": {
                    "in": "X",
                    "out": "F[+X][-X]FX"
                }
            },
            "f": {
                "0": {
                    "n": 5,
                    "d": 9,
                    "angle": 22.5,
                    "start": 'X',

                },
                "1": {
                    "in": "F",
                    "out": "FF"
                },
                "2": {
                    "in": "X",
                    "out": "F-[[X]+X]+F[+FX]-X"
                }
            }
        },
        "closed": false,
        "folders": {}
    };
}