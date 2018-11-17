var x, y, r, j, k, l, m, img;
let stars = []
let scaleAmount = 1
var socket = io.connect(window.location.origin);

socket.on('mysocket', function(data) {
    console.log(data);
    incoming = data.split(',');
    x = map(incoming[6], 0, 1023, 0, width);
    y = map(incoming[5], 0, 1023, 0, height);
    j = incoming[4];
    k = incoming[3];
    l = incoming[2];
    r = incoming[1];
    m = incoming[0];
});


function setup() {
    frameRate(60);
    createCanvas(windowWidth,windowHeight);
    // Starts in the middle
    // x = width / 2;
    // y = height / 2;
    for (i = 0; i < 1000; i++) {
		stars.push(new Star())
	}

}

function draw() {
    background(0)
	let moveX = x
	let moveY = y
	translate(width/2+moveX, height/2+moveY)
	scale(scaleAmount)
	for (i = 0; i < stars.length; i++) {
		stars[i].update()
        stars[i].show()
        if (Math.floor(j) === 0) {
            stars[i].pink = true
        }
	}
   
    // // background(y, y, y);
    // if (Math.floor(j) === 0) {
    //     var c = color(255, 204, 0); // Define color 'c'
    //     fill(c); // Use color variable 'c' as fill color
    //     ellipse(Math.floor(x), Math.floor(y), 100, 100);
    // } else if (Math.floor(k) === 0) {
    //     var c = color(255, 0, 0); // Define color 'c'
    //     fill(c); // Use color variable 'c' as fill color
    //     ellipse(Math.floor(x), Math.floor(y), 200, 200);
    // } else if (Math.floor(l) === 0) {
    //     image(img, Math.floor(x) - 128, Math.floor(y) - 128);
    // } else if (Math.floor(m) === 0) {
    //     var c = color(255, 255, 255); // Define color 'c'
    //     fill(c); // Use color variable 'c' as fill color
    //     rect(Math.floor(x) - 100, Math.floor(y) - 100, 200, 200);
    // } else if (Math.floor(r) === 0) {
    //     var c = color(0, 255, 0); // Define color 'c'
    //     fill(c); // Use color variable 'c' as fill color
    //     rect(Math.floor(x) - 100, Math.floor(y) - 100, 200, 200);
    // } else {
    //     var c = color(0, 0, 255); // Define color 'c'
    //     fill(c); // Use color variable 'c' as fill color
    //     ellipse(Math.floor(x), Math.floor(y), 100, 100);
    // }

}


function keyPressed() {
	// let inc = 2
	// if (keyCode === LEFT_ARROW) {
	// 	console.log("L")
	// 	x -= inc
	// } else if (keyCode === RIGHT_ARROW) {
	// 	  console.log("R")
	// 	x += inc	  
	// } else if (keyCode === UP_ARROW) {
	// 	console.log("R")
	//   	y += inc	  
  	// } else if (keyCode === DOWN_ARROW) {
	// 	console.log("R")
	//   	y -= inc	  
  	// }

	if (keyCode === UP_ARROW) {
		scaleAmount += 0.05
	} else if (keyCode === DOWN_ARROW) {
		scaleAmount -= 0.05
	}
  }

