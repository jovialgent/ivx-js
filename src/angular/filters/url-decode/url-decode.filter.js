

export default (iVXjs) => {
    "ngInject";

    return (text) => {
        const regex = /\%[a-zA-z0-9]{2}/gm;

        if ((!text || !regex.test(text))) return;

        const decodedString = text.replace(regex, (encodedBlock, position) => {
            try {
                return `${decodeURIComponent(encodedBlock)}`;
            } catch (err) {
                const { message } = err;

                if (message === 'URI malformed') {
                    iVXjs.log.warn(`Decode filter failed to decode value "${encodedBlock}" at position ${position}. Please check that it is a valid encoded value.`);

                    return encodedBlock;
                }
            }
        });

        return decodedString;
    }
}