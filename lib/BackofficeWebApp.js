var P = require('when');
var _ = require('underscore');
var cookieParser = require('cookie-parser');
module.exports = BackofficeWebApp;

/** Mapping of the Backoffice API methods to REST endpoints */
function BackofficeWebApp(options) {
    this.options = options || {};
    this.api = this.options.api;
}
_.extend(BackofficeWebApp.prototype, {

    /** Initializes the REST API binding. */
    initApp : function(app, options) {
        var that = this;

        // Use cookies in "encrypted" form
        app.use(cookieParser('my secret here'));

        that._bindToApp(app, '/test/login', function(req, res) {
            var login = req.query.login || 'Anonymous';
            var password = req.query.password || '';
            return that.api.login({
                login : login,
                password : password
            }).then(function(result) {
                res.status(200);
                res.cookie('sessionId', result.sessionId);
                res.send('Session ID: ' + result.sessionId);
            });
        });
        that._bindToApp(app, '/test/logout', function(req, res) {
            var params = that._initParams(req);
            return that.api.logout(params).then(function(result) {
                res.status(200);
                res.clearCookie('sessionId');
                res.send(result.msg);
            });
        });
        that._bindToApp(app, '/test/hello', function(req, res) {
            var params = that._initParams(req);
            params.name = req.query.name || 'Anonymous';
            return that.api.sayHello(params).then(function(result) {
                res.status(200);
                res.send(result);
            });
        });
    },

    /** Initializes a parameters object and copies the session identifier in it. */
    _initParams : function(req) {
        var sessionId = req.cookies.sessionId;
        return {
            sessionId : sessionId
        }
    },

    /**
     * Binds the specified method to the given REST path. The specified method
     * has to send a good response to the client and return a promise. If the
     * promise is rejected with an error then this method handles exceptions and
     * returns an error message to the client. This method is required to
     * centralize and unify error handling.
     */
    _bindToApp : function(app, path, method) {
        app.get(path, function(req, res) {
            P().then(function() {
                return method(req, res);
            }).then(null, function(err) {
                var status = err.status || 501;
                res.status(status);
                res.send('Error! ' + err.stack);
            }).done();
        })
    },

})
