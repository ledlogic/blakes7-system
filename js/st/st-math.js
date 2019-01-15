/* st-math.js */

st.math = {
	die: function(qty, die, mod) {
		var ret = mod;
		for (var i=0; i<qty; i++) {
			ret += Math.floor(Math.random() * die) + 1 
		}
		return ret;
	}
};
