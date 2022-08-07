const { Objectx } = require('./Objectx');

//---------------------------------------------------------------------
//---------------------------------------------------------------------


"use strict";


class Streamx extends Objectx {

	constructor() {
		super();
		this.fcharsBuffer = this.fcharsBuffer ?? null;
		this.fintPos = this.fintPos ?? null;
	}


	/* -- static methods --

		dq
		isWhitespace
		coerceBracketPair
		coerce
		conformCopyToLastIndex
		on
		sq
		from
	*/

	asLines() {
		var lines;
		this.reset();
		lines = this.newColl();
		while(this.hasNext())
			lines.add(this.nl());
		return lines;
	}

	asNonBlankLines() {
		var lines;
		this.reset();
		lines = this.newColl();
		while(this.hasNext())
			{var line;
			line = this.nl();
			if(!(isBlank(line.zzwrap())))
				lines.add(line);}
		return lines;
	}

	asString() {
		return this.contents();
	}

	at(aPos) {
		return this.prAt(this.conformForBuffer(aPos));
	}

	atDq() {
		return this.hasNext() && this.objectEquals(this.peek(),this.constructor.dq());
	}

	atEnd() {
		return !this.hasNext();
	}

	atQuote() {
		return this.atSq() || this.atDq();
	}

	atSafely(aPos) {
		//ans char at aPos, or null character
		
		if(this.isEmpty() || aPos < 0 || aPos > this.lastPos())
			return null;
		return this.at(aPos);
	}

	atSq() {
		return this.hasNext() && this.objectEquals(this.peek(),this.constructor.sq());
	}

	atWhitespace() {
		return this.hasNext() ? this.constructor.isWhitespace(this.peek()) : false;
	}

	basicParseArgs(modifierFct) {
		/* NOTE WELL -- 
				The modifierFct is used only for unquoted values.
				Quoted values are assumed to be strings
					
			multiply(a, b)
				=> [a, b]
		
			Assume our contents is after the opening paren
			e.g.
				(10, 'bobby kindro', true, 8)
				=> [10, 'bobby kindro', true, 8] */
		
		var closer, delims, args;
		(closer = ")");
		delims = this.tools().pairWith(",",closer);
		args = this.newColl();
		this.sw();
		while(this.hasNext())
			{var next;
			next = null;
			if(this.atQuote())
				{next = this.nsq();
				this.upToAny(delims);}
			else
				{next = this.upToAny(delims);
				if(modifierFct != null)
					next = modifierFct.evaluateFor(next);}
			args.add(next);
			if(this.objectEquals(this.peekAtOffset(- 1).toString(),closer))
				return args;
			this.sw();}
		return args;
	}

	basicShow(obj) {
		this.buffer(this.buffer().withAppended(obj));
		this.setToEnd();
	}

	buffer(acharsBuffer) {
		if(acharsBuffer !== undefined)
			{this.fcharsBuffer = acharsBuffer}
		else
			{return this.fcharsBuffer}
	}

	collectForWith(evaluable, arg) {
		//NOTE -- we do not collect nil values
		
		var coll;
		coll = this.newColl();
		while(this.hasNext())
			{var result;
			result = evaluable.evaluateForWith(this,arg);
			if(result != null)
				coll.add(result);}
		
		return coll;
	}

	conformForBuffer(streamIndex) {
		/* streamIndex is 0-based
			js buffer is 0-based
			st buffer is 1-based,
			So adjust st */
		
		return this.tools().isSmalltalk() ? streamIndex + 1 : streamIndex;
	}

	contents() {
		return this.copyFromTo(0,this.size() - 1);
	}

	copyFromTo(i1, i2) {
		//index is pre-conformed
		return this.buffer().slice(this.conformForBuffer(i1), this.conformForBuffer(i2) + 1);
	}

	cr() {
		this.show(this.tools().endLineString());
	}

