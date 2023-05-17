/**
 * Author: Anjun Feng
 * Date-created: 6/4/2023
 * Last-edited: 22/4/2023
 * Description:
 * Using p5.js to create a galaxy scene with blinking stars.
 */

let canvas;
let canvasWidth, canvasHeight;
let stars = [];
let numStars = 600;
let backgroundColor = 0;
let isPrinterFriendly = false;
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
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }

    if (document.getElementById('changeColorButton') != null) {
        var changeColorButton = document.getElementById('changeColorButton');
        changeColorButton.addEventListener('click', changeBackgroundColor);
    }
}

function windowResized() {
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;
    resizeCanvas(canvasWidth, canvasHeight);
}

function changeBackgroundColor() {
    isPrinterFriendly = !isPrinterFriendly;
}

function draw() {
    if (!isPrinterFriendly) {
        background(backgroundColor);

        for (let i = 0; i < stars.length; i++) {
            stars[i].update();
            stars[i].display();
        }
    }
    else {
        background(0);
    }
}

/**
 * Defines a class for stars.
 */
class Star {
    constructor() {
        this.resetStar();
        this.size = random(0.5, 3);
        this.color = color(255, random(180, 255), random(180, 255));
        this.twinkleSpeed = random(0.02, 0.1);
        this.angle = random(TWO_PI);
        this.respawnTimer = random(100, 200);
        this.alpha = 255;
        this.fadeSpeed = 2; // Lower the fade speed for slower fading in and out
        this.fadingOut = false;
    }

    /**
     * Resets the star to a random position.
     */
    resetStar() {
        let inGalaxy = random() < 0.3;
        if (inGalaxy) {
            this.pos = createVector(randomGaussian(width / 2, 150), randomGaussian(height / 2, 50));
        } else {
            this.pos = createVector(random(width), random(height));
        }
    }

    /**
     * Updates the star's position and brightness.
     */
    update() {
        this.angle += this.twinkleSpeed;
        this.brightness = map(sin(this.angle), -1, 1, 180, 255);
        this.respawnTimer--;

        if (this.respawnTimer <= 0) {
            if (this.fadingOut) {
                this.alpha -= this.fadeSpeed;
                if (this.alpha <= 0) {
                    this.resetStar();
                    this.respawnTimer = random(100, 200);
                    this.fadingOut = false;
                }
            } else {
                this.alpha += this.fadeSpeed;
                if (this.alpha >= 255) {
                    this.alpha = 255;
                    this.fadingOut = true;
                }
            }
        }
    }

    /**
     * Displays the star.
     */
    display() {
        let c = color(red(this.color), green(this.color), blue(this.color), this.brightness * this.alpha / 255);
        noStroke();
        fill(c);
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}