import Evaluator from "../ivx-js/evaluator.js";

export default class extends Evaluator {
    constructor(experience, customEvaluator) {
        super(experience, customEvaluator);
    }

    storyEvents(lhs, is, storyEvent) {
<<<<<<< HEAD
        let { experience = {} } = this;
        let { events = []} = experience;
=======
        let {experience} = this;
        let {events} = experience;
>>>>>>> 66edc35f03aabb01d344fb2918a33d29056022f9

        if (storyEvent === 'none') {
            return noEventFired(is, events, experience);
        }

        return this[is](storyEvent, events);

        function noEventFired(is, events, experience) {
            let isFired = is === 'fired';

            return events.length <= 0 && isFired;
        }
    }

    fired(event, events = [])  {
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
        let {experience} = this;
        let {progress: currentStoryProgress, milestone: currentMilestone, story} = experience;
        let {progressMap} = story;
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

        return this[is](evaluateProgress, progressValue);

        function isStoryProgress(progress) {
            return progress === 'Started' || progress === 'Completed' || progress === 'Converted';
        }
    }
}