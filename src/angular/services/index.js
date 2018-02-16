import Bus from "./bus";
import Actions from "./actions";
import InlineVideo from "./ios-inline-video";
import TemplateRenderer from "./template-renderer";
import ScopedExperience from "./experience-scope";
import VideoService from "./video.service";


export default angular.module('ivx-js.services', [
    Bus,
    Actions,
    InlineVideo,
    TemplateRenderer,
    ScopedExperience,
    VideoService
]).name;