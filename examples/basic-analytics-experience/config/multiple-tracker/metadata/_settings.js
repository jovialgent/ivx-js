import style from "./style.less";
import data from "../static-data";

const settings = {
    style: style.toString(),
    data: data(),
    created: 1513108723328,
    storyKey: "basic-analytics-experience",
    schemaVersion: "v6",
    version: "0.11.5",
    title: "Basic Analytics Example",
    trackers: [
        {
            type: "google-analytics",
            trackingId: "UA-99216317-1",
            name: "iVXjs Analytics",
            id: "ivxjsTracker"
        },
        {
            type: "google-analytics",
            trackingId: "UA-42344575-7",
            id: "globalTracker",
            name: "iVX StoryPlayer Tracker"
        },
        {
            type: "google-tag-manager",
            trackingId: "GTM-NXDS3SN",
            id: "spGoogleTagManager",
            name: "StoryPlayer Google Tag Manager"
        },
        {
            type: "google-tag-manager",
            trackingId: "GTM-KBG9R8N",
            id: "testGoogleTagManager",
            name: "Test Google Tag Manager"
        }
    ],
    updated: 1526311613279,
    image: "https://3ee052d4331e5d9069b4-934722f60d110f81c49b0db2dfafd293.ssl.cf2.rackcdn.com/story/sp-gtm-test/23dbb7658437f034560f39710f8e8d29",
    playerType: "story-player",
    description: "Tests the Google Tag Manager",
    framework: "basic",
    episodeKey: "multiple-tracker",
    style_file: "style.less"
}

export default settings;