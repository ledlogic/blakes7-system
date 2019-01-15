/* st-planet.js */

function Planet(planetPosition, planetType) {
	this.planetPosition = planetPosition;
	this.planetType = planetType;
	this.toStr = Planet.toStr;
}
Planet.toStr = function() {
	return "planetPosition[" + this.planetPosition + "], planetType[" + this.planetType + "]";
}
