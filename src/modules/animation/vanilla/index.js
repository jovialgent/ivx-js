
export default class {
    constructor() {
        this.canAnimate = anime ? true : false;

    }

    runTweens(tweens = [], Actions) {
        let { EasingFunctions } = this;
        let self = this;

        anime({
            targets: document.querySelectorAll('#celeste-colour-story > div > div > div.animate-1'),
            translateX: {
                value: 250,
                duration: 800
            },
            rotate: {
                value: 360,
                duration: 1800,
                easing: 'easeInOutSine'
            },
            scale: {
                value: 2,
                duration: 1600,
                delay: 800,
                easing: 'easeInOutQuart'
            },
            delay: 250 // All properties except 'scale' inherit 250ms delay
        });
    }
}