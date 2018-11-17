const sampleURLs = ["audio/it-takes-two.mp3"]

//create audio context
const audioContext = new AudioContext();

//setup analyser
const analyser = audioContext.createAnalyser();
analyser.fftSize = 128;

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array( bufferLength );

analyser.getByteTimeDomainData( dataArray );



//setup a master gain
const masterGain = audioContext.createGain();
masterGain.connect( analyser );
masterGain.connect( audioContext.destination );

const reverb = new Reverb({
	audioContext, 
	url: "audio/impulses/space.wav"
})

masterGain.connect(reverb.input )
reverb.output.connect(audioContext.destination)

const voiceCount = 6
let currentVoiceIndex = 0
let voiceMap = new Map()

for(let i=0; i<voiceCount; i++) {
	let voice = new SynthVoice({audioContext})
	voiceMap.set(i, voice)
	voice.output.connect(masterGain)
}

let currentVoice = voiceMap.get(currentVoiceIndex)

AudioBufferLoader.load(sampleURLs, audioContext)
	.then( buffers => {
		voiceMap.forEach(voice => {
			voice.buffers = buffers
		})
	})

function setup() {
	createCanvas( windowWidth, windowHeight );
}

function keyPressed() {
	switch( keyCode ) {
		case 49://1
			setOscillator("sine");
			break;
		case 50://2
			setOscillator("square");
			break;
		case 51://3
			setOscillator("sawtooth");
			break;
		case 52://4
			setOscillator("triangle");
			break;
		case 65://a
			setLFOOscillator("sine");
			break;
		case 83://s
			setLFOOscillator("square")
			break;
		case 68://d
			setLFOOscillator("sawtooth")
			break;
		case 70://f
			setLFOOscillator("triangle")
			break;
	}

  console.log( "key pressed", keyCode );

}

function setLFOOscillator(value) {
	voiceMap.forEach((voice) => {
		voice.oscillator.type = value
	})
}

function setOscillator(value) {
	voiceMap.forEach((voice) => {
		voice.oscillator.type = value
	})
}

function startVoice() {
	currentVoiceIndex = (currentVoiceIndex + 1) % voiceCount
	currentVoice = voiceMap.get(currentVoiceIndex)
	currentVoice.start((mouseX/windowWidth))
}

function stopVoice() {
	currentVoice.stop()
}

function mousePressed(){
	startVoice()

}

function mouseReleased() {
	stopVoice()
}

function draw() {

	if (mousePressed) {
		currentVoice.lfo.oscillator.frequency.value = 50 * (mouseX/windowWidth)
		currentVoice.lfo.depth.gain.value = (mouseY/windowHeight)
	}

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