
import labelHTML from "./templates/hamburger-menu-label.html";

appRun.$inject = ['$rootScope'];


function appRun($rootScope, iVXjs) {
    $rootScope.hamburgerMenuSpecs =
        {
            id: 'hamburger-menu',
            embeddedStateId: 'hamburger-menu',
            labelHTML,
            classes: 'hamburger-menu-open',
            onClick: [{
                eventName: "setData",
                args: {
                    key: "clickedHamburgerMenu",
                    value: true
                }
            }]
        }

}

export default appRun;