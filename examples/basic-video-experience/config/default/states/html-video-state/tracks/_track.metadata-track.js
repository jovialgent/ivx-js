import track from "./_track.metadata-track.cues.vtt";

const { cues = [] } = track;

const settings = {
    id: "metadata-track",
    label: "Metadata",
    srclang: "en",
    kind: "metadata",
    cues: [...cues]
}

export default settings;