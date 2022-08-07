const { CommonObjectx } = require('./CommonObjectx');

//---------------------------------------------------------------------
//---------------------------------------------------------------------


"use strict";


class Collectionx extends CommonObjectx {

	constructor() {
		super();
	}


	/* -- static methods --

		fromRaw
		fromNumsString
		withWith
		fromFormattedNumsString
		intervalFromTo
		fromCompositeNumsString
		fromCompositeFormattedNumsString
		numsSetFrom
		withWithWithWith
		withWithWith
		with
		coerce
		fromRepeat
		fromFreeForm
		fromFreeFormNums
	*/

	add(elem) {
		//Manual
		this.raw().push(elem);
	}

	addBeforeIndex(elem, index) {
		const jsIndex = this.tools().privateIndexForPublic(index);
		//splice (2, 0, 19) is just like --> coll add: 19 beforeIndex: 2
		//splice in "elem" at jsIndex (deletions = 0)
		this.coll().splice(jsIndex, 0, elem);
	}

	addAll(coll) {
		//Manual
		var raw = coll.zzunwrap();
		for (var ea of raw)
			this.add(ea);
	}

	addExt(elemOrColl) {
		if(this.tools().isCollection(elemOrColl))
			this.addAll(elemOrColl)
		else
			this.add(elemOrColl);
	}

	asCsv() {
		//delimited with csv
		
		return this.asDelimitedBracket(",",'"');
	}

	asDelimited(delimiter) {
		return this.asDelimitedBracket(delimiter,null);
	}

	asDelimitedBracket(delimiter, bracket) {
		var collObjects, strDelimiter, strm, sz, delimTrimmed;
		collObjects = this.coll();
		strDelimiter = delimiter.toString();
		strm = this.newStream();
		sz = collObjects.size();
		delimTrimmed = delimiter.zzwrap().trim();
		
			var _unwrappedcoll_ = collObjects.zzunwrap();
			for (var ii=0; ii<_unwrappedcoll_.length; ii++)
			{
				var ea = _unwrappedcoll_[ii];
				var index = this.tools().publicIndexForPrivate(ii);
				{var value;
				value = ea.asString();
				if((bracket != null) && value.zzwrap().includes(delimTrimmed))
				value = value.zzwrap().asBracketedWith(bracket);
				strm.nextPutAll(value);
				if(index < sz)
				strm.show(strDelimiter);}
			}
		return strm.contents();
	}

	asHstring() {
		return this.raw().map(ea => ea.toString()).join(" ");
	}

	asVstring() {
		return this.raw().map(ea => ea.toString()).join("\n");
	}

	at(index) {
		//Manual
		return this.raw()[this.tools().privateIndexForPublic(index)];
	}

	atIfAbsent(smalltalkIndex, block) {
		return this.checkIndex(smalltalkIndex) ? this.at(smalltalkIndex) : block();
	}

	basicAsDeflated() {
		return (self.zzunwrap().map(each => each.zzwrap().asDeflatedObject())).zzwrap();
	}

	checkIndex(index) {
		if(this.isEmpty())
			return false;
		return (index >= 1) && index <= this.size();
	}

	coll() {
		//foo
		return this.raw();
	}

	collect(fct) {
		//Manual
		return this.raw().map(elem => fct.evaluateFor(elem));
	}

	copyO() {
		var copy;
		copy = this.newColl();
		
			this.zzunwrap().forEach(ea => {
				copy.add(ea.copyO())
			});
		return copy;
	}

	doWithIndex(fct) {
		var coll = this.raw();
		for (var index in coll)
			fct(coll[index], index);
	}

	equalsEff(other) {
		if(!(this.objectEquals(this.size(),other.size())))
			return false;
		for (var i=1; i<=this.size(); i++)
		 if(!(this.at(i).zzwrap().equalsEff(other.at(i).zzwrap())))
		return false;
		return true;
	}

	find(block) {
		//compatibility with js
		
		return this.findFor(block);
	}

	findFor(block) {
		var index;
		index = this.indexFor(block);
		return index > 0 ? this.at(index) : null;
	}

	first() {
		return this.at(1);
	}

	firstL() {
		return this.first();
	}

	includes(item) {
		return this.raw().includes(item);
	}

	includesFor(block) {
		return this.findFor(block) != null;
	}

	indexFor(fct) {
		//Manual
		return this.tools().publicIndexForPrivate(this.coll().findIndex(fct));
	}

	indexOf(elem) {
		//Answer public (smalltalk) index. Thx fyt
		
		if(!(this.tools().isKindOf(elem,this.constructor)))
			return this.indexOfPrim(elem);
		
		
			var _unwrappedcoll_ = this.zzunwrap();
			for (var ii=0; ii<_unwrappedcoll_.length; ii++)
			{
				var each = _unwrappedcoll_[ii];
				var index = this.tools().publicIndexForPrivate(ii);
				if(this.objectEquals(elem,each))
				return index
			}
		
		return 0;
	}

