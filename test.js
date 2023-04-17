const lanterns = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(20, 20, 50);

    if (random() < 0.05) {
        lanterns.push(new Lantern());
    }

    for (let i = lanterns.length - 1; i >= 0; i--) {
        const lantern = lanterns[i];
        lantern.update();
        lantern.display();

        if (lantern.isOffscreen()) {
            lanterns.splice(i, 1);
        }
    }
}

class Lantern {
    constructor() {
        this.pos = createVector(random(width), height);
        this.size = random(10, 25);
        this.speed = random(0.5, 1.5);
        this.color = color(random(180, 255), random(80, 180), random(50, 100));
        this.animationOffset = random(TWO_PI);
    }

    update() {
        this.pos.y -= this.speed;
        this.pos.x += sin(frameCount * 0.02 + this.animationOffset) * 0.5;
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(sin(frameCount * 0.02 + this.animationOffset) * 0.2);

        // Draw main light
        fill(this.color);
        ellipse(0, 0, this.size * 0.3, this.size * 0.5);

        // Draw random light halos
        const numHalos = 3;
        for (let i = 0; i < numHalos; i++) {
            fill(this.color, random(80, 130));
            const haloSize = random(this.size * 0.4, this.size * 0.9);
            ellipse(0, 0, haloSize, haloSize);
        }

        pop();
    }

    isOffscreen() {
        return this.pos.y < -this.size;
    }
}