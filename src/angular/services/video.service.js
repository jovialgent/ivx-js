import { TypeValidator } from "../../utilities/type-parsers";

const typeValidator = new TypeValidator();

class VideoService {
    constructor(iVXjs, iVXjsBus, iVXjsActions) {
        "ngInject";

        Object.assign(this, {
            iVXjs,
            iVXjsBus,
            iVXjsActions,
            videoEventNames: iVXjs.constants.VIDEO.EVENTS
        })
    }

    shouldFire(cuePoint, player) {
        const { currentTime, paused } = player;
        const { timeAt = 0, endAt, fired = false, always = false } = cuePoint;
        const canFire = (!fired || always) && !paused;

        if (typeValidator.isUndefined(endAt)) {
            const timeUntil = Math.abs(timeAt - currentTime);

            return timeUntil <= 0.2 && canFire;
        }

        return (timeAt <= currentTime && endAt >= currentTime) && canFire;
    }

    removeCuePointListener(cuePointFunction) {
        const { iVXjsBus } = this;

        iVXjsBus.removeListener(this.videoEventNames.TIME_UPDATE, cuePointFunction);
    }

    getControlHTML(playerId, controls) {
        let controlType = controls;
        let controlsHTML = '';
        let isControlObject = typeValidator.isObject(controls);
        let hasStandardControl = typeValidator.isString(controls);

        if (isControlObject) {
            const { type } = controls;

            controlType = type;
        }

        if (typeValidator.isString(controlType)) {
            controlsHTML = `<ivxjs-${controlType}-video-controls control-settings="vm.controls" player-id='${playerId}'></ivxjs-${controlType}-video-controls>`;
        }

        return controlsHTML;
    }

    createCuePointListener(playerId, cuePoints = []) {
        const { iVXjs, iVXjsBus, iVXjsActions } = this;
        const self = this;

        return iVXjsBus.on(self.videoEventNames.TIME_UPDATE, function cuePointsOnUpdate(player, stateData) {
            if (player.id === playerId) {
                let { currentTime } = player;

                if (cuePoints.length <= 0) return;

                cuePoints.forEach((cuePoint, index) => {
                    if (self.shouldFire(cuePoint, player)) {
                        cuePoint.fired = true;

                        iVXjs.log.debug(`Cuepoint ${index} Started`, {}, { cuePoint, index, source: 'cuePoint', status: 'started', timestamp: Date.now() });
                        iVXjsActions.resolveActions([cuePoint], () => {
                            iVXjs.log.debug(`Cuepoint ${index} Completed`, {}, { cuePoint, index, source: 'cuePoint', status: 'completed', timestamp: Date.now() });
                        });
                    }
                });
            }
        });
    }
}


export default angular.module('ivx-js.services.video', [])
    .service('iVXjsVideoService', VideoService)
    .service('ivxjs.video.service', VideoService)
    .name;