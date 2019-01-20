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
		$(".st-show-actions").on("click", st.showActions);
		$(".st-hide-actions").on("click", st.hideActions);
		$(".st-add-all-governments").on("click", st.addAllGovernments);
	},	
	regen: function(e) {
		e.preventDefault();
		window.location.reload();
	},	
	hideActions: function(e) {
		e.preventDefault();
		$(".st-action").hide();
		$(".st-show-actions").removeClass("st-hidden");
		$(".st-hide-actions").addClass("st-hidden");
	},
	showActions: function(e) {
		e.preventDefault();
		$(".st-action").show();
		$(".st-show-actions").addClass("st-hidden");
		$(".st-hide-actions").removeClass("st-hidden");
	},
	addAllGovernments: function(e) {
		e.preventDefault();
		$(".st-add-government").click();
		$(".st-add-all-governments").addClass("st-hidden");
		$(".st-show-actions").addClass("st-hidden");
		$(".st-hide-actions").addClass("st-hidden");
	}
};

$(document).ready(st.init);
