

//import sas_player_core  from './sas-player-core.js';


import tpl_data from './sas-player-tpl.js';

// let tpl_sas_player = document.createElement('template');
// tpl_sas_player.innerHTML = tpl_data;

var tpl_sas_player = document.createElement("style");
tpl_sas_player.type = "text/css";
tpl_sas_player.id = "style-sas-player";
tpl_sas_player.innerHTML = tpl_data;

document.getElementsByTagName("head")[0].appendChild(tpl_sas_player);

/*

<audio controls muted id="background_audio">

  <source src="a.mp3" type="audio/mpeg">
  Your browser does not support the audio tag.
</audio>

*/

let tpl_base = `
<section class="str__wrap">
    <section id="header" class="header">


        <div class="player__wrap">




            <div class="current-track__info">
              <div class="playing__art">
                <img id="cover-art" src="../web/src/imgs/noCover.jpg" alt="Album Art">
              </div>
              <div id="player-info" class="player-info">
                    <p></p>
                    <h3></h3>
              </div>
            </div>
          
            <div class="current-track__progress">
                    <span id="curtimetext" class="timebox">00:00</span>
                    <input type="range" id="timeline" class="timeline" min="1" max="10000" step="1" value="0">
                    <span id="durtimetext" class="timebox">00:00</span>
                    <!--
                    <div class="timebox">            
                        <span id="curtimetext">00:00</span> / <span id="durtimetext">00:00</span>        
                    </div>
                    -->
            </div>

            <div class="current-track__actions">
                <!-- 
                <button id="prevbtn" class="btn__prev">Prev</button>    
                <button id="playpausebtn" class="btn__play">Play/Pause</button> 
                <button id="nextbtn" class="btn__next">Next</button> 
                -->

                <span id="prevbtn" class="btn__prev icon" farm-icon="#icon-previous"></span>
                <span id="playpausebtn" class="btn__play icon">
                  <span class="icon_play" farm-icon="#icon-play"></span>
                  <span class="icon_pause" farm-icon="#icon-pause"></span>
                </span>
                <span id="nextbtn" class="btn__next icon" farm-icon="#icon-next"></span>
            </div>
          

          
            <div class="current-track__options">
                  <span class="volumebox">
                      <!--<button id="mutebtn">mute</button>-->
                        
                        <input id="volumeslider" orient="vertical" type="range" min="0" max="100" value="100" step="1"> 
                  </span>
                <span id="mutebtn" class="icon btn__volume" farm-icon="#icon-volume-medium"></span>
                <span id="sufflebtn" class="btn__suffle icon" farm-icon="#icon-suffle"></span>
                <span id="repeatbtn" class="btn__repeat icon" farm-icon="#icon-clockwise"></span>
            </div>

        </div>


    </section>

    <section class="content"></section>
</section>
`;

export default class sas_player_core {

    constructor( $opts, defaults ) {

        let defaults = {
            debug : true,
            editor  :document.getElementById('editor'),
            data : null,
            colorProgress :'#1ed760',
            colorTrack    :'#fff',
            objResult       :() => { return true; },
            open            :() => { return true; },
            save            :() => { return true; },
            close           :() => { return true; },
            cancel          :() => { return true; },
            libraryImage    :($data) => {
                return new Promise((resolve, reject) => {
                    resolve();
                });
            },
            libraryVideo    :($data) => {
                return new Promise((resolve, reject) => {
                    resolve();
                });
            }
        }

        super( $opts, defaults );

                this.location = '';
        this.listDOM  = '';
        
        // Boolean value so that mouse is moved on mouseUp only when the playhead is released 
        this.onplayhead = false;
        
        this.duration; // Duration of audio clip
        //var server = farm.r.server+'/music/';

        //var server = 'http://localhost:3023/api/track/';
        //this.server = farm.r.serverTracks;



        this.opts = this.extend(defaults, $opts);

        this.icon = this.icons();
    }

    extend(to, from) {
        for (var p in from) {
            if (from.hasOwnProperty(p)) {
                to[p] = from[p];
            }
        }
        return to;
    }


