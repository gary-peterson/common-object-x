const { Compositex } = require('./Compositex');
const { Dictionaryx } = require('./Dictionaryx');

//---------------------------------------------------------------------
//---------------------------------------------------------------------


"use strict";


class ClassLibx extends Compositex {

	constructor() {
		super();
		this.fdictClasses = this.fdictClasses ?? null;
	}

	add(aClass) {
		this.classes().atPut(aClass.asNameKey(),aClass);
	}

	addAll(classes) {
		classes.zzunwrap().forEach(ea => {
				this.add(ea)
			});
	}

	at(classNm) {
		return this.classes().at(classNm);
	}

	classes(adictClasses) {
		if(adictClasses !== undefined)
			{this.fdictClasses = adictClasses}
		else
			{return this.fdictClasses}
	}

	initialize() {
		super.initialize();
		this.classes(new Dictionaryx());
	}

	remove(aClass) {
		return this.classes().removeKey(aClass.name());
	}
}


exports.ClassLibx = ClassLibx;
