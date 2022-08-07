const { Collectionx } = require('./Collectionx');
const { Dictionaryx } = require('./Dictionaryx');
const { Numberx } = require('./Numberx');
const { Stringx } = require('./Stringx');
const { CommonObjectAdapterx } = require('./CommonObjectAdapterx');

//---------------------------------------------------------------------
//---------------------------------------------------------------------


"use strict";


class WrapperFactoryx {

	constructor() {
		this.initialize();
	}


	/* -- static methods --

		loadCode
		wrap
	*/

	//Class Methods

	static loadCode() {
		//for js -- ensures Z_manualRaw is loaded
	}

	static wrap(arg) {
		if (arg == null) return arg;
		if (arg instanceof CommonObjectAdapterx)
			return arg;
		if (typeof arg === typeof "a")
			return Stringx.on(arg);
		if ((typeof arg === typeof 1) || (typeof arg === typeof 1.5))
			return Numberx.on(arg);
		if (arg instanceof Array)
			return Collectionx.on(arg);
		if (arg.constructor === Object)
			return Dictionaryx.on(arg);
		return arg;
	}
}



Object.prototype.zzunwrap = function() { 
	return this.valueOf();
}

Object.prototype.zzwrap = function() { 
	return WrapperFactoryx.wrap(this.valueOf());
}




exports.WrapperFactoryx = WrapperFactoryx;
