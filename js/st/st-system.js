/* st-system.js */

st.system = {
	$stars: null,
	stars: [],
	
	init: function() {
		st.log("init system");
		st.system.$stars = $(".st-system .st-stars");
		st.system.gen();
		st.system.render();
	},
	
	/* gen methods*/
	gen: function() {
		st.log("gen");
		st.system.genStars();
	},
	
	genStars: function() {
		st.log("gen stars");
		var pStars = st.math.die(1,100,0);
		var nStars = 1;
		switch(true) {
			case pStars > 99: nStars = 4; break;
			case pStars > 95: nStars = 3; break;
			case pStars > 70: nStars = 2; break;
		}
		st.log("pStars[" + pStars + "]");
		st.log("nStars[" + nStars + "]");
		for(var i=0;i<nStars;i++) {
			var aStar = st.system.genStar(i);
			st.log("aStar[" + aStar.toStr() + "]");
			st.system.stars.push(aStar);
		}
	},
	
	genStar: function(index) {
		st.log("gen star, index[" + index + "]");
		var pStar = st.math.die(1,100,0);
		st.log("pStar[" + pStar + "]");
		var aStar = null;
		switch(true) {
			case pStar > 98: aStar = st.system.genUnusualStar(index); break;
			case pStar > 31: aStar = new Star("Main Sequence", "Red (M)"); break;
			case pStar > 22: aStar = new Star("Main Sequence", "Orange (K)"); break;
			case pStar > 16: aStar = new Star("Main Sequence", "Yellow (G)"); break;
			case pStar > 12: aStar = new Star("Main Sequence", "Yellow-white (F)"); break;
			case pStar > 9:  aStar = new Star("Main Sequence", "White (A)"); break;
			case pStar > 7:  aStar = new Star("Main Sequence", "Blue-white (B)"); break;
			case pStar > 4:  aStar = new Star("Sub-dwarf", "Red (M)"); break;
			default:         aStar = new Star("White dwarf", ""); break;
		}
		return aStar;
	},
	
	genUnusualStar: function(index) {
		st.log("gen unusual star, index[" + index + "]");
		var pStar = st.math.die(1,100,0);
		st.log("pStar[" + pStar + "]");
		var aStar = null;
		switch(true) {
			case pStar > 97: aStar = new Star("Giant", "White (A)"); break;
			case pStar > 86: aStar = new Star("Giant", "Orange (K)"); break;
			case pStar > 82: aStar = new Star("Giant", "Blue-white (B)"); break;
			case pStar > 81: aStar = new Star("Giant", "Red (M)"); break;
			case pStar > 80: aStar = new Star("Giant", "Blue (O)"); break;
			case pStar > 62: aStar = new Star("Main sequence", "Blue (O)"); break;
			case pStar > 31: aStar = new Star("Sub-dwarf", "Orange (K)"); break;
			default:         aStar = new Star("Sub-dwarf", "Yellow (K)"); break;
		}
		return aStar;
	},
	
	/* render methods */
	render: function() {
		st.log("render");
		st.system.renderStars();
	},
	
	renderStars: function() {
		st.log("render stars");
		var h = [];
		var nStars = st.system.stars.length;
		st.log("nStars[" + nStars + "]");
		h.push("<h2>");
		h.push("Stars");
		h.push("</h2>");
		for(var i=0;i<nStars;i++) {
			var aStar = st.system.stars[i];
			h.push("<div>");
				h.push("<h3>");
				h.push("Star " + (i+1));
				h.push("</h3>");
				
				h.push("<span class=\"st-star-attr\">");
				h.push("<label>Type</label>");
				h.push(aStar.starType);
				h.push("</span>");

				h.push("<span class=\"st-star-attr\">");
				h.push("<label>Color</label>");
				h.push(aStar.starColor);
				h.push("</span>");
			h.push("</div>");
		}
		st.system.$stars.html(h.join(""));
	}
}