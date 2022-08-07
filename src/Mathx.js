const { Objectx } = require('./Objectx');

//---------------------------------------------------------------------
//---------------------------------------------------------------------


"use strict";


class Mathx extends Objectx {

	constructor() {
		super();
	}


	/* -- static methods --

		sin
		random
		arcTan
		minWith
		abs
		cos
		arcTanWith
		distFromPointTo
		modulusWith
		formatAsSigned
		coerceInteger
		testCasePostix
		coerceFloat
		round
		randomFactor
		angleFromTo
		ceiling
		numEqualsFuzz
		pi
		tan
		floor
		maxWith
		sqrt
	*/

	//Class Methods

	static ceiling(n) {
		//Manual
		return Math.ceil(n);
	}

	static coerceInteger(arg) {
		//Manual
		return parseInt(arg.zzunwrap());
	}

	static arcTanWith(y, x) {
		//NOTE WELL -- js has y FIRST -- atan2(y, x)
		//Manual
		return Math.atan2(y, x);
	}

	static arcTan(tanValue) {
		//Manual
		return Math.atan(tanValue);
	}

	static pi() {
		//Manual
		return Math.PI;
	}

	static distFromPointTo(p1,p2) {
		//Linear length
		
		var dx, dy;
		dx = p2.x() - p1.x();
		dy = p2.y() - p1.y();
		//Pythagorean Theorem
		return this.sqrt((dx * dx) + dy * dy);
	}

	static minWith(a, b) {
		//Manual
		return Math.min(a, b);
	}

	static random(max) {
		//Randon number between 1 and max
		
		return this.floor((this.randomFactor() * max) + 1);
	}

	static tan(a) {
		//a is angle in radians
		//Manual
		return Math.tan(a);
	}

	static formatAsSigned(num) {
		return num > 0 ? "+" + num : num.toString()
	}

	static abs(n) {
		//Manual
		return Math.abs(n);
	}

	static numEqualsFuzz(numA,numB,fuzz) {
		var a, b;
		a = this.abs(numA);
		b = this.abs(numB);
		return this.abs(a - b) <= fuzz;
	}

	static modulusWith(n, divisor) {
		//Manual
		return n % divisor;
	}

	static testCasePostix() {
		return "Test"
	}

	static sin(a) {
		//a is angle in radians
		//Manual
		return Math.sin(a);
	}

	static angleFromTo(p1,p2) {
		/* We calc 'pure' angles 0 to 2pi
			Clockwise from 3 o'clock.
			Axis angles (starting at x to right and going clockwise)
				0, 0.5pi, pi, 1.5pi, 2pi
			y axis is oriented downward */
		
		var a, pi;
		a = this.arcTanWith(p2.y() - p1.y(),p2.x() - p1.x());
		if(a >= 0)
			return a;
		pi = this.pi();
		return (pi + pi) + a;
	}

	static coerceFloat(arg) {
		//Manual
		return parseFloat(arg.zzunwrap());
	}

	static cos(a) {
		//a is angle in radians
		//Manual
		return Math.cos(a);
	}

	static round(n) {
		//Manual
		return Math.round(n);
	}

	static floor(n) {
		//Manual
		return Math.floor(n);
	}

	static maxWith(a, b) {
		//Manual
		return Math.max(a, b);
	}

	static sqrt(n) {
		//Manual
		return Math.sqrt(n);
	}

	static randomFactor() {
		//Manual
		return Math.random();
	}
}


Number.prototype.squared = function() { return this * this; }
Number.prototype.sqrt = function() { return Math.sqrt(this); }
Number.prototype.abs = function() { return Math.abs(this); }
Number.prototype.negated = function() { return -this; }

Number.prototype.rounded = function() { return Mathx.round(this); }
Number.prototype.floor = function() { return Mathx.floor(this); }
Number.prototype.ceiling = function() { return Mathx.ceiling(this); }

Number.prototype.asStringSigned = function() { 
	//Note: negative sign will be present with number
	return (this >= 0 ? "+" : "") + this;
}




exports.Mathx = Mathx;
