import isEmpty from "lodash/isEmpty";

export default ($delegate, iVXjs) => {
    "ngInject";

    $delegate.setScopeExperience = ($scope) => {
        if (!iVXjs) return;

        const { experience = {} } = iVXjs;
        let entity = {};

        const { data: experienceData = {}, organization = {}, childEntityKey = "" } = experience;
        let { data: organizationData = {}, childEntityType, name, key, logo = {} } = organization;

        if (!isEmpty(childEntityKey)) {
            const { entities } = organization;
            const foundEntity = entities.find((currentEntity) => currentEntity.key === childEntityKey) || {};

            entity = Object.assign({},
                foundEntity,
                {
                    type: childEntityType
                });
        }

        return Object.assign($scope, {
            experience: {
                data: experienceData
            },
            organization: {
                data: organizationData,
                entity,
                name,
                key,
                logo
            }
        })
    }

    return $delegate;
}