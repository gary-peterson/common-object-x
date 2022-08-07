const { Objectx } = require('./Objectx');
const { ObjectDeflaterx } = require('./ObjectDeflaterx');

//---------------------------------------------------------------------
//---------------------------------------------------------------------


"use strict";


class ObjectInflaterx extends Objectx {

	constructor() {
		super();
		this.sObject = this.sObject ?? null;
		this.fResult = this.fResult ?? null;
	}


	/* -- static methods --

		fromObject
		inflate
		zinflateRecursivelyOLD
	*/

	go() {
		this.inflate();
	}

	inflate() {
		var o;
		o = this.object();
		this.result(o.isStringable() ? this.inflateString() : this.inflateDictionary());
	}

	inflateCollection(wrapped) {
		return (wrapped.zzunwrap().map(each => this.constructor.inflate(each))).zzwrap();
	}

	inflateDictionary(dict) {
		var key, className, errorTemplate, objectClass, obj;
		
		key = ObjectDeflaterx.typeKey();
		
		//If we don't have a type key, were a basic dictionary (we're not a deflation)
		if(!(dict.includesKey(key)))
			return this.constructor.inflate(dict);
		
		//Okay, we have type key, instantiate object, inflate it, return it
		className = dict.at(key);
		
		errorTemplate = "ERROR. Could not find class -- %s -- check %s";
		objectClass = Objectx.commonClassLib().at("Collectionx");
		
		if(objectClass == null)
			this.throw(errorTemplate.paramReplace1(className, "class lib loading"));
		
		obj = new objectClass();
		if(obj == null)
			this.throw("ERROR. Could not instantiate object -- %s".paramReplace1(className));
		obj.inflateFromDic(dict);
		return obj;
	}

	inflateJsonResult(result) {
		//<result> is a jsonResultObject
		
		var wrapped;
		if(result == null)
			return result;
		wrapped = result.zzwrap();
		if(wrapped.isCollectionable())
			return this.inflateCollection(wrapped);
		if(wrapped.isDictionaryable())
			return this.inflateDictionary(wrapped);
		return result.zzwrap();
	}

	inflateString() {
		return this.inflateJsonResult(this.jsonClass().fromString(this.object()).objectWrapped());
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
	//Class Methods

	static zinflateRecursivelyOLD(o) {
		if(this.tools().isPrim(o.zzunwrap()))
			return o.zzwrap();
		return this.inflate(o);
	}

	static fromObject(object) {
		return this.newInit(model => model.object(object.zzwrap()))
	}

	static inflate(o) {
		var temp1;
		temp1 = this.fromObject(o);
		temp1.inflate();
		return temp1.result();
	}
}


exports.ObjectInflaterx = ObjectInflaterx;
