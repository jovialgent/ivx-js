/**
 * Converts an object with attributes and keys into HTML
 * that inputs can be used.
 */
export class AttributeTags {
    
    /**
     * Pulls all the attribute settings and the attributes 
     * to be rendered.
     * @param {Object} attributeData - settings for all the attributes.
     * @param {Array} attributeKeys - attribute names to be set.
     */
    constructor(attributeData = {}, attributeKeys = []){
       
       /**
        * All attributes to be made.
        * @type {Object}
        */
       this.attributeData = attributeData;
       
       /**
        * Attribute names to be set.
        * @type {Array}
        */
       this.attributeKeys = attributeKeys;
    }
    
    
    /**
     * Renders attributes based on the keys and attribute data.
     * @example
     * attributeData = { required = "true"};
     * attributeKeys = ["required"];
     * 
     * // Becomes: 
     * html = 'required = "true"'
     * 
     * @type {String}
     */
    get html(){
        let {attributeKeys, attributeData} = this;
        let attributeHTML = attributeKeys.reduce( (currentAttributeHTML, currentKey) =>{

            if(attributeData[currentKey]){
                let attributeTagHTML = attributeData[currentKey] === 'tag-only' ? 
                currentKey :
                `${currentKey}="${attributeData[currentKey]}"`

                return `${currentAttributeHTML} ${attributeTagHTML} `;
            } 
            return currentAttributeHTML;
        }, '');   
        return attributeHTML;
    }
};