console.log('God Mode On');

let c = document.getElementById("canvas");
let ctx = c.getContext("2d");

let width = canvas.width;
let height = canvas.height;
let blockSize = 50;

let widthInBlocks = width/blockSize;
let heightInBlocks = height/blockSize;
let grid = [];
let selector = "Ground";
let gameSpeed = 50;

let selectorPanel = document.getElementsByClassName('matter');

// fill the grid with objects
for (let i = 0; i < heightInBlocks; i++) {// i is responsible for HEIGHT
    grid[i] = [];
    for (let j = 0; j < widthInBlocks; j++) {//j is responsible for WIDTH
        grid[i][j] = new Matter();
    }
}

//EVENTS

c.addEventListener("mousedown", (event)=> {
    let x = Math.floor(event.clientX/blockSize);
    let y = Math.floor(event.clientY/blockSize);

    c.addEventListener("mousemove", (event)=> {
        x = Math.floor(event.clientX/blockSize);
        y = Math.floor(event.clientY/blockSize);
    });

    let holdMouse = setInterval(() => {
        drawMatter(x,y);
    }, 110);

    c.addEventListener("mouseup", (event)=> {
        clearInterval(holdMouse);
    });
});



function drawMatter(x, y)  {
    for (let i = 0; i < selectorPanel.length; i++) {
        if (selectorPanel[i].innerHTML.toLowerCase() === selector.toLowerCase()) {
            if (grid[y][x].isEmpty) {
                // eval is a BAD function. try to replace it. maybe with window
                if (selector === "Water" && grid[y+1][x].isEmpty) {
                    grid[y][x] = new Water();
                    grid[y][x].drawCircle(x,y);
                } else {
                    grid[y][x] = eval(`new ${selectorPanel[i].innerHTML}()`); //create new obj
                    grid[y][x].draw(x, y);
                }

            } else { //erase if there is something
                grid[y][x] = new Matter();
            }
        }
    }
}

//add event listeners to selector pannel
for (let i = 0; i < selectorPanel.length; i++) {
    selectorPanel[i].addEventListener("click", (event) => {
        selector = selectorPanel[i].innerHTML;
    });
}


// GAME LOOP
let int = setInterval(() => {
    //clear
    ctx.clearRect(0, 0, width, height); 
    //draw each present object from grid array
    for (let i = 0; i < grid.length; i++) { 
        for (let j = 0; j < grid[0].length; j++) {
            if (!grid[i][j].isEmpty) {//if cell is not empty
                try { // I use try/catch cuz I didn't know how to replace grid[i+1][j] condition
                    if (grid[i][j].type === "water" && grid[i+1][j].isEmpty) {
                        grid[i][j].drawCircle(j,i);
                    } else grid[i][j].draw(j, i);
                
                } catch (err) {
                    grid[i][j].draw(j, i);
                }
            }
        }
    }
    //gravity 
    for (let i = grid.length - 1; i >= 0; i--) {
        for (let j = grid[0].length - 1; j >= 0; j--) {
            if (i < grid[0].length - 1) { // stops if goes over grid height
                if (!grid[i][j].isEmpty && grid[i+1][j].isEmpty) { //if not empty AND the lower cell is empty
                    grid[i+1][j] = grid[i][j]; 
                    grid[i][j] = new Matter();
                } 
            }  
        }
    }

},gameSpeed);


// gravity in water
let waterInt = setInterval(() => {
    for (let i = grid.length - 1; i >= 0; i--) {
        for (let j = grid[0].length - 1; j >= 0; j--) {
            if (i < grid[0].length - 1) { // stops if goes over grid height
                if (!grid[i][j].isEmpty && grid[i+1][j].state === "liquid") {
                    grid[i+1][j] = grid[i][j]; 
                    grid[i][j] = new Water;
                }
            }  
        }
    }
}, gameSpeed * 4)


// Show Grid button
function showGrid() {
    console.log(grid);
}




// ctx.fillStyle = "blue";
// ctx.beginPath();
// ctx.arc(width/2, height/2, 50, 0,  Math.PI, true);
// ctx.fillRect(width/2 - 50, height/2, 100, 50);
// ctx.fill();



function drawRoundCorner(x,y, side) {
   
    if (side === "left") {
        ctx.save();
        ctx.translate(blockSize, 0);
        ctx.rotate(-3*Math.PI/2);
    }
    // arc
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(x * blockSize, y * blockSize + 50); //BottomLeft
    ctx.quadraticCurveTo(x * blockSize, y * blockSize, x * blockSize + 50, y * blockSize); //(,,topRighX, topRightY)
    // triangle
    ctx.moveTo(x * blockSize, y * blockSize + 50); // bottomoLeft
    ctx.lineTo(x * blockSize + 50, y * blockSize); //topRight
    ctx.lineTo(x * blockSize + 50, y * blockSize + 50); // bottomRight
    ctx.fill();

    if (side === "left") {
        ctx.restore();
    }
}

drawRoundCorner(0,0, "left");



