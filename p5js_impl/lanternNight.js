/**
 * Author: Anjun Feng
 * Date-created: 6/4/2023
 * Last-edited: 20/4/2023
 * Description:
 * Using p5.js to create a lantern night scene.
 */

let canvas;
let canvasWidth, canvasHeight;
const lanterns = [];

/**
 * p5.js built-in function. Allows the window to resize to a specified width and height.
 */
function setup() {
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;
    canvas = createCanvas(canvasWidth - 8, canvasHeight);
    canvas.style('position', 'fixed');
    canvas.style('left', '0');
    canvas.style('top', '0');
    canvas.style('z-index', '-1');
    canvas.style('width', '100%');
    canvas.style('height', '100%');
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
    background(23, 22, 22);

    if (random() < 0.1) {
        lanterns.push(new Lantern());
    }

    for (let i = lanterns.length - 1; i >= 0; i--) {
        const lantern = lanterns[i];
        lantern.update();
        lantern.show();

        if (lantern.isOffscreen()) {
            lanterns.splice(i, 1);
        }
    }
}

/**
 * A class that represents a lantern.
 */
class Lantern {
    constructor() {
        this.pos = createVector(random(width), height + random(height * 0.5));
        this.size = random(5, 12);
        this.speed = random(0.5, 2);
        this.color = color(random(220, 255), random(100, 180), random(50, 100));
        this.animationOffset = random(TWO_PI);
    }

    /**
     * Updates the lantern's position.
     */
    update() {
        this.pos.y -= this.speed;
        this.pos.x += sin(frameCount * 0.01 + this.animationOffset) * 0.5;
    }

    /**
     * Visualizes the lantern.
     */
    show() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(sin(frameCount * 0.01 + this.animationOffset) * 0.2);

        // Draw main light
        fill(this.color);
        ellipse(0, 0, this.size * 0.5, this.size * 0.5);

        // Draw random light halos
        const numHalos = 5;
        for (let i = 0; i < numHalos; i++) {
            fill(this.color, random(50, 100));
            const haloSize = random(this.size * 0.6, this.size * 1.2);
            ellipse(0, 0, haloSize, haloSize);
        }

        pop();
    }

    /**
     * Checks if the lantern is offscreen.
     * @returns {boolean} True if the lantern is offscreen, false otherwise.
     */
    isOffscreen() {
        return this.pos.y < -this.size;
    }
}