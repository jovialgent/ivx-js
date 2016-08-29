export default class{
    
    constructor(){
        
    }

    get PlayerControlEvents() {
        return {
            "play" : 'iVX:video:play',
            "pause" : 'iVX:video:pause',
            "seek" : 'iVX:video:seeked',
            "playing" : "iVX:video:playing",
            "ended" : "iVX:video:ended",
            "paused" : "iVX:video:paused",
            "setVolume" : 'iVX:video:setVolume',
            "duration" : "iVX:video:requestDuration",
            "getDuration" : "iVX:video:getDuration",
            "canPlay" : "iVX:video:canplay",
            "timeUpdate" : "iVX:video:timeupdate",
            "dispose" : "iVX:video:dispose",
            "volume" : 'iVX:video:setVolume'   
        }
    }
};