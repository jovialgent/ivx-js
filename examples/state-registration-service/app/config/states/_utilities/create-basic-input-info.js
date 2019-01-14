import startCase from "lodash/startCase";

export default (type) => {
    return {
        id: type,
        name: type,
        labelHTML: `${startCase(type)}`,
        attributes: {
            placeholder: `An example of the ${startCase(type)} input...`,
            required: true
        },
        settings:{
            width: "1/2"
        },
        type
    }
}