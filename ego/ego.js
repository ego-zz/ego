/*jslint plusplus: false, nomen: false, laxbreak: true, regexp: false*/
/*global document: false, console: false*/
 
"use strict";

var ego = (function (global, doc, ego) {

	var objString = Object.prototype.toString,

		NON_HOST_TYPES = { "boolean": 1, "number": 1, "string": 1, "undefined": 1 },
		isHostType = function (obj, property) {
	        var type = typeof obj[property];
	        return type === "object" ? !!obj[property] : !NON_HOST_TYPES[type];
		},
		testElem = doc && isHostType(doc, "createElement") && doc.createElement("DiV"),
		hasCache = { "shibby": "hi" },

		cfg = {};

	/**
	 * Tests if the argument is an function.
	 * @param {*} A value to test.
	 * @return {boolean}
	 */
	function isFunction(it) {
		return objString.call(it) === "[object Function]";
	}

	/**
	 * Tests if the argument is an object. Will return true for null and arrays.
	 * @param {*} A value to test.
	 * @return {boolean}
	 */
	function isObject(it) {
		return typeof it === "object";
	}

	// define the Array.isArray() ES5 standard function.
	if (!Array.isArray) {
		Array.isArray = function (o) {
			return objString.call(o) === "[object Array]";
		};
	}

	// check if ego is a config object
	if (ego && isObject(ego) && !Array.isArray(ego)) {
		cfg = ego;
	}

	// define the main ego object
	ego = {
		version: [0, 1, 0, "$trunk$"],
		config: cfg,
		isFunction: isFunction,
		isObject: isObject,
		isHostType: isHostType
	};

	/**
	 * Returns true or false for whether or not a specific browser feature is supported.
	 * @param {string} The name of the feature to test.
	 * @return {boolean}
	 */
	function has(name) {
		if (isFunction(hasCache[name])) {
			hasCache[name] = hasCache[name](global, doc, testElem);
		}
		return hasCache[name];
	}

	/**
	 * Adds a feature detection test function.
	 * @param {string} The name of the feature to test.
	 * @param {function(Window, Document, Element): boolean} A test function to
	 *     register. If a function, queued for testing until actually needed. The
	 *     test function should return a boolean indicating the presence of a
	 *     feature or bug.
	 * @param {boolean=} Omit if `test` is not a function. Provides a way to
	 *     immediately run the test and cache the result.
	 */
	function add(name, test, now) {
		hasCache[name] = now ? test(global, doc, testElem) : test;
	}
	has.add = add;

	// TODO: check if there's local storage and if the tests have been cached

	/**
	 * Returns a module. It will load the module if it isn't already loaded.
	 */
	function require() {
	}

	/**
	 * Defines a module.
	 */
	function define() {
	}

	ego.has = has;
	ego.require = require;
	ego.define = define;

	return ego;

}((function () {
	return this;
}()), document, ego));