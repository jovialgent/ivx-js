import Evaluator from "../ivx-js/evaluator.js";

export default class extends Evaluator {
    constructor(experience, customEvaluator) {
        super(experience, customEvaluator);
    }

    entity(key, is, compareChildEntity) {
        const { childEntityKey } = this.experience;

        return this[is](childEntityKey, compareChildEntity);
    }

    organization(key, is, value) {
        const { experience } = this;
        const { organization = {} } = experience;
        const { data = {} } = organization;
        const currentOrganizationValue = data[key];

        return this[is](currentOrganizationValue, value);
    }

    storyEvents(lhs, is, storyEvent) {
        let { experience = {} } = this;
        let { events = [] } = experience;

        if (storyEvent === 'none') {
            return noEventFired(is, events, experience);
        }

        if (this[is]) {
            return this[is](storyEvent, events);
        }

        return false;

        function noEventFired(is, events, experience) {
            let isFired = is === 'fired';

            return events.length <= 0 && isFired;
        }
    }

    fired(event, events = []) {
        let firedEvent = events.find((eventFired, index) => {
            return eventFired === event;
        });

        return typeof firedEvent !== 'undefined';
    }

    notFired(event, events = []) {
        let firedEvent = events.find((eventFired, index) => {
            return eventFired === event;
        });

        return typeof firedEvent === 'undefined';
    }

    progress(lhs, is, progress) {
        let { experience } = this;
        let { progress: currentStoryProgress, milestone: currentMilestone, story } = experience;
        let { progressMap } = story;
        let currentProgress;
        let currentProgressValue = -1;
        let currentMilestoneValue = -1;

        if (currentMilestone && currentMilestone.length > 0) {
            let currentMilestoneString = currentMilestone[0].toLowerCase() + currentMilestone.substring(1);

            currentMilestoneValue = progressMap[currentMilestoneString] ? progressMap[currentMilestoneString] : -1;
        }

        if (isStoryProgress(currentStoryProgress)) {
            let currentProgressString = currentStoryProgress[0].toLowerCase() + currentStoryProgress.substring(1);

            currentProgressValue = progressMap[currentProgressString];
        }

        progress = progress[0].toLowerCase() + progress.substring(1);

        let progressValue = progressMap[progress];
        let evaluateProgress = currentProgressValue > currentMilestoneValue ? currentProgressValue : currentMilestoneValue;

        if (this[is]) {
            return this[is](evaluateProgress, progressValue);
        }

        return false;


        function isStoryProgress(progress) {
            return progress === 'Started' || progress === 'Completed' || progress === 'Converted';
        }
    }
}