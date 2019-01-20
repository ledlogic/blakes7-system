/* st-system.js */

st.system = {
	$stars: null,
	stars: [],
	planets: [],
	names: [],
	
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
		//st.log("pStars[" + pStars + "]");
		//st.log("nStars[" + nStars + "]");
		for(var i=0; i<nStars; i++) {
			var aStar = st.system.genStar(i);
			//st.log("aStar[" + aStar.toStr() + "]");
			st.system.stars.push(aStar);
		}
	},
	
	genStar: function(index) {
		//st.log("gen star, index[" + index + "]");
		var pStar = st.math.die(1,100,0);
		//st.log("pStar[" + pStar + "]");
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
		//st.log("gen unusual star, index[" + index + "]");
		var pStar = st.math.die(1,100,0);
		//st.log("pStar[" + pStar + "]");
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
		//st.log("gen planets");
		var nPlanets = st.math.die(3,6,0);
		//st.log("nPlanets[" + nPlanets + "]");
		for(var i=0; i<nPlanets; i++) {
			var aPlanet = st.system.genPlanet(i);
			//st.log("aPlanet[" + aPlanet.toStr() + "]");
			st.system.planets.push(aPlanet);
		}
	},
	
	genPlanet: function(index) {
		//st.log("gen planet, index[" + index + "]");
		var pPosition = st.math.die(1,10,0);
		var nPosition = 0;
		switch(true) {
			case pPosition > 5: nPosition = 2; break;
			case pPosition > 3: nPosition = 1; break;
		}
		//st.log("pPosition[" + pPosition + "]");
		//st.log("nPosition[" + nPosition + "]");
		var aPlanet = null;
		var planetType = st.system.genPlanetType(nPosition);
		//st.log("planetType[" + planetType + "]");
		
		var characteristic = "";
		if (planetType === "Terrestrial world") {
			characteristic = st.system.getPlanetCharacteristic();
		}
		
		var nSat = 0;
		switch (planetType) {
			case "Asteroid belt": nSat = 0; break;
			case "Empty orbit": nSat = 0; break;
			case "Gas Giant": nSat = st.math.die(2, 6, 0); break; 
			default: nSat = Math.max(0, st.math.die(1, 6, -3)); break;
		}		
		//st.log("nSat[" + nSat + "]");
		
		var rings = [];
		var nRings = 0;
		for (var i=0; i<nSat; i++) {
			var pRing = st.math.die(1,100,0);
			rings[i] = (pRing < 31);
			if (rings[i]) {
				nRings++;
			}
		}
		nSat -= nRings;

		aPlanet = new Planet(nPosition, planetType, characteristic, nSat, rings);
		return aPlanet;
	},
	
	genSystemName: function() {
		if (st.system.names.length) {
			st.system.getSystemName();
		} else {
	        $.ajax({
	            url : "./data/latin-animals.txt",
	            dataType: "text",
	            success : function (data) {
	                st.system.names = data.split("\r\n");
	                st.system.getSystemName();
	            }
	        });			
		}
	},
	
	getSystemName: function() {
		var names = st.system.names;
		var i = st.math.die(1, names.length,-1);
		var animal = names[i];
		$("#systemName").val(animal);
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
	
	getPlanetCharacteristic: function() {		
		var pType = st.math.die(1,20,0);
		//st.log("pType[" + pType + "]");
		var aType = null;
		switch(pType) {
			case 1:  aType = "Atmospheric density"; break;
			case 2:  aType = "Axial tilt"; break;
			case 3:  aType = "Background radiation"; break;
			case 4:  aType = "Captured world"; break;
			case 5:  aType = "Climate"; break;
			case 6:  aType = "Day length"; break;
			case 7:  aType = "Dead or dying world"; break;
			case 8:  aType = "Planet density"; break;
			case 9:  aType = "Elliptical orbit"; break;
			case 10: aType = "Extreme weather"; break;
			case 11: aType = "Gravity"; break;
			case 12: aType = "Life"; break;
			case 13: aType = "Ruins"; break;
			case 14: aType = "Scarce resource"; break;
			case 15: aType = "Terraformed"; break;
			case 16: aType = "Toxic atmosphere"; break;
			case 17: aType = "Unstable world"; break;
			case 18: aType = "Unusual shape"; break;
			case 19: aType = "Water"; break;
			case 20: aType = "Year"; break;
		}
		return aType;
	},
	
	getPlanetTypeInner: function() {		
		var pType = st.math.die(1,20,0);
		//st.log("pType[" + pType + "]");
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
		//st.log("pType[" + pType + "]");
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
		//st.log("pType[" + pType + "]");
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
		//st.log("nStars[" + nStars + "]");
		h.push("<h2>");
		h.push("Stars (" + nStars + ")");
		h.push("</h2>");
		for(var i=0;i<nStars;i++) {
			var aStar = st.system.stars[i];
			h.push("<div class=\"st-section st-position-stars\">");
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
	
	renderPositionClass: function(pos) {
		var ret = "st-position-";
		switch(pos) {
			case 0: ret += "inner"; break;
			case 1: ret += "goldilocks"; break;
			case 2: ret += "outer"; break;
		}
		return ret;
	},
	
	renderPlanets: function() {
		st.log("render planets");
		var h = [];
		var nPlanets = st.system.planets.length;
		//st.log("nPlanets[" + nPlanets + "]");
		h.push("<h2>");
		h.push("Planets (" + nPlanets + " orbits)");
		h.push("</h2>");
		
		var pCount = 1;
		for(var pos=0;pos<3;pos++) {
			h.push("<div class=\"" + st.system.renderPositionClass(pos) + "\">");
			
				// position: inner, life zone, or outer
				h.push("<h3>");
				h.push(st.system.renderPosition(pos));
				h.push("</h3>");
				
				var posPlanets = 0;
				for(var i=0; i<nPlanets; i++) {
					var aPlanet = st.system.planets[i];
					if (aPlanet.planetPosition === pos) {
						posPlanets++;
						
						h.push("<div class=\"st-section st-stars\">");
						
							// planet - orbit number: starts at 1.
							h.push("<span class=\"st-star-attr\">");
							h.push(pCount++);
							h.push("</span>");
							
							// planet - type
							h.push("<span class=\"st-star-attr\">");
							h.push(aPlanet.planetType);
							if (aPlanet.characteristic) {
								h.push(" (" + aPlanet.characteristic + ")");
							}
							if (aPlanet.planetType != "Empty orbit") {
								h.push("<span class=\"st-government\">");
								h.push("<a href=\"\" class=\"st-action st-add-government st-hidden\">[+] Add Government</a>");
								h.push("</span>");
							}
							h.push(aPlanet.satellites ? "," : "");
							h.push("</span>");

							// planet - satellites
							if (aPlanet.satellites) {
								var rh = [];
								var ringsLength = aPlanet.rings.length;
								for(var r=0; r<ringsLength; r++) {			
									if (aPlanet.rings[r]) {
										rh.push((r+1) + ": Ring");
									} else {
										var b = [];
										b.push("<span class=\"st-government\">");
										b.push("<a href=\"\" class=\"st-action st-add-government st-hidden\">[+] Add Government</a>");
										b.push("</span>");
										rh.push((r+1) + ": Moon" + b.join(""));
									}
								}
								h.push("<span class=\"st-star-attr\">");
								h.push("Satellites: ");
								h.push(rh.join(", "));
								h.push("</span>");
							}
						h.push("</div>");
					}
				}
				if (posPlanets === 0) {
					h.push("<div class=\"st-section st-stars\">");
					h.push("<span class=\"st-star-attr\">");
					h.push("");
					h.push("</span>");
					h.push("<span class=\"st-star-attr\">");
					h.push("Empty");
					h.push("</span>");
				}
			h.push("</div>");
		}
		st.system.$planets.html(h.join(""));
		$(".st-add-government").on("click", st.system.addGovernment);
	},
	
	getPlanetGovernment: function() {		
		var pGov = st.math.die(1,20,0);
		//st.log("pGov[" + pGov + "]");
		var ret = null;
		switch(pGov) {
			case 1:  aGov = "Allance"; break;
			case 2:  aGov = "Anarchy"; break;
			case 3:  aGov = "Autocracy"; break;
			case 4:  aGov = "Bureaucracy"; break;
			case 5:  aGov = "Colony"; break;
			case 6:  aGov = "Corporate State"; break;
			case 7:  aGov = "Emergency or transition"; break;
			case 8:  aGov = "Empire"; break;
			case 9:  aGov = "Federation"; break;
			case 10: aGov = "Feudal"; break;
			case 11: aGov = "Fragmented"; break;
			case 12: aGov = "Military government"; break;
			case 13: aGov = "Oligarchy"; break;
			case 14: aGov = "Participatory democracy"; break;
			case 15: aGov = "Penal colony"; break;
			case 16: aGov = "Representative democracy"; break;
			case 17: aGov = "Sanctuary"; break;
			case 18: aGov = "Subjugated"; break;
			case 19: aGov = "Theocracy"; break;
			case 20: aGov = "Tribal"; break;
		}
		return aGov;
	},

	addGovernment: function(e) {
		e.preventDefault();
		var $that = $(this);
		var $parent = $that.parent(".st-government");

		var g = st.system.getPlanetGovernment();
		
		$parent.html("<a href=\"#\" class=\"st-remove-government\">" + g + "</a>");
		$parent.find(".st-remove-government").on("click", st.system.removeGovernment);
	},
	
	removeGovernment: function(e) {
		e.preventDefault();
		var $that = $(this);
		$that.addClass("st-hidden");
	}
}