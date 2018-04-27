import {Style} from '../../../../src/modules/ui/default/style.js';

describe('Style', () => {


    describe('#getWidth', () => {
        let style;

        beforeEach(() => {
            style = new Style();

        });
        
        it('should return ivxjs-grid-1-1 if width was 1', () =>{
            let width = style.getWidth("1");
            
            expect(width).toEqual('ivx-grid-1-1 ivxjs-grid-1-1');
        });
        
        it('should return ivxjs-grid-x-y where width equals x/y', () =>{
            let width = style.getWidth("1/2");
            
            expect(width).toEqual('ivx-grid-1-2 ivxjs-grid-1-2');
        })

    })

})
