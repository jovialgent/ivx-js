import { Controls } from '../../video/controls/index.js';
import ElementUtilities from "../utilities/element";

export default class extends Controls {
    constructor(container, playerId) {
        super(playerId);


        if (container.html instanceof Function) {
            container.html(this.html);
        } else {
            var div = document.createElement('div');
            div.innerHTML = this.html;

            container.appendChild(div);
        }

        let {
            playPauseControlsClasses,
            totalTimeInfoClasses,
            currentTimeInfoClasses,
            scrubBarClasses,
            muteControlsClasses,
            volumeBarClasses
        } = this;

        this.container = container;
        this.playPauseControls = document.getElementById(`${playerId}-video-controls-play-pause`);
        this.totalTimeInfo = document.getElementById(`${playerId}-video-controls-total-time`);
        this.currentTimeInfo = document.getElementById(`${playerId}-video-controls-current-time`);
        this.scrubBar = document.getElementById(`${playerId}-video-controls-scrub-bar`);
        this.muteControls = document.getElementById(`${playerId}-video-controls-mute-controls`);
        this.volumeBar = document.getElementById(`${playerId}-video-controls-volume-bar`);
    }

    get playPauseControlsClasses() {
        return 'play-pause';
    }

    get totalTimeInfoClasses() {
        return 'duration';
    }

    get currentTimeInfoClasses() {
        return 'current-time';
    }

    get scrubBarClasses() {
        return 'scrub-bar';
    }

    get muteControlsClasses() {
        return 'mute'
    }

    get volumeBarClasses() {
        return 'volume-bar'
    }

    get playClasses() {
        return 'fa fa-play';
    }

    get pauseClasses() {
        return 'fa fa-pause';
    }

    get unmuteClasses() {
        return 'fa fa-volume-up';
    }

    get muteClasses() {
        return 'fa fa-volume-off';
    }

    get scrubBarTimeLapseClasses() {
        return `time-lapsed`
    }

    get volumeBarCurrentVolumeClasses() {
        return 'current-volume';
    }

    get chapterButtonClasses() {
        return 'chapter-button';
    }

    get chapterListClasses() {
        return "chapter-list";
    }

    get chapterListItemClasses() {
        return "chapter-list-item";
    }

    get chapterActiveClasses() {
        return "active";
    }

    get chapterInActiveClasses() {
        return "inactive"
    }

    get playPauseButtonHTML() {
        let { playClasses: play, playerId } = this;
        let { playPauseControlsClasses: playPauseControls } = this;
        return `
        <button id="${playerId}-video-controls-play-pause" class="${playPauseControls}">
            <i class='${play}'></i>
        </button>`
    }

    get scrubBarHTML() {
        const { playerId } = this;
        return `
             <div id="${playerId}-video-controls-scrub-bar" class="${this.scrubBarClasses}">
                <div class="${this.scrubBarTimeLapseClasses}"></div>
            </div>
        `
    }

    get timestampHTML() {
        const { playerId } = this;
        return `
        <span id="${playerId}-video-controls-current-time" class="${this.currentTimeInfoClasses}"></span>
        <span id="${playerId}-video-controls-total-time" class="${this.totalTimeInfoClasses}"></span>
        `;
    }

    get muteButtonHTML() {
        let { unmuteClasses: unmute, muteControlsClasses, playerId } = this;
        return `
            <button id="${playerId}-video-controls-mute-controls" class="${muteControlsClasses}">
                <i class="${unmute}"></i>
            </button>
        `
    }

    get volumeBarHTML() {
        const { playerId } = this;
        return `
            <div  id="${playerId}-video-controls-volume-bar" class="${this.volumeBarClasses}">
                <div class="${this.volumeBarCurrentVolumeClasses}"></div>
            </div> 
        `
    }

    get trackListSelectContainerClasses() {
        return 'track-list-select-container'
    }

    get trackListSelectClasses() {
        return 'track-list-select';
    }

    get trackListSelectActiveClasses() {
        return 'active';
    }

    get trackListSelectInactiveClasses() {
        return 'inactive'
    }

    get closeCaptionButtonClasses() {
        return 'close-caption-button';
    }

    get closeCaptionButtonActiveClasses() {
        return 'active';
    }

    get closeCaptionButtonInactiveClasses() {
        return 'inactive';
    }

    get closeCaptionButtonIconClasses() {
        return 'close-caption-button-icon fa fa-cc'
    }

    get closeCaptionButtonIconContent() {
        return "";
    }

