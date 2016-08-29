import {Comparator} from '../../library/utilities/comparator.js';

describe('Comparator', () => {

    let thisComparator;

    beforeEach(() => {
        thisComparator = new Comparator();
    });
    
    describe('#compare', () =>{
        it('should return if true if values are true for the compare parts', () =>{
            expect(thisComparator.compare(4, 'gte', 4)).toEqual(true);
            expect(thisComparator.compare(2, 'gt', 0)).toEqual(true);
            expect(thisComparator.compare(-123, 'lt', "2")).toEqual(true);
            expect(thisComparator.compare(-123, 'lte', -123)).toEqual(true);
            expect(thisComparator.compare(-123, 'equals', -123)).toEqual(true);
            expect(thisComparator.compare(-123, 'notEquals', 123)).toEqual(true);
            
            
           
        })
    })


    describe('#lte', () => {

        it('should return true if lhs is less than or equal to rhs', () => {
            expect(thisComparator.lte(4, 5)).toEqual(true);
            expect(thisComparator.lte(5, 5)).toEqual(true);

        });

        it('should return false if lhs is greater than rhs.', () => {
            expect(thisComparator.lte(5, 4)).toEqual(false);
        });

        it('should return false if lhs or rhs is not a number.', () => {
            expect(thisComparator.lte("test", 4)).toEqual(false);
            expect(thisComparator.lte(5, "test")).toEqual(false);

        });
    });


    describe('#gte', () => {

        it('should return true if lhs is greater than or equal to rhs', () => {
            expect(thisComparator.gte(5, 4)).toEqual(true);
            expect(thisComparator.gte(5, 5)).toEqual(true);

        });

        it('should return false if lhs is less than rhs.', () => {
            expect(thisComparator.gte(4, 5)).toEqual(false);
        });

        it('should return false if lhs or rhs is not a number.', () => {
            expect(thisComparator.gte("test", 4)).toEqual(false);
            expect(thisComparator.gte(5, "test")).toEqual(false);

        });
    });

    describe('#lt', () => {

        it('should return true if lhs is less to rhs', () => {
            expect(thisComparator.lt(4, 5)).toEqual(true);
           
        });

        it('should return false if lhs is greater or equal to rhs.', () => {
            expect(thisComparator.lt(5, 4)).toEqual(false);
            expect(thisComparator.lt(5, 5)).toEqual(false);
            
        });

        it('should return false if lhs or rhs is not a number.', () => {
            expect(thisComparator.lt("test", 4)).toEqual(false);
            expect(thisComparator.lt(5, "test")).toEqual(false);

        });
    });


    describe('#gt', () => {

        it('should return true if lhs is greater than rhs', () => {
            expect(thisComparator.gt(5, 4)).toEqual(true);
            
        });

        it('should return false if lhs is less than or equal to rhs.', () => {
            expect(thisComparator.gt(4, 5)).toEqual(false);
            expect(thisComparator.gt(5, 5)).toEqual(false);
            
        });

        it('should return false if lhs or rhs is not a number.', () => {
            expect(thisComparator.gt("test", 4)).toEqual(false);
            expect(thisComparator.gt(5, "test")).toEqual(false);

        });
    });
    
    describe('#equals', () =>{
        it('should return true if the lhs and rhs are equal', () =>{
            expect(thisComparator.equals("test", "test")).toEqual(true);
            expect(thisComparator.equals(2, 2)).toEqual(true);
        });
        it('should return false if the lhs and rhs are not equal', () =>{
            expect(thisComparator.equals("test", "test1")).toEqual(false);
            expect(thisComparator.equals(2, 3)).toEqual(false);
        })
    })
    
    describe('#notEquals', () =>{
        it('should return true if the lhs and rhs are not equal', () =>{
            expect(thisComparator.notEquals("test", "test1")).toEqual(true);
            expect(thisComparator.notEquals(2, 3)).toEqual(true);
        });
        it('should return false if the lhs and rhs are equal', () =>{
            expect(thisComparator.notEquals("test", "test")).toEqual(false);
            expect(thisComparator.notEquals(2, 2)).toEqual(false);
        })
    });
    
    



});
