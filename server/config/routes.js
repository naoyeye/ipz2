var Page = require('../controllers/page');

module.exports = function(app) {

	// ==============================================
	// 网站页面 ======================================
	// ==============================================
	app.get('/', Page.home);
	app.get('/register', Page.register);
};