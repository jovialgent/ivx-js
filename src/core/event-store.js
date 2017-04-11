export default class {
    constructor() {
        this.animations = [];
        this.timeData = {}

    }

    register(animationFn) {
        let { timeData } = this;
        let registered = timeData.timestamp;

        this.animations.push({
            animationFn,
            registered
        });
    }

    update(timeObjs) {
        let isRegistered = false;
        let startRegistered;
        let self = this;

        this.animations.forEach(animation => {
            let { animationFn, registered } = animation;
            let currentTimedata = Object.assign(
                self.timeData,
                {
                    registered,
                    registeredTimelapse: self.timeData.timestamp - registered
               }
            )

            animationFn(currentTimedata)
        })
    }

    run() {
        let self = this;
        let startTime = 0;
        let getStartTime = true;

        requestAnimationFrame(runWrapper);

        function runWrapper(timestamp) {
            if (getStartTime) {
                startTime = timestamp;
                getStartTime = false;
            }

            self.timeData = {
                startTime,
                timestamp,
                progress: timestamp - startTime
            }

            self.update();
            requestAnimationFrame(runWrapper);
        }
    }

    remove(animationFn) {
        this.animations = this.animations.filter(animation => {
            return animation.animationFn !== animationFn;
        })
    }
}