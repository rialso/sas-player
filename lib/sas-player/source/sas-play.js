
// https://prograils.com/posts/ceasta-create-custom-text-area-using-contenteditable-element

// import mNodes       from './miuss-nodes.js';
// import mParse       from './miuss-parse.js';


export default class sas_play{

    constructor($opts) {

        console.log('$opts: ', $opts)


        this.playlist = [];

        this.audio = new Audio();
        this.audio.pos = -1;

        if($opts){
            this.play = $opts;
            this.init();
        }
    }

    init(){

        this.play.addEventListener('click', () => this.playPause() );
    }

    playPause(){
        console.log('audio.pos playPause:', this.audio.pos)

        if (this.audio.pos < 0) {
            console.log('audio.pos playPause pos < 0:', this.audio.pos)
        //if (audio.pos <= 0) {
            this.nextTrack();
        } else {
            console.log(this.audio.src)
            if(this.audio.src){
                if(this.audio.paused){
                    console.log('playPause paused')
                    this.audio.play();                    
                } else {
                    console.log('playPause playing')
                    this.audio.pause();                     
                }
            }else{
                this.loadTrack()
                this.audio.play();
            }
            this.player_status();
        }
    }

    nextTrack(){
        if(this.audio.pos == (this.playlist.length - 1)){
            this.audio.pos = 0;
        } else {
            this.audio.pos++;   
        }
        this.loadTrack()
        this.audio.play();
        this.player_status();
    }

    prevTrack() {   
        if (this.audio.pos < 0) {
            this.audio.pos = this.playlist.length - 1;
        } else {
            this.audio.pos--;
        }
        this.loadTrack();
        this.audio.play();
        this.player_status();
    }

    loadTrack(){
        console.log('this.audio loadTrack: ', this.audio.pos)

        //this.audio.src = server+playlist[audio.pos].id;
        this.audio.src = this.playlist[this.audio.pos].file;
        //this.audio.src = 'a.mp3';
        //this.audio.setAttribute('type', "audio/mpeg")

        // this.player_info();
    }

    load(data){
        console.log(data);


        if( Array.isArray(data) ){
            for(let track of data){
                track.file = track.file.replace('/Users/rtb/Music/__info/music/', '')
                this.playlist.push( track )
            }
        }
        // let ix = 0;

        // this.audio.pos = ix ;
    }
    player_status(){

        console.log('this.audio.paused ', this.audio.paused)

        if(this.audio.paused){
            //this.playButton.innerHTML = this.icon.iconPlay; 
        }else{
            //this.playButton.innerHTML = this.icon.iconPause; 
        }
    }



}

/*

Attribute name  Values  Notes
volume  0.0–1.0 Specifies the initial volume setting of the audio element, in a range from 0.0 to 1.0.
preload none
metadata
auto    Requests a particular preload behavior to the browser, which the browser may or may not follow.
muted       Specifies that the volume on the audio player should initially be muted.
loop        Specifies that the audio content should loop indefinitely once playback has begun.
controls        Toggles the display of audio playback controls.
autoplay        Specifies that the audio playback should begin immediately on page load.
src url Specifies the source file for an audio element.


Read more: https://html.com/attributes/audio-src/#ixzz5i2QxVXg8

*/


/*


        var media = document.getElementById("background_audio");
 


        // console.log('audio.pos playPause:', this.audio)

        
        // // this.audio.autoplay = 'none'
        // this.audio.preload = "none";
        // this.audio.muted = true;


        // this.audio.src = 'a.mp3';

        
        // this.audio.play()


        //var media = document.getElementById("YourVideo");
// const playPromise = this.audio.play();
// if (playPromise !== null){
//     playPromise.catch(() => { this.audio.play(); })
// }

        // var audio = new Audio('a.mp3');
        // audio.load();

        // audio.play();

        

// Show loading animation.
  var playPromise = media.play();

  if (playPromise !== undefined) {
    playPromise.then(_ => {
      // Automatic playback started!
      // Show playing UI.
      console.log('-----')

        media.play()
    })
    .catch(error => {
        console.log('-----error: ', error)
      // Auto-play was prevented
      // Show paused UI.
    });
  }

// var promise = this.audio.play()

// if (promise !== undefined) {
//   promise.then(_ => {
//     // Autoplay started!

//     console.log('--si--')

//   }).catch(error => {
//     // Autoplay was prevented.
//     // Show a "Play" button so that user can start playback.

//     console.log('--no--', error)
//   });
// }



        //this.audio.play().then(() => { this.audio.pause()})



        // this.audio.play();

        // var audio = new Audio('a.mp3');



        // var playPromise = audio.play();

        //   if (playPromise !== undefined) {
        //     playPromise.then(_ => {
        //       // Automatic playback started!
        //       // Show playing UI.

        //       console.log('.....')

        //       audio.play()
        //     })
        //     .catch(error => {
        //       // Auto-play was prevented
        //       // Show paused UI.
        //     });
        //   }



        */

