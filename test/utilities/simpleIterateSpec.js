import {SimpleIterate} from '../../library/utilities/simple-iterate.js';

describe('Simple Iterate', () => {
    describe('#constructor', () =>{
        it('should say done if the array is empty or undefined', () =>{
            let thisSimpleIterateUndefined = new SimpleIterate();
            let thisSimpleIterateEmpty = new SimpleIterate([]);
            expect(thisSimpleIterateUndefined.done).toEqual(true);
            expect(thisSimpleIterateEmpty.done).toEqual(true);
            
        })
    });
    
    describe('#next', () =>{
        it('should return the correct element and shrink the array in the simple iterate.', () =>{
            let thisArray = [0,1,2,3];
            let thisSimpleIterate = new SimpleIterate(thisArray);
            thisSimpleIterate.next();
            let testValue = thisSimpleIterate.next();
            expect(testValue).toEqual(1);
            expect(thisArray.length).toEqual(4);
            
            expect(thisSimpleIterate.clonedArray).toEqual([2,3]);
            expect(thisSimpleIterate.clonedArray.length).toEqual(2);        
        });
        
        it('should return nothing if the iterator is done.', () =>{
            let thisArray = [0];
            let thisSimpleIterate = new SimpleIterate(thisArray);
            thisSimpleIterate.next();
            
            expect(thisSimpleIterate.done).toEqual(true);
            expect(thisSimpleIterate.next()).not.toBeTruthy();
        });
        
    });
});
    