export default function createFactoryFunction(constructor) {
	let constructorFn = constructor;
	let args = constructorFn.$inject;
	let factoryFunction = (...args) => {
    	return new constructorFn(...args);
	}
	
	args.push(factoryFunction);

	return args;
}