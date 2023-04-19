/**
 * @author Anjun Feng
 * @date-created 15/7/2020
 * @last-edited 10/4/2023
 * @description Using p5.p5js_impl to create a sound visualizer.
 *      It reads from volume of user's mic as input, and using FFT to transform
 *      the input to numeric values that can be visualized.
 */

let mic, micFft, micWaveAmp;
let canvas;
let stars = [];
let starImages = [];

/**
 * p5.p5js_impl built-in function. It preloads specified assets.
 * While preloading, the sketch will not start. A loading screen will be shown if specified.
 *
 */
function preload() {
    for (var i = 0; i < 6; i++) {
        starImages[i] = loadImage("../assets/images/stars/star_" + i + ".png");
    }
}

/**
 * p5.p5js_impl built-in function. It is used for initializing variables and performing setup tasks
 * after the assets have been loaded and before the main loop `draw()` begins.
 */
function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('position', 'fixed');
    canvas.style('left', '0');
    canvas.style('top', '0');
    canvas.style('z-index', '-1');
    canvas.style('width', '100%');
    canvas.style('height', '100%');
    angleMode(DEGREES);
    background(0);

    getAudioContext().suspend();
    let mySynth = new p5.MonoSynth();
    mySynth.play('A6');

    initMic();

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('Your browser does not support the getUserMedia API');
    } else {
        console.log('Your browser supports the getUserMedia API');
    }
}

/**
 * p5.p5js_impl built-in function. Allows the window to resize to a specified width and height.
 */
function windowResized() {
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;
    resizeCanvas(canvasWidth, canvasHeight);
}

/**
 * Pre-defines inputs from user's mic.
 */
function initMic() {
    mic = new p5.AudioIn();
    mic.start();
    getAudioContext().resume();
    micFft = new p5.FFT();
    micFft.setInput(mic);
}


/**
 * p5.p5js_impl built-in function. Draws the content each frame rate.
 *
 */
function draw() {
    background(0); // "Refreshes" the page each frame rate to make the objects move properly
    push();
    visualize();
    pop();
}

/**
 * p5.p5js_impl built-in function. Specifies what event will occur once a mouse button is pressed.
 */
function mousePressed() {
    userStartAudio(); // Used for only IOS and Chrome
}

/**
 * Describes the behaviors of the circles and stars and visualizes them.
 */
function visualize() {
    push();

    stroke(255);
    noFill();
    translate(width/2, height/2);
    // micVolume = mic.getLevel();
    micFft.analyze();
    micWaveAmp = micFft.getEnergy(20, 720);
    var micWave = micFft.waveform();

    // draws the innermost right half-circle
    beginShape();
    for (var n = 0; n <= 180; n += 0.3) {
        var i = floor(map(n, 0, 180, 0, micWave.length - 1));
        var radius = map(micWave[i], -1, 1, width/100, width/50)
        var waveX = radius * sin(n);
        var waveY = radius * cos(n);
        strokeWeight(2);
        vertex(waveX, waveY);
    }
    endShape();

    // draws the innermost left half-circle
    beginShape();
    for (var n = 0; n <= 180; n += 0.3) {
        var i = floor(map(n, 0, 180, 0, micWave.length - 1));
        var radius = map(micWave[i], -1, 1, width/100, width/50)
        var waveX = radius * -sin(2*n);
        var waveY = radius * cos(2*n);
        strokeWeight(2);
        vertex(waveX, waveY);
    }
    endShape();

    // draws the outer circle
    beginShape();
    for (var n = 0; n <= 180; n += 0.3) {
        var i = floor(map(n, 0, 180, 0, micWave.length - 1));
        var radius = map(micWave[i], -1, 1, width/10, width/3)
        var waveX = radius * sin(n);
        var waveY = radius * cos(n);

        strokeWeight(2);
        vertex(waveX, waveY);
    }
    endShape();

    beginShape();
    for (var n = 0; n <= 180; n += 0.3) {
        var i = floor(map(n, 0, 180, 0, micWave.length - 1));
        var radius = map(micWave[i], -1, 1, width/10, width/3)
        var waveX = radius * -sin(n);
        var waveY = radius * cos(n);

        strokeWeight(2);
        vertex(waveX, waveY);
    }
    endShape();
    
    // draws the stars
    stars.push(new WaveParticle(starImages));
    for (var i = stars.length - 1; i >= 0; i--) {
        if (!stars[i].bouncing()) {
            stars[i].show();
            // controls what volume will make the stars accelerate
            stars[i].accUp(micWaveAmp > 120)
        }

        if (stars[i].bouncing()) {
            stars.splice(i, 1)
        }
    }
    pop();
}

/**
 * A class that defines properties of stars.
 * @constructor WaveParticle(img)
 */
class WaveParticle {
    constructor(img) {
        this.img = img;
        this.pos = p5.Vector.random2D().mult((width/5 - width/10));
        this.totalFrames = img.length;
        this.index = Math.round(random(0, this.totalFrames));
        this.scaleX = random(width/50, width / 150);
        this.scaleY = random(width/50, width / 150);
        this.speed = createVector(0, 0);
        this.a = this.pos.copy().mult(random(0.000001, 0.00003)); // randomize the acceleration of Particles
    }

    /**
     * visualizes the stars
     */
    show() {
        this.index += (frameCount % 3 === 0);
        this.index %= this.totalFrames;
        imageMode(CENTER);
        image(this.img[this.index], this.pos.x, this.pos.y, this.scaleX, this.scaleY);
    }

    /**
     * Checks whether a Particle has reached the edge of the canvas.
     * @returns {boolean} True if a Particle has reached the edge of the canvas
     */
    bouncing() {
        return (this.pos.x < -width / 2) || (this.pos.x > width / 2) || (this.pos.y < -height / 2) || (this.pos.y > height / 2);
    }

    /**
     * Determines how much the particle will be accelerated up after micWaveAmp > 120
     * @param bool
     */
    accUp(bool) {
        this.speed.add(this.a);
        this.pos.add(this.speed);
        if (bool) {
            if (120 <= micWaveAmp < 240 ) {
                this.multiplier(4)
            }
            if (240 <= micWaveAmp < 360) {
                this.multiplier(8)
            }
            if (360 <= micWaveAmp) {
                this.multiplier(16)
            }

        }
    }

    multiplier(num) {
        for (let i = 0; i < num; i++) {
            this.pos.add(this.speed)
        }
    }
}