	extractBracketedBy(arg) {
		//arg may be string or pair
		
		var pair, newStrm, prev, left, right;
		pair = this.constructor.coerceBracketPair(arg);
		newStrm = this.newStream("");
		prev = 0;
		left = pair.at(1);
		right = pair.at(2);
		while(!(this.atEnd()))
			{var matchPos;
			this.moveTo(left);
			newStrm.show(this.copyFromTo(prev,this.pos() - 1));
			if(this.atEnd())
				return newStrm;
			matchPos = this.pos();
			this.skip(left.size());
			this.moveTo(right);
			//If no right found
			if(this.atEnd())
				{newStrm.show(this.copyFromTo(matchPos,this.pos() - 1));
				return newStrm;}
			//Right is found
			this.skip(right.size());
			prev = this.pos();}
		return newStrm.zzwrap();
	}

	hasNext() {
		return this.pos() < this.size();
	}

	initialize() {
		super.initialize();
		this.buffer("");
		this.pos(0);
	}

	isEmpty() {
		return this.objectEquals(this.size(),0);
	}

	lastPos() {
		//zero indexed, the last position we have a char (will be -1 for empty case)
		
		return this.size() - 1;
	}

	matchPosOf(strToken) {
		//If not found, we answer end (lastPos+1)
		
		var hold, pos;
		hold = this.pos();
		this.moveTo(strToken);
		pos = this.pos();
		this.pos(hold);
		return pos;
	}

	moveTo(chOrString) {
		//move to char, ans true if found, false if not found and pos set to end
		
		var substring;
		substring = chOrString.toString();
		while(this.hasNext())
			{if(this.nextEquals(substring))
				return true;
			this.skip(1);}
		return false;
	}

	moveToAny(collDelims) {
		/* If found, pos is at match and return matching delim
			else return nil */
		
		while(this.hasNext())
			{
				collDelims.zzunwrap().forEach(delim => {
					if(this.nextEquals(delim.toString()))
					return delim
				});
			this.skip(1);}
		return null;
	}

	moveToWhitespaceOrAny(collDelims) {
		/* If found, pos is at match and return matching delim
			else return nil */
		
		while(this.hasNext())
			{if(this.atWhitespace())
				return "";
			
				collDelims.zzunwrap().forEach(delim => {
					if(this.nextEquals(delim.toString()))
					return delim
				});
			this.skip(1);}
		return null;
	}

	next(count) {
		if(count !== undefined)
			{var p1, p2, s;
	p1 = this.pos();
	p2 = (p1 + count) - 1;
	s = this.copyFromTo(p1,p2);
	this.pos(p2 + 1);
	return s;}
		else
			{var ans;

	ans = this.peek();
	this.skip(1);
	return ans;}
	}

	nextEquals(aSubstring) {
		var substring, remaining, hold;
		substring = aSubstring.toString().zzwrap();
		remaining = this.remaining();
		if(!(remaining >= substring.size()))
			return false;
		//Let's see if we have a match
		hold = this.pos();
		
			substring.zzunwrap().forEach(ch => {
				if(!(this.objectEquals(this.next(),ch)))
				{this.pos(hold);
				return false;}
			});
		this.pos(hold);
		return true;
	}

	nextLine() {
		/* ans next line,
			look for cr-lf, or lf, post-pos is beyond lf */
		
		var line;
		line = this.upTo(this.tools().lf());
		line = line.zzwrap();
		if(this.objectEquals(line.size(),0))
			return line;
		if(this.objectEquals(line.last(),this.tools().cr()))
			line = line.sliceTo(- 1);
		return line.zzunwrap();
	}

	nextPutAll(obj) {
		this.basicShow(obj);
	}

	nl() {
		return this.nextLine();
	}

	ns() {
		/* ns is abbrev for next whitespace stream
			final pos is one beyond end of string */
		
		var p1, p2;
		this.skipWhite();
		p1 = this.pos();
		this.skipToWhite();
		p2 = this.pos() - 1;
		return this.copyFromTo(p1,p2);
	}

	nsAll() {
		var coll;
		coll = this.newColl();
		while(!(this.atEnd()))
			{coll.add(this.ns());
			this.sw();}
		return coll;
	}

	nsq() {
		//nextQuotedOrWhiteString
		
		//TODO -- CHECK IN SMALLTALK
		
		var bracket;
		this.sw();
		if(!(this.atQuote()))
			return this.ns();
		bracket = this.peek();
		this.skip(1);
		return this.upTo(bracket);
	}

