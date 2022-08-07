const { Associationx } = require('./Associationx');
const { ClassLibx } = require('./ClassLibx');
const { Collectionx } = require('./Collectionx');
const { CommonObjectx } = require('./CommonObjectx');
const { Dictionaryx } = require('./Dictionaryx');
const { Jsonx } = require('./Jsonx');
const { Mathx } = require('./Mathx');
const { Numberx } = require('./Numberx');
const { ObjectAdapterx } = require('./ObjectAdapterx');
const { Objectx } = require('./Objectx');
const { Pointx } = require('./Pointx');
const { Pseudox } = require('./Pseudox');
const { RecursiveWrapperx } = require('./RecursiveWrapperx');
const { Streamx } = require('./Streamx');
const { Stringx } = require('./Stringx');
const { Toolsx } = require('./Toolsx');
const { Vectorx } = require('./Vectorx');
const { WrapperFactoryx } = require('./WrapperFactoryx');

//---------------------------------------------------------------------
//---------------------------------------------------------------------


"use strict";


class SysInitializerx {

	constructor() {
		this.initialize();
	}


	/* -- static methods --

		init
		initForSmalltalk
	*/

	//Class Methods

	static init() {
		var classLib;
		
		//Tools is needed early
		Objectx.tools(Toolsx.current());
		
		this.initForSmalltalk();
		
		WrapperFactoryx.loadCode();
		classLib = new ClassLibx();
		
		classLib.add(CommonObjectx);
		classLib.add(Collectionx);
		classLib.add(Dictionaryx);
		classLib.add(Numberx);
		classLib.add(ObjectAdapterx);
		classLib.add(Stringx);
		classLib.add(Jsonx);
		classLib.add(Pointx);
		classLib.add(Pseudox);
		classLib.add(Vectorx);
		classLib.add(Associationx);
		classLib.add(Streamx);
		classLib.add(RecursiveWrapperx);
		Toolsx.commonClassLib(classLib);
		Objectx.commonClassLib(classLib);
		Objectx.math(Mathx);
	}

	static initForSmalltalk() {
		//Manual
		//nop in js
	}
}


exports.SysInitializerx = SysInitializerx;
