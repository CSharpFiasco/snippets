var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

var hasClass = function(el, className) {
	if (el == undefined || className == undefined) return;

	if (el.classList) {
		return el.classList.contains(className);
	} else {
		return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	}
};

var addClass = function(el, className) {
	if (el == undefined || className == undefined) return;

	if (el.classList) {
		el.classList.add(className);
	} else if (!hasClass(el, className)) {
		el.className += " " + className;
	}
};

var removeClass = function(el, className) {
	if (el == undefined || className == undefined) return;

	if (el.classList) {
		el.classList.remove(className);
	} else if (hasClass(el, className)) {
		var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
		el.className = el.className.replace(reg, ' ');
	}
};

var getClosest = function(elem, selector) {
	for (; elem && elem !== document; elem = elem.parentNode) {
		if (typeof elem.matches === 'function') {
			if (elem.matches(selector)) return elem;
		}
	}
	return null;
};

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
	return !isNaN(x) && x !== "";
};

var isInteger = function(x) {
	console.log(x)
	return isNumber(x) && (x % 1 === 0) && (x.toString().indexOf(".")===-1);
};

var isMoney = function(x) {
	var regex = RegExp(/^\d*(\.\d{1,2})?$/);
	return regex.test(x)
};

var getParameterArray = function() {
	var url = window.location.href;
	var regex = new RegExp('[?]([^?]*)$'), results = regex.exec(url);

	if (!results) return [];

	if (!results[1]) return [];

	return results[1].split('&');
};

var getQuerystring = function(str){
	var querystring =  getParameterArray().filter(function(val){
		return (val.split('=')[0].toLowerCase() === str.toLowerCase());
	});

	querystring = querystring && querystring.length ? querystring.join('&') : '';
	
	return querystring;
};

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
}
	
var makeHtml = function (string) {
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
	return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
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
}

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