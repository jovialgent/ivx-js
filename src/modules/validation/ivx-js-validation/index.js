import { ObjectParsers, TypeValidator } from '../../../utilities/type-parsers.js';
import { Comparator } from '../../../utilities/comparator.js';
import { Validation } from './validation.js';
import { ExperienceValidation } from './experience.js';
import { ModuleValidation } from './modules.js';
import { ConfigValidation } from './config.js';

let objectParsers = new ObjectParsers()
let typeValidator = new TypeValidator()
let comparator = new Comparator()

export class iVXjsValidation extends Validation {

  constructor(data) {
    super()
    this.data = data

    if (!this.valid) {
      this.error = {
        message: this.collectErrorMessages(),
        data: this.data,
        errors: this.errors
      }
    }
  }

  collectErrorMessages() {
    return this.errors.reverse().reduce((errorMessages, errorObj) => {
      let {error} = errorObj
      return `${errorMessages}
TYPE: ${error.type ? error.type : 'ERROR'}  PATH: ${error.path} ${error.message && error.message.length > 0 ? 'MESSAGE: ' + error.message + '' : ''}`
    }, '');
  }

  get validationArray() {
    let currentValidationArray = [
      this.ruleValidationObj,
      this.experienceValidationObj,
      this.configValidationObj
    ];
    return currentValidationArray
  }

  get configValidationObj() {
    let {config} = this.data;
    let {valid, errors} = new ConfigValidation(config);

    if (!valid) {
      this.addErrors(errors);
    }

    return {
      valid: valid,
      error: {
        "path": "config",
        "message": "An experience must have a valid config",
        "type": "invalid"
      }
    }

  }

  get experienceValidationObj() {
    let {experience} = this.data
    let {valid, errors} = new ExperienceValidation(experience)
    let self = this;

    if (!valid) {
      this.addErrors(errors);
    }

    return {
      valid: valid,
      error: {
        path: 'experience',
        message: 'An experience must not have any errors',
        type: 'invalid'

      },
      data: experience

    }
  }

  get ruleValidationObj() {
    let {rules} = this.data

    return {
      valid: typeof rules !== 'undefined',
      error: {
        name: 'Missing Rules:',
        message: `The function rules needs to be defined in the experience.`
      },
      data: rules
    }
  }

};
