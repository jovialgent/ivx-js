export default () => {
    "ngInject";

    return (text) => {
        if (!text) return;

        return `${encodeURIComponent(text)}`;
    }
}