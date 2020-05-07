var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

/**
 * 
 * @param {HTMLElement} el 
 * @param {String} className 
 * @returns {Boolean}
 * 
 */
var hasClass = function(el, className) {
	if (el == undefined || className == undefined) return;

	if (el.classList) { return el.classList.contains(className); }

	return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
};

/**
 * 
 * @param {HTMLElement} el 
 * @param {String} className 
 * 
 */
var addClass = function(el, className) {
	if (el == undefined || className == undefined) return;

	if (el.classList) {
		el.classList.add(className);
	} else if (!hasClass(el, className)) {
		el.className += " " + className;
	}
};

/**
 * 
 * @param {HTMLElement} el 
 * @param {String} className 
 * 
 */
var removeClass = function(el, className) {
	if (el == undefined || className == undefined) return;

	if (el.classList) {
		el.classList.remove(className);
	} else if (hasClass(el, className)) {
		var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
		el.className = el.className.replace(reg, ' ');
	}
};

/**
 * 
 * @param {HTMLElement} el 
 * @param {String} className 
 * 
 */
var toggleClass = function(el, className){
	hasClass(el, className) ? removeClass(el, className) : addClass(el, className);
};

/**
 * 
 * @param {HTMLElement} el 
 * @param {String} className 
 * @returns {HTMLElement}
 */
var getClosest = function(elem, selector) {
	for (; elem && elem !== document; elem = elem.parentNode) {
		if (typeof elem.matches === 'function') {
			if (elem.matches(selector)) return elem;
		}
	}
	return null;
};

/**
 * 
 * @param {HTMLElement} el 
 * 
 */
var removeElement = function(el){
	if(!el)return;
	
	el.parentElement.removeChild(el);
};

var getHeight = function(el,withBorders) {
	if (!el) return;
	var height = 0;
	
	if (withBorders === undefined) {
		withBorders = false
	}
	if (el === window) {
		height = window.innerHeight;
	}
	else if (withBorders) {
		height = el.offsetHeight;
	}
	else {
		height = el.clientHeight;
	}

	return height
};

var getWidth = function(el,withBorders) {
	if(!el)return;
	var width = 0;
	
	if (withBorders === undefined) {
		withBorders = false
	}
	if (el === window) {
		width = window.innerWidth;
	}
	else if (withBorders) {
		width = el.offsetWidth;
	}
	else {
		width = el.clientWidth;
	}
	return width
};

var isNumber = function(x) {
	return !isNaN(x) && x !== null && x !== "";
};

//depends in isNumber function
var isInteger = function(x) {
	console.log(x)
	return isNumber(x) && (x % 1 === 0) && (x.toString().indexOf(".")===-1);
};

//depends in isNumber function
var isMoney = function(x) {
	var regex = RegExp(/^\d*(\.\d{1,2})?$/);
	return isNumber(x) && regex.test(x)
};

//returns array
var getParameterArray = function() {
	var url = window.location.href;
	var regex = new RegExp('[?]([^?]*)$'), results = regex.exec(url);

	if (!results) return [];

	if (!results[1]) return [];

	return results[1].split('&');
};

//depends on getParameterArray
//returns full querystring
var getQuerystring = function(str){
	var querystring =  getParameterArray().filter(function(val){
		return (val.split('=')[0].toLowerCase() === str.toLowerCase());
	});

	querystring = querystring && querystring.length ? querystring.join('&') : '';
	
	return querystring;
};

//searches querystring for a key and returns the value. 
var getQuerystringValue = function(str){
	var querystring =  getParameterArray().filter(function(val){
		return (val.split('=')[0].toLowerCase() === str.toLowerCase());
	});

	querystring = querystring && querystring.length ? querystring[0].split('=')[1] : '';
	querystring = querystring ? querystring : ''
	
	return querystring;
};

//String Array
var hasDuplicates = function(array) {
	var valuesSoFar = Object.create(null);
	for (var i = 0; i < array.length; ++i) {
		var value = array[i];
		if (value in valuesSoFar) {
			return true;
		}
		valuesSoFar[value] = true;
	}
	return false;
};