	indexOfKey(key) {
		//Answer public (smalltalk) index. Thx fyt
		
		
			var _unwrappedcoll_ = this.zzunwrap();
			for (var ii=0; ii<_unwrappedcoll_.length; ii++)
			{
				var each = _unwrappedcoll_[ii];
				var index = this.tools().publicIndexForPrivate(ii);
				if(this.objectEquals(each.firstL(),key))
				return index
			}
		return 0;
	}

	indexOfObject(elem) {
		//equals by identity
		
		return this.indexFor(each => each === elem);
	}

	indexOfPrim(elem) {
		//Manual
		return this.tools().publicIndexForPrivate(this.raw().indexOf(elem));
	}

	initialize() {
		super.initialize();
		this.raw(this.newRawColl());
	}

	isCollection() {
		return true;
	}

	isCollectionable() {
		//Can we act as a collection?
		
		return true;
	}

	isEmpty() {
		return this.objectEquals(this.size(),0);
	}

	isPairable() {
		return this.objectEquals(this.size(),2);
	}

	join(delimiter) {
		//Note: #join is supported in both st and js
		return this.raw().join(delimiter);
	}

	last() {
		return this.at(this.size());
	}

	lastL() {
		return this.last();
	}

	min() {
		var min;
		if(this.isEmpty())
			this.throw("Cannot find min of empty collection");
		min = this.first();
		if(this.objectEquals(this.size(),1))
			return min;
		
			this.zzunwrap().forEach(ea => {
				if(ea < min)
				min = ea
			});
		return min;
	}

	notEmpty() {
		return !this.isEmpty();
	}

	pairsAsDictionary() {
		var temp1;
		temp1 = this.newDict();
		temp1.addAll(this);
		return temp1;
	}

	reduceWith(binaryFct, initialValue) {
		//Manual
		return this.raw().reduce(binaryFct, initialValue);
	}

	reject(selectFct) {
		return this.select((each) => !selectFct(each));
	}

	remove(elem) {
		var index;
		index = this.indexOf(elem);
		if(index > 0)
			this.removeIndex(index);
	}

	removeAll() {
		this.raw(this.newRawColl());
	}

	removeIndex(index) {
		//Manual
		var jsindex = this.tools().privateIndexForPublic(index);
		//splice() - first param is 0-based index to start remove, 2nd is # of elems to remove
		//With "splice" elements are adderd/removed in-place
		this.raw().splice(jsindex, 1);
	}

	removeKey(key) {
		var index;
		index = this.indexOfKey(key);
		if(index >= 1)
			this.removeIndex(index);
	}

	removeObject(elem) {
		//By identity
		
		var index;
		index = this.indexFor(ea => ea === elem);
		if(index >= 1)
			this.removeIndex(index);
	}

	second() {
		return this.at(2);
	}

	secondL() {
		return this.second();
	}

	select(selectFct) {
		return zzwrap(this.coll().zzunwrap().filter(each => selectFct(each)));
	}