    createPlayerSpecificControls(opts) {
        let { player } = opts;
        let { textTracks = [] } = player;
        let html = ``;
        let { container, chapterButtonClasses, chapterListClasses } = this;

        if (textTracks.length > 0) {
            let chapterElement = this.createChapterContainer(textTracks);
            let trackSelectElement = this.createTrackSelect(textTracks);

            if (chapterElement) {
                ElementUtilities.append(container, chapterElement);
            }

            if (trackSelectElement) {
                ElementUtilities.append(container, trackSelectElement);
            }
        }
    }

    getTrackArray() {
        let { player } = this;
        let { textTracks } = player;
        let trackArray = Array.from(textTracks);

        return trackArray;
    }

    isLanguageTrack(track, trackId) {
        let { trackId: testTrackId, kind } = track;

        return testTrackId === trackId && (kind === 'captions' || kind === 'subtitles');
    }

    getTrack(trackId, predicate) {
        const self = this;
        const trackArray = this.getTrackArray();

        return trackArray.find(currentTrack => {
            let { trackId: currentTrackId } = currentTrack;

            return predicate ? predicate(currentTrack, trackId) : self.isLanguageTrack(currentTrack, trackId);
        })
    }

    updateTrackSelector(trackId) {
        let {
            trackListSelectContainerClasses, trackListSelectClasses,
            trackListSelectActiveClasses, trackListSelectInactiveClasses, closeCaptionButtonIconContent,
            player,
            closeCaptionButtonClasses, closeCaptionButtonActiveClasses, closeCaptionButtonInactiveClasses, closeCaptionButtonIconClasses
        } = this;
        let { trackListSelect = {}, ccToggle = {} } = this;
        let selectedLanguageTrack = this.getTrack(trackId);
        let { childNodes: options = [] } = trackListSelect;

        if (options.length > 1) {
            let hasOption = Array.from(options).find(option => {
                let { value: currentTrackId } = option;

                return trackId === currentTrackId;
            });

            if (hasOption) {
                Object.assign(trackListSelect, {
                    value: trackId
                });

                ElementUtilities.removeClassesFromElement(trackListSelect, trackListSelectInactiveClasses);
                ElementUtilities.addClassesToElement(trackListSelect, trackListSelectActiveClasses);
            } else {
                ElementUtilities.removeClassesFromElement(trackListSelect, trackListSelectActiveClasses);
                ElementUtilities.addClassesToElement(trackListSelect, trackListSelectInactiveClasses);
            }
        }

        if (selectedLanguageTrack) {
            ElementUtilities.removeClassesFromElement(ccToggle, closeCaptionButtonInactiveClasses);
            ElementUtilities.addClassesToElement(ccToggle, closeCaptionButtonActiveClasses);
        } else {
            ElementUtilities.removeClassesFromElement(ccToggle, closeCaptionButtonActiveClasses);
            ElementUtilities.addClassesToElement(ccToggle, closeCaptionButtonInactiveClasses);
        }
    }

    createTrackSelect(textTracks) {
        let self = this;
        let {
            trackListSelectContainerClasses, trackListSelectClasses,
            trackListSelectActiveClasses, trackListSelectInactiveClasses, closeCaptionButtonIconContent,
            closeCaptionButtonClasses, closeCaptionButtonActiveClasses, closeCaptionButtonInactiveClasses, closeCaptionButtonIconClasses
        } = self;
        let languageTracks = Array.from(textTracks).reduce((currentLanguageTracks, textTrack) => {
            if (textTrack.kind === 'captions' || textTrack.kind === 'subtitles') {
                currentLanguageTracks = currentLanguageTracks.concat([textTrack]);
            }

            return currentLanguageTracks;
        }, []);

        if (languageTracks.length > 0) {
            let trackListContainer = document.createElement('div');
            let trackListSelect = document.createElement('select');
            let languageSelected = false;
            let ccToggle = document.createElement('button');
            let ccToggleIcon = document.createElement('i');

            trackListContainer.setAttribute('id', `${self.playerId}-track-list`);
            ccToggle.setAttribute('id', `${self.playerId}-cc-toggle`);

            ElementUtilities.addClassesToElement(ccToggle, closeCaptionButtonClasses);
            ElementUtilities.addClassesToElement(ccToggleIcon, closeCaptionButtonIconClasses);

            ccToggleIcon.innerHTML = closeCaptionButtonIconContent

            ElementUtilities.append(ccToggle, ccToggleIcon);

            languageTracks.forEach(languageTrack => {
                let { srclang, label, trackId, mode } = languageTrack;
                let languageTrackOption = document.createElement('option');

                Object.assign(languageTrackOption, {
                    value: trackId,
                    innerHTML: label && label.length > 0 ? label : srclang
                });

                trackListSelect.appendChild(languageTrackOption);

                if (mode === 'showing') {
                    Object.assign(trackListSelect, {
                        value: trackId
                    });
                    languageSelected = true;
                }
            });

            trackListSelect.addEventListener('change', (evt) => {
                const { target = {} } = evt;
                const { value: trackId = "" } = target;

                self.changeCurrentTrack(trackId);
            });

            ccToggle.addEventListener('click', (evt) => {
                self.toggleCC();
            });

            this.ccToggle = ccToggle;

            ElementUtilities.addClassesToElement(trackListSelect, trackListSelectClasses);
            ElementUtilities.addClassesToElement(trackListSelect, languageSelected ? trackListSelectActiveClasses : trackListSelectInactiveClasses);
            ElementUtilities.addClassesToElement(trackListContainer, trackListSelectContainerClasses);
            ElementUtilities.addClassesToElement(ccToggle, languageSelected ? closeCaptionButtonActiveClasses : closeCaptionButtonInactiveClasses);
            ElementUtilities.append(trackListContainer, ccToggle);

            if (languageTracks.length > 1) {
                ElementUtilities.append(trackListContainer, trackListSelect);

                this.trackListSelect = trackListSelect;
            } else {
                this.languageSelected = languageTracks[0].trackId;
            }

            return trackListContainer;
        }

        return false;
    }