    init__(){

        // this.cnt = instance.querySelector('.str__wrap');

        let elem = this.opts.editor;
        elem.innerHTML = tpl_base;

        console.log('@@@@@@@@@: ', elem.getAttribute('id'))

        this.audio.pos = -1;

        console.log('this.audio: ', this.audio)



        //var audio = document.getElementById('audio'); // id for audio element
        // Makes playhead draggable 
        var clickEventType = (document.ontouchstart!==null) ? 'mousedown' : 'touchstart';
        
        this.playButton = document.getElementById("playpausebtn");
        var next = document.getElementById("nextbtn");
        var prev = document.getElementById("prevbtn");

        this.timeline = document.getElementById('timeline'); // timeline

        this.curtimetext = document.getElementById("curtimetext");
        this.durtimetext = document.getElementById("durtimetext");

        this.volumeslider = document.getElementById("volumeslider");
        this.mutebtn = document.getElementById("mutebtn");


        this.playButton.addEventListener('click', this.playPause );

        next.addEventListener('click', this.nextTrack );
        prev.addEventListener('click', this.prevTrack );

        this.timeline.addEventListener(clickEventType, (e) => this.mouseDown(e));
        this.timeline.addEventListener('mouseup', (e) => this.mouseUp(e));
        //Makes timeline clickable
        this.timeline.addEventListener("click", (e) => this.setCurrenTime(e));

        this.audio.addEventListener("ended", (e) => this.nextTrack(e));
        //audio.addEventListener('progress', progress);
        // timeupdate event listener
        this.audio.addEventListener("timeupdate", (e) => this.timeUpdate(e));
        // Gets audio file duration
        this.audio.addEventListener("canplaythrough", () => { this.duration = this.audio.duration; });

        this.volumeslider.addEventListener("mousemove", (e) => this.setvolume(e));
        this.mutebtn.addEventListener("click", (e) => this.mute(e));

        this.timeline.addEventListener('input', () => { this.progress_color( this ) });

        window.addEventListener("keyup", (e) => this.playPauseKb(e));


        this.playButton.innerHTML = this.icon.iconPlay;
    }
    playPauseKb(event) {
        var x = event.which || event.keyCode;
        console.log(x);
        var y = this.audio.paused; // == undefined ? 0 : this.audio.paused;

        //debug
        
        // 80 p
        // 83 s

        //p on the keyboard
        if (x === 80 && y == 1) {

            this.audio.play();

            console.log("playing");

        } else if (x === 80) { //s button keycode

            this.audio.pause();

            console.log("paused");

        } else if (x === 79) {

            this.audio.load();
        }
    }

    progress_color() {
        var max = this.timeline.getAttribute('max');
        var min = this.timeline.getAttribute('min');

        // rojo: #cc181e
        // verde: #1ed760

        let cp = this.opts.colorProgress;
        let ct = this.opts.colorTrack;

        var perc = this.timeline.value/100;
        var grad = 'linear-gradient(to right, '+cp+' 0%, '+cp+' '+perc +'%, '+ct+' '+perc+'%, '+ct+' 100%)'
        this.timeline.style.background = grad;
    }

    // mouseDown EventListener
    mouseDown() {
        this.onplayhead = true;
        this.audio.removeEventListener('timeupdate', () => this.timeUpdate());
    }
    // mouseUp EventListener
    // getting input from all mouse clicks
    mouseUp(e) {
        //console.log('mouseUp')
        if (this.onplayhead == true) {
            this.audio.addEventListener('timeupdate', () => this.timeUpdate());
        }
        onplayhead = false;
    }

    setCurrenTime() {
        this.audio.currentTime = (this.duration * this.timeline.value) /10000;
    }

    // timeUpdate 
    // Synchronizes playhead position with current point in audio 
    timeUpdate() {

        this.progress_color()

        var max = this.timeline.getAttribute('max');
        var min = this.timeline.getAttribute('min');

        this.timeline.value = ((this.audio.currentTime / this.duration)*max);

        if (this.audio.currentTime == this.duration) {
            // play.className = "";
            // play.className = "play";
            this.playButton.innerHTML = this.icon.iconPlay;
        }

        console.log('audio.pos timeUpdate:', this.audio)

        var curmins = Math.floor(this.audio.currentTime / 60);
        var cursecs = Math.floor(this.audio.currentTime - curmins * 60);
        var durmins = Math.floor(this.audio.duration / 60);
        var dursecs = Math.floor(this.audio.duration - durmins * 60);
        if(cursecs < 10){ cursecs = "0"+cursecs; }
        if(dursecs < 10){ dursecs = "0"+dursecs; }
        if(curmins < 10){ curmins = "0"+curmins; }
        if(durmins < 10){ durmins = "0"+durmins; }
        this.curtimetext.innerHTML = curmins+":"+cursecs;
        this.durtimetext.innerHTML = durmins+":"+dursecs;      
    }


