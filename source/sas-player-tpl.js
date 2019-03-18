
export default `

<style>

    :host {
        --orange: #e67e22;
        --space: 1.5em;
    }

    /*******************/



    /*---------------------------------------*/
    /*---------------------------------------*/
    /*---------------------------------------*/

    .player__controls{
        display: inline-flex;
        flex-direction: row;
        width: 100%;
        justify-content: center;
        align-items: center;
        font-size: 0.9rem;

        margin-bottom: 10px;
    }

    .player__controls .current-track__progress{
        width: 100%;
        margin-left: 5px;
        margin-right: 5px;
    }

    .player__controls .current-controls,
    .player__controls .current-track__progress,
    .player__controls .current-track__volume{
        display: inline-flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    .player__controls .current-track__volume{
        width: 50%;
        max-width: 120px;
        margin-left: 5px;
    }

/*    .player__controls .current-track__progress input,
    .player__controls .current-track__volume input{
        width: 100%;
        margin-right: 5px;
        margin-left: 5px;
    }*/
    .player__controls .current-track__volume input{
        margin-left: 5px !important;
    }

    .player__controls .time-duration:before{
        content: '/';
        margin-right: 5px;
        margin-left: 5px;
    }

    .player__controls.inside{
        background: #2a2a2a;
        box-sizing: border-box;
        border-radius: 5px;
        height: 40px;
        -moz-box-sizing: border-box;

        font-family: Arial, sans-serif;
        position: absolute;
        bottom: 10px;
        left: 2.5%;
        z-index: 2;
        opacity: 1;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
        -webkit-transition: opacity 0.3s ease-in;
        transition: opacity 0.3s ease-in;
        -moz-user-select: none;
        -webkit-user-select: none;
        user-select: none;

        width: 95%;
        padding: 8px;
        color: #ccc;
    }

    /*---------------------------------------*/
    /*---------------------------------------*/
    /*---------------------------------------*/




    .current-track__progress .progress-buffer {
        -webkit-appearance: none;
        background: 0 0;
        border: 0;
        border-radius: 100px;
        height: 4px;
        left: 0;
        margin-top: -2.5px;
        padding: 0;
        position: absolute;
        top: 50%;
    }

    #player .player__controls .progress-buffer {
        color: rgba(183,197,205,.66) !important;
    }


    /*---------------------------------------*/
    /*---------------------------------------*/
    /*---------------------------------------*/


    .player__controls input[type=range][orient=vertical]{
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



    .player__controls input[type=range].timeline {
        -webkit-appearance: none;
        background: 0 0;
        border: 0;
        border-radius: 28px;
        /*color: #1aafff;*/
        color: #1ed760;
        display: block;
        height: 20px;
        margin: 0;
        padding: 0;
        transition: box-shadow .3s ease;
        width: 100%;
    }

    .player__controls input[type=range].timeline:focus {
      /*box-shadow: none;*/
      outline: none;
    }


    .player__controls input[type=range].timeline::-webkit-slider-thumb {
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
        background-color: black;
      */
        transition: all .2s ease;
        border-radius: 100%;

        display: block;
        cursor:pointer;

        -webkit-appearance: none;
        width: 14px;
        height: 14px;
        margin-top: -4.7px;
        background-color: #fff;
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



    .player__controls input[type='range']::-webkit-slider-runnable-track {
/*      position: relative;
      width: 31.875em;
      height: 1em;
      border-radius: 0.5em;
      background: transparent;*/

        background: 0 0;
        border: 0;
        border-radius: 2px;
        height: 4px;
        transition: box-shadow .3s ease;
        -webkit-user-select: none;
        user-select: none;

        transition: box-shadow .3s ease;
        background-image: linear-gradient(to right, currentColor var(--value, 0), transparent var(--value, 0))
    }

    /*.js input[type='range'].timeline::-webkit-slider-runnable-track {
      background: -webkit-linear-gradient(0deg, #ffe032, #eeb533) no-repeat;
      background: linear-gradient(90deg, #ffe032, #eeb533) no-repeat;
      background-size: 33% 100%;
    }*/

    .player__controls input[type=range]::-webkit-slider-runnable-track {
        background-color: rgba(183, 197, 205, .66)
    }

    /*---------------------------------------*/

    .player__controls input[type=range]::-moz-range-thumb{
        background: #fff;
        border: 0;
        border-radius: 100%;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .15), 0 0 0 1px rgba(47, 52, 61, .2);
        height: 14px;
        position: relative;
        transition: all .2s ease;
        width: 14px
    }
    .player__controls input[type=range].timeline::-moz-range-thumb:hover {
        width: 20px;
        height: 20px;
    }


    /*---------------------------------------*/

    .player__controls input[type=range]::-ms-thumb {
        background: #fff;
        border: 0;
        border-radius: 100%;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .15), 0 0 0 1px rgba(47, 52, 61, .2);
        height: 14px;
        position: relative;
        transition: all .2s ease;
        width: 14px;
        margin-top: 0
    }
    .player__controls input[type=range].timeline::-ms-thumb:hover {
        width: 20px;
        height: 20px;
    }


    .current-track__progress input[type=range] {
        position: relative;
        z-index: 2;
    }

    /*********************************************/

    .progress-buffer::-webkit-progress-bar {
        background: 0 0;
        transition: width .2s ease
    }

    .progress-buffer::-webkit-progress-value {
        background: currentColor;
        border-radius: 100px;
        min-width: 4px
    }

    .progress-buffer::-moz-progress-bar {
        background: currentColor;
        border-radius: 100px;
        min-width: 4px;
        transition: width .2s ease
    }

    .progress-buffer::-ms-fill {
        border-radius: 100px;
        transition: width .2s ease
    }

    .player--loading .progress-buffer {
        animation: player-progress 1s linear infinite;
        background-image: linear-gradient(-45deg, rgba(47, 52, 61, .6) 25%, transparent 25%, transparent 50%, rgba(47, 52, 61, .6) 50%, rgba(47, 52, 61, .6) 75%, transparent 75%, transparent);
        background-repeat: repeat-x;
        background-size: 25px 25px;
        color: transparent
    }

    @keyframes player-progress {
        to {
            background-position: 25px 0
        }
    }


</style>



`;   

