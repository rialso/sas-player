

import sas_player   from './../../source/sas-player.js';

function init (object){
    let data = object;
    let eplayer = document.querySelector('#player');


    let audio = document.createElement('audio');
    //audio.src = 'a.mp3';
    eplayer.appendChild(audio)

    var test = new sas_player(audio, {
        debug       :true,
        //data        :data,
        current        :(obj) => {
            console.log('[sasPlayer current]: ', obj)
        },
        ended        :(obj) => {
            console.log('[sasPlayer ended]: ', obj)

            nextTrack()
        }
    });

    let eplaylist = document.querySelector('#playlist')
    let next = document.querySelector('#nextbtn');
    let prev = document.querySelector('#prevbtn');

    eplaylist.addEventListener('click', (e) => playlistControl(e) )
    // next.addEventListener('click', () => nextTrack() );
    // prev.addEventListener('click', () => prevTrack() );

    let playlist = [];
    let audioPos = -1;

    for(let a of data){
        
        console.log(a)

        let li = document.createElement('li');
        li.innerHTML =  '<div class="plItem"> \
                            <span class="plNum">' + a.track + '.</span> \
                            <span class="plTitle">' + a.name + '</span> \
                            <span class="plLength">' + a.duration + '</span> \
                        </div>';

        eplaylist.appendChild(li);

        // a.file = a.file.replace('/Users/rtb/Music/__info/music/', '../../')
        playlist.push( a )
    }

    audio.src = playlist[0].file;

    // eplaylist.addEventListener('click', (e) => {
    function playlistControl(e){

        //let target = e.currentTarget;
        let target = e.target;
        let x = (e.target.correspondingUseElement)?e.target.correspondingUseElement:e.target;
        let li = x.closest('li')

        let n = 0;
        for(let i of eplaylist.childNodes){
            i.classList.remove('highlighted');
            if(li == i){
                i.classList.add('highlighted');
                if(n!==audioPos || audioPos == -1){
                    audioPos = n;
                    loadTrack();
                    test.play();
                }
            }
            n++
        }
    };

    function update(){
        let n = 0;
        for(let i of eplaylist.childNodes){
            i.classList.remove('highlighted');

            if(n == audioPos){
                i.classList.add('highlighted');
            }
            n++
        }
    }

    function nextTrack(){
        if(audioPos == (playlist.length - 1)){
            audioPos = 0;
        } else {
            audioPos++;   
        }
        loadTrack()
        test.play();
        update();
    }

    function prevTrack() {   
        if (audioPos <= 0) {
            audioPos = playlist.length - 1;
        } else {
            audioPos--;
        }
        loadTrack();
        test.play();
        update();
    }

    function loadTrack(){
        console.log('this.audio loadTrack: ', audioPos)

        // var reader = new FileReader();
        // reader.onload = function (e) {
        //     //$audio.attr('src', e.target.result);
        //     test.src = e.target.result;
        //     // test.play();
        // }
        // reader.readAsDataURL(playlist[audioPos]);



        test.src = playlist[audioPos].file;
    }
}



export default init;
