var DownloadClass = (function(window, undefined){
	"use strict";

	function DownloadClass(p_obj){
		this.url = p_obj.url;
	}

	var p = DownloadClass.prototype;

	p.file = function(p_obj){
		$.ajax({
			type: "POST",
			url: this.url,
			data: {
				file_path : p_obj.path
			},
			success: p_obj.success || function(){
				console.log("success");
			},
			error: p_obj.error || function(){
				console.log("error");
			},
			dataType: 'json'
		});
	}
	return new DownloadClass({
		url: "php/download_file.php"
	});
})(window, undefined);