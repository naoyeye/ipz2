// 登录前首页 ========================================
exports.home = function(req, res) {
	res.render('website/pages/cover_home', {
		page_title: '欢迎来到爬格子！',
		page_slug: 'home'
	});
};

// 注册页面 =========================================
exports.register = function(req, res) {
	res.render('website/pages/register', {
		page_title: '注册',
		page_slug: 'register'
	});
};

// 登录页面 =========================================