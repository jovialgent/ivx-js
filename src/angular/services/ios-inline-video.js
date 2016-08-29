import createFactoryFunction from '../utilities/create-factory-function.js';
import VideoEventNames from '../../constants/video.events.js';

let videoEventNames = new VideoEventNames();

class CreateInlineVideo {
	constructor($window, iVXjsBus) {
		this.$window = $window;
		this.iVXjsBus = iVXjsBus;
	}
	
	makeInlineVideo(video, container, $scope) {
		if (typeof makeVideoPlayableInline === 'undefined') return;

		let self = this;
		let play = false;

		video.setAttribute('webkit-playsinline', '');
		makeVideoPlayableInline(video);

		this.iVXjsBus.on(videoEventNames.ADD_PLAYING_CLASS, () => {
			container.className = `${video.className} is-playing`;
			play = !play;
		});

		video.addEventListener('touchstart', function () {
			if (!play) {
				video.play();
				container.className = `${video.className} is-playing`;
			} else {
				video.pause();
				$scope.isPlaying = false;
				container.className = video.className.replace('is-playing', '');
			}

			play = !play;
			$scope.$apply();
		});

		this.iVXjsBus.once(videoEventNames.DISPOSE, () => {
			video.pause();
		});
	}

	isiOS() {
		var userAgent = navigator.userAgent || navigator.vendor || window.opera;
		return userAgent.match(/iPhone/i);
	}
}

CreateInlineVideo.$inject = ['$window', 'ivxjs.bus']

export default createFactoryFunction(CreateInlineVideo);