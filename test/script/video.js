

import sas_player   from './../../source/sas-player.js';

function init (object){
    let data = object;
    let eplayer = document.querySelector('#video');



    // preload="auto" controls autoplay

    let video = document.createElement('video');
    video.src = data[0].file;
    // video.setAttribute('type', "video/mp4");
    video.setAttribute('preload', "auto");
    video.setAttribute('controls',true);
    video.setAttribute('autoplay',true)
    eplayer.appendChild(video)

    console.log('video: ', video)

    var test = new sas_player(video, {
        debug       :true,
        //data        :data,
        showHide      :false,
        inside        :true,
        current        :(obj) => {
            console.log('[sasPlayer current]: ', obj)
        },
        ended        :(obj) => {
            console.log('[sasPlayer ended]: ', obj)
        }
    }); 
}



export default init;
