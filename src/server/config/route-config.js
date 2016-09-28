(function (routeConfig) {

  'use strict';

  routeConfig.init = (app) => {

    // *** routes *** //
    const routes = require('../routes/index');
    const landing = require('../routes/landing');
    const login = require('../routes/login');
    const signUp = require('../routes/sign-up');
    const homepage = require('../routes/homepage');
    const sites = require('../routes/sites');
    const cookieSession = require('cookie-session');

    // *** register routes *** //

    app.use(cookieSession({
      name: 'session',
      keys: [process.env.SECRET_KEY]
    }));

    app.use((req, res, next) => {
      req.renderObject = {};
      if (req.session.user) {
        req.renderObject.user = req.session.user;
        next();
      } else {
        next()
      }
    });

    app.use('/', routes);
    app.use('/landing', landing);
    app.use('/login', login);
    app.use('/sign-up', signUp);
    app.use('/homepage', homepage);
    app.use('/sites', sites);

  };

})(module.exports);
