export class Comparator {
    constructor(){
         
    }
    
    compare(lhs, is, rhs){
        return this[is](lhs, rhs);
    }
    
    lte(lhs, rhs){
        if(isNaN(lhs) || isNaN(rhs)) return false;
        return new Number(lhs) <= new Number(rhs);
    }
    
    lt(lhs, rhs){
        if(isNaN(lhs) || isNaN(rhs)) return false;
        return new Number(lhs) < new Number(rhs);
    }
    
    
    gte(lhs, rhs){
        if(isNaN(lhs) || isNaN(rhs)) return false;
        return new Number(lhs) >= new Number(rhs);
    }
    
    gt(lhs, rhs){
        if(isNaN(lhs) || isNaN(rhs)) return false;
        return new Number(lhs) > new Number(rhs);
    }
    
    equals(lhs, rhs){
        return lhs === rhs;
    }
    
    notEquals(lhs,rhs){
        return lhs !== rhs;
    }

    in(lhs,rhs){
        return rhs.indexOf(lhs) >= 0;
    }        
}