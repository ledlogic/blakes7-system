/* st.js */

var st = {
	log: function(s) {
		if (typeof(window.console) != "undefined") {
			console.log(s);
		}
	},

	init: function() {
		st.system.init();
		$(".st-regen").on("click", st.regen);
	},
	
	regen: function(e) {
		e.preventDefault();
		window.location.reload();
	}
};

$(document).ready(st.init);
