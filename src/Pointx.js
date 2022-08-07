const { Objectx } = require('./Objectx');
const { Vectorx } = require('./Vectorx');

//---------------------------------------------------------------------
//---------------------------------------------------------------------


"use strict";


class Pointx extends Objectx {

	constructor() {
		super();
		this.fnumX = this.fnumX ?? null;
		this.fnumY = this.fnumY ?? null;
	}


	/* -- static methods --

		xY
		fromXY
		origin
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


	adjustX(dx) {
		this.x(this.x() + dx);
	}

	adjustY(dy) {
		this.y(this.y() + dy);
	}

	approxEqualsFuzz(other, tolerance) {
		return (this.math().abs(this.x() - other.x()) <= tolerance) && this.math().abs(this.y() - other.y()) <= tolerance;
	}

	asPercentOf(bounds) {
		var w, h;
		w = bounds.width();
		h = bounds.height();
		return this.constructor.xY((this.x() / w) * 100,(this.y() / h) * 100);
	}

	asVector() {
		Vectorx.xY(this.x(),this.y());
	}

	copyO() {
		return this.constructor.xY(this.x(),this.y());
	}

	equals(other) {
		return this.objectEquals(this.x(),other.x()) && this.objectEquals(this.y(),other.y());
	}

	firstL() {
		return this.x();
	}

	inflateFromDic(dic) {
		super.inflateFromDic(dic);
		this.x(dic.at("x"));
		this.y(dic.at("y"));
	}

	isPairable() {
		return true;
	}

	lastL() {
		return this.y();
	}

	minus(p2) {
		/* Return new point
				p3 = self - p2 */
		return this.plus(p2.negated());
	}

	negated() {
		/* Return new point
				self negated
					i.e. (-x, -y) */
		var temp1;
		temp1 = new this.constructor();
		temp1.x(0 - this.x());
		temp1.y(0 - this.y());
		return temp1;
	}

	plus(p2) {
		/* Return new point
				p3 = self + p2 */
		var temp1;
		temp1 = new this.constructor();
		temp1.x(this.x() + p2.x());
		temp1.y(this.y() + p2.y());
		return temp1;
	}

	quadrant() {
		/* Using quadrants in js terms (y axis downward, 
			start at 3 o'clock, clockwise).
			So quadrants are:
				SE, SW, NW, NE */
		
		var x, y;
		x = this.x();
		y = this.y();
		if(this.objectEquals(x,0) && this.objectEquals(y,0))
			return 1;
		//Could be any
		if(x >= 0)
			return y >= 0 ? 1 : 4;
		//x is less than zero
		return y >= 0 ? 2 : 3;
	}

	rounded() {
		return this.constructor.xY(this.math().round(this.x()),this.math().round(this.y()));
	}

	secondL() {
		return this.y();
	}

	toString() {
		return (("" + this.x()) + " @ ") + this.y();
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

	static origin() {
		return this.xY(0,0)
	}
}



//Helper
function newPoint(x, y) { return BabyObjectjs.pointClass().fromXY(x, y); }




exports.Pointx = Pointx;
