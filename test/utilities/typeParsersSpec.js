import {TypeValidator, ObjectParsers} from '../../library/utilities/type-parsers.js';

describe('TypeValidator', () => {
    let typeValidator;

    beforeEach(() => {
        typeValidator = new TypeValidator();
    });

    describe('#isUndefined', () => {


        it('should return true if undefined or null', () => {
            expect(typeValidator.isUndefined()).toEqual(true);
            expect(typeValidator.isUndefined(null)).toEqual(true);
        });

        it('should return false if it is defined or not null', () => {
            expect(typeValidator.isUndefined({})).toEqual(false);
        });
    });

    describe('#isEmpty', () => {
        it('should return true if object, array or string is empty', () => {
            expect(typeValidator.isEmpty()).toEqual(true);
            //expect(typeValidator.isEmpty(null)).toEqual(true);
            expect(typeValidator.isEmpty({})).toEqual(true);
            expect(typeValidator.isEmpty([])).toEqual(true);
            expect(typeValidator.isEmpty("")).toEqual(true);

        });

        it('should return false if object or array is no empty', () => {
            expect(typeValidator.isEmpty({ a: 1 })).toEqual(false);
            expect(typeValidator.isEmpty([1])).toEqual(false);
            expect(typeValidator.isEmpty("1")).toEqual(false);
            expect(typeValidator.isEmpty(0)).toEqual(false);


        });
    });

});


describe('ObjectParsers', () => {
    let objectParsers, testObj;
    beforeEach(() => {
        objectParsers = new ObjectParsers();
        testObj = { a: 1, b: 2 };
    });

    describe('#mapKeys', () => {

        it('should return an array with adjusted callback.', () => {
            let testArray = objectParsers.mapKeys(testObj, (val, key) => {
                return val += 1;
            })

            expect(testArray).toEqual([2, 3]);

        });

    });

    describe('#merge', () => {
        it('should replace the left object to the right object.', () => {
            let testModule = objectParsers.merge({ a: 1, b: 2 }, { a: 0 }, []);

            expect(testModule).toEqual({ a: 0, b: 2 });

        });

        it('should ignore the element defined in the array', () => {
            let testModule = objectParsers.merge({ a: 1, b: 2 }, { a: 0 }, ['a']);

            expect(testModule).toEqual({ a: 1, b: 2 });
        })
    });

    describe('#anyEmpty', () => {
        it('should return an object with isEmpty true if none are empty.', () => {
            let testObject = [{
                num: 0,
                str: "test",
                arr: [0, 1, 2],
                obj: {
                    a: "test"

                }
            }];

            let keys = Object.keys(testObject[0]);

            let {errors, isEmpty} = objectParsers.anyEmpty(testObject, keys);

            expect(isEmpty).toBe(false);
        });

        it('should return an object with isEmpty false and has an object with errors.', () => {
            let testObject = [
                {
                    num: 0,
                    str: "test",
                    arr: [0, 1, 2],
                    obj: {
                        a: "test"

                    }
                }, {
                    str: "",
                    arr: [],
                    obj: {},
                    num: 123
                }, {

                    str: "test",
                    arr: [0, 1, 2],
                    obj: {
                        a: "test"

                    }
                }];

            let keys = Object.keys(testObject[0]);

            let {errors, isEmpty} = objectParsers.anyEmpty(testObject, keys);

            let testErrors = [
                {
                    key: "str",
                    index: 1,
                    value: ""
                }, {
                    key: "arr",
                    index: 1,
                    value: []
                }, {
                    key: "obj",
                    index: 1,
                    value: {}
                }, {
                    key: "num",
                    index: 2,
                    value: undefined
                }]

            expect(isEmpty).toBe(true);
            expect(errors).toEqual(testErrors);
        })
    });

    describe('#hasSameArray', () => {
        it('should return true, if there is an array in a collection that equals', () => {
            let testArray = [
                [0, 1, 2, 3],
                [0, 1, 2, 3]
            ];

            let rightArray = [0, 1, 2, 3];


            expect(objectParsers.hasSameArray(testArray, rightArray)).toEqual(true);
        })
    });

    describe('#hasSameObject', () => {
        it('should return true, if there is an object that are the same as the element', () => {
            let testArray = [{
                a: 0
            }, {
                    a: 1
                }, {
                    a: 2
                }];

            let rightObject = { a: 2 };

            expect(objectParsers.hasSameObject(testArray, rightObject)).toEqual(true);
        })
    })

    describe('#isUnique', () => {
        it('should return true if all objects is unique', () => {
            let testArray = [{
                str: "test",
                arr: [0, 1, 2, 3],
                object: {
                    a: 0
                }
            }, {
                    str: "test1",
                    arr: [1, 2, 3, 4],
                    object: {
                        b: 0
                    }
                }];

            let {isUnique} = objectParsers.isUnique(testArray, ['str', 'arr', 'object']);

            expect(isUnique).toBe(true);

        });

        it('should return false if all objects is unique', () => {
            let testArray = [{
                str: "test1",
                arr: [1, 2, 3, 4],
                obj: {
                    b: 0
                }
            }, {
                    str: "test1",
                    arr: [1, 2, 3, 4],
                    obj: {
                        b: 0
                    }
                }];

            let {isUnique, errors} = objectParsers.isUnique(testArray, ['str', 'arr', 'obj']);

            let realErrors = [
                {
                    key: "str",
                    index: 1,
                    value: "test1"
                }, {
                    key: "arr",
                    index: 1,
                    value: [1, 2, 3, 4]
                }, {
                    key: "obj",
                    index: 1,
                    value: {
                        b: 0
                    }
                }]

            expect(isUnique).toBe(false);
            expect(errors).toEqual(realErrors);
            expect(errors.length).toEqual(3);

        })
    })

});
