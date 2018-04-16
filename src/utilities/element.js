export default class ElementService {
    constructor(element) {
        Object.assign(this, {
            element
        });
    }

    addClass(cssClass) {
        this._runFunctionOnCssClass(cssClass, 'add');
    }

    removeClass(cssClass) {
        this._runFunctionOnCssClass(cssClass, 'remove');
    }

    html(newHtml) {
        if (!newHtml) {
            return this.element.outerHTML;
        } else {
            this.element.innerHTML = newHtml;
        }
    }

    getElementsByTagName(tagName) {
        return this.element.getElementsByTagName(tagName);
    }

    _runFunctionOnCssClass(cssClass, fn) {
        const { element } = this;
        const individualCssClasses = cssClass.split(" ");

        individualCssClasses.forEach((currentCssClass) => {
            if (currentCssClass && currentCssClass.length && currentCssClass.length > 0) {
                element.classList[fn](currentCssClass);
            }
        });
    }
}