var side = 30;
var socket = io();

var layn = 13;
var bardz = 17;
 
function setup() {
  
  createCanvas(30 * side, 20 * side);
    background('#acacac');

}
var c = 1;
function changeColor(seasson)
{
    if(seasson == "winter")
    {
        c =1;
    }
    if(seasson == "spring")
    {
        c =2;
    }
    if(seasson == "summer")
    {
        c =3;
    }
    if(seasson == "autumn")
    {
        c =4;
    }
}
socket.on("ugharkum em", drawMatrix);
socket.on("exanak", changeColor);


function drawMatrix(matrix) {
    
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                if(c ==1)
                {
                   fill("white"); 
                }
                if(c ==2)
                {
                   fill("#00ff00"); 
                }
                if(c ==3)
                {
                   fill("#00ff00"); 
                }
                if(c ==4)
                {
                   fill("orange"); 
                }
              
                rect(x * side, y * side, side, side);
            }
            else if(matrix[y][x] == 2)
            {
                // fill("#ffff99");
                if(c ==1)
                {
                   fill("yellow"); 
                }
                if(c ==2)
                {
                   fill("#ffff99"); 
                }
                if(c ==3)
                {
                   fill("#ffffcc"); 
                }
                if(c ==4)
                {
                   fill("#ccffcc"); 
                }
                rect(x * side, y * side, side, side);   
            }
             else if(matrix[y][x] == 3)
            {
                // #bf4646
                fill("#bf4646");
                rect(x * side, y * side, side, side);   
            }
            else if(matrix[y][x] == 4)
            {
                fill("#ffffff");
                rect(x * side, y * side, side, side);   
            }
            else if(matrix[y][x] == 5)
            {
                fill("pink");
                rect(x * side, y * side, side, side);   
            }
            else if(matrix[y][x] == 6)
            {
                // fill("#000066");
                if(c ==1)
                {
                   fill("#000066"); 
                }
                if(c ==2)
                {
                   fill("#9999ff"); 
                }
                if(c ==3)
                {
                   fill("#6699ff"); 
                }
                if(c ==4)
                {
                   fill("#0066ff"); 
                }
                rect(x * side, y * side, side, side);   
            }
            else if(matrix[y][x] == 7)
            {
                fill("red");
                rect(x * side, y * side, side, side);   
            }
            else if (matrix[y][x] == 0) {
                fill("#ffdf8e");
                rect(x * side, y * side, side, side);
            }
        }
    }

}




function pushGrasses(){
    socket.emit('push');
  

}

function addAnimal() {

	xy = {
		x: document.getElementById('inputx').value,
		y: document.getElementById('inputy').value,
		type: document.getElementById('animaltype').value
	}
	socket.emit('addanimal', xy);
}
