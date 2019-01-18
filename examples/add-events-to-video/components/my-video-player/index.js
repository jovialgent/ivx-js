import template from "./template.html";
import playerSettings from "./html5.json";
import youTubeSettings from "./youtube.json";
import vimeoSettings from "./vimeo.json";

(function () {
    angular
        .module('ivx-js')
        .directive('myVideoPlayer', myVideoPlayerDirective);

    myVideoPlayerDirective.$inject = ["iVXjs"];

    function myVideoPlayerDirective(iVXjs) {
        return {
            scope: {

            },
            controller: myVideoPlayerDirectiveController,
            controllerAs: 'vm',
            link: linkFunction,
            template
        }


        function linkFunction($scope, iElm, iAttrs, controller) {

        }
    }

    myVideoPlayerDirectiveController.$inject = [];

    function myVideoPlayerDirectiveController() {
        Object.assign(this, {
            playerSettings,
            youTubeSettings,
            vimeoSettings
        });
    }
})();

// (function () {
//     angular
//         .module('ivx-js')
//         .directive('universalControls', UniversalControlsDirective);


//     UniversalControlsDirective.$inject = ["iVXjs"];

//     function UniversalControlsDirective(iVXjs) {
//         return {
//             scope: {

//             },
//             controller: UniversalControlsDirectiveController,
//             controllerAs: "vm",
//             link: linkFunction,
//             templateUrl: iVXjs.experience.story.htmlTemplates.controls
//         }


//         function linkFunction($scope, iElm, iAttrs, controller) {

//         }
//     }

//     UniversalControlsDirectiveController.$inject = ["iVXjs", "ivxjs.bus"];

//     function UniversalControlsDirectiveController(iVXjs, iVXjsBus) {

//         this.events = [{
//             eventName: "iVXjs:video:play",
//             args: {},
//             label: "Play All"
//         },
//         {
//             eventName: "iVXjs:video:pause",
//             args: {},
//             label: "Pause All"
//         },
//         {
//             eventName: "iVXjs:video:mute",
//             args: {
//                 volume: 0
//             },
//             label: "Mute All"
//         },
//         {
//             eventName: "iVXjs:video:unmute",
//             label: "Unmute All"
//         },
//         {
//             eventName: "iVXjs:video:set-volume",
//             label: "Set Volume Up All",
//             args: {
//                 volume: 0.75
//             }
//         },
//         {
//             eventName: "iVXjs:video:set-volume",
//             label: "Set Volume Down All",
//             args: {
//                 volume: 0.25
//             }
//         },
//         {
//             eventName: "iVXjs:video:seek",
//             label: "Seek All To 10 Seconds",
//             args: {
//                 currentTime: 10
//             }
//         },
//         {
//             eventName: "iVXjs:video:seek",
//             label: "Seek All To 5 Seconds",
//             args: {
//                 currentTime: 5
//             }
//         }, {
//             eventName: "iVXjs:video:play",
//             args: {
//                 playerId: "my-video-player"
//             },
//             label: "Play State Player"
//         },
//         {
//             eventName: "iVXjs:video:pause",
//             args: {
//                 playerId: "my-video-player"
//             },
//             label: "Pause State Player"
//         },
//         {
//             eventName: "iVXjs:video:mute",
//             args: {
//                 playerId: "my-video-player"
//             },
//             label: "Mute State Player"
//         },
//         {
//             eventName: "iVXjs:video:unmute",
//             label: "Unmute All",
//             args: {
//                 playerId: "my-video-player"
//             },
//             label: "Unmute State Player"
//         },
//         {
//             eventName: "iVXjs:video:set-volume",
//             label: "Set Volume Up State Player",
//             args: {
//                 playerId: 'my-video-player',
//                 volume: 0.75
//             }
//         },
//         {
//             eventName: "iVXjs:video:set-volume",
//             label: "Set Volume Down State Player",
//             args: {
//                 playerId: 'my-video-player',
//                 volume: 0.25
//             }
//         },
//         {
//             eventName: "iVXjs:video:seek",
//             label: "Seek State Player To 10 Seconds",
//             args: {
//                 currentTime: 10,
//                 playerId: "my-video-player"
//             }
//         },
//         {
//             eventName: "iVXjs:video:seek",
//             label: "Seek State Player To 5 Seconds",
//             args: {
//                 currentTime: 5,
//                 playerId: "my-video-player"
//             }
//         },
//         {
//             eventName: "iVXjs:tracks:cues:change-chapter",
//             args: {
//                 playerId: "my-video-player-too",
//                 chapterId: "chapter-3-too"
//             },
//             label: "Set External HTML5 Player to Chapter 3"
//         },
//         {
//             eventName: "iVXjs:tracks:change-current-track",
//             args: {
//                 trackId: "french-track",
//                 playerId: "my-video-player-too"
//             },
//             label: "Set External HTML5 Language to French"
//         }
//         ];
//     }
// })();