String.prototype.startsWith = function(needle)
{
    return this.indexOf(needle) === 0;
};

String.prototype.toElement = function(){
	var str = this.toString();
	if(str.indexOf('<tbody') === 0 || str.indexOf('<thead') === 0){
		var temp = document.createElement('table');
	}else if(str.indexOf('<tr') === 0){
		var temp = document.createElement('tbody');
	}else if(str.indexOf('<td') === 0 || str.indexOf('<th') === 0){
		var temp = document.createElement('tr');
	}else{
		var temp = document.createElement('div');
	}
	
    temp.innerHTML = str;
    return temp.firstChild;
};

//document.querySelectorAll('selector').toArray()
//allows us to use map,filter, functions for declarative js programming
NodeList.prototype.toArray = function(){
	return Array.prototype.slice.call(this);
};
	
var toHtml = function (string) {
	var temp = document.createElement('div');
	temp.innerHTML = string;
	return temp.firstChild;
};

var isNumeric = function(str) {
	var ret = false;
	if(!isNaN(str) && str != undefined && str != '') ret = true;
	return ret
};

var left = function(str, n){
	if (n <= 0)
		return "";
	else if (n > String(str).length)
		return str;
	else
		return String(str).substring(0,n);
};

var right = function(str, n){
	if (n <= 0)
	   return "";
	else if (n > String(str).length)
	   return str;
	else {
	   var iLen = String(str).length;
	   return String(str).substring(iLen, iLen - n);
	}
};

var mid = function(str, start, len){
	// Make sure start and len are within proper bounds
	if (start < 0 || len < 0) return "";
		var iEnd, iLen = String(str).length;
	if (start + len > iLen)
		  iEnd = iLen;
	else
		  iEnd = start + len;
	return String(str).substring(start,iEnd);
};

var inStr = function(strSearch, charSearchFor) {
	for (n=0; n < strSearch.length; n++) {
		if (charSearchFor == Mid(strSearch, n, 1)) {
		return n;
		}
	}
	return -1;
};

var isEmptyObject = function(obj){
	return Object.keys(obj).length === 0 && obj.constructor === Object
};

/*Finds each input element inside various jQuery Elements and puts the name and value into an object as a key and value then pushes that object into an array.*/
var elementsToArray = function(elements){
	var objArr = [];
	var obj = {};
	for(var i = 0; i < elements.length; i++){
		obj = {};
		var element = elements[i];
		var elementArr = element.querySelectorAll('input:not([type=checkbox]), input[type=checkbox]:checked, select, textarea');
		for(var j = 0; j < elementArr.length; j++){
			obj[elementArr[j].getAttribute('name')] = elementArr[j].value;
		}
		if(!isEmptyObject(obj)){
			objArr.push(obj);
		}
	}
	return objArr;
};

/*Finds each input element inside element and puts the name and value into an object as a key and value.*/
var elementToObject = function(el){
	var obj = {};
	var els = [];
	if(!el)return obj;
	if(NodeList.prototype.isPrototypeOf(el) || Array.isArray(el)){
		els = el;
	}else{
		els.push(el);
	}
	for(var i = 0; i < els.length; i++){
		var inputs = els[i].querySelectorAll('input:not([type=checkbox]), input[type=checkbox]:checked, select, textarea');
		var input;
		for(var j = 0 ; j < inputs.length; j++){
			input = inputs[j];
			if(input.getAttribute('name')){
				obj[input.getAttribute('name')] = input.value;
			}
		}
	}
	
	return obj;
	
};

var isFunction = function (functionToCheck) {
	return !!functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
};

var jsonToQueryString = function(params){
	return Object.keys(params).map(function(key) {
		return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
	}).join('&');
};
  
var isObject = function(obj)
{
	return obj !== undefined && obj !== null && obj.constructor == Object;
};


