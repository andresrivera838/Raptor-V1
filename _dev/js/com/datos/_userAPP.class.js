
var UserAPP = (function(){
	function UserAPP(p_obj) {
		this.claves = p_obj.claves || 0;
		this.sorpresas = p_obj.sorpresas || 0;
		this.facebookId = p_obj.facebookId || 0;
		this.country = p_obj.country || 0;
		this.username = p_obj.username || 0;
		this.password = p_obj.password || 0;

	}
	var p = UserAPP.prototype = new User({});

	p.set = function(p_obj){
		this.setUser(p_obj);
		this.isNuevo = p_obj.IsNuevo || this.isNuevo;
		this.loginID = p_obj.LoginID || this.loginID;
		this.nombre1 = p_obj.Nombre1 || this.nombre1;
		this.nombre2 = p_obj.Nombre2 || this.nombre2;
		this.apellido1 = p_obj.Apellido1 || this.apellido1;
		this.apellido2 = p_obj.Apellido2 || this.apellido2;
		this.email = p_obj.Email || this.email;
		this.clave = p_obj.Clave || this.clave;
		this.fechaNacimiento = p_obj.FechaNacimiento || this.fechaNacimiento;
		this.docIdentidad = p_obj.DocumentoIdentidad || this.docIdentidad;
		this.tipoDocIdentidad = p_obj.TipoDocumentoIdentidad || this.tipoDocIdentidad;
		this.telefono = p_obj.Telefono || this.telefono;
		this.celular = p_obj.Celular || this.celular;
		this.direccion = p_obj.Direccion || this.direccion;
		this.pais = p_obj.Pais || this.pais;
		this.departamento = p_obj.Departamento || this.departamento;
		this.ciudad = p_obj.Ciudad || this.ciudad;
		this.recibirInfomacionEmail = p_obj.RecibirInfomacionEmail || this.recibirInfomacionEmail;
		this.recibirSMS = p_obj.RecibirSMS || this.recibirSMS;
		this.avatar = p_obj.Avatar || this.avatar;
		this.uenFam = p_obj.UenFam || this.uenFam;
		this.uenNos = p_obj.UenNos || this.uenNos;
		this.strActiva = p_obj.StrActiva || this.strActiva;
		this.sitioLogueado = p_obj.SitioLogueado || this.sitioLogueado;
		this.enviarCorreoActivacion = p_obj.EnviarCorreoActivacion || this.enviarCorreoActivacion;
		this.primeraVez = p_obj.PrimeraVez || this.primeraVez;
		this.esPreregistro = p_obj.EsPreregistro || this.esPreregistro;
		this.motivo = p_obj.Motivo || this.motivo;
		this.marca = p_obj.Marca || this.marca;
		this.nivel = p_obj.Nivel || this.nivel;

		this.puntos = (p_obj.Puntos)? p_obj.Puntos:0;

		this.contactoMarca = p_obj.ContactoMarca || this.contactoMarca;
	}
	
	return new UserAPP({});
})();

