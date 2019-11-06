class Matter {

    constructor() {
        this.isEmpty = true;
    }

    draw(x, y) {
        this.x = x * blockSize;
        this.y = y * blockSize;
        ctx.fillStyle = this.color;
        ctx.fillRect (this.x, this.y, blockSize, blockSize);
    }

    erase(x, y) {
        this.x = x * blockSize;
        this.y = y * blockSize;
        ctx.clearRect (this.x, this.y, blockSize, blockSize);
    }
}

class Ground extends Matter {
    constructor() {
        super();
        this.color = "brown";
        this.state = "solid";
        this.type = "ground";
        this.isEmpty = false;
    }
}

class Water extends Matter {
    constructor() {
        super();
        this.color = "dodgerblue";
        this.state = "liquid";
        this.type = "water";
        this.isEmpty = false;
        this.radius = blockSize/2;
    }

    drawCircle(x, y) {
        this.x = x * blockSize;
        this.y = y * blockSize;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, 2 * Math.PI, true);
        ctx.fill();
 
    }
}

class Rock extends Matter {
    constructor() {
        super();
        this.color = "grey";
        this.state = "solid";
        this.type = "rock";
        this.isEmpty = false;
    }
}

class Green extends Matter {
    constructor() {
        super();
        this.color = "green";
        this.state = "solid";
        this.type = "green";
        this.isEmpty = false;
    }
}