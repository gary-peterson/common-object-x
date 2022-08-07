const { Objectx } = require('./Objectx');

//---------------------------------------------------------------------
//---------------------------------------------------------------------


"use strict";


class CommonObjectx extends Objectx {

	constructor() {
		super();
		this.fRaw = this.fRaw ?? null;
	}


	/* -- static methods --

		on
		fromRaw
		from
	*/

	asInteger() {
		;
	}

	copyO() {
		this.implementedBySubclass("copyO");
	}

	equals(other) {
		return this.objectEquals(this.raw(),other.zzunwrap());
	}

	isCollectionable() {
		//Can we act as a collection?
		
		return false;
	}

	isCommonObjectx() {
		return true;
	}

	isDictionaryable() {
		//Can we act as a dictionary?
		
		return false;
	}

	isStringable() {
		//Can we act as a string (are we string-like)?
		
		return false;
	}

	isWrapped() {
		return true;
	}

	raw(aRaw) {
		if(aRaw !== undefined)
			{this.fRaw = aRaw}
		else
			{return this.fRaw}
	}

	zzunwrap() {
		return this.raw();
	}
	//Class Methods

	static fromRaw(raw) {
		var temp1;
		temp1 = new this();
		temp1.raw(raw);
		return temp1;
	}

	static on(raw) {
		return this.fromRaw(raw)
	}

	static from(raw) {
		return this.fromRaw(raw)
	}
}


exports.CommonObjectx = CommonObjectx;
