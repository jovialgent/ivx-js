export default () => {
    "ngInject";

    return (text) => {
        if (!text) return;
        let capitalizeText = text.toLowerCase();
        
        return capitalizeText[0].toUpperCase() + capitalizeText.substring(1);
    }
}