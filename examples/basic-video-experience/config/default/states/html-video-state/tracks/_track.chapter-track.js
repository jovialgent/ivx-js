import track from "./_track.chapter-track.cues.vtt";

const { cues = [] } = track;

const settings = {
    id: "chapter-track",
    label: "Chapters",
    srclang: "en",
    kind: "chapters",
    cues: [...cues]
}

export default settings;