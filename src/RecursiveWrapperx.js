const { Objectx } = require('./Objectx');
const { Dictionaryx } = require('./Dictionaryx');

//---------------------------------------------------------------------
//---------------------------------------------------------------------


"use strict";


class RecursiveWrapperx extends Objectx {

	constructor() {
		super();
		this.sRoot = this.sRoot ?? null;
		this.fResult = this.fResult ?? null;
	}


	/* -- static methods --

		wrap
		assureWrapped
		fromObject
		fromRoot
	*/

	basicWrapDeeply() {
		var obj;
		obj = this.root().zzwrap();
		if(isCollection(obj))
			return this.wrapCollection();
		if(obj.isDictionary())
			return this.wrapDictionary();
		return obj.zzwrap();
	}

	go() {
		this.wrapDeeply();
	}

	result(aResult) {
		if(aResult !== undefined)
			{this.fResult = aResult}
		else
			{return this.fResult}
	}

	root(aRoot) {
		if(aRoot !== undefined)
			{this.sRoot = aRoot}
		else
			{return this.sRoot}
	}

	wrapCollection() {
		var thisObj = this;
		function innerFunction1107(each)
		{
			var wrapped;
			wrapped = thisObj.constructor.assureWrapped(each);
			if(wrapped != null)
			wrapped.wrapRawDeeply();
			return wrapped;
		}
		var coll, newColl;
		coll = this.root();
		newColl = coll.zzunwrap().map(each => innerFunction1107(each)).zzwrap()
		
		coll.removeAll();
		coll.addAll(newColl);
		return coll;
	}

	wrapDeeply() {
		/* Say we received a json object from a client,
			we want to wrap the coll's and dict's...
		
			Because JavaScript dictionaries do not know
			they are dictionaries, we have to make an assumption
			here, that they are dicts, if none of the other basic types */
		
		this.result(this.basicWrapDeeply());
	}

	wrapDictionary() {
		var root;
		root = this.root();
		
			root.zzwrap().associations().zzunwrap().forEach(each => {
				var wrapped;
				wrapped = this.constructor.assureWrapped(each.value());
				if(wrapped != null)
				wrapped.wrapRawDeeply();
				root.atPut(each.key(),wrapped);
			});
		return root;
	}
	//Class Methods

	static wrap(o) {
		var temp1;
		temp1 = this.fromObject(o);
		temp1.go();
		return temp1.result();
	}

	static assureWrapped(object) {
		/* Say we received a json object from a client,
			we want to wrap the coll's and dict's with our wrappers */
		
		if(object.isCommonObjectx())
			return object;
		if(this.tools().isCollection(object))
			return object.zzwrap();
		if(this.tools().isDictionary(object))
			return Dictionaryx.coerce(object);
		return object;
	}

	static fromObject(object) {
		//Convenience method
		
		return this.fromRoot(object);
	}

	static fromRoot(root) {
		return this.newInit(model => model.root(root))
	}
}


exports.RecursiveWrapperx = RecursiveWrapperx;
