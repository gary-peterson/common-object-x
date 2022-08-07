const { CommonObjectAdapterx } = require('./CommonObjectAdapterx');

//---------------------------------------------------------------------
//---------------------------------------------------------------------


"use strict";


class Booleanx extends CommonObjectAdapterx {

	constructor() {
		super();
	}


	/* -- static methods --

		defT
	*/

	printDetailsOn(strm) {
		strm.show(this.asString());
	}
	//Class Methods

	static defT() {
		return this.on(true)
	}
}


exports.Booleanx = Booleanx;
