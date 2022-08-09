const { CommonObjectx } = require('./CommonObjectx');
const { Streamx } = require('./Streamx');
const { Compositex } = require('./Compositex');

//---------------------------------------------------------------------
//---------------------------------------------------------------------


"use strict";


class Stringx extends CommonObjectx {

	constructor() {
		super();
	}

	asBracketedWith(aPair) {
		var pair;
		pair = this.tools().coercePair(aPair);
		return (pair.first().toString() + this.toString()) + pair.last().toString();
	}

	asCollection() {
		var coll;
		coll = this.newColl();
		for (var index=1; index<=this.size(); index++)
		 coll.add(this.at(index));
		return coll;
	}

	asDq() {
		return this.asBracketedWith('"');
	}

	asFloat() {
		return coerceFloat(this.raw());
	}

	asInteger() {
		return coerceInteger(this.raw());
	}

	asLowerCase() {
		//Manual
		return this.zzunwrap().toLowerCase();
	}

	asQuotedWhiteStrings() {
		return this.newStream(this.raw()).parseQuotedWhiteStrings();
	}

	asStream() {
		return Streamx.on(this.raw());
	}

	asString() {
		return this.raw();
	}

	assureLast(last) {
		if(this.endsWith(last))
			return this.toString();
		return this.toString() + last;
	}

	assureNotLastCase(s, caseSensitive) {
		var match;
		match = caseSensitive ? this.endsWith(s) : this.endsWithIgnoreCase(s);
		return match ? this.sliceTo(s.zzwrap().size().negated()) : this.toString();
	}

	assureNotLastIgnoreCase(s) {
		return this.assureNotLastCase(s,false);
	}

	asUpperCase() {
		//Manual
		return this.zzunwrap().toUpperCase();
	}

	asWhitespaceStrings() {
		return this.newStream(this.raw()).parseWhiteStrings();
	}

	at(smalltalkIndex) {
		return this.raw()[this.tools().privateIndexForPublic(smalltalkIndex)];
	}

	basicAsDeflated() {
		return this;
	}

	beginsWith(substring) {
		var other, otherSize, a;
		other = substring.zzwrap();
		//Special case
		if(other.isEmpty())
			return true;
		otherSize = other.size();
		if(!(this.size() >= otherSize))
			return false;
		a = this.copyFromTo(1,otherSize);
		return this.objectEquals(a.zzwrap(),other);
	}

	beginsWithIgnoreCase(substring) {
		return this.beginsWith(substring) || this.asLowerCase().zzwrap().beginsWith(substring.zzwrap().asLowerCase());
	}

	copyFrom(start) {
		return this.copyFromTo(start,this.size());
	}

	copyFromTo(start, stop) {
		//Both inclusive
		
		return this.sliceFromTo(start,stop + 1);
	}

	copyO() {
		return this.constructor.on(this.raw());
	}

	copyTo(stop) {
		return this.copyFromTo(1,stop);
	}

	do(block) {
		for (let each of this.raw().zzunwrap()) {
				block(each);
			};
	}

	endsWith(substring) {
		var other, otherSize, mySize, a;
		other = substring.zzwrap();
		//Special case
		if(other.isEmpty())
			return true;
		otherSize = other.size();
		mySize = this.size();
		if(!(mySize >= otherSize))
			return false;
		a = this.copyFromTo((mySize - otherSize) + 1,mySize);
		return this.objectEquals(a.zzwrap(),other);
	}

	endsWithIgnoreCase(substring) {
		return this.endsWith(substring) || this.asLowerCase().zzwrap().endsWith(substring.zzwrap().asLowerCase());
	}

	equalsIgnoreCase(aString) {
		//Manual
		//base means compare base (no case), e.g. aa=aa, Aa=aa, a~=b
		//also see the localeCompare #numeric option
		return this.zzunwrap().localeCompare(aString.zzunwrap(), undefined, { sensitivity: 'base' }) == 0;
	}

	first() {
		return this.at(1);
	}

	includes(charOrString) {
		return this.indexOf(charOrString.asString()) >= 1;
	}

	indexOf(charOrString) {
		return this.publicIndexForPrivate(this.raw().zastr().indexOf(charOrString));
	}

	initialize() {
		super.initialize();
		this.raw("");
	}

	isAllDigits() {
		//Manual
		return /^\d+$/.test(this.raw());
	}

	isBlank() {
		return this.tools().isWhitespace(this.raw());
	}

	isEmpty() {
		return this.objectEquals(this.size(),0);
	}

	isStringable() {
		//Can we act as a string (are we string-like)?
		
		return true;
	}

	isValidFloat() {
		//Manual
		return /^[+-]?\d+[.]?\d*$/.test(this.raw());
	}

	isValidInteger() {
		//Manual
		return /^[+-]?\d+$/.test(this.raw());
	}

	last() {
		return this.at(this.size());
	}

	notEmpty() {
		return !this.isEmpty();
	}

	occurrencesOf(subString) {
		var strm, count, len;
		strm = this.newStream(this.raw());
		count = 0;
		len = subString.len();
		while(strm.hasNext())
			{if(strm.moveTo(subString))
				count = count + 1;
			strm.skip(len);}
		return count;
	}

	replaceAllWith(s1, s2) {
		//Manual
		return this.raw().replace(new RegExp(s1,"g"), s2);
	}

	replaceFirstWith(s1, s2) {
		//Manual
		return this.raw().replace(s1, s2);
	}

	second() {
		return this.at(2);
	}

	size() {
		return this.raw().length;
	}

	sliceFrom(start) {
		//Note: 'sliceFrom()' is manual extension on String
		
		return this.raw().sliceFrom(this.tools().privateIndexForPublic(start));
	}

	sliceFromTo(start, stop) {
		//start inclusive stop exclusive
		//Note: 'sliceFromTo()' is manual extension on String
		
		return this.raw().sliceFromTo(this.tools().privateIndexForPublic(start),this.tools().privateIndexForPublic(stop));
	}

	sliceTo(start) {
		//Note: 'sliceTo()' is manual extension on String
		
		return this.raw().sliceTo(this.tools().privateIndexForPublic(start));
	}

	toString() {
		return this.raw().toString();
	}

	trim() {
		return this.raw().trim();
	}

	upTo(chOrStr) {
		return this.newStream(this.raw()).upTo(chOrStr);
	}

	withParens() {
		return this.asBracketedWith(this.tools().pairWith("(",")"));
	}
}



String.prototype.sliceFromTo = function(from, to) {
    return this.slice(from, to);
}

String.prototype.sliceFrom = function(from) {
    return this.slice(from);
}

String.prototype.sliceTo = function(to) {
    return this.slice(0, to);
}

String.prototype.withAppended = function(other) {
    return this + other;
}

String.prototype.asInteger = function() {
    return Compositex.helperClass().coerceInteger(this);
}

String.prototype.asFloat = function() {
    return Compositex.helperClass().coerceFloat(this);
}

String.prototype.isBlank = function() {
    return Compositex.stringClass().on(this).isBlank();
}

String.prototype.len = function() {
    //alias convenience -- cannot declare "length()" as "length" is property
    return this.length;
}




exports.Stringx = Stringx;
