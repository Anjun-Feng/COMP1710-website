let fireflies = [];
let fireflyCount = 100;
let canvas;
let canvasWidth, canvasHeight;

function setup() {
    canvasWidth = windowWidth - 8;
    canvasHeight = windowHeight - 8;
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.style('position', 'fixed');
    canvas.style('left', '0');
    canvas.style('top', '0');
    canvas.style('z-index', '-1');
    canvas.style('width', '100%');
    canvas.style('height', '100%');

    for (let i = 0; i < fireflyCount; i++) {
        fireflies.push(new Firefly());
    }
}

function windowResized() {
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;
    resizeCanvas(canvasWidth, canvasHeight);
}

function draw() {
    background(0);
    for (let firefly of fireflies) {
        firefly.update();
        firefly.display();
    }
}

class Firefly {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.size = random(2, 5);
        this.speedX = random(-1, 1);
        this.speedY = random(-1, 1);
        this.alpha = random(100, 255);
        this.alphaChange = random(1, 5);
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha += this.alphaChange;

        if (this.alpha <= 100 || this.alpha >= 255) {
            this.alphaChange = -this.alphaChange;
        }

        if (this.x < 0 || this.x > width) {
            this.speedX = -this.speedX;
        }

        if (this.y < 0 || this.y > height) {
            this.speedY = -this.speedY;
        }
    }

    display() {
        noStroke();
        fill(255, 255, 0, this.alpha);
        ellipse(this.x, this.y, this.size);
    }
}