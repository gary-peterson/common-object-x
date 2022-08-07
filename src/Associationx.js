const { Objectx } = require('./Objectx');

//---------------------------------------------------------------------
//---------------------------------------------------------------------


"use strict";


class Associationx extends Objectx {

	constructor() {
		super();
		this.fKey = this.fKey ?? null;
		this.fValue = this.fValue ?? null;
	}


	/* -- static methods --

		fromDeflatedMap
		kV
		fromKeyValue
		defT
	*/

	asKey() {
		return this.key();
	}

	basicEquals(other) {
		/* Because an association should
			be unique in a given dictionary,
			i.e. we only compare key here, ignoring value.
			If keys are equal, then we are equal. */
		
		return this.objectEquals(this.key(),other.key());
	}

	copyFromO(other) {
		super.copyFromO(other);
		this.key(other.key().zzwrap().copyO());
		this.value(other.value().zzwrap().copyO());
	}

	first() {
		//comp
		
		return this.key();
	}

	inflateFromDic(dic) {
		super.inflateFromDic(dic);
		this.key(dic.at("key"));
		this.value(this.constructor.inflateObject(dic.at("value")));
	}

	key(aKey) {
		if(aKey !== undefined)
			{this.fKey = aKey}
		else
			{return this.fKey}
	}

	last() {
		//comp
		
		return this.value();
	}

	printDetailsOn(strm) {
		var value;
		strm.show(this.key().asString());
		strm.show(": ");
		value = this.value();
		if(this.tools().isKindOf(value,Objectjs))
			{if(isNotBlank(value))
				strm.cr();
			value.printDetailsOn(strm);}
		else
			{var valueString;
			valueString = value == null ? "null" : value.asString();
			strm.show(valueString);};
	}

	value(aValue) {
		if(aValue !== undefined)
			{this.fValue = aValue}
		else
			{return this.fValue}
	}
	//Class Methods

	static fromDeflatedMap(dmap) {
		return this.fromKeyValue(dmap.at("key"),dmap.at("value"))
	}

	static kV(k,v) {
		return this.fromKeyValue(k,v)
	}

	static fromKeyValue(key,value) {
		var temp1;
		temp1 = new this();
		temp1.key(key);
		temp1.value(value);
		return temp1;
	}

	static defT() {
		return this.fromKeyValue("w",10)
	}
}


exports.Associationx = Associationx;
