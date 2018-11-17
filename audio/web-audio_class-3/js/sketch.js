
//create audio context
const audioContext = new AudioContext();

//setup analyser
const analyser = audioContext.createAnalyser();
analyser.fftSize = 128;

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array( bufferLength );

analyser.getByteTimeDomainData( dataArray );

//setup oscillator
const oscillator = audioContext.createOscillator();
oscillator.frequency = 440;
oscillator.type = "sine";
oscillator.start();

//setup a master gain
const masterGain = audioContext.createGain();
masterGain.connect( analyser );
masterGain.connect( audioContext.destination );
oscillator.connect( masterGain );

masterGain.gain.value = 0;

//setup ADSR
const envelope = new ADSREnvelope( {audioContext: audioContext} );
envelope.attack = 3;
envelope.decay = 2;
envelope.sustain = .5;
envelope.release = 2;
envelope.connect( masterGain.gain );
envelope.connect( oscillator.detune, 1200 );


function setup() {

	


	createCanvas( windowWidth, windowHeight );

}

function keyPressed() {
	switch( keyCode ) {
		case 49://1
			oscillator.type = "sine";
			break;
		case 50://2
			oscillator.type = "square";
			break;
		case 51://3
			oscillator.type = "sawtooth";
			break;
		case 52://4
			oscillator.type = "triangle";
			break;
	}

  console.log( "key pressed", keyCode );

}

function mousePressed(){

	envelope.start();

}

function mouseReleased() {

	envelope.stop();

}

function draw() {

	fill( 255, 255, 255, 127 );
	rect( 0, 0, windowWidth, windowHeight );

	fill( 0 );

	//draw waveform
	let x = 0;
	let sliceWidth = windowWidth / bufferLength;

	analyser.getByteTimeDomainData( dataArray );

	for( var i = 0; i < bufferLength; i++ ) {

		let v = ( dataArray[ i ] / 128 );

		ellipse( i * sliceWidth, windowHeight * .5, 5, 50 * v );

	}

	ellipse( mouseX, mouseY, 80, 80 );



}