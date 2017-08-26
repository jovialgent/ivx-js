export default {
    addClassesToElement(element, classes) {
        let classList = classes.split(' ');

        classList.forEach(currentClass => {
            element.classList.add(currentClass);
        })
    },

    removeClassesFromElement(element, classes) {
        let classList = classes.split(' ');

        classList.forEach(currentClass => {
            element.classList.remove(currentClass);
        })
    },

    hasClass(element, classes) {
        return element.className.indexOf(classes) >= 0;
    },

    append(appendTo, element) {
        if (appendTo.append) {
            appendTo.append(element);
            return;
        }

        if (appendTo.appendChild) {
            appendTo.appendChild(element);
            return;
        }
    }
}