// var LiveForm = require("./LiveForm.js");


// module.exports = class Grass extends LiveForm{
//     constructor(x, y,ind) {
//         super(x,y,ind)
//     }
//     chooseCell(character) {
//         var found = [];
//         for (var i in this.directions) {
//             var x = this.directions[i][0];
//             var y = this.directions[i][1];
//             if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
//                 if (matrix[y][x] == character) {
//                     found.push(this.directions[i]);
//                 }


//             }

//         } return found;

//     }
//     mul() {
//         this.multiply++;
//         var emptyCells = this.chooseCell(0);
//         // var newCell = random(emptyCells);
        	
//        var newCell = emptyCells[Math.floor(Math.random()*emptyCells.length)];
//         if (newCell && this.multiply >= 1) {

//             var newX = newCell[0];
//             var newY = newCell[1];
//             matrix[newY][newX] = 1;

//             var newGrass = new Grass(newX, newY,1);
//             grassArr.push(newGrass);
//             this.multiply = 0;
//         }
//     }
// }

var LiveForm = require("./LiveForm.js");
module.exports = class Grass extends LiveForm {
    
    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    
    getDirections(ch) {
        this.newDirections();
        return super.chooseCell(ch);
    }
 

    mul() {
        this.multiply++;
        if (this.multiply == 4) {
            var fundCords = this.getDirections(0);
            var cord = fundCords[Math.floor(Math.random()*fundCords.length)];

            if (cord) {
                var x = cord[0];
                var y = cord[1];
                var newGrass = new Grass(x, y, this.index);
                grassArr.push(newGrass);
                matrix[y][x] = 1;
                this.multiply = 0;
            }
        }
    }
}

