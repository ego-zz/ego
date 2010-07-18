/*jslint plusplus: false, laxbreak: true */
/*global window: false, document: false, navigator: false, setTimeout: false, traceDeps: true, clearInterval: false, self: false, setInterval: false, importScripts: false */
 
"use strict";

var require;

var egover = [1,0,0];
/*
(function (cfg) {
	var ostring = Object.prototype.toString,
		script = document.getElementsByTagName('script')[0],
		jsExtRegex = /\.js$/,
		defaultContext = '_',
		currentContext = defaultContext,
		contexts = {};

	function isFunction(it) {
		return ostring.call(it) === "[object Function]";
	}

	if (typeof require !== "undefined") {
		if (isFunction(require)) {
			return;
		}
		cfg = require;
	}

	/*
	require("my.module");
	require(["module1", "module2"]);
	require("my.module", function(){});
	require("my.module", "contextname");
	require("my.module", function(){}, "contextname");
	* /
	function req(moduleName, callback, contextName) {
		if (moduleName === "exports" || moduleName === "module") {
			throw new Error("require of " + moduleName + " is not allowed.");
		}

		if (!isFunction(callback)) {
			contextName = contextName || callback;
			callback = null;
		}

		contextName = contextName || currentContext;

		if (typeof moduleName === "object") {
			for (var i = 0, l = moduleName.length; i < l; i++) {
				req(moduleName[i], contextName);
			}
			if (callback) {
				callback();
			}
		} else {
			var module = contexts[contextName].defined[moduleName];
			if (module !== undefined) {
				return module;
			}
			console.debug("Module " + moduleName + " not loaded... loading!");
		}
	}

	req.version = [0, 1, 0, "$trunk$"];

	req.isFunction = isFunction;

	req.def = function (moduleName, deps, callback, contextName) {
		// define the module!
		return req;
	};

	req.nameToUrl = function (moduleName, ext) {
		var p = moduleName.indexOf(':'),
			c = moduleName.charAt(0),
			loc, syms, i, url;

		if (p !== -1) {
			loc = (cfg.locations || {})[moduleName.substring(0, p)];
			if (loc) {
				moduleName = moduleName.substring(p + 1);
			}
		}

		if ((p !== -1 && !loc) || c === '/' || c === '.' || jsExtRegex.test(moduleName)) {
			return moduleName; //Just a plain path, not module name lookup, so just return it.
		}

		syms = moduleName.split('/');
		i = syms.length;

		/* do we need this?
		while (i--) {
			parentModule = syms.slice(0, i).join('/');
			if (paths[parentModule]) {
				syms.splice(0, i, paths[parentModule]);
				break;
			}
		}
		* /

		if (loc) {
			if (loc.charAt(loc.length - 1) === '/') {
				loc = loc.substring(0, loc.length - 1);
			}
			syms.unshift(loc);
		}

		url = syms.join('/') + (ext || ".js");
		return (url.charAt(0) === '/' || url.indexOf(':') !== -1 ? "" : cfg.baseUrl || "") + url;
	};
	
	req.load = function (moduleName) {
		var url = req.nameToUrl(moduleName);
		req.attach(url);
	};

	req.attach = function (url) {
		var n = document.createElement("script");
		n.type = "text/javascript";
		n.async = true;
		n.src = url;
		return script.parentNode.insertBefore(n, script);
	};

	if (cfg) {
		req(cfg.deps);
	}
	
	require = req;
}({
	deps: [ "ego", "shibby", "test" ],
	locations: {
		ego: "http://modules.ego-project.com/"
	}
}));*/