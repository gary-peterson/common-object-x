const { Objectx } = require('./Objectx');

//---------------------------------------------------------------------
//---------------------------------------------------------------------


"use strict";


class Pseudox extends Objectx {

	constructor() {
		super();
		this.fboolAbsorb = this.fboolAbsorb ?? null;
		this.fmapValues = this.fmapValues ?? null;
	}


	/* -- static methods --

		fromAbsorb
	*/

	absorb(aboolAbsorb) {
		if(aboolAbsorb !== undefined)
			{this.fboolAbsorb = aboolAbsorb}
		else
			{return this.fboolAbsorb}
	}

	basicDoesNotUnderstand(message) {
		return this.absorb() ? null : super.doesNotUnderstand(message);
	}

	doesNotUnderstand(message) {
		//overridden to set/get value when message appears to be attempted set/get
		
		var colon, key, argsExpected, args, getter;
		
		colon = ':';
		key = message.selector().asString();
		argsExpected = key.occurrencesOf(colon);
		if(key.isEmpty() || argsExpected > 1)
			return this.basicDoesNotUnderstand(message);
		
		args = message.args();
		getter = key;
		if(this.objectEquals(getter.last(),colon))
			getter = getter.copyFromTo(1,getter.size() - 1);
		
		//getter case
		if(this.objectEquals(argsExpected,0))
			return this.handleGet(message);
		
		//setter case
		if(this.objectEquals(argsExpected,1))
			return this.handleSetValue(message,args.first());
		
		//should not get here (exception case handled above)
		return this.basicDoesNotUnderstand(message);
	}

	handleGet(message) {
		//If we have associated value, ans it (even if nil)
		
		var selector;
		selector = message.selector().asSymbol();
		if(!(this.values().includesKey(selector)))
			return super.doesNotUnderstand(message);
		return this.values().at(selector);
	}

	handleSetValue(message, value) {
		this.values().atPut(message.selector().zastr().assureNotLast(':').asSymbol(),value);
	}

	initialize() {
		super.initialize();
		this.absorb(false);
		this.values(this.newDict());
	}

	values(amapValues) {
		if(amapValues !== undefined)
			{this.fmapValues = amapValues}
		else
			{return this.fmapValues}
	}
	//Class Methods

	static fromAbsorb(absorb) {
		var temp1;
		temp1 = new this();
		temp1.absorb(absorb);
		return temp1;
	}
}


exports.Pseudox = Pseudox;
