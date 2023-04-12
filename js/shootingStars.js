/**
 * @author Anjun Feng
 * @date-created 9/4/2020
 * @last-edited 10/4/2023
 * @description Using p5.js to create a scene of shooting stars.
 */

let shootingStars = [];
let canvas;

/**
 * p5.js built-in function. It is used for initializing variables and performing setup tasks
 * after the assets have been loaded and before the main loop `draw()` begins.
 */
function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    // Make the canvas fit the window
    canvas.style('position', 'fixed');
    canvas.style('left', '0');
    canvas.style('top', '0');
    canvas.style('z-index', '-1');
    canvas.style('width', '100%');
    canvas.style('height', '100%');
}

/**
 * p5.js built-in function. Draws the content each frame rate.
 */
function draw() {
    background(0);

    // Adds new stars
    if (random() < 0.7) {
        let size = random(0.05, 3);
        let velocity = map(size, 0.05, 3, 0.5, 7);
        let trailLength = map(size, 0.05, 3, 30, 10);
        let maxOpacity = map(size, 0.05, 3, 100, 255);
        shootingStars.push(new ShootingStar(velocity, trailLength, size, maxOpacity));
    }

    // Updates and draw stars
    for (let i = shootingStars.length - 1; i >= 0; i--) {
        let s = shootingStars[i];
        s.update();
        s.draw();
        if (s.isFinished()) {
            shootingStars.splice(i, 1);
        }
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
        // Move star
        this.vel.add(this.acc);
        this.pos.add(this.vel);

        // Create new trail point
        this.trail.push(this.pos.copy());

        // Remove old trail points
        if (this.trail.length > this.trailLength) {
            this.trail.splice(0, 1);
        }

        // Fade out star
        this.opacity -= 0.5;
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
