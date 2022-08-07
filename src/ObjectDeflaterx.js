const { Compositex } = require('./Compositex');
const { ObjectAdapterx } = require('./ObjectAdapterx');

//---------------------------------------------------------------------
//---------------------------------------------------------------------


"use strict";


class ObjectDeflaterx extends Compositex {

	constructor() {
		super();
		this.sObject = this.sObject ?? null;
		this.fResult = this.fResult ?? null;
		this.fResultString = this.fResultString ?? null;
	}


	/* -- static methods --

		on
		deflate
		fromObject
		typeKey
	*/

	deflate() {
		this.result(this.deflateAsObject());
		this.resultString(this.deflateAsString());
	}

	deflateAsObject() {
		var deflatable;
		
		deflatable = this.object().basicAsDeflated();
		
		/* If we are not a dictionary, and deflatable is a dictionary,
			then we assume we are a modeling class, that will need
			to be inflated with stored type */
		if(!ObjectAdapterx.on(this).hasDictionary()
		 && ObjectAdapterx.on(deflatable).wrapsDictionary())
			deflatable.atPut(this.constructor.typeKey(),this.className());
		
		return deflatable;
	}

	deflateAsString() {
		return this.jsonClass().fromObject(this.result()).asString();
	}

	go() {
		this.deflate();
	}

	object(aObject) {
		if(aObject !== undefined)
			{this.sObject = aObject}
		else
			{return this.sObject}
	}

	result(aResult) {
		if(aResult !== undefined)
			{this.fResult = aResult}
		else
			{return this.fResult}
	}

	resultString(aResultString) {
		if(aResultString !== undefined)
			{this.fResultString = aResultString}
		else
			{return this.fResultString}
	}
	//Class Methods

	static deflate(o) {
		var temp1;
		temp1 = this.fromObject(o);
		temp1.go();
		return temp1.result();
	}

	static typeKey() {
		return "__object_type__"
	}

	static on(o) {
		return this.fromObject(o)
	}

	static fromObject(object) {
		return this.newInit(model => model.object(object))
	}
}


exports.ObjectDeflaterx = ObjectDeflaterx;
