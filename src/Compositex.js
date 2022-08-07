
//---------------------------------------------------------------------
//---------------------------------------------------------------------


"use strict";


class Compositex {

	constructor() {
		this.initialize();
	}

	add(child) {
		var elem;
		elem = this.basicAdd(child);
		this.sizeChanged();
		return elem;
	}

	addAll(coll) {
		coll.zzunwrap().forEach(ea => {
				this.basicAdd(ea)
			});
		this.sizeChanged();
	}

	assertComposite(msg) {
		this.assertComment(() => this.isComposite() || this.isListx(),"Must be a composite");
	}

	at(index) {
		if(!(this.isListx() || this.isComposite()))
			this.error("#at: must be sent to list or composite");
		return this.children().at(index);
	}

	basicAdd(child) {
		return this.childrenContainer().add(this.coerceChild(child));
	}

	children() {
		return this.implementedBySubclass();
	}

	childrenAsModels() {
		return (this.childrenContainer().zzunwrap().map(ea => ea.asModel())).zzwrap();
	}

	childrenContainer() {
		//virtual optional
		return this.children();
	}

	coerceChild(child) {
		//Coerce a child before adding it to self
		//virtual optional
		
		return child;
	}

	find(arg) {
		if(arg.isString())
			return this.findPath(arg);
		return this.children().findFor(ea => arg.value(ea));
	}

	findName(nm) {
		return this.children().findFor(ea => this.objectEquals(ea.name(),nm));
	}

	findPath(arg) {
		var parts, result;
		if(!(arg.includes('.')))
			return this.findName(arg);
		parts = arg.zastr().split($);
		result = this;
		
			parts.zzunwrap().forEach(nm => {
				result = result.find(nm)
			});
		return result;
	}

	first() {
		//Returns first child
		
		return this.at(1);
	}

	initialize() {
		//Manual (top level method)
		//virtual, optional (fyi -- send initialize to super)
	}

	isComposite() {
		//I am type Z, and I have children of type Z
		
		return false;
	}

	isCompositeL() {
		//See comment in #isListx
		
		return this.isListx() || this.isComposite();
	}

	isEmpty() {
		return !this.notEmpty();
	}

	isListx() {
		/* If I am a list, then say I am type Z, 
			then I generally have children of type Y (optionally of type Z) */
		
		return this.isComposite();
	}

	last() {
		//Returns last child
		
		return this.at(this.size());
	}

	notEmpty() {
		return this.size() > 0;
	}

	parentNode() {
		//Applicable if isComposite=true
		
		return this.implementedBySubclass();
	}

	removeAll() {
		this.childrenContainer().removeAll();
		this.sizeChanged();
	}

	size() {
		/* Returns count of number of (direct) children in this composite.
			Does not include [nested] children. */
		
		return this.childrenContainer().size();
	}

	sizeChanged() {
		//virtual optional;
	}
}



Function.prototype.asNameKey = function() { return this.name; }

String.prototype.asNameKey = function() { return this; }

Object.prototype.isString = function() {
	return typeof this == typeof "a";
}

Object.prototype.className = function() {
	return this.constructor.name;
}

Object.prototype.asString = function() {
	return this.toString();
}

Array.prototype.size = function() {
	return this.length;
}

String.prototype.size = function() {
	return this.length;
}

Compositex.prototype.objectEquals = function(a, b) {
	//Manual
	//The purpose of this method is to add support that allows nil args
	if (a === null) return b === null;
	if (a === undefined) return b === undefined;
	return a.equals(b);
}

Object.prototype.equals = function(other) {
	//Manual
	//Optional override
	return this.valueOf() == other.valueOf();
}

String.prototype.paramReplace1 = function(varArgs) {
	//replace %s tags with corresponding args
	var s = this;
	//Note String(o) is a function that converts any object to a String
	for (var each of arguments)
		s = s.replace("%s", String(each));
	return s;
}




exports.Compositex = Compositex;
