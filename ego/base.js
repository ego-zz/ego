/*jslint plusplus: false, eqeqeq: false, white: false, laxbreak: true */
/*global window: false, console: false, document: false, navigator: false, setTimeout: false, traceDeps: true, clearInterval: false, self: false, setInterval: false, importScripts: false */

require.def("ego", ["require"], function(require) {

	// define ego
	// define console
	// do config

	require([
		"lang",
		"array",
		"declare",
		"event",
		"deferred",
		"json"
		//dojo.requireIf(dojo.isBrowser, "dojo._base.browser");
	]);

});