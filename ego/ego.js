/*jslint plusplus: false, nomen: false, laxbreak: true, regexp: false*/
/*global document: false, console: false, localStorage: false*/
 
"use strict";

var ego = (function (global, doc, ego) {

	var objString = Object.prototype.toString,

		FN = "function",
		JSON_TEST = '{"a":true}',
		NON_HOST_TYPES = { "boolean": 1, "number": 1, "string": 1, "undefined": 1 },
		isHostType = function (obj, property) {
	        var type = typeof obj[property];
	        return type === "object" ? !!obj[property] : !NON_HOST_TYPES[type];
		},
		testElem = doc && isHostType(doc, "createElement") && doc.createElement("DiV"),
		hasCache = {},

		cfg = {};

	/**
	 * Tests if the argument is an function.
	 * @param {*} A value to test.
	 * @return {boolean} Returns true if the argument is a function.
	 */
	function isFunction(it) {
		return objString.call(it) === "[object Function]";
	}

	/**
	 * Tests if the argument is an object. Will return true for null and arrays.
	 * @param {*} A value to test.
	 * @return {boolean} Returns true if argument is an object, null, or an array.
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

	function hash() {
		// TODO: alphabetize hasCache keys, then build string. If value is a test function, run it.
		var i, s = "";
		for (i in hasCache) {
		}
		// TODO: once we have our string, md5 it
		return s;
	}

	/**
	 * Removes all child nodes for a given element.
	 * @param {Element} The DOM node to remove all children.
	 * @return {Element} The original DOM node.
	 */
	function clearElement(el) {
		if (el) {
			while (el.lastChild) {
				el.removeChild(el.lastChild);
			}
		}
		return el;
	}

	// add and run DOM tests
	has.add("dom", function (g, d, el) {
		return d && el && isHostType(d, "documentElement") &&
			isHostType(el, "style") && isHostType(el, "appendChild") &&
			isHostType(el, "insertBefore") && isHostType(el, "getAttribute") &&
			isHostType(el, "setAttribute") && isHostType(el, "removeAttribute") &&
			isHostType(el, "getElementsByTagName");
	}, true);

	// add and run JSON tests
	has.add("json-parse", function (g) {
		var parsed,
			supported = false;
		if ("JSON" in g && typeof JSON.parse === FN) {
			parsed = JSON.parse(JSON_TEST);
			supported = !!(parsed && parsed.a);
		}
		return supported;
	}, true);
	
	has.add("json-stringify", function (g) {
		return ("JSON" in g) && typeof JSON.stringify === FN && JSON.stringify({a: true}) === JSON_TEST;
	}, true);

	has.add("native-localstorage", function (g) {
		var supported = false;
		try {
			supported = ("localStorage" in g) && ("setItem" in localStorage);
		} catch (e) {}
		return supported;
	}, true);

	// if we have local storage, see if feature detection has been cached
	if (has("native-localstorage") && has("json-parse") && localStorage.hasCache) {
		try {
			hasCache = JSON.parse(localStorage.hasCache);
		} catch (e) {}
	}

	/**
	 * Returns a module. It will load the module if it isn't already loaded.
	 *
	 * require("some/module");
	 *
	 * require("some/other/module", function(){
	 *     console.debug("some other module loaded");
	 * });
	 */
	function require(deps, callback, contextName, relModuleName) {
	}

	/**
	 * Defines a module.
	 */
	function define(name, deps, callback, contextName) {
	}

	ego.has = has;
	ego.clearElement = clearElement;
	ego.require = require;
	ego.define = define;

	// TODO: load and run feature detection tests. Allow cfg.hasTests to override defaults.
	/*
	if (cfg.hasTests) {
		require(Array.isArray(cfg.hasTests) ? cfg.hasTests : [ "list", "of", "default", "test", "modules" ], function () {
			localStorage.hasCache = has.hash();
		});
	}
	*/

	return ego;

}((function () {
	return this;
}()), document, ego));