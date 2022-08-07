const { Objectx } = require('./Objectx');

//---------------------------------------------------------------------
//---------------------------------------------------------------------


"use strict";


class Eventx extends Objectx {

	constructor() {
		super();
		this.fsymKey = this.fsymKey ?? null;
		this.fcollArgs = this.fcollArgs ?? null;
		this.fFirstArg = this.fFirstArg ?? null;
		this.fsymSource = this.fsymSource ?? null;
	}


	/* -- static methods --

		fromKeyWith
		fromKey
	*/

	args(acollArgs) {
		if(acollArgs !== undefined)
			{this.fcollArgs = acollArgs}
		else
			{return this.fcollArgs}
	}

	firstArg(aFirstArg) {
		if(aFirstArg !== undefined)
			{this.fFirstArg = aFirstArg}
		else
			{return this.fFirstArg}
	}

	hasKey(aKey) {
		if(aKey.isCollectionStrictly())
			{aKey.zzunwrap().forEach(key => {
					if(this.hasKey(key))
					return true
				});
			return false;}
		return this.objectEquals(this.key(),aKey);
	}

	key(asymKey) {
		if(asymKey !== undefined)
			{this.fsymKey = asymKey}
		else
			{return this.fsymKey}
	}

	setFirstArg() {
		this.firstArg(this.args().firstOrNil());
	}

	source(asymSource) {
		if(asymSource !== undefined)
			{this.fsymSource = asymSource}
		else
			{return this.fsymSource}
	}
	//Class Methods

	static fromKeyWith(key,argOrArgs) {
		//argOrArgs may also be nil, resulting in #()
		
		return this.newInit((model) => {model.key(key.asSymbol());
			model.args(argOrArgs.asCollectionSafely());
			model.setFirstArg();});
	}

	static fromKey(key) {
		return this.fromKeyWith(key,this.collClass().on([ ]))
	}
}


exports.Eventx = Eventx;
