const { CommonObjectx } = require('./CommonObjectx');

//---------------------------------------------------------------------
//---------------------------------------------------------------------


"use strict";


class Numberx extends CommonObjectx {

	constructor() {
		super();
	}

	basicAsDeflated() {
		return this;
	}

	ceiling() {
		return this.math().ceiling(this.raw());
	}

	floor() {
		return this.math().floor(this.raw());
	}

	printRounded(decPlaces) {
		var f, result;
		f = 10 ** decPlaces;
		result = (this.raw() * f).zzwrap().round() / f;
		return result.zzwrap().toString();
	}

	round() {
		return this.math().round(this.raw());
	}

	toString() {
		//Returns nice one-liner string describing object
		
		return this.raw().toString();
	}
}


exports.Numberx = Numberx;
