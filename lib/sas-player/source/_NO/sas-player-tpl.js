
export default `

<style>
    @import url('https://fonts.googleapis.com/css?family=Oxygen:300,400,700');

    :host {
        --orange: #e67e22;
        --space: 1.5em;
    }


    .str__wrap {
    }

    .str__wrap .header {
        background: #282828;
        display: block;
        border-bottom: 1px solid rgba(200, 200, 200, 0.15); 
    }

    .str__wrap .content {
    }

    .str__wrap .content {
            -webkit-flex-grow: 1;
            -moz-flex-grow: 1;
            -o-flex-grow: 1;
            -ms-flex: 1;
            flex-grow: 1;
            display: block;
            overflow: auto;
            -webkit-flex-flow: row wrap;
            -moz-flex-flow: row wrap;
            -ms-flex-flow: row wrap;
            -o-flex-flow: row wrap;
            flex-flow: row wrap;
            -webkit-flex-wrap: nowrap;
            -moz-flex-wrap: nowrap;
            -o-flex-wrap: nowrap;
            -ms-flex-wrap: none;
            flex-wrap: nowrap;
            display: -webkit-flex;
            display: -moz-box;
            display: -ms-flexbox;
            display: flex;
            overflow: hidden; }
          .str__wrap .content__main {
            -webkit-box-flex: 2;
            -moz-box-flex: 2;
            -webkit-flex: 2;
            -ms-flex: 3;
            flex: 3;
            overflow-y: auto;
            text-align: left; }
          .str__wrap .content__one {
            -webkit-box-flex: 1;
            -moz-box-flex: 1;
            -webkit-flex: 1;
            -ms-flex: 1;
            flex: 1; }
          .str__wrap .content__two {
            /*
                -webkit-box-flex: 1;
                -moz-box-flex: 1;
                -webkit-flex: 1;
                -ms-flex: 1;
                flex: 1;
              */ 
            }


    .icon svg {
        width: 16px;
        height: 16px;
        fill: #AEAEAE;
    }
    .player__wrap{
        /* background: #282828;
         padding: 5px 15px;*/

        background: #ccc;

        display: flex;

        align-items: center;

        height: 60px;
    }
      
    .current-track__info{    
        -webkit-flex: initial;
        flex: initial;
        width: 400px;
        /*height: 60px;*/
      }

    .current-track__actions{
        /*  
        -webkit-flex: none;
        flex: none;
        */
        width: 120px;
        display: -webkit-flex;
        display: flex;
        text-align: center;
    }
    .current-track__progress{
        /* 
        -webkit-flex: 1;
              flex: 1;
        */

        display: -webkit-flex;
        display: flex;

        position: relative;
        color: #aaaaaa;

        margin-top: 6px;
        width: 100%;
    }
    .current-track__options{
        /*  
        -webkit-flex: none;
        flex: none;
        */

        width: 220px;
        position: relative;
        display: -webkit-flex;
        display: flex;

    }

    .time-duration:before{
        content: '/';
        margin-right: 10px;
        margin-left: 10px;
    }
      

    .playing__art{
          float: left;
          margin: 0;
          padding: 0;
    }
        
    .playing__art img {
          width: 60px;
          height: 60px;
    }

    .btn__prev,
    .btn__play,
    .btn__next {
      width: 40px;
    } 

    .btn__volume,
    .btn__suffle,
    .btn__repeat {
      width: 40px;
    } 
      
    .player-info{
        width: 250px;
        color: white;
        margin-left:73px;
        margin-top:10px
    }
    .player-info h3{
        font-size: 16px;
    }
    .player-info p{
        font-size: 12px;
        color:#aeaeae;
    }

    .timebox{
      
      text-align: center;
      margin-top: -5px;
      font-size:11px;
    }

    /*.timebox{
        position: absolute;
        top: 0;
        right: 0px;
    }*/

    .volumebox{
        margin-left: 15px;


    }


    input[type=range][orient=vertical]{
    /*    writing-mode: bt-lr; /-* IE *-/
        -webkit-appearance: slider-vertical; /-* WebKit *-/
        width: 8px;
        height: 175px;
        padding: 0 5px;*/

        position: absolute;
        top: -96px;
        left: -45px;
        transform: rotate(270deg);

        display: none;
    }


    @media (max-width: 768px) {
      
      .current-track__info {
        border-top: 1px solid rgb(24, 24, 24);
      }
    }

    .btn__play .icon_pause{
      display:none;
    }

    .btn__play.play .icon_play{
      display:block;
    }
    .btn__play.play .icon_pause{
      display:none;
    }
    .btn__play.pause .icon_play{
      display:none;
    }
    .btn__play.pause .icon_pause{
      display:block;
    }


    /*******************/

    input[type=range].timeline {
        -webkit-appearance: none;

        transition: box-shadow .3s ease;


        display: block;
        width: 100%;
        height: 2px;


        /*border: 1px solid black;*/

        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius: 20px;

        font-size: 16px;
        /*background-color: #242323;*/
    }
    input[type=range].timeline:focus {
      /*box-shadow: none;*/
      outline: none;
    }


    input[type=range].timeline::-webkit-slider-thumb {
    /*
        height: 0px;
        width:  0px;
        -webkit-appearance: none;
              appearance: none;
        background: #fff;
        border-radius: 10px;

        margin-top: 0;
      */
      /*
        border: 1px solid #1ed760;
      */
      transition: 0.1s ease-in;

        display: block;
      cursor:pointer;
      
        -webkit-appearance: none;
      width: 14px;
      height: 14px;
      margin-top: 1px;
      background-color: black;
      border-radius: 1em;
      border: 2px solid #1ed760;
      cursor: pointer;
    }

    /*
    input[type=range]:hover.timeline::-webkit-slider-thumb {
        height: 10px;
        width:  1px;
        border: 1px solid #1ed760;
    }
    */



    input[type='range']::-webkit-slider-runnable-track {
      position: relative;
      width: 31.875em;
      height: 1em;
      border-radius: 0.5em;
      background: transparent;
    }

    /*.js input[type='range'].timeline::-webkit-slider-runnable-track {
      background: -webkit-linear-gradient(0deg, #ffe032, #eeb533) no-repeat;
      background: linear-gradient(90deg, #ffe032, #eeb533) no-repeat;
      background-size: 33% 100%;
    }*/


    /*---------------------------------------*/

    input::-moz-range-thumb{
        width: 20px;
        height: 20px;
        border:1px solid black;

        -webkit-border-radius: 10px;
        border-radius: 10px;
        background: #80e4df; /* Old browsers */

        cursor:pointer;
        cursor: -webkit-grab;
    }
    input[type=range].timeline::-moz-range-thumb:hover {
        width: 20px;
        height: 20px;
    }


    /*---------------------------------------*/

    input::-ms-thumb{
        width: 20px;
        height: 20px;
        border:1px solid black;

        -webkit-border-radius: 10px;
        border-radius: 10px;
        background: #80e4df; /* Old browsers */

        cursor:pointer;
        cursor: -webkit-grab;
    }
    input[type=range].timeline::-ms-thumb:hover {
        width: 20px;
        height: 20px;
    }


</style>




<section class="str__wrap">
    <section id="header" class="header">


        <div class="player__wrap">
            <div class="current-track__info">
              <div class="playing__art">
                <img id="cover-art" src="../web/src/imgs/noCover.jpg" alt="Album Art">
              </div>
              <div id="player-info" class="player-info">
                    <p> </p>
                    <h3> </h3>
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

