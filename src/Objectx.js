const { Compositex } = require('./Compositex');

//---------------------------------------------------------------------
//---------------------------------------------------------------------


"use strict";


class Objectx extends Compositex {

	constructor() {
		super();
	}


	/* -- static methods --

		inflateObject
		newRawColl
		newRawDict
		hasMethod
		toolsBlt
		commonObjectClass
		log
		collClass
		dictClass
		newOc
		newStream
		objectInflaterClass
		objectDeflaterClass
		newDict
		recursiveWrapperClass
		streamClass
		commonClassLibBlt
		newColl
		jsonClass
		mathBlt
	*/

	//----------------------------------
	//Class Variable Support
	
	//Class Variable Accessors
	
	static commonClassLib(arg) {
		if (arg !== undefined) Objectx.CommonClassLib = arg;
		else if (Objectx.CommonClassLib == null)
			Objectx.CommonClassLib = Objectx.commonClassLibBlt();
		return Objectx.CommonClassLib;
	}
	
	static math(arg) {
		if (arg !== undefined) Objectx.Math = arg;
		else if (Objectx.Math == null)
			Objectx.Math = Objectx.mathBlt();
		return Objectx.Math;
	}
	
	static tools(arg) {
		if (arg !== undefined) Objectx.Tools = arg;
		else if (Objectx.Tools == null)
			Objectx.Tools = Objectx.toolsBlt();
		return Objectx.Tools;
	}
	
	//----------------------------------
	

	asDeflatedObject() {
		var object;
		
		//<object> is a deflated object
		object = this.basicAsDeflated();
		
		/* If we are not a dictionary, and deflatable is a dictionary,
			then we assume we are a modeling class, that will need
			to be inflated with stored type */
		if(!this.isDictionaryjs()
		 && object.isDictionaryjs())
			object.atPut(this.constructor.deflatedTypeKey(),this.className());
		
		return object;
	}

	basicAsDeflated() {
		/* Private, virtual
			Virtual, usually overridden
			Return type: BaseClassExtensionjs */
		
		return this.newDict();
	}

	collClass() {
		return this.constructor.collClass();
	}

	equals(other) {
		return this.basicEquals(other);
	}

	equalsEff(other) {
		if(other == null)
			return false;
		return this.objectEquals(this,other);
	}

	hasMethod(selector) {
		//Manual
		return this.constructor.compiledMethodAt(selector) != null;
	}

	inflateFromDic(dic) {
		//virtual optional;
	}

	isObjectx() {
		return true;
	}

	jsonClass() {
		return this.constructor.jsonClass();
	}

	log(s) {
		this.constructor.log(s);
	}

	math() {
		return this.constructor.math();
	}

	newColl() {
		return this.constructor.newColl();
	}

	newDict() {
		return this.constructor.newDict();
	}

	newOc() {
		//Convenience/compatibility method
		
		return this.constructor.newOc();
	}

	newRawColl() {
		return this.constructor.newRawColl();
	}

	newRawDict() {
		return this.constructor.newRawDict();
	}

	newStream(aCollection) {
		return this.constructor.newStream(aCollection);
	}

	streamClass() {
		return this.constructor.streamClass();
	}

	tools() {
		return this.constructor.tools();
	}

	wrapRawDeeply() {
		return this.constructor.recursiveWrapperClass().wrap(this);
	}
	//Class Methods

	static dictClass() {
		return this.commonClassLib().at("Dictionaryx")
	}

	static objectInflaterClass() {
		return this.commonClassLib().at("ObjectInflaterx")
	}

	static objectDeflaterClass() {
		return this.commonClassLib().at("ObjectDeflaterx")
	}

	static commonClassLibBlt() {
		//Js needs method
		return null;
	}

	static newDict() {
		return new this.dictClass()()
	}

	static commonObjectClass() {
		return this.commonClassLib().at("CommonObjectx")
	}

	static toolsBlt() {
		//Js needs method
		return null;
	}

	static newRawColl() {
		return this.tools().newRawColl()
	}

	static mathBlt() {
		//Js needs method
		return null;
	}

	static recursiveWrapperClass() {
		return this.commonClassLib().at("RecursiveWrapperx")
	}

	static newRawDict() {
		return this.tools().newRawDict()
	}

	static collClass() {
		return this.commonClassLib().at("Collectionx")
	}

	static jsonClass() {
		return this.commonClassLib().at("Jsonx")
	}

	static newOc() {
		//Convenience/compatibility method
		
		return this.newColl();
	}

	static hasMethod(methodNm) {
		return this[methodNm] != null;
	}

	static newStream(aCollection) {
		return this.streamClass().on(aCollection)
	}

	static log(o) {
		console.log("" + (o != null ? o.toString() : o));
	}

	static newColl() {
		return this.collClass().on(this.newRawColl())
	}

	static streamClass() {
		return this.commonClassLib().at("Streamx")
	}

	static inflateObject(o) {
		return this.objectInflaterClass().inflate(o)
	}
}
//----------------------------------
//Class Variable Initialization
Objectx.CommonClassLib = null;
Objectx.Math = null;
Objectx.Tools = null;




exports.Objectx = Objectx;
