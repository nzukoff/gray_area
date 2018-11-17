var x, y, r, j, k, l, m, rotX, rotY, grow, img, img2, sat;
var socket = io.connect(window.location.origin);

socket.on('mysocket', function(data) {
    console.log(data);
    incoming = data.split(',');
    x = map(incoming[6], 0, 1023, 0, 360);
    y = map(incoming[5], 0, 1023, 0, 360);
    rotX = map(incoming[6], 0, 1023, 0, 360);
    rotY = map(incoming[5], 0, 1023, 0, 360);
    j = incoming[4];
    k = incoming[3];
    l = incoming[2];
    r = incoming[1];
    m = incoming[0];
    // console.log(incoming);
});

function preload() {
    img = loadImage("furby.png");
    img2 = loadImage("carbon.jpeg");
    sat = loadModel('Satellite.obj');
}

function setup() {
    frameRate(60);
    createCanvas(windowWidth, windowHeight, WEBGL);
    // Starts in the middle

}

function draw() {
    grow = 0;
    background(127);


    if (Math.floor(m) === 0) {
        object(1);
    } else if (Math.floor(j) === 0) {
        object(2);
    } else if (Math.floor(k) === 0) {
        object(3);
    } else if (Math.floor(l) === 0) {
        object(4);
    } else if (Math.floor(r) === 0) {
        object(5);
    } else {
        object(0);
    }
}

function object(arg) {
    if (arg === 0) {
        camera(x, y, 0);
        rotateX(radians(rotX));
        rotateY(radians(rotY));
        texture(img);
        box(100);
    } else if (arg === 1) {
        // camera(x, y, 0);
        rotateX(radians(x));
        rotateY(radians(y));
        grow = (10 + (frameCount % 128));
        texture(img);
        box(grow);
        for (var j = 0; j < 5; j++) {
            push();
            for (var i = 0; i < 80; i++) {
                translate(sin(frameCount * 0.001 + j) * 100, sin(frameCount * 0.001 + j) * 100, i * 0.1);
                rotateZ(frameCount * 0.002);
                push();
                box(grow);
                pop();
            }
            pop();
        }
    } else if (arg === 2) {
        camera(x, y, 0);
        rotateY(radians(rotY));
        texture(img);
        grow = (sin(frameCount / 10) * 500);
        box(grow + 50);
    } else if (arg === 3) {
        camera(x, y, 0);
        rotateX(radians(rotX));
        rotateY(radians(rotY));
        texture(img);
        grow = (sin(frameCount / 10) * 300);
        for (i = 0; i < 500; i += 50) {
            torus(grow + i);
        }
    } else if (arg === 4) {
        camera(x, y, 0);
        rotateX(frameCount * 0.01);
        rotateY(frameCount * 0.01);
        scale(300, 300, 300);
        texture(img2);
        model(sat);
    } else if (arg === 5) {
        // camera(x, y, 0);
        rotateX(radians(x));
        rotateY(radians(y));
        grow = (5 + (frameCount % 128));
        texture(img);
        box(grow);
        for (var j = 0; j < 5; j++) {
            push();
            for (var i = 0; i < 80; i++) {
                translate(cos(frameCount * 0.001 + j) * 100, sin(frameCount * 0.001 + j) * 100, i * 0.1);
                rotateZ(frameCount * 0.002);
                push();
                ellipsoid(grow);
                pop();
            }
            pop();
        }
    }

}