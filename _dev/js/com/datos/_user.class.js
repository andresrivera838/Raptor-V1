var User = (function() {
	function User(p_obj) {
		this.id = p_obj.id || "";
		this.nombre = p_obj.nombre || "";
		this.visitor = p_obj.visitor || "";
		this.isLogin = false;
		this.token = p_obj.token || "";
	}
	var p =  User.prototype;

	p.setUser = function(p_obj) {
		this.id = p_obj.Id || this.id;
		this.nombre = p_obj.nombre || this.nombre;
		this.visitor = p_obj.visitor || this.visitor;
		this.token = p_obj.token || this.token;
		services = p_obj.services || this.services;
		this.isLogin = p_obj.isLogin ? p_obj.isLogin : false;
	}
	p.get = function(p_name) {
		return this[p_name];
	}
	p.getUser = function() {
		return this;
	}

	return User;
})();