import createBasicStateInfo from "../_utilities/create-basic-state-info";
import footerHTML from "./templates/footer.html";

const id = "sample-video-state";
const basicStateInfo = createBasicStateInfo(id);
const videoStateInfo = {
    type: "video",
    playerSettings: {
        youtubeId: "9-zdWGp0xxM"
    },
    footer: {
        html: footerHTML
    }
}

export default Object.assign({}, basicStateInfo, videoStateInfo);