	nsqDelim(aDelims) {
		/* next string that is any of:
				quoted (checked first)
				or whitespace string or delimited (whichever is found first) */
		
		//TODO -- CHECK IN SMALLTALK
		
		var delims, bracket, value, match;
		this.sw();
		delims = aDelims.asCollectionSafely().zzwrap();
		if(!(this.atQuote()))
			{value = this.upToWhitespaceOrAny(delims);
			this.sw();
			match = delims.findFor(delim => this.nextEquals(delim));
			if(match != null)
				{this.skip(match.toString().size());
				this.sw();}
			return value;}
		bracket = this.peek();
		this.skip(1);
		value = this.upTo(bracket);
		//Now skip delim after trailing quote (if present)
		this.sw();
		match = delims.findFor(delim => this.nextEquals(delim));
		if(match != null)
			this.skip(match.toString().size());
		return value;
	}

	parseAllCsv() {
		var coll;
		coll = this.newColl();
		while(this.hasNext())
			{coll.add(this.parseNextCsv());
			this.sw();}
		return coll;
	}

	parseAllDelimitedBy(delim) {
		var coll;
		
		//Tabs/crs should be parsed strictly (spaces loosely)
		if(this.objectEquals(delim.asString()," "))
			return this.nsAll();
		coll = this.newColl();
		while(this.hasNext())
			{var str;
			str = this.upTo(delim);
			str = str.trim();
			coll.add(str);
			this.sw();}
		return coll;
	}

	parseArgs() {
		return this.basicParseArgs(null);
	}

	parseKeyValuePairs() {
		/* a=10 b=20
		
			NOTE: values may be quoted */
		
		var result, eq;
		result = this.newColl();
		eq = "=";
		this.sw();
		while(this.hasNext())
			{var key, value;
			key = this.upTo(eq);
			value = this.nsq();
			result.add(this.collClass().withWith(key,value));
			this.sw();}
		return result;
	}

	parseNextCsv() {
		var dq;
		this.skipWhite();
		dq = "\"";
		if(this.nextEquals(dq))
			{var str;
			this.skip(dq.size());
			str = this.upTo(dq);
			this.upTo(",");
			return str;}
		return this.upTo(",").zzwrap().trim();
	}

	parseQuotedWhiteStrings() {
		/* each value is whitespace string, or quoted
			10 20 'me foo' 30 40
		
			(Streamx on: '10 20 ''me foo'' 30 40')
				parseQuotedWhiteValues
					zzunwrap
						vs. */
		
		var result;
		result = this.newColl();
		this.sw();
		while(this.hasNext())
			{result.add(this.nsq());
			this.sw();}
		return result;
	}

	parseTypedArgs() {
		return this.basicParseArgs(value => this.tools().coercePrimTypeFromString(value));
	}

	parseWhiteStrings() {
		/* each value is whitespace string, or quoted
			10 20 'me foo' 30 40
		
			(Streamx on: '10 20 ''me foo'' 30 40')
				parseQuotedWhiteValues
					zzunwrap
						vs. */
		
		var result;
		result = this.newColl();
		this.sw();
		while(this.hasNext())
			{result.add(this.ns());
			this.sw();}
		return result;
	}

	peek() {
		return this.atSafely(this.pos());
	}

	peekAtOffset(offset) {
		return this.at(this.pos() + offset);
	}

	pos(aintPos) {
		if(aintPos !== undefined)
			{this.fintPos = aintPos}
		else
			{return this.fintPos}
	}

	posSafely(pos) {
		//set position, if out-of-bounds, set to start or end
		
		if(pos < 0)
			this.reset()
		else
			{if(pos > this.lastPos())
				this.setToEnd()
			else
				this.pos(pos)};
	}

	prAt(index) {
		//index is pre-conformed
		return this.buffer()[index];
	}

	rem() {
		return this.next(this.remaining());
	}

	remaining() {
		return this.size() - this.pos();
	}

	reset() {
		this.pos(0);
	}

	setToEnd() {
		//also see 'reset'
		
		this.pos(this.lastPos() + 1);
	}

	show(obj) {
		this.basicShow(obj);
	}

	showl(str) {
		this.showLine(str);
	}

	showLine(strMe) {
		this.show(strMe);
		this.cr();
	}

	size() {
		return this.buffer().size();
	}

