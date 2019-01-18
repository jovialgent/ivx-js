import track from "./_track.english-track.cues.vtt";

const { cues = [] } = track;

const settings = {
    id: "english-track",
    label: "English",
    srclang: "en",
    kind: "subtitles",
    default: true,
    cues: [...cues]
}

export default settings;