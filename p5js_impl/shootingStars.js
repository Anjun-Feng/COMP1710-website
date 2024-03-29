/**
 * Author: Anjun Feng
 * Date-created: 6/4/2023
 * Last-edited: 20/4/2023
 * Description:
 * Using p5.js to create a shooting star scene.
 */
let canvas;
let shootingStars = [];
let canvasWidth, canvasHeight;

let backgroundColor = 0;
let isPrinterFriendly = false;

/**
 * p5.js built-in function. It is used for initializing variables and performing setup tasks
 * after the assets have been loaded and before the main loop `draw()` begins.
 */
function setup() {
    canvasWidth = windowWidth - 8; // 8 is the width of the scroll bar. See default.css
    canvasHeight = windowHeight - 8;
    canvas = createCanvas(canvasWidth, canvasHeight);

    // Make the canvas fit the window
    canvas.style('position', 'fixed');
    canvas.style('left', '0');
    canvas.style('top', '0');
    canvas.style('z-index', '-1');
    canvas.style('width', '100%');
    canvas.style('height', '100%');

    if (document.getElementById('changeColorButton') != null) {
        var changeColorButton = document.getElementById('changeColorButton');
        changeColorButton.addEventListener('click', changeBackgroundColor);
    }
}



function changeBackgroundColor() {
    isPrinterFriendly = !isPrinterFriendly;
}

/**
 * p5.js built-in function. Allows the window to resize to a specified width and height.
 */
function windowResized() {
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;
    resizeCanvas(canvasWidth, canvasHeight);
}

/**
 * p5.js built-in function. Draws the content each frame rate.
 */
function draw() {
    if (!isPrinterFriendly) {
        background(backgroundColor);

        if (random() < 0.9) {
            let size = random(0.05, 3);
            let velocity = map(size, 0.05, 3, 0.5, 7);
            let trailLength = map(size, 0.05, 3, 30, 10);
            let maxOpacity = map(size, 0.05, 3, 100, 255);
            shootingStars.push(new ShootingStar(velocity, trailLength, size, maxOpacity));
        }

        for (let i = shootingStars.length - 1; i >= 0; i--) {
            let s = shootingStars[i];
            s.update();
            s.draw();
            if (s.isFinished()) {
                shootingStars.splice(i, 1);
            }
        }
    }
    else {
        background(0);
    }
}
/**
 * Creates a class for the shooting stars
 * @constructor ShootingStar(velocity, trailLength, strokeWidth, maxOpacity)
 */
class ShootingStar {
    constructor(velocity, trailLength, strokeWidth, maxOpacity) {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(velocity, velocity);
        this.acc = createVector(0, 0);
        this.trail = [];
        this.opacity = maxOpacity;
        this.trailLength = trailLength;
        this.strokeWidth = strokeWidth;
    }

    /**
     * Defines rules for updating ShootingStars
     */
    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);

        this.trail.push(this.pos.copy());

        if (this.trail.length > this.trailLength) {
            this.trail.splice(0, 1);
        }

        // 增加流星消失速度
        this.opacity -= 1.5;

    }

    /**
     * Draws ShootingStars
     */
    draw() {

        // Draws trail
        blendMode(ADD); // Enables additive blending for the glow effect
        noFill();
        for (let i = 0; i < this.trail.length - 1; i++) {
            let opacity = map(i, 0, this.trail.length, 0, this.opacity);
            let weight = map(i, 0, this.trail.length, 1, this.strokeWidth);
            stroke(255, 255, 255, opacity);
            strokeWeight(weight);
            line(this.trail[i].x, this.trail[i].y, this.trail[i + 1].x, this.trail[i + 1].y);
        }
        blendMode(BLEND); // Resets the blend mode
    }

    /**
     * Defines when a ShootingStar is finished
     * @returns {boolean} true if it's opacity is less than 0
     */
    isFinished() {
        return this.opacity <= 0;
    }
}
