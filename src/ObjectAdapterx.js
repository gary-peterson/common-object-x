const { CommonObjectAdapterx } = require('./CommonObjectAdapterx');
const { Collectionx } = require('./Collectionx');

//---------------------------------------------------------------------
//---------------------------------------------------------------------


"use strict";


class ObjectAdapterx extends CommonObjectAdapterx {

	constructor() {
		super();
	}

	asCollection() {
		var raw;
		raw = this.raw();
		if(raw == null)
			return this.newColl();
		return this.wrapsCollection() ? raw : Collectionx.with(raw);
	}

	hasDictionary() {
		return this.tools().isDictionary(this.raw());
	}

	wrapsCollection() {
		return this.tools().isCollection(this.raw());
	}

	wrapsDictionary() {
		return this.tools().isDictionary(this.raw());
	}
}


exports.ObjectAdapterx = ObjectAdapterx;
