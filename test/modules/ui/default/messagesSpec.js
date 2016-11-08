import {AttributeTags} from '../../../../src/modules/ui/utilities/attributes.js';
import {ErrorMessages} from '../../../../src/modules/ui/default/messages.js';


describe('ErrorMessages', () =>{
    
    describe('#html', () =>{
       
       it('should return a correct HTML with error messages.', () =>{
           let errorMessages = new ErrorMessages([
               {
                   "attrHTML" : `test="test"`,
                   "message" : "I am an error!"
               }
           ]);
           
           let errorHTML = `<div class='error-messages'>
                <span class="error-message" test="test">
                    I am an error!
                </span>
            </div>`
           
           expect(errorMessages.html).toEqual(errorHTML);
       });
       
       it('should return an empty string if there are no messages.', () =>{
           let errorMessages = new ErrorMessages([
               
           ]);
           
           let errorHTML = '';
           
           expect(errorMessages.html).toEqual(errorHTML);
       })
        
    });
    
});

describe('AttributeTags', () =>{
    describe('#html', () =>{
        let attributeKeys, attributeData;
        beforeEach(() =>{
            
            attributeKeys = ['test'];
            attributeData = {
                test : 123
            };
            
        });
        
        it('should create a string attributes for html', () =>{
            let attrTags = new AttributeTags(attributeData,attributeKeys);
            let testAttrHTML = ` test="123" `;
            expect(attrTags.html).toEqual(testAttrHTML);
            
        });
        
    })
})
