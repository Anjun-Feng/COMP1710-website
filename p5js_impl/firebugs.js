/**
 * Author: Anjun Feng
 * Date-created: 6/4/2023
 * Last-edited: 20/4/2023
 * Description:
 * Using p5.js to create a firefly scene.
 */
let fireflies = [];
let fireflyCount = 100;
let canvas;
let canvasWidth, canvasHeight;
let backgroundColor = 0;
let isPrinterFriendly = false;
/**
 * p5.js built-in function. It is used for initializing variables and performing setup tasks
 * after the assets have been loaded and before the main loop `draw()` begins.
 */
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

    if (document.getElementById('changeColorButton') != null) {
        var changeColorButton = document.getElementById('changeColorButton');
        changeColorButton.addEventListener('click', changeBackgroundColor);
    }
}

/**
 * p5.js built-in function. Allows the window to resize to a specified width and height.
 */
function windowResized() {
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;
    resizeCanvas(canvasWidth, canvasHeight);
}

function changeBackgroundColor() {
    // 改变背景颜色的逻辑
    isPrinterFriendly = !isPrinterFriendly;
}

/**
 * p5.js built-in function. Draws the content each frame rate.
 */
function draw() {
    if (!isPrinterFriendly) {
        background(backgroundColor);

        for (let firefly of fireflies) {
            firefly.update();
            firefly.show();
        }
    }
    else {
        background(0);
    }
}

/**
 * A class that represents a firefly.
 */
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

    /**
     * Updates the position and alpha of the firefly.
     */
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

    /**
     * Visualizes the firefly.
     */
    show() {
        noStroke();
        fill(255, 255, 0, this.alpha);
        ellipse(this.x, this.y, this.size);
    }
}