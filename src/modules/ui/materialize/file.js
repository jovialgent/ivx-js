
export class File{
    constructor(inputObj) {
        let {input = {}, settings = {}, tags = {}} = inputObj;

        this.input = input;
        this.settings = settings;
        this.tags = tags;
    } 

   
    get uiClasses() {
        return 'validate'
    }

    get html() {
        let {input, settings, tags, uiClasses, uiAttributes =""} = this;
        let {label = '', labelHTML, name = '', id = ''} = input;
        let {input: inputSettings = {}} = settings;
        let {classes = ''} = inputSettings;

        classes = `${classes} ${uiClasses}`;

        if (labelHTML) label = labelHTML;

        let inputHTML = ` 
            
            <div class="file-field input-field">
      <div class="btn">
        <span>File</span>
        <input id="${id}" name="${name}" type="file" ${tags}>
      </div>
      <div class="file-path-wrapper">
        <input class="file-path validate" type="text" >
      </div>
    </div>
       `;

        return `${inputHTML}`;
    }
}