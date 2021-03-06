class Reverb {
  
  constructor( options ) {

    this.audioContext = options.audioContext;
    this.url = options.url;

    this.convolver = this.audioContext.createConvolver();
    this.input = this.audioContext.createGain();

    this.input.connect( this.convolver );
    this.input.gain.value = 1;

    this.output = this.convolver;

    let urls = [ this.url ]

    AudioBufferLoader.load( urls, this.audioContext )
      .then( ( buffers ) => {
        this.convolver.buffer = buffers.get( 0 );
      } )
      .catch( ( error ) => console.log( error ) );
  }


}