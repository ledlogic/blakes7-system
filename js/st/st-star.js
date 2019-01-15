/* st-star.js */

function Star(starType, starColor) {
	this.starType = starType;
	this.starColor = starColor;
	this.toStr = Star.toStr;
}
Star.toStr = function() {
	return "starType[" + this.starType + "],"
	  + "starColor[" + this.starColor + "]";
}