    // Verificar
    progress() {
        var bufferedEnd = this.audio.buffered.end(audio.buffered.length - 1);
        this.duration =  this.audio.duration;
        //console.log('duration: ', duration)
        if (this.duration > 0) {
        //document.getElementById('buffered-amount').style.width = ((bufferedEnd / duration)*100) + "%";

        //document.getElementById('seekBar').value = ((bufferedEnd / duration)*100);
        }  
    }

    setvolume(){
        this.audio.volume = this.volumeslider.value / 100;
    }

    mute(){
        if(this.audio.muted){
            this.audio.muted = false;
            //mutebtn.style.background = "url(images/speaker.png) no-repeat";
            this.mutebtn.classList.remove('speaker_muted'); 
            this.mutebtn.classList.add('speaker'); 
        } else {
            this.audio.muted = true;
            //mutebtn.style.background = "url(images/speaker_muted.png) no-repeat";
            this.mutebtn.classList.remove('speaker'); 
            this.mutebtn.classList.add('speaker_muted'); 
        }
    }

    thisTrack() {

        this.setTrack();
        //audio.play();
        this.playPause()
    }


    player_info(){

    }

    icons(){
        return {
            "iconPlay" : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
            "iconPause" : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>',
            "iconFullScreen" : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>',
            "iconVolumeOff" : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>',
            "iconVolumeMute" : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 9v6h4l5 5V4l-5 5H7z"/></svg>',
            "iconVolumeDown" : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/></svg>',
            "iconVolumeUp" : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>',

            "icon-previous" : '<svg id="icon-previous" viewBox="0 0 92 92" width="100%" height="100%"><title>previous</title><path class="path1" d="M78.7,9.4c-1.4-0.7-3-0.5-4.2,0.5L33,42.9c-1,0.8-1.5,1.9-1.5,3.1s0.6,2.4,1.5,3.1l41.5,33 c0.7,0.6,1.6,0.9,2.5,0.9c0.6,0,1.2-0.1,1.7-0.4c1.4-0.7,2.3-2.1,2.3-3.6V13C81,11.5,80.1,10.1,78.7,9.4z M73,70.7L41.9,46L73,21.3 V70.7z M19,14.6v63.5c0,2.5-2,4.5-4.5,4.5s-4.5-2-4.5-4.5V14.6c0-2.5,2-4.5,4.5-4.5S19,12.1,19,14.6z"></path></svg>',
            "icon-play" : '<svg id="icon-play" viewBox="0 0 92 92" width="100%" height="100%"><title>play</title><path class="path1" d="M69.5,42.9l-42-33c-1.2-0.9-2.8-1.1-4.2-0.5C21.9,10.1,21,11.5,21,13v66c0,1.5,0.9,2.9,2.3,3.6 c0.6,0.3,1.2,0.4,1.7,0.4c0.9,0,1.8-0.3,2.5-0.9l42-33c1-0.8,1.5-1.9,1.5-3.1S70.4,43.6,69.5,42.9z M29,70.8V21.2L60.5,46L29,70.8z"></path></svg>',
            "icon-pause" : '<svg id="icon-pause" viewBox="0 0 92 92" width="100%" height="100%"><title>pause</title><path class="path1" d="M33,13v66c0,2.8-2.2,5-5,5s-5-2.2-5-5V13c0-2.8,2.2-5,5-5S33,10.2,33,13z M64,8c-2.8,0-5,2.2-5,5v66 c0,2.8,2.2,5,5,5s5-2.2,5-5V13C69,10.2,66.8,8,64,8z"></path></svg>',
            "icon-next" : '<svg id="icon-next" viewBox="0 0 92 92" width="100%" height="100%"><title>next</title><path class="path1" d="M59.5,42.9l-42-33c-1.2-0.9-2.8-1.1-4.2-0.5C11.9,10.1,11,11.5,11,13v66c0,1.5,0.9,2.9,2.3,3.6 c0.6,0.3,1.2,0.4,1.7,0.4c0.9,0,1.8-0.3,2.5-0.9l42-33c1-0.8,1.5-1.9,1.5-3.1C61,44.8,60.4,43.6,59.5,42.9z M19,70.8V21.2L50.5,46 L19,70.8z M81,14.6v63.5c0,2.5-2,4.5-4.5,4.5s-4.5-2-4.5-4.5V14.6c0-2.5,2-4.5,4.5-4.5S81,12.1,81,14.6z"></path></svg>',
            "icon-volume-medium" : '<svg id="icon-volume_medium" viewBox="0 0 92 92" width="100%" height="100%"><title>volume_medium</title><path class="path1" d="M45.6,4.3c-1.5-0.6-3.2-0.3-4.3,0.9L21.7,25H12c-2.2,0-4,1.8-4,4V63c0,2.2,1.8,4,4,4h9.7l19.7,19.8 c0.8,0.8,1.8,1.2,2.8,1.2c0.5,0,0.9-0.1,1.4-0.3c1.5-0.6,2.4-2.1,2.4-3.7V8C48,6.4,47.1,4.9,45.6,4.3z M40,74.3L26.1,60.2 c-0.8-0.8-1.7-1.2-2.7-1.2H16V33h7.4c1.1,0,2-0.4,2.7-1.2L40,17.7V74.3z M61.1,62.9c-0.8,0.9-1.9,1.3-3,1.3c-0.9,0-1.9-0.3-2.7-1 c-1.7-1.5-1.8-4-0.3-5.6c10-11.2,1-22,0-23.2c-1.5-1.7-1.3-4.2,0.4-5.6c1.7-1.5,4.2-1.3,5.6,0.3C66.3,34.9,73,49.5,61.1,62.9z M73.1,73.6c-0.8,0.9-1.9,1.3-3,1.3c-0.9,0-1.9-0.3-2.7-1c-1.7-1.5-1.8-4-0.3-5.6c19.6-21.9,0.8-43.7,0-44.6 c-1.5-1.7-1.3-4.2,0.3-5.6c1.7-1.5,4.2-1.3,5.6,0.3C73.4,18.6,97.5,46.3,73.1,73.6z"></path></svg>',
            "icon-suffle" : '<svg id="icon-suffle" viewBox="0 0 92 92" width="100%" height="100%"><title>suffle</title><path class="path1" d="M68.2,30C64,30,53.5,40.4,45.8,47.9C34.2,59.1,23.2,70,14.4,70H9c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4h5.4 c5.6,0,16.8-11.2,25.8-19.9C51.2,31.5,60.7,22,68.2,22h5.2l-5.5-5.3c-1.6-1.6-1.6-3.9,0-5.5c1.6-1.6,4.1-1.6,5.7,0l12.3,12.3 c0.8,0.8,1.2,1.8,1.2,2.8c0,1.1-0.4,2.1-1.2,2.8L73.5,41.4c-0.8,0.8-1.8,1.1-2.8,1.1c-1,0-2-0.4-2.8-1.2c-1.6-1.6-1.6-4.2,0-5.7 l5.5-5.6H68.2z M73.5,50.6c-1.6-1.6-4.1-1.6-5.7,0c-1.6,1.6-1.6,4.2,0,5.8l5.5,5.6h-5.2c-3.3,0-8.8-4.9-14.2-9.9 c-1.6-1.5-4.1-1.5-5.7,0.1c-1.5,1.6-1.4,4.3,0.2,5.8C56.8,65.7,62.4,70,68.2,70h5.2l-5.5,5.3c-1.6,1.6-1.6,4,0,5.6 c0.8,0.8,1.8,1.1,2.8,1.1c1,0,2-0.4,2.8-1.2l12.3-12.3c0.8-0.8,1.2-1.8,1.2-2.8c0-1.1-0.4-2.1-1.2-2.8L73.5,50.6z M9,30h5.4 c4.2,0,10.5,5.4,15.5,9.9c0.8,0.7,1.7,1.1,2.7,1.1c1.1,0,2.2-0.4,3-1.3c1.5-1.6,1.4-4.3-0.3-5.8c-7.8-7.1-14.4-12-20.9-12H9 c-2.2,0-4,1.8-4,4S6.8,30,9,30z"></path></svg>',
            "icon-clockwise" : '<svg id="icon-clockwise" viewBox="0 0 92 92" width="100%" height="100%"><title>clockwise</title><path class="path1" d="M86.9,41.8L73,55.8c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2l-13.8-14c-1.5-1.6-1.5-4.1,0-5.7 c1.6-1.5,4.1-1.5,5.7,0l7.7,7.8c-1-14.5-12.9-26-27.4-26C24.3,18,12,30.6,12,46s12.3,28,27.5,28c5.6,0,11-1.7,15.5-4.9 c1.8-1.3,4.3-0.8,5.6,1c1.3,1.8,0.8,4.3-1,5.6C53.7,79.8,46.7,82,39.5,82C19.9,82,4,65.9,4,46s15.9-36,35.5-36 c18.4,0,33.6,14.3,35.3,32.6l6.3-6.4c1.6-1.6,4.1-1.6,5.7,0C88.4,37.7,88.4,40.2,86.9,41.8z"></path></svg>'
        }
    }


}

