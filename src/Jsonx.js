const { Objectx } = require('./Objectx');
const { Dictionaryx } = require('./Dictionaryx');

//---------------------------------------------------------------------
//---------------------------------------------------------------------


"use strict";


class Jsonx extends Objectx {

	constructor() {
		super();
		this.fObject = this.fObject ?? null;
		this.fStrm = this.fStrm ?? null;
	}


	/* -- static methods --

		fromString
		nullValueString
		on
		fromObject
		defT
		coerceDict
		listDelims
		coerceDeflatedString
		convertDictToString
	*/

	asString() {
		return this.strm().asString();
	}

	atPut(key, value) {
		//Assumes our object is a dic
		this.object().atPut(key,value);
		this.strm(null);
	}

	basicDeflate() {
		var object;
		
		object = this.object();
		
		if(object.isCollectionStrictly())
			return this.deflateCollection(object);
		
		if(object.isDictionary())
			return this.deflateDict(object);
		
		return this.deflateValue(object);
	}

	basicDeflateDict() {
		//Object to json string
		
		var strm, index;
		strm = this.newStream("");
		this.strm(strm);
		strm.show("{");
		index = 1;
		
			this.object().associationPairs().zzunwrap().forEach(pair => {
				var deflatedPair;
				deflatedPair = this.deflatePair(pair);
				if(index > 1)
				strm.show(", ");
				strm.show(deflatedPair);
				index = index + 1;
			});
		strm.show("}");
		strm.reset();
		return strm;
	}

	basicInflate() {
		var strm;
		strm = this.strm();
		if(this.objectEquals(strm.peek(),'{'))
			return this.inflateDict();
		if(this.objectEquals(strm.peek(),'['))
			{strm.skip();
			return this.inflateCollection();}
		return this.parseValue();
	}

	deflate() {
		/* Deflate object into json string
		 We have the object. We'll DEFLATE it. */
		
		this.strm(this.tools().streamClass().coerce(this.basicDeflate()) );
	}



	deflateDict(aDict) {
		var strm, index, dict;
		strm = this.newStream("");
		this.strm(strm);
		strm.show("{");
		index = 1;
		dict = Dictionaryx.coerce(aDict);
		
			dict.associationPairs().zzunwrap().forEach(pair => {
				var deflatedPair;
				deflatedPair = this.deflatePair(pair);
				if(index > 1)
				strm.show(", ");
				strm.show(deflatedPair);
				index = index + 1;
			});
		strm.show("}");
		strm.reset();
		return strm.asString();
	}

	deflatePair(pair) {
		/* ''w'': 10 */
		
		var key, value;
		key = pair.first().zzwrap().asDq();
		value = this.deflateValue(pair.last());
		return (key + ": ") + value.asString();
	}

	deflateValue(aValue) {
		/* 10
			10.5
			''Hello There''
			True,
			[10, 10.5, ''Hello There'', True, False] */
		
		var value;
		
		//1) #gpToDo add support for parsing list value
		//2) #gpToDo add support for parsing a nested dict value
		
		if(aValue == null)
			return "null";
		value = aValue.zzunwrap();
		
		//json coding -- <null>
		if(aValue == null)
			return "null";
		
		if(isNumber(value))
			return value.asString();
		
		if(value.isString())
			return value.zzwrap().asDq();
		
		if(value.isBoolean())
			return value ? "true" : "false";
		
		if(value.isCollectionStrictly())
			return this.deflateCollection(value);
		
		if(value.isDictionary())
			return this.deflateDict(value);
		
		this.throwError("deflateValue: value");
	}

	inflate() {
		/* Inflate json string into object
		 We have the stream. We'll INFLATE it. */
		
		this.object(this.basicInflate());
	}

	inflateCollection() {
		/* Inflate (next) collection
		
		  deflated:
		
		   [10, 10.5, ''Hello There'', true, false] */
		
		var zzstrm, coll, comma, rightCloser;
		zzstrm = this.strm();
		zzstrm.sw();
		coll = this.newOc();
		comma = ',';
		rightCloser = ']';
		if(zzstrm.nextEquals(rightCloser))
			{zzstrm.skip();
			return coll;}
		
		while(!(zzstrm.atEnd()))
			{var value;
			value = this.parseValue();
			coll.add(value);
			zzstrm.sw();
			if(zzstrm.nextEquals(rightCloser))
				{zzstrm.skip();
				return coll;}
			if(zzstrm.nextEquals(comma))
				zzstrm.skip();}
		return coll;
	}

	inflateDict() {
		var dictionary, comma, strm;
		
		dictionary = this.newDict();
		comma = ',';
		strm = this.strm();
		if(strm.nextEquals('{'))
			strm.skip();
		strm.sw();
		while(!(this.objectEquals(strm.peek(),'}')))
			{var pair;
			pair = this.parsePair();
			dictionary.add(pair);
			strm.sw();
			if(strm.nextEquals(comma))
				strm.skip();}
		if(this.objectEquals(strm.peek(),'}'))
			strm.skip();
		return dictionary;
	}

