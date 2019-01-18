import track from "./_track.french-track.cues.vtt";

const { cues = [] } = track;

const settings = {
    id: "french-track",
    label: "French",
    srclang: "fr",
    kind: "subtitles",
    cues: [...cues]
}

export default settings;