const { Objectx } = require('./Objectx');
const { Eventx } = require('./Eventx');

//---------------------------------------------------------------------
//---------------------------------------------------------------------


"use strict";


class EventManagerx extends Objectx {

	constructor() {
		super();
	}

	eventTargetx() {
		//default - may override
		return this.owner();
	}

	handleEventx(event) {
		//Virtual optional
		
		/* TODO -- 
				1) Add EventData class
				2) Add #continue ivar (boolean) to the class */
		//We assume continue = true
		
		return this.triggerEventx(event);
	}

	hasEventTarget() {
		return this.eventTargetx() != null;
	}

	triggerEventx(arg) {
		//Arg is event or event key
		
		return this.eventTargetx().handleEventx(arg.isString() ? Eventx.fromKey(arg) : arg);
	}

	triggerEventxWith(key, arrayable) {
		//Convenience method
		
		if(!(this.hasEventTarget()))
			return null;
		return this.triggerEventx(Eventx.fromKeyWith(key,arrayable));
	}
}


exports.EventManagerx = EventManagerx;
