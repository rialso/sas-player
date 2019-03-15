
export default `

<style>
    @import url('https://fonts.googleapis.com/css?family=Oxygen:300,400,700');

    :host {
        --orange: #e67e22;
        --space: 1.5em;
    }

    /*******************/

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

    /*---------------------------------------*/
    /*---------------------------------------*/
    /*---------------------------------------*/

    .time-duration:before{
        content: '/';
        margin-right: 5px;
        margin-left: 5px;
    }

    .volume{
        width: 80px !important;
    }


    .player__controls{
        display: inline-flex;
        flex-direction: row;
        width: 100%;
        justify-content: center;
        align-items: center;
        font-size: 0.9rem;
    }

    .player__controls .current-track__progress{
        width: 100%;
    }

    .player__controls .current-track__progress,
    .player__controls .current-controls,
    .player__controls .current-track__volume{
        display: inline-flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .player__controls .current-track__progress,
    .player__controls .current-track__volume{
            margin-right: 10px;
            margin-left: 10px;
    }








    button{
        text-align: center;
        min-width: 50px;
    }

    .button-label{

    }
    .splyr__sr-only.label--pressed{
        display: none;
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

