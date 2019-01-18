import Bus from "./bus";
import Actions from "./actions";
import InlineVideo from "./ios-inline-video";
import TemplateRenderer from "./template-renderer";
import ScopedExperience from "./experience-scope";
import VideoService from "./video.service";
import ActionTemplateService from "./action-templates.service";
import Rules from "./rules";

import StateServices from "./states";

export default angular.module('ivx-js.services', [
    Bus,
    Actions,
    InlineVideo,
    TemplateRenderer,
    ScopedExperience,
    VideoService,
    ActionTemplateService,
    StateServices,
    Rules
]).name;