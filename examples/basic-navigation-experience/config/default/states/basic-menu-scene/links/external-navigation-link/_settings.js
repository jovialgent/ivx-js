import labelHTML from "./label.html";
import onClick from "./_settings.on-click.js";

const settings = {
    id: "external-navigation-link",
    labelHTML,
    attributes: {},
    classes: "external-navigation-link",
    onClick: [...onClick],
    href: "{{experience.data.url}}"
}

export default settings;