	skip(arg) {
		//Manual needed to allow method overloading -- #skip() and skip(by)
		var by = (arg != null) ? arg : 1;
		this.pos(this.pos() + by);
	}

	skipToWhite() {
		//skip past whitespace, ans true if non-whitespace found
		
		while(this.hasNext())
			{if(this.atWhitespace())
				return true;
			this.skip(1);}
		return false;
	}

	skipWhite() {
		//skip past whitespace, ans true if non-whitespace found
		
		while(this.hasNext())
			{if(!(this.atWhitespace()))
				return true;
			this.skip(1);}
		return false;
	}

	sw() {
		return this.skipWhite();
	}

	toString() {
		return this.contents();
	}

	upTo(searchString) {
		/* ans from current pos up to but not incuding <char>.
			Pos beyond <char>. */
		var s, p1, match;
		s = this.buffer();
		p1 = this.pos();
		match = s.indexOf(searchString, p1);
		if (match == -1) {
			this.setToEnd();
			return s.substring(p1);
		}
		this.pos(match + searchString.length);
		return s.substring(p1, match);
	}

	upToPass(s, passMatch) {
		/* ans from current pos up to but not incuding <char>.
			Pos beyond <char>. */
		
		//Manual
		var p1, p2;
		p1 = this.pos();
		p2 = null;
		if(this.moveTo(s))
			{p2 = this.pos() - 1;
			if(passMatch)
				this.skip(s.asString().size());}
		else
			{p2 = this.lastPos();
			this.setToEnd();}
		return this.copyFromTo(p1,p2);
	}

	upToAny(collDelims) {
		/* Ans from current pos up to but not incuding match.
			Pos beyond match. If not found ans remaining and set to end of stream */
		
		var p1, matchingDelim, p2;
		p1 = this.pos();
		matchingDelim = this.moveToAny(collDelims);
		p2 = this.pos() - 1;
		if(matchingDelim != null)
			this.skip(matchingDelim.asString().size());
		return this.copyFromTo(p1,p2);
	}

	upToAnyStopping(delims) {
		/* Ans string up to closest match.
			Stop at match (i.e. to NOT move past match like we do for #upTo). */
		
		var p1, hold, matchPositions, min;
		
		p1 = this.pos();
		hold = this.pos();
		matchPositions = zzwrap(zzunwrap(delims).map(ea => this.matchPosOf(ea)));
		min = matchPositions.min();
		this.pos(min);
		return this.copyFromTo(p1,this.pos() - 1);
	}

	upToSticking(searchKey) {
		//Like #upTo except my position is at match, rather than beyond it
		
		return this.upToPass(searchKey,false);
	}

	upToWhitespaceOrAny(collDelims) {
		/* Ans from current pos up to but not including match.
			Pos beyond match. If not found ans remaining and set to end of stream */
		
		var p1, matchingDelim, p2;
		p1 = this.pos();
		matchingDelim = this.moveToWhitespaceOrAny(collDelims);
		p2 = this.pos() - 1;
		//Note: Empty matchingDelim indicates whitespace match
		if(matchingDelim != null)
			{if(matchingDelim.zzwrap().isEmpty())
				this.sw()
			else
				this.skip(matchingDelim.asString().size())}
		return this.copyFromTo(p1,p2);
	}
	//Class Methods

	static conformCopyToLastIndex(lastIndex) {
		/* Smalltalk copies to lastIndex because index2 is INCLUDED
			Js must be (lastIndex+1) because that index is EXCLUDED */
		
		return this.tools().isSmalltalk() ? lastIndex : lastIndex + 1;
	}

	static sq() {
		//Manual
		return "'";
	}

	static from(buffer) {
		var temp1;
		temp1 = new this();
		temp1.buffer(buffer);
		return temp1;
	}

	static coerce(arg) {
		return this.tools().isKindOf(arg,Streamjs) ? arg : this.on(arg)
	}

	static on(buffer) {
		return this.from(buffer)
	}

	static coerceBracketPair(arg) {
		return arg.isString() ? this.collClass().withWith(arg,arg) : arg
	}

	static dq() {
		//Manual
		return '"';
	}

	static isWhitespace(strChar) {
		//Manual
		return (new RegExp(/^\s*$/)).test(strChar);
	}
}


exports.Streamx = Streamx;
