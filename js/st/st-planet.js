/* st-planet.js */

function Planet(planetPosition, planetType, satellites, rings) {
	this.planetPosition = planetPosition;
	this.planetType = planetType;
	this.satellites = satellites;
	this.rings = rings;
	this.toStr = Planet.toStr;
}
Planet.toStr = function() {
	return "planetPosition[" + this.planetPosition + "], planetType[" + this.planetType + "], satellites[" + this.satellites + "], rings[" + this.rings + "]";
}
