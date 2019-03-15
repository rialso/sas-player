

import sas_player   from './../lib/sas-player/source/sas-player.js';

    // import sas_play   from './lib/sas-player/source/sas-play.js';
    // let play = document.querySelector('#play');
    // var test = new sas_play(play);
    // test.load(json_data)

function init (key, params){
    let json_data = JSONdata;
    let eplayer = document.querySelector('#player');
    let eplaylist = document.querySelector('#playlist')

    let audio = document.createElement('audio');
    //audio.src = 'a.mp3';
    eplayer.appendChild(audio)

    var test = new sas_player(audio, {
        debug       :true,
        elem        :eplayer,
        data        :json_data,
        current        :(obj) => {
            console.log('[sasPlayer current]: ', obj)
        },
        ended        :(obj) => {
            console.log('[sasPlayer ended]: ', obj)

            nextTrack()
        }
    });

    let div = document.querySelector('#playlist')

    let playlist = [];
    let audioPos = 0;

    for(let a of json_data){
        
        //console.log(a)

        let li = document.createElement('li');
        li.innerHTML =  '<div class="plItem"> \
                            <span class="plNum">' + a.track + '.</span> \
                            <span class="plTitle">' + a.name + '</span> \
                            <span class="plLength">' + a.duration + '</span> \
                        </div>';

        eplaylist.appendChild(li);

        a.file = a.file.replace('/Users/rtb/Music/__info/music/', '../')
        playlist.push( a )
    }

    eplaylist.addEventListener('click', (e) => {

        //let target = e.currentTarget;
        let target = e.target;
        let x = (e.target.correspondingUseElement)?e.target.correspondingUseElement:e.target;
        let li = x.closest('li')

        let n = 0;
        for(let i of div.childNodes){
            i.classList.remove('highlighted');
            if(li == i){
                i.classList.add('highlighted');

                if(n!==audioPos){
                    audioPos = n;
                    loadTrack();
                    test.play();
                }
            }
            n++
        }
    });

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

    let next = document.querySelector('#nextbtn');
    let prev = document.querySelector('#prevbtn');

    next.addEventListener('click', () => nextTrack() );
    prev.addEventListener('click', () => prevTrack() );

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

        test.src = playlist[audioPos].file;
    }
}

init();

export default init;
