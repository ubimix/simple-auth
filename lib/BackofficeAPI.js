var P = require('when');
var _ = require('underscore');
module.exports = BackofficeAPI;

/** Backoffice API. It has no dependencies on Express or other frameworks. */
function BackofficeAPI(options) {
    this.options = options || {};
}
_.extend(BackofficeAPI.prototype, {

    /**
     * Checks login/password pair and return an error if there is no such
     * credentials. This method accepts only this login/password pair:
     * login:'John', password:'Smith'.
     */
    login : function(params) {
        return P().then(function() {
            params = params || {};
            if (params.login !== 'John' || params.password !== 'Smith') {
                var err = new Error('Bad credentials');
                err.status = 401; // Not authorized
                throw err;
            }
            // Creates and returns a new session identifier.
            var sessionId = '123';
            return {
                sessionId : sessionId
            };
        })
    },

    /**
     * Log-out the currently logged user. Fails if the user is not logged in.
     */
    logout : function(params) {
        var that = this;
        return P().then(function() {
            params = params || {};
            that._checkSession(params);
            return {
                msg : 'You are logged out.'
            };
        })
    },

    /** Checks that the session is defined and returns a hello message. */
    sayHello : function(params) {
        var that = this;
        return P().then(function() {
            params = params || {};
            that._checkSession(params);
            return {
                msg : 'Hello, ' + params.name + '!'
            };
        })
    },

    /** An utility method used to centralize session verification. */
    _checkSession : function(params) {
        if (params.sessionId != '123') {
            var err = new Error('Forbidden');
            err.status = 403; // Forbidden
            throw err;
        }
    }
})
