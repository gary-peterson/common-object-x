const { CommonObjectx } = require('./CommonObjectx');

//---------------------------------------------------------------------
//---------------------------------------------------------------------


"use strict";


class Dictionaryx extends CommonObjectx {

	constructor() {
		super();
	}


	/* -- static methods --

		coerce
		testKeys
		fromString
	*/

	add(pair) {
		this.atPut(pair.firstL(),pair.secondL());
	}

	addAll(otherBabyColl) {
		for (var i=1; i<=otherBabyColl.size(); i++)
		 this.add(otherBabyColl.at(i));
	}

	associationPairs() {
		return (this.keys().zzunwrap().map(key => this.collClass().withWith(key,this.at(key)))).zzwrap();
	}

	associations() {
		return (this.associationPairs().zzunwrap().map(pair => this.tools().keyValue(pair.first(),pair.last()))).zzwrap();
	}

	asVstring() {
		return (this.associationPairs().zzunwrap().map(ea => (ea.firstL().toString() + " -> ") + ea.lastL().toString().zzwrap().sliceTo(20))).zzwrap()
		.asVstring();
	}

	at(key) {
		//Manual
		//To parallel smalltalk:
		//    explicitly return null (not undefined) for key not found.
		//    In js, emptyDic[key] returns undefined (we want null)
		if (!this.hasKey(key))
			return null;
		return this.raw()[key];
	}

	atIfAbsent(key, block) {
		if(this.includesKey(key))
			return this.at(key);
		return this.tools().evaluateBlock(block);
	}

	atPut(key, value) {
		//Manual
		this.raw()[key] = value;
	}

	atAsFloat(key) {
		return this.math().coerceFloat(this.at(key));
	}

	atAsInt(key) {
		return this.math().coerceInteger(this.at(key));
	}

	atSafely(key) {
		return this.at(key);
	}

	basicAsDeflated() {
		//basic dict deflation
		
		var newDict, tools;
		newDict = this.newDict();
		tools = this.tools();
		
			this.keys().zzunwrap().forEach(key => {
				var value;
				value = this.at(key);
				value = tools.isPrim(value) ? value : value.zzwrap().asDeflatedObject();
				newDict.atPut(key,value);
			});
		return newDict;
	}

	copyO() {
		var copy;
		copy = this.newDict();
		
			this.associationPairs().zzunwrap().forEach(kv => {
				copy.atPut(kv.first().copyO(),kv.second().copyO())
			});
		return copy;
	}

	hasKey(key) {
		//Manual
		return this.includesKey(key);
	}

	includesKey(key) {
		//Manual
		return this.raw().hasOwnProperty(key);
	}

	initialize() {
		super.initialize();
		this.raw(this.newRawDict());
	}

	isDictionary() {
		return true;
	}

	isDictionaryable() {
		//Can we act as a dictionary?
		
		return true;
	}

	isTrue(key) {
		return this.constructor.objectEquals(this.at(key),true);
	}

	keys() {
		//Manual
		return this.collClass().from(Object.keys(this.raw()));
	}

	raw(aRaw) {
		return super.raw(aRaw);
	}

	removeKey(key) {
		//Returns true is key is deleted, or false if key does not exist
		//Manual
		return this.raw().delete(key);
	}
	//Class Methods

	static fromString(str) {
		/* Format:
		  w=10 h=2 label='Fun Rec' name=Rec
		
		 Notice optional quoting */
		
		var dict;
		
		//Manual
		dict = new this();
		
			this.streamClass().from(str).parseKeyValuePairs().zzunwrap().forEach(pair => {
				dict.atPut(pair.first(),pair.last())
			});
		return dict;
	}

	static coerce(obj) {
		return this.tools().isKindOf(obj,this) ? obj : this.on(obj)
	}

	static testKeys() {
		return this.collClass().on([ "test_1" , "test_fromString" , "test_associationPairs" ])
	}
}


exports.Dictionaryx = Dictionaryx;
