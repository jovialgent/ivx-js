export function assert(test, name, message){
	if(!test) throw new Error(`${name} is invalid: ${message}.`);
	
	return test;
}