    toggleCC() {
        let {
            trackListSelectContainerClasses, trackListSelectClasses,
            trackListSelectActiveClasses, trackListSelectInactiveClasses, closeCaptionButtonIconContent,
            closeCaptionButtonClasses, closeCaptionButtonActiveClasses, closeCaptionButtonInactiveClasses, closeCaptionButtonIconClasses
        } = this;
        const { trackListSelect, ccToggle = {}, languageSelected } = this;

        const isInactive = ElementUtilities.hasClass(ccToggle, closeCaptionButtonInactiveClasses);

        if (isInactive) {
            ElementUtilities.removeClassesFromElement(ccToggle, closeCaptionButtonInactiveClasses);
            ElementUtilities.addClassesToElement(ccToggle, closeCaptionButtonActiveClasses);

            if (trackListSelect) {
                let { value: trackId } = trackListSelect;

                ElementUtilities.addClassesToElement(trackListSelect, trackListSelectActiveClasses);
                ElementUtilities.removeClassesFromElement(trackListSelect, trackListSelectInactiveClasses);
                this.changeCurrentTrack(trackId);
            } else {
                this.changeCurrentTrack(languageSelected);
            }

        } else {
            ElementUtilities.removeClassesFromElement(ccToggle, closeCaptionButtonActiveClasses);
            ElementUtilities.addClassesToElement(ccToggle, closeCaptionButtonInactiveClasses);

            if (trackListSelect) {
                ElementUtilities.removeClassesFromElement(trackListSelect, trackListSelectActiveClasses);
                ElementUtilities.addClassesToElement(trackListSelect, trackListSelectInactiveClasses);
            }

            this.changeCurrentTrack("");
        }

    }

    createChapterContainer(textTracks) {
        let { chapterButtonClasses, chapterListClasses, chapterActiveClasses, chapterInActiveClasses, chapterListItemClasses, playerId } = this;
        let chapterTrack = Array.from(textTracks).find(textTrack => {
            return textTrack.kind === 'chapters';
        });
        let self = this;

        if (chapterTrack) {
            let chapterListEl = document.createElement('ol');

            chapterListEl.setAttribute('id', `${this.playerId}-chapter-list`);

            let { cues = [] } = chapterTrack;

            Array.from(cues).forEach((cue, index) => {
                let { id, text, startTime } = cue;
                let chapterContainerEl = document.createElement('li');
                let chapterButtonEl = document.createElement('button');

                chapterButtonEl.id = `${id}-select`;
                chapterButtonEl.className = chapterButtonClasses;
                chapterButtonEl.innerHTML = text;

                ElementUtilities.append(chapterContainerEl, chapterButtonEl);

                chapterContainerEl.id = `${id}-chapter-seclect-container`;
                chapterContainerEl.className = `${chapterListItemClasses} ${index === 0 ? chapterActiveClasses : chapterInActiveClasses}`;

                ElementUtilities.append(chapterListEl, chapterContainerEl);

                chapterButtonEl.addEventListener('click', () => {
                    self.seek(startTime);
                    self.play();
                });
            });

            chapterListEl.className = chapterListClasses;

            return chapterListEl;
        }

        return false;

    }

    get html() {

        let {
            playPauseButtonHTML,
            scrubBarHTML,
            timestampHTML,
            muteButtonHTML,
            volumeBarHTML
        } = this;
        return `
           ${playPauseButtonHTML}
           ${scrubBarHTML}
           ${timestampHTML}
           ${muteButtonHTML}
           ${volumeBarHTML}                        
        `
    }

}