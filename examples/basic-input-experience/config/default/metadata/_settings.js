import style from "./style.less";
import data from "../static-data";

const settings = {
    style: style.toString(),
    data: data(),
    title: "Blank",
    framework: "bootstrap",
    description: "An empty experience.",
    created: 1516985633314,
    updated: 1516985636576,
    version: "0.11.3-prerelease",
    trackers: [
        {
            type: "google-analytics",
            trackingId: "UA-99216317-1",
            name: "iVXjs Analytics",
            id: "ivxjsTracker"
        }
    ],
    storyKey: "basic-input-experience",
    style_file: "style.less"
}

export default settings;