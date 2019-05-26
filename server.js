var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');


flime = require("./flime.js");
dimon = require("./dimon.js");
grass = require("./grass.js");
predator = require("./predator.js");
shadow = require("./shadow.js");
grasseater = require("./grasseater.js");
predatoreater = require("./predatoreater.js");

grassArr = [];
GrassEatersArr = [];
PredatorArr = [];
PredatorEatersArr = [];
ShadowArr = [];
DimonArr = [];
FlimeArr = [];

matrix = [];

for (let y = 0; y < 30; y++) {
    matrix[y] = [];
    for (let x = 0; x < 30; x++) {
        let randomMatrix = Math.floor(Math.random(1, 145) * 145);
        if (0 < randomMatrix && randomMatrix < 30) {
            matrix[y][x] = 1;
        }
        else if (30 < randomMatrix && randomMatrix < 50) {
            matrix[y][x] = 2;
        }
        else if (50 < randomMatrix && randomMatrix < 70) {
            matrix[y][x] = 3;
        }
        else if (70 < randomMatrix && randomMatrix < 90) {
            matrix[y][x] = 4;
        }
        else if (75 < randomMatrix && randomMatrix < 130) {
            matrix[y][x] = 5;

        }
        else if (130 < randomMatrix && randomMatrix < 133) {
            matrix[y][x] = 6;

        }

        else {
            matrix[y][x] = 0;
        }
    }
}

function createObjects() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {

                let gr1 = new grasseater(x, y);
                GrassEatersArr.push(gr1);

            }
            else if (matrix[y][x] == 3) {
                let gr2 = new predator(x, y);
                PredatorArr.push(gr2);
            }
            else if (matrix[y][x] == 4) {
                let gr3 = new predatoreater(x, y);
                PredatorEatersArr.push(gr3);
            }
            else if (matrix[y][x] == 5) {
                let gr4 = new shadow(x, y);
                ShadowArr.push(gr4);
            }
            else if (matrix[y][x] == 6) {
                let gr5 = new dimon(x, y);
                DimonArr.push(gr5);
            }
            else if (matrix[y][x] == 7) {
                let gr6 = new flime(x, y);
                FlimeArr.push(gr6);
            }

        }
    }
}


let time = 0;
let seasson = "Winter";

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
createObjects();
function Game() {
    if (grassArr[0] != undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    time++;
    if (time < 6 && time >= 0) {
        seasson = "winter";


    }
    else if (time >= 6 && time < 12) {
        seasson = "spring";
    }
    else if (time >= 12 && time < 18) {
        seasson = "summer";
    }
    else if (time >= 18 && time < 24) {
        seasson = "autumn";
    }
    else if (time >= 24) {
        time = 0;
    }
    for (var i in GrassEatersArr) {
        GrassEatersArr[i].eat();
    }
    for (var i in PredatorArr) {
        PredatorArr[i].eat();
    }
    for (var i in PredatorEatersArr) {
        PredatorEatersArr[i].eat();
    }
    for (var i in ShadowArr) {
        ShadowArr[i].eat();
    }
    for (var i in DimonArr) {
        DimonArr[i].eat();
    }
    for (var i in FlimeArr) {
        FlimeArr[i].eat();
    }
    io.sockets.emit("ugharkum em", matrix);
    io.sockets.emit("exanak", seasson);
}


setInterval(Game, 400);
var statistics = { };
setInterval(function()
{
    statistics.xarr = grassArr.length;
    statistics.garr = GrassEatersArr.length;
    statistics.parr = PredatorArr.length;
    statistics.pearr = PredatorEatersArr.length;
    statistics.sarr = ShadowArr.length;
    statistics.darr = DimonArr.length;
    statistics.xfarr = FlimeArr.length;
  fs.writeFile("statistics.json", JSON.stringify(statistics),function(){console.log("sended");
  })
    

},20)


function pushGrasses()
{

    grassArr = [];
    GrassEatersArr = [];
    PredatorArr = [];
    PredatorEatersArr = [];
    ShadowArr = [];
    DimonArr = [];
    FlimeArr = [];
    
          for(let y  = 0; y <matrix.length; y++)
          {
              for (let x = 0; x < matrix[0].length; x++)
              {
                  matrix[y][x] = 0
              }
          }          
                
}
function animalAdd(xy) {
    if (xy.type == 'grass') {
        matrix[xy.y][xy.x] = 1;
        grassArr.push(new grass(xy.x, xy.y));
    }
    else if (xy.type == 'grasseater') {
        matrix[xy.y][xy.x] = 2;
        GrassEatersArr.push(new grasseater(xy.x, xy.y));
    }
    else if (xy.type == 'predator') {
        matrix[xy.y][xy.x] = 3;
        PredatorArr.push(new predator(xy.x,xy.y));
    }
    else if(xy.type == 'predatorEater'){
        matrix[xy.y][xy.x] = 4;
        PredatorEatersArr.push(new predatoreater(xy.x,xy.y));
    }
    else if(xy.type == 'Shadow'){
        matrix[xy.y][xy.x] = 5;
        ShadowArr.push(new shadow(xy.x,xy.y));
    }
    else if(xy.type == 'dimon'){
        matrix[xy.y][xy.x] = 6;
        DimonArr.push(new dimon(xy.x,xy.y));
    }
    else {
        console.log(xy.type + ' not defined')
    }
    Game();
}

io.on('connection', function (socket) {
    
    socket.on("push", pushGrasses)
    socket.on("addanimal", animalAdd)
      
     
    
 });