var getOffset = function(el) {
    const box = el.getBoundingClientRect();

    return {
        top: box.top + window.pageYOffset - document.documentElement.clientTop,
        left: box.left + window.pageXOffset - document.documentElement.clientLeft
    };
};

var redirect = function(url){
	window.location.href = url;
};

//polyfill https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
if (!String.prototype.includes) {
	String.prototype.includes = function(search, start) {
	  'use strict';
  
	  if (search instanceof RegExp) {
		throw TypeError('first argument must not be a RegExp');
	  } 
	  if (start === undefined) { start = 0; }
	  return this.indexOf(search, start) !== -1;
	};
}

var redirect = function(url){
	url = url.includes('/') ? url.split('/').slice(0).join('/') : '/' + url;
	window.location.replace(window.location.origin + url);
};

//pushURL('/hello/world')
//to do rename to better name
var pushURL = function(url){
	url = url.includes('/') ? url.split('/').slice(0).join('/') : '/' + url;
	window.history.pushState('', '', window.location.origin + url);
};

var initMinLengthValidation = function(){
	var minLengthEls = document.querySelectorAll('[minlength]');
	var minLengthEl;
	for(var i = 0; i < minLengthEls.length; i++){
		minLengthEl = minLengthEls[i];
		if(!minLengthEl.dataset.minlengthInit){
			minLengthEl.addEventListener('keyup', function(){
				this.dataset.minlengthInit = true;
				validateMinLength(this, this.getAttribute('minlength'))
				// this.reportValidity();
			});
			validateMinLength(minLengthEl, minLengthEl.getAttribute('minlength'))
		}
	}
};

var validateMinLength = function(el, minLength){
	console.log('validating')
	console.log(el.value.length)
	if(isInteger(minLength)){
		minLength = parseInt(minLength, 10);
		if(el.value.length < minLength){
			var message = minLength <= el.value.length ? '' : minLength + ' characters minimum';
			el.setCustomValidity(message);
		}else{
			el.setCustomValidity("")
		}
	}
};

var ajax = function(opts){
	var xhr = new XMLHttpRequest();
	var config = {
		type: opts.type == undefined ? "GET" : opts.type,
		url: opts.url == undefined ? "" : opts.url,
		dataType: opts.dataType == undefined ? "" : opts.dataType,
		async: opts.async === false ? false : true,
		data: !opts.data ? {} : opts.data,
		success: opts.success,
		error: opts.error
	};
	var isFunction = function (functionToCheck) {
		return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
	};

	var isObject = function(obj)
	{
		return obj !== undefined && obj !== null && obj.constructor == Object;
	};
	
	var jsonToQueryString = function(params){
		return Object.keys(params).map(function(key) {
			return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
		}).join('&');
	};
	
	
	if(isObject(config.data) && config.type.toLowerCase() !== 'get' && !(config.data instanceof FormData)){
		config.data = jsonToQueryString(config.data);
	}else if(isObject(config.data) && config.type.toLowerCase() === 'get' && !(config.data instanceof FormData)){
		config.url = config.url + (config.url.indexOf('?') !== -1 ? '&' : '?') + jsonToQueryString(config.data);
		config.data = "";
	}else if((config.data instanceof FormData)){
		
	}else{
		config.data = "";
	}
  
	if(isFunction(config.success)){
		xhr.onload = function(data){
			var responseData = data.target.responseText;
			if(typeof(responseData) == "string" || config.dataType.toLowerCase() == "json"){
				try{
					responseData = JSON.parse(responseData);
				}catch(e){
					if(config.dataType.toLowerCase() == "json" && isFunction(config.error)){
						config.error.bind(this)();
						return false;
					}
				}
			}
			config.success.bind(this)(responseData)
		};
	}
  
	if(isFunction(config.error)){
		xhr.onerror = config.error;
	}
	
	xhr.open(config.type, config.url, config.async);
	
	if(config.type.toLowerCase() !== 'get' && !(config.data instanceof FormData)){
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	}
	
	xhr.send(config.data);
};