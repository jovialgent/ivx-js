export class FakeBus {
    constructor(iVXjs) {
        
        spyOn(iVXjs.Bus, 'emit').and.callFake(function (eventName, obj) {

        });
        spyOn(iVXjs.Bus, 'on').and.callFake(function (eventName, obj) {

        });
        
        spyOn(iVXjs.Bus, 'once').and.callFake(function (eventName, obj) {

        });
        
        this.iVXjs = iVXjs;

    }

    emit(eventName, ...rest) {
       expect(this.iVXjs.Bus.emit).toHaveBeenCalledWith(eventName, ...rest)
    }
    
    on(eventName, ...rest) {
       expect(this.iVXjs.Bus.emit).toHaveBeenCalledWith(eventName, ...rest)
    }
    
    once(eventName, ...rest){
        expect(this.iVXjs.Bus.once).toHaveBeenCalledWith(eventName, ...rest);
    }
}