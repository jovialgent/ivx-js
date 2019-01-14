import startCase from "lodash/startCase";

export default (stateId) => {
    return {
        id: stateId,
        name: startCase(stateId),
        url: `/${stateId}`
    }
}