	newStream() {
		return new BabyStream();
	}

	object(aObject) {
		if(aObject !== undefined)
			{this.fObject = aObject}
		else
			{if((this.fObject == null) && this.fStrm != null)
		this.inflate();
	return this.fObject;}
	}

	objectWrapped() {
		return this.object().zzwrap().wrapRawDeeply();
	}

	parseKey() {
		/* ''w'': 10, */
		
		var strm;
		strm = this.strm();
		strm.sw();
		strm.next();
		//skip over dq
		return strm.upTo('"');
	}

	parsePair() {
		/* ''w'': 10,
			terminator may be
				,
				]
				}
			If comma, pass it.
			Otherwise stop at it. */
		
		var key, value;
		key = this.parseKey();
		//Skip over colon
		var temp1;
		temp1 = this.strm();
		temp1.upTo(':');
		temp1.sw();
		value = this.parseValue();
		return this.tools().pairWith(key,value);
	}

	parseValue() {
		/* 10
			10.5
			''Hello There''
			True,
			[10, 10.5, ''Hello There'', True, False] */
		
		//1) #gpToDo add support for parsing list value
		//2) #gpToDo add support for parsing a nested dict value
		
		var strm, dq, delims, string, num, s1, s2;
		
		strm = this.strm();
		strm.sw();
		
		//String
		dq = '"';
		if(this.objectEquals(strm.peek(),dq))
			{strm.skip();
			return strm.upTo(dq);}
		
		//Boolean
		strm.sw();
		if(strm.nextEquals("true"))
			{strm.skip(4);
			return true;}
		if(strm.nextEquals("false"))
			{strm.skip(5);
			return false;}
		
		//List
		if(strm.nextEquals('['))
			{var result;
			strm.skip();
			result = this.inflateCollection();
			return result;}
		
		//Dictionary
		if(strm.nextEquals('{'))
			{strm.skip();
			return this.inflateDict();}
		
		delims = this.constructor.listDelims();
		string = strm.upToAnyStopping(delims);
		
		//nil
		if(this.objectEquals(string,this.constructor.nullValueString()))
			return null;
		
		//Number
		return this.tools().coerceNumber(string);
	}

	strm(aStrm) {
		if(aStrm !== undefined)
			{this.fStrm = aStrm}
		else
			{//The json string (i.e. deflated object)
	if((this.fStrm == null) && this.fObject != null)
		this.deflate();
	return this.fStrm;}
	}
	//Class Methods

	static listDelims() {
		//list (elem) delimiters (candidates)
		
		var temp1;
		temp1 = this.tools().collClass();
		temp1.with(",");
		temp1.with(']');
		return temp1.with('}');
	}

	static coerceDeflatedString(stringOrObject) {
		/* Param 'stringOrObject' may be json string (ready as-is), 
			or object to be deflated.
			If string, assume json and just return, else deflate */
		return stringOrObject.isString() ? stringOrObject : this.tools().deflateAsJson(stringOrObject.zzwrap());
	}

	static on(arg) {
		/* Python does now allow #from as method name due to it being
			reserved word, so we use #on
		
			arg type can be any of:
				Json
				String
				Prim (dictionary, array, etc) */
		
		if(arg.zzunwrap().isString())
			return this.fromString(arg);
		if(this.tools().isKindOf(arg,this))
			return arg;
		return this.fromObject(arg);
	}

	static nullValueString() {
		return "null"
	}

	static defT() {
		/* |json obj1 string obj2|
			json := Jsonx defT.
			obj1 := json object.
			string := json asString.
			obj2 := (Jsonx on: string) object.
			obj2 @= obj1.
		
			Or (make sure Python simulation is on) and do:
				obj2 := string zzwrap inflateJson. */
		
		var d;
		d = this.newDict();
		d.atPut("w",10);
		d.atPut("h",2);
		d.atPut("a",20);
		d.atPut("p",24);
		return this.on(d);
	}

	static coerceDict(stringOrDict) {
		/* arg may be:
				- object (the inflated object; e.g. say a dict).
				- string (deflated json) */
		
		var dictionary;
		if(this.tools().isKindOf(stringOrDict,Jsonx))
			return stringOrDict.objectWrapped();
		dictionary = stringOrDict.zzunwrap().isString() ? stringOrDict.zzwrap().inflateAsJson().objectWrapped() : stringOrDict;
		dictionary = Dictionaryx.coerce(dictionary);
		dictionary.wrapRawDeeply();
		return dictionary;
	}

	static fromObject(aObject) {
		var object;
		object = aObject.zzwrap();
		object.wrapRawDeeply();
		var temp1;
		temp1 = new this();
		temp1.object(object);
		return temp1;
	}

	static convertDictToString(dic) {
		return this.fromObject(dic.zzunwrapDeeply()).asString()
	}

	static fromString(jsonString) {
		var temp1;
		temp1 = new this();
		temp1.strm(this.newStream(jsonString.asString()) );
		return temp1;
	}
}


exports.Jsonx = Jsonx;
