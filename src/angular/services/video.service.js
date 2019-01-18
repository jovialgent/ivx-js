import isUndefined from "lodash/isUndefined";
import isObject from "lodash/isObject";
import isString from "lodash/isString";

class VideoService {
    constructor(iVXjs, iVXjsBus, iVXjsActions) {
        "ngInject";

        Object.assign(this, {
            iVXjs,
            iVXjsBus,
            iVXjsActions,
            isUndefined,
            isString,
            isObject,
            videoEventNames: iVXjs.constants.VIDEO.EVENTS
        })
    }

    shouldFire(cuePoint, player) {
        const { currentTime, duration, paused } = player;
        const { timeAt, endAt, fired = false, always = false, percentStart, percentEnd } = cuePoint;
        const canFire = (!fired || always) && !paused;
        const withinTime = this._evaluateTimeCuePoint(currentTime, timeAt, endAt) || this._evaluatePercentCuePoint(currentTime, duration, percentStart, percentEnd);

        return withinTime && canFire;
    }

    _evaluatePercentCuePoint(currentTime, duration, percentStart, percentEnd) {
        const { isUndefined } = this;

        if (isUndefined(percentStart) && isUndefined(percentEnd)) return false;

        const currentProgressPercent = (currentTime / duration).toFixed(4);

        return percentStart <= currentProgressPercent && percentEnd >= currentProgressPercent;
    }

    _evaluateTimeCuePoint(currentTime, timeAt, endAt) {
        const { isUndefined } = this;

        if (isUndefined(timeAt) && isUndefined(endAt)) return false;

        const modifiedTimeAt = timeAt || 0;

        if (isUndefined(endAt)) {
            const timeUntil = Math.abs(modifiedTimeAt - currentTime);

            return timeUntil <= 0.2;
        }

        return modifiedTimeAt <= currentTime && endAt >= currentTime;
    }

    removeCuePointListener(cuePointFunction) {
        const { iVXjsBus } = this;

        iVXjsBus.removeListener(this.videoEventNames.TIME_UPDATE, cuePointFunction);
    }

    getControlHTML(playerId, controls) {
        const { isObject, isString } = this;
        let controlType = controls;
        let controlsHTML = '';
        let isControlObject = isObject(controls);
        let hasStandardControl = isString(controls);


        if (isControlObject) {
            const { type } = controls;

            controlsHTML = `<ivxjs-${type}-video-controls class="ivx-video-controls" control-settings="vm.controls" player-id='${playerId}'></ivxjs-${type}-video-controls>`;
        }

        if (hasStandardControl) {
            controlsHTML = `<ivxjs-${controlType}-video-controls class="ivx-video-controls" control-settings="vm.controls" player-id='${playerId}'></ivxjs-${controlType}-video-controls>`;
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