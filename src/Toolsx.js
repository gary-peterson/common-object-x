const { Compositex } = require('./Compositex');
const { Pointx } = require('./Pointx');
const { Streamx } = require('./Streamx');

//---------------------------------------------------------------------
//---------------------------------------------------------------------


"use strict";


class Toolsx extends Compositex {

	constructor() {
		super();
	}


	/* -- static methods --

		currentBlt
	*/

	//----------------------------------
	//Class Variable Support
	
	//Class Variable Accessors
	
	static current(arg) {
		if (arg !== undefined) Toolsx.Current = arg;
		else if (Toolsx.Current == null)
			Toolsx.Current = Toolsx.currentBlt();
		return Toolsx.Current;
	}
	
	static commonClassLib(arg) {
		if (arg !== undefined) Toolsx.CommonClassLib = arg;
		else if (Toolsx.CommonClassLib == null)
			Toolsx.CommonClassLib = Toolsx.commonClassLibBlt();
		return Toolsx.CommonClassLib;
	}
	
	//----------------------------------
	

	canBeDictionary(obj) {
		//Manual
		return obj.zzunwrap().isDictionary();
	}

	classFromObject(cl) {
		return cl.constructor;
	}

	classFromString(nm) {
		this.throw("classFromString -- FACTORY NEEDED");
	}

	classNameOfClass(cl) {
		if (this.isString(cl)) return cl;
		return cl.name;
	}

	classNameOfObject(cl) {
		return this.classNameOfClass(object.constructor);
	}

	coerceBoolean(value) {
		var str, first, trues;
		if(this.isBoolean(value))
			return value;
		if(this.isNumber(value))
			return this.objectEquals(value,1);
		str = value.toString().zzwrap().asLowerCase();
		if(str.isEmpty())
			return false;
		first = str.zzwrap().first();
		if(this.objectEquals(first,"t") || this.objectEquals(first,"y"))
			return true;
		trues = this.collClass().on([ "true" , "yes" , "1" ]).zzwrap();
		
			trues.zzunwrap().forEach(ea => {
				if(this.objectEquals(ea,str))
				return true
			});
		return false;
	}

	coerceClass(arg) {
		if(arg == null)
			return null;
		if(this.isClass(arg))
			return arg;
		if(this.isString(arg))
			return this.classFromString(arg);
		//Assume object instance
		return this.classFromObject(arg);
	}

	coerceFloat(o) {
		return parseFloat(o);
	}

	coerceInstance(obj) {
		if(obj.isString())
			return this.throw("String not supported for \"coerceInstance\"");
		return this.isClass(obj) ? new obj() : obj;
	}

	coerceInteger(o) {
		return parseInt(o);
	}

	coercePair(o) {
		return isCollection(o) && this.objectEquals(o.zzwrap().size(),2) ? o : this.pairWith(o,o);
	}

	coercePrimTypeFromString(s) {
		//Boolean/Float/Integer
		
		if(this.objectEquals(s,"null"))
			return null;
		if(this.pairWith("true","false").includes(s))
			return this.coerceBoolean(s);
		if(s.zzwrap().isValidInteger())
			return this.coerceInteger(s);
		return this.coerceFloat(s);
	}

	collClass() {
		//foo
		return this.commonClassLib().at("Collectionx");
	}

	commonClassLib() {
		return this.constructor.commonClassLib();
	}

	cr() {
		//Manual
		return "\r";
	}

	dictClass() {
		return this.commonClassLib().at("Dictionaryx");
	}

	endLineString() {
		//Manual
		return "\n";
	}

	evaluateBlock(block) {
		//Manual
		//block is a jscript fct
		return block();
	}

	getMethodFor(methodNm, o) {
		//Manual
		//js only
		var fctTarget, fct;
		fctTarget = (o != null) ? o : window;
		fct = fctTarget[methodNm];
		return fct;
	}

	hasWhitespace(str) {
		//Manual
		//Note for space or tab only use e.g. /[ \t]/.test(str)
		return /\s/.test(str);
	}

	isKindOf(o, classOrNm) {
		//Manual
		var aClass = this.coerceClass(classOrNm);
		return o instanceof aClass;
	}

	isBlank(aObject) {
		/* Blanks:
					#()
					''
					nil */
		var object;
		object = aObject.zzunwrap();
		if(object == null)
			return true;
		if(this.isString(object))
			return this.isWhitespace(object);
		if(this.isCollection(object))
			return this.objectEquals(aObject.zzwrap().size(),0);
		return false;
	}

	isBoolean(o) {
		//Manual
		if (o == null) return false;
		return typeof o.zzunwrap() == typeof true
	}

	isClass(o) {
		//Manual
		//limitation here -- if arg is a function, we would also ans true
		return o instanceof Function;			
	}

