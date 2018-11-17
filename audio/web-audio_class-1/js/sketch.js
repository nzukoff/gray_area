
//create audio context
const audioContext = new AudioContext();

const analyzer = audioContext.createAnalyser()
analyzer.fftSize = 512

const bufferLength = analyzer.frequencyBinCount
const dataArray = new Uint8Array(bufferLength)

analyzer.getByteTimeDomainData(dataArray)

//setup oscillator
const oscillator = audioContext.createOscillator();
oscillator.frequency = 440;
oscillator.type = "sine";
oscillator.start();

const masterGain = audioContext.createGain()
masterGain.connect(analyzer)
masterGain.connect (audioContext.destination)
oscillator.connect( masterGain );


const envelope = new ADSREnvelope ({audioContext: audioContext})
envelope.attack = 3
envelope.decay = 2
envelope.sustain = .5
envelope.release = 2
envelope.connect(masterGain.gain)

const pitchEnvelope = new ADSREnvelope ({audioContext: audioContext})
pitchEnvelope.attack = 3
pitchEnvelope.decay = 2
pitchEnvelope.sustain = 1
pitchEnvelope.release = 2
pitchEnvelope.magnitude = 1200
pitchEnvelope.connect(oscillator.detune)



masterGain.gain.value = 0


function setup() {

    createCanvas(windowWidth, windowHeight)
    background(51)
    const waveType = document.querySelector("#osc-waveform")
    waveType.addEventListener("change", function(e) {
        e.preventDefault
        oscillator.type = e.target.value
    })
    
}

function mousePressed() {
    envelope.start()
    pitchEnvelope.start()
}

function mouseReleased() {
    envelope.stop()
    pitchEnvelope.stop()
}

function draw() {
    fill(255,115,113,145)
    rect(0, 0, windowWidth, windowHeight)
    fill(0)
    let x = 0
    let sliceWidth = windowWidth/bufferLength
    analyzer.getByteTimeDomainData(dataArray)
    for (var i = 0; i < bufferLength; i ++) {
        let v = (dataArray[i]/128)
        ellipse(i * sliceWidth, windowHeight * 0.5, 5, 50 * v)
    }
    ellipse(mouseX, mouseY, 80, 80)
}