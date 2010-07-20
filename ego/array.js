/*jslint plusplus: false, eqeqeq: false, white: false, laxbreak: true, bitwise: false */
/*global window: false, console: false, document: false, navigator: false, setTimeout: false, traceDeps: true, clearInterval: false, self: false, setInterval: false, importScripts: false, require: false */

require.def("ego/array", ["ego"], function(ego){

	var ap = Array.prototype;

	function def(name, fn) {
		ego[name] = name in ap ? function(arr, callback, thisObj){
			return ap[name].call(arr, callback, thisObj);
		} : fn;
	}

	function getParts(arr, obj, cb){
		return [arr, obj || ego.global, cb];
	}

	function everyOrSome(every, arr, callback, thisObject){
		var p = getParts(arr, thisObject, callback),
			i = 0,
			l = p[0].length,
			result;
		arr = p[0];
		for(; i<l; ++i){
			result = !!p[2].call(p[1], arr[i], i, arr);
			if(every ^ result){
				return result;
			}
		}
		return every;
	}

	def("indexOf", function(array, value, fromIndex, findLast){
		var step = 1,
			end = array.length || 0,
			i = 0;
		if(findLast){
			i = end - 1;
			step = end = -1;
		}
		if(fromIndex !== undefined){ i = fromIndex; }
		if((findLast && i > end) || i < end){
			for(; i != end; i += step){
				if(array[i] == value){ return i; }
			}
		}
		return -1;
	});

	def("lastIndexOf", function(array, value, fromIndex){
		return ego.indexOf(array, value, fromIndex, true);
	});

	def("forEach", function(arr, callback, thisObject){
		if(!arr || !arr.length){ return; }
		var p = getParts(arr, thisObject, callback),
			i = 0,
			l = p[0].length;
		arr = p[0];
		for(; i<l; ++i){ 
			p[2].call(p[1], arr[i], i, arr);
		}
	});

	def("every", function(arr, callback, thisObject){
		return everyOrSome(true, arr, callback, thisObject);
	});

	def("some", function(arr, callback, thisObject){
		return everyOrSome(false, arr, callback, thisObject);
	});

	def("map", function(arr, callback, thisObject){
		var p = getParts(arr, thisObject, callback),
			outArr = (arguments[3] ? (new arguments[3]()) : []),
			i = 0,
			l = p[0].length;
		arr = p[0];
		for(; i<l; ++i){
			outArr.push(p[2].call(p[1], arr[i], i, arr));
		}
		return outArr;
	});

	def("filter", function(arr, callback, thisObject){
		var p = getParts(arr, thisObject, callback),
			outArr = [],
			i = 0,
			l = p[0].length;
		arr = p[0];
		for(l = arr.length; i<l; ++i){
			if(p[2].call(p[1], arr[i], i, arr)){
				outArr.push(arr[i]);
			}
		}
		return outArr;
	});

});