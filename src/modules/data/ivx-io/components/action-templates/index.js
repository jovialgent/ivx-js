import iVXRecordEvent from "./ivx-record-event/directive";
import iVXSetCompleted from "./ivx-set-completed/directive";
import iVXSetConverted from "./ivx-set-converted/directive";
import iVXSetMilestone from "./ivx-set-milestone/directive";

export default class {
    constructor(app, opts) {
        new iVXRecordEvent(app, opts);
        new iVXSetCompleted(app,opts);
        new iVXSetConverted(app,opts);
        new iVXSetMilestone(app, opts);
    }
}