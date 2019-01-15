/* st-system.js */

st.system = {
	$stars: null,
	stars: [],
	planets: [],
	
	init: function() {
		st.log("init system");
		st.system.$stars = $(".st-system .st-stars");
		st.system.$planets = $(".st-system .st-planets");
		st.system.gen();
		st.system.render();
	},
	
	/* gen methods*/
	gen: function() {
		st.log("gen");
		st.system.genStars();
		st.system.genPlanets();
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
		for(var i=0; i<nStars; i++) {
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

	genPlanets: function() {
		st.log("gen planets");
		var nPlanets = st.math.die(3,6,0);
		st.log("nPlanets[" + nPlanets + "]");
		for(var i=0; i<nPlanets; i++) {
			var aPlanet = st.system.genPlanet(i);
			st.log("aPlanet[" + aPlanet.toStr() + "]");
			st.system.planets.push(aPlanet);
		}
	},
	
	genPlanet: function(index) {
		st.log("gen planet, index[" + index + "]");
		var pPosition = st.math.die(1,10,0);
		var nPosition = 0;
		switch(true) {
			case pPosition > 5: nPosition = 2; break;
			case pPosition > 3: nPosition = 1; break;
		}
		st.log("pPosition[" + pPosition + "]");
		st.log("nPosition[" + nPosition + "]");
		var aPlanet = null;
		var planetType = st.system.genPlanetType(nPosition);
		st.log("planetType[" + planetType + "]");
		aPlanet = new Planet(nPosition, planetType);
		return aPlanet;
	},
	
	genPlanetType: function(nPosition) {
		var aType = null;
		switch(nPosition) {
			case 0: aType = st.system.getPlanetTypeInner(); break;
			case 1: aType = st.system.getPlanetTypeLifeZone(); break;
			case 2: aType = st.system.getPlanetTypeOuterSystem(); break;
		}
		return aType;
	},
	
	getPlanetTypeInner: function() {		
		var pType = st.math.die(1,20,0);
		st.log("pType[" + pType + "]");
		var aType = null;
		switch(true) {
			case pType > 17: aType = "Asteroid belt"; break;
			case pType > 16: aType = "Gas giant"; break;
			case pType > 8:  aType = "Rock ball"; break;
			case pType > 3:  aType = "Greenhouse"; break;
			default:         aType = "Empty orbit"; break;
		}
		return aType;
	},
	
	getPlanetTypeLifeZone: function() {		
		var pType = st.math.die(1,20,0);
		st.log("pType[" + pType + "]");
		var aType = null;
		switch(true) {
			case pType > 17: aType = "Asteroid belt"; break;
			case pType > 16: aType = "Gas giant"; break;
			case pType > 10: aType = "Terrestrial world"; break;
			case pType > 7:  aType = "Desert world"; break;
			case pType > 4:  aType = "Rock ball"; break;
			case pType > 1:  aType = "Greenhouse"; break;
			default:         aType = "Empty orbit"; break;
		}
		return aType;
	},
	
	getPlanetTypeOuterSystem: function() {		
		var pType = st.math.die(1,20,0);
		st.log("pType[" + pType + "]");
		var aType = null;
		switch(true) {
			case pType > 17: aType = "Asteroid belt"; break;
			case pType > 14: aType = "Hostile world"; break;
			case pType > 7:  aType = "Gas giant"; break;
			case pType > 4:  aType = "Ice ball"; break;
			case pType > 1:  aType = "Rock ball"; break;
			default:         aType = "Empty orbit"; break;
		}
		return aType;
	},

	/* render methods */
	render: function() {
		st.log("render");
		st.system.renderStars();
		st.system.renderPlanets();
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
				h.push("<span class=\"st-star-attr\">");
				h.push(i+1);
				h.push("</span>");
				
				h.push("<span class=\"st-star-attr\">");
				h.push(aStar.starType);
				h.push("</span>");

				h.push("<span class=\"st-star-attr\">");
				h.push(aStar.starColor);
				h.push("</span>");
			h.push("</div>");
		}
		st.system.$stars.html(h.join(""));
	},
	
	renderPosition: function(pos) {
		var ret = "";
		switch(pos) {
			case 0: ret = "Inner system"; break;
			case 1: ret = "Life zone"; break;
			case 2: ret = "Outer system"; break;
		}
		return ret;
	},
	
	renderPlanets: function() {
		st.log("render planets");
		var h = [];
		var nPlanets = st.system.planets.length;
		st.log("nPlanets[" + nPlanets + "]");
		h.push("<h2>");
		h.push("Planets");
		h.push("</h2>");
		
		var pCount = 1;
		for(var pos=0;pos<3;pos++) {
			h.push("<div>");
				h.push("<h3>");
				h.push(st.system.renderPosition(pos));
				h.push("</h3>");
				
				for(var i=0;i<nPlanets;i++) {
					var aPlanet = st.system.planets[i];
					if (aPlanet.planetPosition === pos) {
						h.push("<div>");
							h.push("<span class=\"st-star-attr\">");
							h.push(pCount++);
							h.push("</span>");
							
							h.push("<span class=\"st-star-attr\">");
							h.push(aPlanet.planetType);
							h.push("</span>");
						h.push("</div>");
					}
				}
			h.push("</div>");
		}
		st.system.$planets.html(h.join(""));
	}

}