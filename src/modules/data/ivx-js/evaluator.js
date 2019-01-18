import { TypeValidator, ObjectParsers } from '../../../utilities/type-parsers.js';

let typeValidator = new TypeValidator();

const { hasOwnProperty } = Object.prototype;

import isFunction from "lodash/isFunction";

export default class {
    constructor(experience, customEvaluator) {
        this.experience = experience;
        this.customEvaluator = customEvaluator;
    }

    setCustomEvaluator(evaluatorFn) {
        Object.assign(this, {
            customEvaluator
        })
    }

    evaluate(rule, tempEvaluator = () => { return false }) {
        let self = this;
        let { conditionOperator = "and", conditions } = rule;
        let evaluateConditions = conditions.map((condition, index) => {
            let { key: lhs, is, value: rhs, type = "input" } = condition;
            let matchingCondition = tempEvaluator(condition);

            if (!matchingCondition && self.customEvaluator && isFunction(self.customEvaluator)) {
                matchingCondition = self.customEvaluator(condition);
            }

            // Since older versions of the iVXjs JSON used 
            // the key for "keyword" this will make it backwards
            // compatable
            if (!matchingCondition && self[lhs]) {
                matchingCondition = self[lhs](lhs, is, rhs);
            }

            if (!matchingCondition && self[type]) {
                matchingCondition = self[type](lhs, is, rhs);
            }

            return matchingCondition;
        });

        return this[conditionOperator](evaluateConditions);
    }

    input(lhs, is, rhs) {
        let { experience } = this;
        let lhsValue = experience.data[lhs];

        if (this[is]) {
            return this[is](lhsValue, rhs);
        }

        return false;
    }

    and(predicates = []) {
        return predicates.reduce((evaluate, predicate, index) => {
            return evaluate && predicate;
        }, true);
    }

    or(predicates = []) {
        return predicates.reduce((evaluate, predicate, index) => {
            return evaluate || predicate;
        }, false);
    }

    not(predicates = []) {
        return predicates.reduce((evaluate, predicate, index) => {
            return evaluate && !predicate;
        }, true);
    }

    lte(lhs, rhs) {
        if (isNaN(lhs) || isNaN(rhs)) return false;
        return new Number(lhs) <= new Number(rhs);
    }

    lt(lhs, rhs) {
        if (isNaN(lhs) || isNaN(rhs)) return false;
        return new Number(lhs) < new Number(rhs);
    }


    gte(lhs, rhs) {
        if (isNaN(lhs) || isNaN(rhs)) return false;
        return new Number(lhs) >= new Number(rhs);
    }

    gt(lhs, rhs) {
        if (isNaN(lhs) || isNaN(rhs)) return false;
        return new Number(lhs) > new Number(rhs);
    }

    equals(lhs, rhs) {
        return lhs === rhs;
    }

    notEquals(lhs, rhs) {
        return lhs !== rhs;
    }

    in(lhs, rhs) {
        return lhs && lhs.indexOf && lhs.indexOf(rhs) >= 0;
    }

    // Based on the isEmpty from lodash (https://github.com/lodash/lodash/blob/master/isEmpty.js)
    empty(lhs, rhs) {
        if (lhs === null) {
            return true;
        }

        if (Array.isArray(lhs) || typeof value === 'string') {
            return !lhs.length;
        }

        for (let key in lhs) {
            if (hasOwnProperty.call(lhs, key)) {
                return false;
            }
        }

        return true;
    }
}