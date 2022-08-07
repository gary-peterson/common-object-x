const { EventManagerx } = require('./EventManagerx');

//---------------------------------------------------------------------
//---------------------------------------------------------------------


"use strict";


class Messagex extends EventManagerx {

	constructor() {
		super();
		this.sTarget = this.sTarget ?? null;
		this.ssymSelector = this.ssymSelector ?? null;
		this.scollArgs = this.scollArgs ?? null;
	}


	/* -- static methods --

		fromTargetSelectorArgs
		fromTargetSelector
	*/

	args(acollArgs) {
		if(acollArgs !== undefined)
			{this.scollArgs = acollArgs}
		else
			{return this.scollArgs}
	}

	performWith(dynamicArgs) {
		/* If dynamic args will be size 2, then the specified
			args should also be size 2. The specified elements 
			may be nil. */
		
		var specifiedArgs, args;
		specifiedArgs = this.args();
		args = dynamicArgs.nbv() ? dynamicArgs.copyTo(specifiedArgs.size()) : specifiedArgs;
		this.target().performWithArguments(this.selector().asSymbol(),args);
	}

	selector(asymSelector) {
		if(asymSelector !== undefined)
			{this.ssymSelector = asymSelector}
		else
			{return this.ssymSelector}
	}

	target(aTarget) {
		if(aTarget !== undefined)
			{this.sTarget = aTarget}
		else
			{return this.sTarget}
	}
	//Class Methods

	static fromTargetSelectorArgs(target,selector,args) {
		return this.newInit((model) => {model.target(target);
			model.selector(selector);
			model.args(args);})
	}

	static fromTargetSelector(target,selector) {
		return this.fromTargetSelectorArgs(target,selector,this.collClass().on([ ]))
	}
}


exports.Messagex = Messagex;
