var x, y, r, j, k, l, img;
var socket = io.connect(window.location.origin);

socket.on('mysocket', function(data) {
    console.log(data);
    incoming = data.split(',');
    x = map(incoming[4], 0, 1023, 0, width);
    y = map(incoming[5], 0, 1023, 0, height);
    j = incoming[0];
    k = incoming[1];
    l = incoming[2];
    r = incoming[3];
    // console.log(incoming);
});

function preload() {
    img = loadImage("furby.png");
}

function setup() {
    frameRate(60);
    createCanvas(1024, 768);
    // Starts in the middle
    x = width / 2;
    y = height / 2;

}

function draw() {
    background(150);
    textSize(32);
    fill(50);
    text(Math.floor(x), 0, 32);
    text(Math.floor(y), 0, 64);
    text(Math.floor(j), 0, 96);
    text(Math.floor(k), 0, 128);
    text(Math.floor(l), 0, 160);
    text(Math.floor(r), 0, 192);

    // Draw a circle
    stroke(50);
    // fill(x, x, x);
    // background(y, y, y);
    if (Math.floor(j) === 0) {
        var c = color(255, 204, 0); // Define color 'c'
        fill(c); // Use color variable 'c' as fill color
        ellipse(Math.floor(x), Math.floor(y), 100, 100);
    } else if (Math.floor(k) === 0) {
        var c = color(255, 0, 0); // Define color 'c'
        fill(c); // Use color variable 'c' as fill color
        ellipse(Math.floor(x), Math.floor(y), 200, 200);
    } else if (Math.floor(l) === 0) {
        image(img, Math.floor(x) - 128, Math.floor(y) - 128);
    } else if (Math.floor(r) === 0) {
        var c = color(0, 255, 0); // Define color 'c'
        fill(c); // Use color variable 'c' as fill color
        rect(Math.floor(x) - 100, Math.floor(y) - 100, 200, 200);
    } else {
        var c = color(0, 0, 255); // Define color 'c'
        fill(c); // Use color variable 'c' as fill color
        ellipse(Math.floor(x), Math.floor(y), 100, 100);
    }

    // Jiggling randomly on the horizontal axis
    x = x + random(-1, 1);
    // Moving up at a constant speed
    y = y - 1;
    // Reset to the bottom
    if (y < 0) {
        y = height;
    }
}