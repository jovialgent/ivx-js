export default class {
	constructor(log) {
		this.log = log
	}

	assert(test, name, message) {
		let {log} = this;
		let {show: debug} = log;

		if (!test) {
			let errorObj = { 
				message : `${name} is invalid: ${message}.`
			};

			if(debug){
				this.log.error(errorObj, "ASSERT");
				throw new Error(errorObj.message);
			} 
		}

		return test;
	}
}