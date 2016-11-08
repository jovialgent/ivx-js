import FirebaseActions from '../../../../src/modules/data/firebase/actions.js';
import iVXjsLog from '../../../../src/utilities/logging.js';
import { iVXjs } from '../../../../src/core/app.js';
import { FakeBus } from '../../../core/fake-bus.js';
import FirebaseMock from './firebaseMock.js';




describe('FireBaseActions', () => {
    let firebaseActions, log;

    beforeEach(() => {
        log = new iVXjsLog(true, new FakeBus(new iVXjs()));

        firebaseActions = new FirebaseActions(log);
    });

    describe("#handleRedirect", () => {
        let stateData, provider, args;
        beforeEach(() => {
            window.firebase = new FirebaseMock();
        });

        it("should run 'addScope' if provider has that function", () => {
            stateData = {
                key: "123123"
            };

            args = {
                scope: ["test", "test1"]
            };

            class Provider {
                constructor() {
                    this.scopes = [];
                }

                addScope(scope) {
                    this.scopes.push(scope);
                }
            }

            let myProvider = new Provider();

            firebaseActions.handleRedirect(stateData, myProvider, args);

            expect(myProvider.scopes).toEqual(args.scope);
        });

        it("localStorage.redirectOrigin should equal a stringified version of the statedata", () =>{
            stateData = {
                key: "123123"
            };

            args = {
                scope: ["test", "test1"]
            };

            class Provider {
                constructor() {
                    this.scopes = [];
                }

                addScope(scope) {
                    this.scopes.push(scope);
                }
            }

            let myProvider = new Provider();

            firebaseActions.handleRedirect(stateData, myProvider, args);

            expect(localStorage.redirectOrigin).toEqual(JSON.stringify(stateData));
        })


    })

    describe("#isRestricted", () => {
        it('should return false if here is a user', function (done) {
            window.firebase = new FirebaseMock({});
            firebaseActions.isRestricted()
                .then((restricted) => {
                    expect(restricted).not.toBeTruthy();
                    done();
                });
        });

        it('should return true if here is no user', function (done) {
            window.firebase = new FirebaseMock();
            firebaseActions.isRestricted()
                .then((restricted) => {
                    expect(restricted).toBeTruthy();
                    done();
                });
        });

    })
});
