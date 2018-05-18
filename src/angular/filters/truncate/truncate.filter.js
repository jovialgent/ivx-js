export default () => {
    "ngInject";

    return (text, length = 15, suffix = "...") => {
        if (!text || !text.substring) return;

        return `${text.substring(0, length)}${text.length >= length ? suffix : ''}`;
    }
}