/**
 * Inspired by: Daniel Shiffman's Coding Challenge #1: Snowfall
 * Author： Anjun Feng
 * Date-created 15/7/2020
 * Last-edited 10/4/2023
 * Description:
 * Using p5.js to create a sound visualizer.
 * It reads from volume of user's mic as input, and using FFT to transform
 * the input to numeric values that can be visualized.
 */

let canvas;
let snows = [];
let gravity;
let zOff = 0;
let canvasWidth, canvasHeight;

/**
 * p5.js built-in function. Allows the window to resize to a specified width and height.
 */
function setup() {
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;
    canvas = createCanvas(canvasWidth - 8, canvasHeight - 8);
    canvas.style('position', 'fixed');
    canvas.style('left', '0');
    canvas.style('top', '0');
    canvas.style('z-index', '-1');
    canvas.style('width', '100%');
    canvas.style('height', '100%');

    gravity = createVector(0, 0.3);

    for (let i = 0; i < 500; i++) {
        let x = random(width);
        let y = random(height);
        snows.push(new Snowflake(x, y));
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

/**
 * p5.js built-in function. Draws the content each frame rate.
 */
function draw() {
    background(0);
    zOff += 0.1;

    for (snow of snows) {
        let xOff = snow.pos.x / width;
        let yOff = snow.pos.y / height;
        let wAngle = noise(xOff, yOff, zOff) * TWO_PI;
        let wind = p5.Vector.fromAngle(wAngle);
        wind.mult(0.1);

        snow.accUp(gravity);
        snow.accUp(wind);
        snow.update();
        snow.show();
    }
}

/**
 * Randomizes the size of snowflake.
 * @returns {*} The size of snowflake.
 */
function randomize() {
    let r = pow(random(0, 1), 3);
    return constrain(r * 16, 1, 16);
}

/**
 * Snowflake class.
 */
class Snowflake {
    constructor(sx, sy) {
        let x = sx || random(width);
        let y = sy || random(-100, -10);
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector();
        this.angle = random(TWO_PI);
        this.dir = (random(1) > 0.5) ? 1 : -1;
        this.xOff = 0;
        this.r = randomize();
    }

    /**
     * Adds force to the snowflake.
     * @param force The force to be added.
     */
    accUp(force) {
        let f = force.copy();
        f.mult(this.r);
        this.acc.add(f);
    }

    /**
     * Randomizes the snowflake.
     */
    randomize() {
        let x = random(width);
        let y = random(-100, -10);
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector();
        this.r = randomize();
    }

    /**
     * Updates the snowflake.
     */
    update() {
        this.xOff = sin(this.angle * 2) * 2 * this.r;

        this.vel.add(this.acc);
        this.vel.limit(this.r * 0.2);

        if (this.vel.mag() < 1) {
            this.vel.normalize();
        }

        this.pos.add(this.vel);
        this.acc.mult(0);

        if (this.pos.y > height + this.r) {
            this.randomize();
        }

        if (this.pos.x < -this.r) {
            this.pos.x = width + this.r;
        }
        if (this.pos.x > width + this.r) {
            this.pos.x = -this.r;
        }

        this.angle += this.dir * this.vel.mag() / 200;
    }

    /**
     * Visualizes the snowflake.
     */
    show() {
        push();
        translate(this.pos.x + this.xOff, this.pos.y);
        rotate(this.angle);
        stroke(255);
        strokeWeight(2);
        noFill();

        // Draw the snowflake
        for (let i = 0; i < 6; i++) {
            line(0, 0, 0, -this.r);
            line(0, -this.r, 0, -this.r * 0.7);
            push();
            translate(0, -this.r * 0.7);
            rotate(radians(60));
            line(0, 0, 0, -this.r * 0.3);
            pop();
            rotate(radians(60));
        }
        pop();
    }
}