	isCollection(o) {
		//Manual
		if (o == null) return false;
		return o.zzunwrap() instanceof Array;
	}

	isDictionary(o) {
		//Manual
		//gpTry - we can do best estimate in js
		if (this.isNil(o)) return false;
		var raw = o.zzunwrap();
		return raw.constructor == Object;
	}

	isMethodDefinedFor(methodNm, o) {
		//Manual
		return o[methodNm] !== undefined;
	}

	isNil(o) {
		//Manual
		//return true if nil or undefined
		//Double equal coerces null to undefined and vice-versa
		if(o) return false;
		else return o == null;
	}

	isNumber(o) {
		//Manual
		//int and float both ans identical type in js, but we hit both here to be sure
		if (o == null) return false;
		return (typeof o == typeof 1) || (typeof o == typeof 1.5);
	}

	isSmalltalk() {
		//Manual
		return false;
	}

	isSpace(string) {
		//Manual
		return this.objectEquals(string.asString()," ");
	}

	isString(o) {
		//Manual
		if (o == null) return false;
		return typeof o.zzunwrap() == typeof "a"
	}

	isUndefined(o) {
		//Manual
		//Strictly undefined (in js)
		return o === undefined;
	}

	isWhitespace(str) {
		//Manual
		/* ^ -- match beginning of line
		\s* -- match zero to many whitespace chars
		$ -- match end of line */
		return (new RegExp(/^\s*$/)).test(str);
	}

	lf() {
		//Manual
		return "\n";
	}

	newColl() {
		return this.collClass().on(this.newRawColl());
	}

	newDict() {
		return this.dictClass().on(this.newRawDict());
	}

	newline() {
		//Manual
		return "\n";
	}

	newRawColl() {
		return [];
	}

	newRawDict() {
		return {};
	}

	objectUnderstands(o, selector) {
		return o[selector] != null;
	}

	openTextWindowOnHappy(text, happy) {
		//Manual -- TODO -- use "happy" in js, e.g. in Div etc.
		console.log(text);
	}

	pairWith(a, b) {
		return this.collClass().withWith(a,b);
	}

	pointClass() {
		return Pointx;
	}

	privateIndexForPublic(smalltalkIndex) {
		/* Given public <smalltalkIndex>, return private <javaScriptIndex>
			So:
				st object = 1 based (no change)
				js object = 0 based (-1) */
		
		if(smalltalkIndex <= 0)
			return smalltalkIndex;
		return this.isSmalltalk() ? smalltalkIndex : smalltalkIndex - 1;
	}

	processFunctionCall(line) {
		/* line format is like:
				foo(10, 'foo', 25); */
		
		var strm, fctName, args;
		strm = this.newStream(line);
		fctName = strm.upTo("(");
		args = strm.parseTypedArgs();
		return this.runFunctionNamedWithArguments(fctName,args.zzunwrap());
	}

	publicIndexForPrivate(privateIndex) {
		/* Given private <javaScriptIndex>, return public <smalltalkIndex>
		
			Answer the public index.
		
			privateIndex is the index of our wrapped object
		
				st is 1 based
				js is 0 based
		
			We want to answer public
		
				e.g. 1 based
			
			So:
				st -> privateIndex + 0
				js -> privateIndex + 1 */
		
		if(privateIndex < 0)
			return privateIndex;
		return this.isSmalltalk() ? privateIndex : privateIndex + 1;
	}

	runFunctionNamedWithArguments(fctName,args) {
		//Manual
		//js only
		//spread function "..." expands arg array into proper individual args
		window[fctName](...args);
	}

	streamClass() {
		return Streamx;
	}

	throw(err) {
		throw err;
	}

	xY(x, y) {
		return this.pointClass().xY(x,y);
	}
	//Class Methods

	static currentBlt() {
		return new this()
	}
}
//----------------------------------
//Class Variable Initialization
Toolsx.Current = null;
Toolsx.CommonClassLib = null;




Number.prototype.isNumber = function(o) { return isNumber(o); }

function coerceFloat(o) {
	return Toolsx.current().coerceFloat(o);
}

function coerceInteger(o) {
	return Toolsx.current().coerceInteger(o);
}

function isString(o) {
	return Toolsx.current().isString(o);
}

function isNumber(o) {
	return Toolsx.current().isNumber(o);
}

function isCollection(o) {
	return Toolsx.current().isCollection(o);
}

function isBlank(o) {
	return Toolsx.current().isBlank(o);
}

function isBlankValue(o) {
	return isBlank(o);
}

function notBlankValue(o) {
	return !isBlankValue(o);
}

function isNotBlank(o) {
	return !isBlank(o);
}




exports.Toolsx = Toolsx;
