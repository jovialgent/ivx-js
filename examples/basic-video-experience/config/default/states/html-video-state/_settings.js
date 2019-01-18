import events from "./events";
import headerHtml from "./templates/header.html";
import footerHtml from "./templates/footer.html";
import tracks from "./tracks";

const stateSettings = {
    id: "html-video-state",
    url: "/html5",
    name: "HTML 5 Video Test",
    type: "video",
    next: [
        {
            stateId: "youtube-video-state"
        }
    ],
    embedded: false,
    playerSettings: {
        id: "html5-video-player",
        src: "http://assets.ivx.io/video/upload/v1523631071/ASU%20Online/Nitro/asu-dream-it-do-it.mp4",
        inlineSrc: "http://assets.ivx.io/video/upload/v1523631071/ASU%20Online/Nitro/asu-dream-it-do-it.mp4",
        playsinline: true,
        controls: {
            type: "standard"
        },
        tracks: [...tracks()]
    },
    ...events(),
    section: {},
    header: {
        html: headerHtml,
        classes: ""
    },
    footer: {
        html: footerHtml,
        classes: ""
    }
};

export default [
    stateSettings
]