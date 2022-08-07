const { Objectx } = require('./Objectx');

//---------------------------------------------------------------------
//---------------------------------------------------------------------


"use strict";


class Vectorx extends Objectx {

	constructor() {
		super();
		this.fnumX = this.fnumX ?? null;
		this.fnumY = this.fnumY ?? null;
	}


	/* -- static methods --

		fromXY
		xY
	*/

	x(anumX) {
		if(anumX !== undefined) {
			this.fnumX = anumX}
		else {
			return this.fnumX}
	}

	y(anumY) {
		if(anumY !== undefined) {
			this.fnumY = anumY}
		else {
			return this.fnumY}
	}


	approxEqualsFuzz(other, tolerance) {
		return (this.math().abs(this.x() - other.x()) <= tolerance) && this.math().abs(this.y() - other.y()) <= tolerance;
	}

	asPerpendicular() {
		/* Dot product should be zero
		
				x1 y1
				x2 y2
		
				(x1*x2) +(y1*y2) = 0
		
				y2 = -(x1*x2)/y1
				let x2=1
				y2 = -(x1*1)/y1
		
				let x2=-1
				y2 = -(x1*(-1))/y1
					= x1/y1 */
		
		return Vectorx.xY(- 1,this.x() / this.y());
	}

	asPoint() {
		return this.pointClass().xY(this.x(),this.y());
	}

	asReversed() {
		return this.constructor.xY(this.x().negated(),this.y().negated());
	}

	asScaled(factor) {
		return this.constructor.xY(this.x() * factor,this.y() * factor);
	}

	asUnitVector() {
		var x, y, d;
		x = this.x();
		y = this.y();
		d = this.math().sqrt((x * x) + y * y);
		return Vectorx.xY(x / d,y / d);
	}

	equals(other) {
		return this.objectEquals(this.x(),other.x()) && this.objectEquals(this.y(),other.y());
	}

	x(anumX) {
		if(anumX !== undefined)
			{this.fnumX = anumX}
		else
			{return this.fnumX}
	}

	y(anumY) {
		if(anumY !== undefined)
			{this.fnumY = anumY}
		else
			{return this.fnumY}
	}
	//Class Methods

	static xY(x,y) {
		return this.fromXY(x,y)
	}

	static fromXY(x,y) {
		var temp1;
		temp1 = new this();
		temp1.x(x);
		temp1.y(y);
		return temp1;
	}
}


exports.Vectorx = Vectorx;
