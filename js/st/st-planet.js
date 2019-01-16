/* st-planet.js */

function Planet(planetPosition, planetType, characteristic, satellites, rings) {
	this.planetPosition = planetPosition;
	this.planetType = planetType;
	this.characteristic = characteristic;
	
	this.satellites = satellites;
	this.rings = rings;
	this.toStr = Planet.toStr;
}
Planet.toStr = function() {
	return "planetPosition[" + this.planetPosition + "], planetType[" + this.planetType + "], characteristic[" + this.characteristic + "], satellites[" + this.satellites + "], rings[" + this.rings + "]";
}
