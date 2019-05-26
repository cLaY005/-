var LiveForm = require("./LiveForm.js");

module.exports = class Flime extends LiveForm{
     
    constructor(x, y,ind) {
        super(x,y,ind)
        this.energy = 3;
    }
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
    getDirections(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    getDirections(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        //որոնում է դատարկ տարածքներ
        var fundCords = this.getDirections(0);
       	var cord = fundCords[Math.floor(Math.random()*fundCords.length)];

        if (cord) {
           
            var x = cord[0];
            var y = cord[1];

            //կատարում է տեղափոխություն հիմնական matrix-ում 
            matrix[y][x] = 7;
            matrix[this.y][this.x] = 0;

            //թարմացնում է սեփական կորդինատները
            this.x = x;
            this.y = y;

        }
    }
    mul() {
        //փնտրում է դատարկ տարածք
        var fundCords = this.getDirections(0);
        var cord = fundCords[Math.floor(Math.random()*fundCords.length)];

        //եթե կա բազմանում է
        if (cord) {
            var x = cord[0];
            var y = cord[1];

            this.multiply++;

            //ստեղծում է նոր օբյեկտ (այստեղ խոտակեր) 
            //և տեղադրում է այն խոտակերների զանգվածի մեջ
            var newFlime = new Flime(x, y);
            FlimeArr.push(newFlime);

            //հիմնական matrix-ում կատարում է գրառում նոր խոտի մասին
            matrix[y][x] = 7;
            
        }
    }
    eat() {
        //հետազոտում է շրջակայքը, որոնում է սնունդ
        var fundCords = this.getDirections(5);
        // var foundCords1 = this.getDirections(1);
        // var foundCords3 = fundCords.concat(foundCords1);
        var cord = fundCords[Math.floor(Math.random()*fundCords.length)];

        //եթե կա հարմար սնունդ
        if (cord) {
            var x = cord[0];
            var y = cord[1];

            //հիմնական մատրիցայում տեղափոխվում է կերած սննդի տեղը
     
            //իր հին տեղը դնում է դատարկ վանդակ
            // var r = matrix[y][x];
            matrix[y][x] = 7;
            matrix[this.y][this.x] = 0;

            //փոխում է սեփական կորդինատները օբյեկտի մեջ
            this.x = x;
            this.y = y;

            //բազմացման գործակիցը մեծացնում է
            this.multiply++;

            //մեծացնում է էներգիան
            this.energy++;
            
            //!!! ԿԱՐԵՎՈՐ !!! սննդի զանգվածից ջնջում է կերված սնունդը
            //խոտակերի համար դա խոտն է, խոտերի զանգվածի մեջ xotArr
            for (var i in DimonArr) {
                if (x == DimonArr[i].x && y == DimonArr[i].y) {  
                   
                    
                    DimonArr.splice(i, 1);
                    
                }
            }
            // for(var i in grassArr){
            //     if(x == grassArr[i].x && y == grassArr[i].y)
            //     {
            //         if(r == 1)
            //         {
            //             grassArr.splice(i,2);
            //         }
            //     }
            // }

            //եթե պատրաստ է բազմացմանը, բազմանում է 
            if (this.multiply == 20) {
                this.mul()
                this.multiply = 0;
            }
            


        } else {
            //եթե չկա հարմար սնունդ 
            this.move();
            this.energy--;
            if (this.energy <= 1) { //մահանում է, եթե էներգիան 3֊ից ցածր է
                this.die();
            }
        }
    }
    die() {
        
        //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
        matrix[this.y][this.x] = 0;

        //!!! ԿԱՐԵՎՈՐ !!! ջնջում է ինքն իրեն խոտակերների զանգվածից
        for (var i in FlimeArr) {
            if (this.x == FlimeArr[i].x && this.y == FlimeArr[i].y) {
                FlimeArr.splice(i, 1);
                
            }
        }
        
    }
}