	size() {
		//Manual
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

	sumWith(valueGetter) {
		return this.reduceWith((sum, ea) => sum + valueGetter(ea),0);
	}

	valueAtKey(key) {
		//Assume elements are key-value pairs
		
		var index;
		index = this.indexOfKey(key);
		return index >= 1 ? this.at(index).secondL() : null;
	}
	//Class Methods

	static coerce(arg) {
		if(arg.isCommonObjectx() && arg.isCollectionable())
			return arg;
		return this.tools().isCollection(arg) ? this.on(arg) : this.with(arg);
	}

	static fromNumsString(aString) {
		/* Free Form  Result
		 1    #(1)
		 5-7    #(5, 6, 7) */
		
		var s, dash, coll, strm, left, right;
		s = aString.zzwrap();
		dash = "-";
		coll = this.newColl();
		if(!(s.includes(dash)))
			{coll.add(this.tools().coerceNumber(s));
			return coll;}
		strm = this.newStream(s);
		left = this.tools().coerceNumber(strm.upTo(dash));
		right = this.tools().coerceNumber(strm.rem());
		for (var i=left; i<=right; i++)
		 coll.add(i);
		return coll;
	}

	static fromRaw(coll) {
		var temp1;
		temp1 = new this();
		temp1.addAll(coll);
		return temp1;
	}

	static intervalFromTo(start,stop) {
		var coll;
		coll = this.newColl();
		for (var i=start; i<=stop; i++)
		 coll.add(i);
		return coll;
	}

	static fromRepeat(value,count) {
		var coll;
		coll = this.newObject();
		var timesRepeatCounter = 1;
		while (timesRepeatCounter <= count)
		 {coll.add(value)
		 timesRepeatCounter = timesRepeatCounter + 1;}
		return coll;
	}

	static fromFreeForm(s) {
		/* Free Form  Result
		  1    #(1)
		  2, 5-7, 8   #(2, 5, 6, 7, 8)
		  2-3, 5   #(2, 3, 5)
		  5, 6, 7, 8   #(5, 6, 7, 8) */
		
		var subStrings, coll;
		subStrings = this.newStream(s).parseAllDelimitedBy(",");
		coll = new this();
		
			subStrings.zzunwrap().forEach(sub => {
				coll.add(sub)
			});
		return coll;
	}

	static fromFreeFormNums(s) {
		/* Free Form  Result
		  1    #(1)
		  2, 5-7, 8   #(2, 5, 6, 7, 8)
		  2-3, 5   #(2, 3, 5)
		  5, 6, 7, 8   #(5, 6, 7, 8) */
		
		var subStrings, coll;
		subStrings = this.newStream(s).parseAllDelimitedBy(",");
		coll = new this();
		
			subStrings.zzunwrap().forEach(sub => {
				coll.addAll(this.fromFormattedNumsString(sub))
			});
		return coll;
	}

	static withWith(a,b) {
		var temp1;
		temp1 = new this();
		temp1.add(a);
		temp1.add(b);
		return temp1;
	}

	static fromFormattedNumsString(aString) {
		/* Free Form  Result
		 1    #(1)
		 5-7    #(5, 6, 7) */
		
		var s, dash, coll, strm, left, right;
		s = aString.zzwrap();
		dash = "-";
		coll = this.newColl();
		if(!(s.includes(dash)))
			{coll.add(this.tools().coerceNumber(s));
			return coll;}
		strm = this.newStream(s);
		left = this.tools().coerceNumber(strm.upTo(dash));
		right = this.tools().coerceNumber(strm.rem());
		for (var i=left; i<=right; i++)
		 coll.add(i);
		return coll;
	}

	static withWithWithWith(a,b,c,d) {
		var temp1;
		temp1 = new this();
		temp1.add(a);
		temp1.add(b);
		temp1.add(c);
		temp1.add(d);
		return temp1;
	}

	static with(a) {
		var temp1;
		temp1 = new this();
		temp1.add(a);
		return temp1;
	}

	static fromCompositeFormattedNumsString(s) {
		/* Free Form  Result
		  1    #(1)
		  2, 5-7, 8   #(2, 5, 6, 7, 8)
		  2-3, 5   #(2, 3, 5)
		  5, 6, 7, 8   #(5, 6, 7, 8) */
		
		var subStrings, coll;
		subStrings = this.newStream(s).parseAllDelimitedBy(",");
		coll = new this();
		
			subStrings.zzunwrap().forEach(sub => {
				coll.addAll(this.fromFormattedNumsString(sub))
			});
		return coll;
	}

	static fromCompositeNumsString(s) {
		/* Free Form  Result
		  1    #(1)
		  2, 5-7, 8   #(2, 5, 6, 7, 8)
		  2-3, 5   #(2, 3, 5)
		  5, 6, 7, 8   #(5, 6, 7, 8) */
		
		var subStrings, coll;
		subStrings = this.newStream(s).parseAllDelimitedBy(",");
		coll = new this();
		
			subStrings.zzunwrap().forEach(sub => {
				coll.addAll(this.self().fromNumsString(sub))
			});
		return coll;
	}

	static numsSetFrom(aString) {
		/* Free Form  Result
		 1    #(1)
		 5-7    #(5, 6, 7) */
		
		var s, dash, coll, strm, left, right;
		s = aString.zzwrap();
		dash = "-";
		coll = this.newColl();
		if(!(s.includes(dash)))
			{coll.add(this.tools().coerceNumber(s));
			return coll;}
		strm = this.newStream(s);
		left = this.tools().coerceNumber(strm.upTo(dash));
		right = this.tools().coerceNumber(strm.rem());
		for (var i=left; i<=right; i++)
		 coll.add(i);
		return coll;
	}

	static withWithWith(a,b,c) {
		var temp1;
		temp1 = new this();
		temp1.add(a);
		temp1.add(b);
		temp1.add(c);
		return temp1;
	}
}



Collectionx.prototype.includesEff = function(substring) {
    return this.includes(substring);
}

Array.prototype.sliceFromTo = function(from, to) {
    return this.slice(from, to);
}

Array.prototype.sliceFrom = function(from) {
    return this.slice(from);
}

Array.prototype.sliceTo = function(to) {
    return this.slice(0, to);
}

Array.prototype.isEmpty = function() { return this.length == 0; }

Array.prototype.notEmpty = function() { return !this.isEmpty(); }

Array.prototype.isPairable = function() { return this.length == 2; }

Array.prototype.firstL = function() { return this[0]; }

Array.prototype.secondL = function() { return this[1]; }

Array.prototype.lastL = function() { return this[this.length - 1]; }






exports.Collectionx = Collectionx;
