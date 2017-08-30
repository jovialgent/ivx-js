import TrackEventNames from "../../../constants/tracks.events.js";
import TrackCuesEventNames from "../../../constants/tracks.cues.events.js";

const trackEventNames = new TrackEventNames();
const trackCueEventNames = new TrackCuesEventNames();

export default {

    addTracks(opts) {
        const { video, tracks = [], iVXjsBus } = opts;
        const self = this;

        tracks.forEach(track => {
            const { content = "", cues: cueData = [], label, srclang, kind = "subtitles", default: isDefault = false, id } = track;
            let trackEl = video.addTextTrack(kind, label, srclang);
            let cues = [];

            trackEl.trackId = id;

            if (cueData.length > 0) {
                cues = self.getCuesFromCueData(track);
            }

            cues.forEach(cue => {
                if (isDefault || kind === 'chapter') {
                    trackEl.mode = "showing";
                }

                cue = self.addEventListenersToCue({ cue, video, iVXjsBus });

                trackEl.addCue(cue);
            });
        });

        return Array.from(video.textTracks).find((track) => {
            return (track.kind === 'captions' || track.kind === 'subtitles') && track.mode === 'showing';
        })
    },


    addEventListenersToCue(opts) {
        let { cue, video, iVXjsBus } = opts;

        cue.onenter = (evt) => {
            let { currentTarget: currentCue } = evt;
            let { track = {} } = currentCue;
            let { kind, mode } = track;

            switch (kind) {
                case "subtitles": {
                    if (mode === 'showing') {
                        iVXjsBus.emit(trackCueEventNames.ON_ENTER, currentCue);
                    }
                    break;
                }
                case "captions": {
                    if (mode === 'showing') {
                        iVXjsBus.emit(trackCueEventNames.ON_ENTER, currentCue);
                    }
                    break;
                }
                case "chapters": {
                    iVXjsBus.emit(trackCueEventNames.ON_CHAPTER_START, currentCue);
                    break;
                }

                default: {
                    iVXjsBus.emit(trackCueEventNames.ON_ENTER, currentCue);
                    break;
                }
            }
        };

        cue.onexit = (evt) => {
            let { currentTarget: currentCue } = evt;
            let { track = {} } = currentCue;
            let { kind, mode } = track;

            switch (kind) {
                case "subtitles": {
                    if (mode === 'showing') {
                        iVXjsBus.emit(trackCueEventNames.ON_EXIT, currentCue);
                    }
                    break;
                }
                case "captions": {
                    if (mode === 'showing') {
                        iVXjsBus.emit(trackCueEventNames.ON_EXIT, currentCue);
                    }
                    break;
                }
                case "chapters": {
                    iVXjsBus.emit(trackCueEventNames.ON_CHAPTER_END, currentCue);
                    break;
                }
                default: {
                    iVXjsBus.emit(trackCueEventNames.ON_EXIT, currentCue);
                    break;
                }
            }
        };

        return cue;
    },

    getCuesFromCueData(track) {
        let { cues: cueData = [], kind } = track;
        let cues = [];
        let self = this;

        switch (kind) {
            case "subtitles": {
                cues = cueData.map(cuePoint => {
                    return self.createCue(cuePoint);
                });

                break;
            }

            case "captions": {
                cues = cueData.map(cuePoint => {
                    return self.createCue(cuePoint);
                });

                break;
            }
            case "metadata": {
                cues = cueData.map(cuePoint => {
                    return self.createMetadataCue(cuePoint);
                });

                break;
            }
            case "chapters": {
                cues = cueData.map(cuePoint => {
                    return self.createChapterCue(cuePoint);
                });

                break;
            }
        }

        return cues;
    },

    createMetadataCue(metadataCueObject) {
        let { id, start, end, payload } = metadataCueObject;
        let cue = {};

        if (window.VTTCue) {
            cue = new VTTCue(start, end, payload);
            cue = Object.assign(cue, {
                id
            });

            return cue;
        }

        if (window.TextTrackCue) {
            cue = new TextTrackCue(start, end, payload);
            cue = Object.assign(cue, {
                id
            });

            return cue;
        }

    },

    createChapterCue(chapterObject) {
        let { id, start, end, payload } = chapterObject;
        let cue = {};

        if (window.VTTCue) {
            cue = new VTTCue(start, end, payload);
            cue = Object.assign(cue, {
                id
            })

            return cue;
        }

        if (window.TextTrackCue) {
            cue = new TextTrackCue(start, end, payload)
            cue = Object.assign(cue, {
                id
            })

            return cue;
        }

        return cue;

    },

    convertPercentToValue(percents, multiplier = 100) {
        let propertyKeys = Object.keys(percents);
        let self = this;
        let cleanedProperties = propertyKeys.reduce(
            (cleaned, key, index) => {
                let percentString = percents[key];
                let decimalValue = self._convertPercentToDecimal(percentString);
                let newProperty = {};

                if (isNaN(decimalValue)) {
                    newProperty[key] = percentString;
                } else {
                    newProperty[key] = decimalValue * multiplier;
                }

                Object.assign(cleaned, newProperty);

                return cleaned;
            }, {}
        );

        return cleanedProperties;
    },

    _convertPercentToDecimal(percentString) {
        let percentValue = percentString.replace("%", "");

        return parseFloat(percentValue) / 100;
    },

    addVTTCueStyles(opts) {
        let { vttCue: oldCue, cueObject } = opts;
        let { id, position, line, size, align, vertical } = cueObject;
        let newCue = Object.assign(oldCue, {
            id
        });

        if (align) {
            newCue.align = align;
        }

        if (position) {
            newCue.position = this._convertPercentToDecimal(position);
        }

        if (size) {
            newCue.size = this._convertPercentToDecimal(size);
        }

        if (line) {
            newCue.line = line.indexOf && line.indexOf('%') >= 0 ? this._convertPercentToDecimal(line) : line;
        }

        if (vertical) {
            newCue.vertical = vertical;
        }

        return newCue;

    },

    createCue(cueObject) {
        let { start, end, payload } = cueObject;

        if (window.VTTCue) {
            let vttCue = new VTTCue(start, end, payload);

            vttCue = this.addVTTCueStyles({ vttCue, cueObject })

            return vttCue;
        }

        if (window.TextTrackCue) {
            return new TextTrackCue(start, end, payload)
        }

        return cue;
    }
}