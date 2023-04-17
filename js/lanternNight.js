const particles = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(20, 20, 50);

    if (random() < 0.2) {
        particles.push(new Particle());
    }

    for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.update();
        particle.display();

        if (particle.isOffscreen()) {
            particles.splice(i, 1);
        }
    }
}

class Particle {
    constructor() {
        this.pos = createVector(random(width), height);
        this.size = random(1, 4);
        this.speed = random(0.5, 1.5);
        this.color = color(random(180, 255), random(100, 180), random(50, 100), random(180, 230));
    }

    update() {
        this.pos.y -= this.speed;
    }

    display() {
        noStroke();
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.size);
    }

    isOffscreen() {
        return this.pos.y < -this.size;
    }
}