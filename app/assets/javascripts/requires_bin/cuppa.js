// cuppa.js
"use strict";
var log = function(values){ 
    try{ 
        var args = arguments;
        for(var i = 0; i < args.length; i++){ console.log(args[i]); }
    }catch(err){ };
};
var trace = function(value){ log(value); };
var cuppa = { debug:false }; var cu = cuppa;
try{ cuppa.script_path = document.currentScript.src.replace("cuppa.js", ""); }catch(err){};
// ready
    cuppa.ready = function(callback){
        if(document.readyState === 'complete') callback();
        else document.addEventListener('DOMContentLoaded', callback, true);
    };
/* return element
    ref = string
    parent = string or html node
    opts = {
        parent, target: string or element
        returnType: first, last, all
        query: true // force to use querySelector
        reverse: false // invert the element order
        invert: false // invert the element order
        not:ELements
    }
*/
    cuppa.element = function(ref, opts){
        if(!ref) return;
        opts = opts || {}
        opts.returnType = opts.returnType || "all";
        opts.query = opts.query || true;
        if(opts.target) opts.parent = opts.target;
        if(ref == "body"){
            return document.body;
        }else if(Array.isArray(ref)){ 
            if(opts.returnType == "first") return ref.shift();
            else if(opts.returnType == "last") return ref.pop();
            else return ref;
        }else if(ref.toString() == "[object NodeList]"){
            ref = Array.from(ref);
            if(opts.returnType == "first") return ref.shift();
            else if(opts.returnType == "last") return ref.pop();
            else return ref;
        }else if(typeof(ref) == "object"){ 
            if(opts.returnType == "first") return ref;
            else if(opts.returnType == "last") return ref;
            else return [ref];
        };

        if(!opts.parent || opts.parent == "body") opts.parent = [document.body];
        if(typeof(opts.parent) == "string") opts.parent = cuppa.element(opts.parent);
        if(!Array.isArray(opts.parent)) opts.parent = [opts.parent];

        var nodes = []; if(!parent) return nodes;
        for(var i = 0; i < opts.parent.length; i++){
            var t = opts.parent[i];
            if(cuppa.search("#", ref) && !opts.query){ 
                var e = cuppa.replace(ref, "#", "");
                var n = null;
                try{ var n = t.getElementById(e); }catch(err){  }
                if(n) nodes.push(n);
            }else if(cuppa.search(".", ref) && !opts.query){
                ref = cuppa.replace(ref, "\\.", "");
                var n = null;
                try{ n = Array.from(t.getElementsByClassName(ref)); }catch(err){  }
                if(n && n.length) nodes= nodes.concat(n);
            }else{ 
                var n = null;
                try{ n = Array.from(t.querySelectorAll(ref)); }catch(err){  }
                if(n && n.length) nodes= nodes.concat(n);
                
            };
        };

        if(opts.not) nodes = nodes.filter(function(item){ if(item !== opts.not) return item; });

        if(opts.reverse || opts.invert) nodes.reverse();

        if(opts.returnType == "first") return nodes.shift();
        else if(opts.returnType == "last") return nodes.pop();
        else return nodes;
    };
    cuppa.elements = function(ref, opts){ return cuppa.element(ref, opts); };
// new element
    cuppa.newElement = function(str){
        var div = document.createElement('div');
            div.innerHTML = str;
        return div.firstChild;
    };
// childrens
    cuppa.childrens = function(element) {
        if(!element) return null;
        var tmp = element.childNodes;
        var childrens = new Array();
        for(var i = 0; i < tmp.length; i++){
            if(tmp[i].nodeType == 1) childrens.push(tmp[i]);
        };
        return childrens;
    }
// remove element
    cuppa.remove = function(ref){
        var elements = cuppa.element(ref);
        if(!elements) return;
        for(var i = 0; i < elements.length; i++){
            try{ elements[i].parentNode.removeChild(elements[i]); }catch(err){ log("Can't remove node",elements[i]); };
        };
    };
// clean
    cuppa.clean = function(ref){
        ref.innerHTML = "";;
    };
/* removeClass */
    cuppa.removeClass = function(elements, classes){
        elements = cuppa.element(elements);
        var classes = classes.split(" ");
        for(var i = 0; i < elements.length; i++){
            for(var j = 0; j < classes.length; j++){
                elements[i].classList.remove(classes[j]);
            };
        };
    };
    cuppa.addClass = function(elements, classes){
        if(!elements) return;
        elements = cuppa.element(elements);
        var classes = classes.split(" ");
        for(var i = 0; i < elements.length; i++){
            for(var j = 0; j < classes.length; j++){
                elements[i].classList.add(classes[j]);
            };
        };
    };
    cuppa.toggleClass = function(elements, classes){
        elements = cuppa.element(elements);
        var classes = classes.split(" ");
        for(var i = 0; i < elements.length; i++){
            for(var j = 0; j < classes.length; j++){
                elements[i].classList.toggle(classes[j]);
            };
        };
    };
    cuppa.hasClass = function(element, className){
        element = cuppa.element(element)[0];
        return element.classList.contains(className);
    };
/* attribute */
    cuppa.attribute = function(elements, name, value, remove){
        if(!elements || !name) return;
        elements = cuppa.element(elements);
        if(remove){
            for(var i = 0; i < elements.length; i++){
                var element = elements[i];
                element.removeAttribute(name);
            };
            return;
        };
        if(value != undefined){
            for(var i = 0; i < elements.length; i++){
                var element = elements[i];
                element.setAttribute(name, value);
            };
        }else{
            var value;
            try{ value = elements[0].getAttribute(name); }catch(err){}
            return value
        };
    }; cuppa.attr = function(elements, name, value, remove){ return cuppa.attribute(elements, name, value, remove); };
/* clone element 
    ref: string, element
*/
    cuppa.clone = function(ref){
        var element = cuppa.element(ref, {returnType:"first"});
        var clone = element.cloneNode(true);
        return clone;
    };
/*  Convert HTML element to String
    Example: cuppa.getStringElement(HTML_Element);
*/
    cuppa.getStringElement = function(element){
        if(element[0]) element = tu_NewElement(element);
        var tmpNode = document.createElement("div"); 
            tmpNode.appendChild(element);
        var str = tmpNode.innerHTML;
            tmpNode = null;
        return str;
    };
// parent / parents
    cuppa.parent = function(ref){
        var element = cuppa.element(ref)[0];
        if(!element) return;
        return element.parentElement;
    };
    cuppa.parents = function(ref, opts){
        opts = cuppa.mergeObjects([{reverse:false, type:""}, opts]);
        element = cuppa.element(ref)[0];
        if(!element) return;
        var parents = [];
        if(cuppa.elementType(element) == "body") return parents;
        while (element) {
            if(element.toString() != "[object HTMLDocument]" && element.toString() != "[object HTMLHtmlElement]"){
                if(opts.type){
                    if(cuppa.elementType(element) == opts.type){
                        parents.push(element);    
                    }
                }else{
                    parents.push(element);
                }
            };
            element = element.parentNode;
        };
        parents.shift();
        if(opts.reverse) parents = parents.reverse();
        return parents;
    };
// addElement, addChild
    /*  opts = {
            prepend, start, init, target:target     // insert element inside target (first position)
            append, add, end:target              // insert element inside target (last position)
            before:target                   // insert element befor target
            after:target                    // insert element after target
        }
    */
    cuppa.addChild = function(element, opts){
        if(!element) return;
        opts = opts || {}
        if(opts.prepend){ 
            var target = cuppa.element(opts.prepend, {query:true, returnType:"first"} );
            cuppa.prepend(element, target);
        }else if(opts.start){ 
            var target = cuppa.element(opts.start, {query:true, returnType:"first"} );
            cuppa.prepend(element, target);
        }else if(opts.init){ 
            var target = cuppa.element(opts.init, {query:true, returnType:"first"} );
            cuppa.prepend(element, target);
        }else if(opts.first){ 
            var target = cuppa.element(opts.first, {query:true, returnType:"first"} );
            cuppa.prepend(element, target);
        }else if(opts.before){
            var target = cuppa.element(opts.before, {query:true, returnType:"first"} );
            cuppa.before(element, target);
        }else if(opts.after){ 
            var target = cuppa.element(opts.after, {query:true, returnType:"first"} );
            cuppa.after(element, target);
        }else if(opts.append){
            var target = cuppa.element(opts.append, {query:true, returnType:"first"} );
            cuppa.append(element, target);
        }else if(opts.add){ 
            var target = cuppa.element(opts.add, {query:true, returnType:"first"} );
            cuppa.append(element, target);
        }else if(opts.target){ 
            var target = cuppa.element(opts.target, {query:true, returnType:"first"} );
            cuppa.append(element, target);
        }else if(opts.end){ 
            var target = cuppa.element(opts.end, {query:true, returnType:"first"} );
            cuppa.append(element, target);
        }else if(opts.replace){
            var target = cuppa.element(opts.replace, {query:true, returnType:"first"} );
            cuppa.replaceElement(element, target);
        }else if(opts.update){
            var target = cuppa.element(opts.update, {query:true, returnType:"first"} );
            cuppa.update(element, target);
        };
    }; 
    cuppa.addElement = function(element, opts){ cuppa.addChild(element, opts); };
    cuppa.addChildren = function(element, opts){ cuppa.addChild(element, opts); };

    cuppa.append = function(element, addToElement){
        if(typeof element != "object") addToElement.innerHTML = element;
        else addToElement.appendChild(element);
        cuppa.executeJS(element);
    }; 
    cuppa.add = function(element, addToElement){ cuppa.append(element, addToElement); };
    cuppa.prepend = function(element, addToElement){
        addToElement = cuppa.element(addToElement, {returnType:"first"});
        if(addToElement.prepend) addToElement.prepend(element);
        else addToElement.insertBefore(element, addToElement.firstChild);
        cuppa.executeJS(element);
    };
    cuppa.before = function(element, addToElement){
        addToElement.parentNode.insertBefore(element, addToElement);
        cuppa.executeJS(element);
    };
    cuppa.after = function(element, addToElement){
        addToElement.parentNode.insertBefore(element, addToElement.nextSibling);
        cuppa.executeJS(element);
    };
    cuppa.replaceElement = function(element, elementToReplace){
        elementToReplace.parentNode.replaceChild(element, elementToReplace);
        cuppa.executeJS(element);
    };
    cuppa.update = function(element, updateElement){
        updateElement = cuppa.element(updateElement);
        for(var i = 0; i < updateElement.length; i++){
            var el = updateElement[i];
            el.innerHTML = "";
            cuppa.append(element, el);
        };
    };
    cuppa.executeJS = function(element){
        try{ var scripts = Array.from(element.querySelectorAll("script")); }catch(err){ };
        if(!scripts) return;
        for(var i = 0; i < scripts.length; i++){
            try{ eval(scripts[i].innerHTML); }catch(err){ };
        };
    };
    cuppa.show = function(elements, opts){
        elements = cuppa.element(elements);
        for(var i = 0; i < elements.length; i++){
            var element = elements[i];
            opts = cuppa.mergeObjects([{ duration:0.3, display:"block",  ease:null, height:false}, opts]);
            TweenMax.killTweensOf(element);
            if(opts.height == true){
                var dim = cuppa.dim(element);
                var tl = new TimelineMax();
                    tl.to(element, opts.duration, { height:dim.scrollHeight, ease:opts.ease});
                    tl.set(element, {height:"auto"});
            }else{
                TweenMax.to(element, opts.duration, { alpha:1, display:opts.display, ease:opts.ease});
            }
        }
    };
    cuppa.hide = function(element, opts){
        element = cuppa.element(element);
        if(!element) return;
        opts = cuppa.mergeObjects([{ duration:0.3, ease:null, height:false }, opts]);
        TweenMax.killTweensOf(element);
        if(opts.height == true){
            TweenMax.to(element, opts.duration, { height:0, ease:opts.ease});
        }else{
            TweenMax.to(element, opts.duration, { alpha:0, display:"none", ease:opts.ease});
        }
    };
/* nodeName  */
    cuppa.nodeType = function(element){ return  element.nodeName.toLowerCase(); };
    cuppa.elementType = function(element){ return cuppa.nodeType(element); };
/* blockade */
    cuppa.blockade = function(opts){
        if(opts == undefined) opts = {};
        if(opts.load == undefined) opts.load = true;
        if(opts.delay == undefined) opts.delay = 0;
        if(opts.opacity  == undefined) opts.opacity = 1;

        if(opts.load){
            if(opts.duration == undefined) opts.duration = 0.3;
            if(opts.ease == undefined) opts.ease = Cubic.easeOut;
            if(opts.zIndex == "max") opts.zIndex = cuppa.maxZIndex()+1;
            if(opts.id == undefined) opts.id = cuppa.unique("blockade_");
            if(opts.className == undefined) opts.className = "blockade";
            if(opts.target == undefined) opts.target = document.body;
            cuppa.blur();
            var blockade = document.createElement('div');
                blockade.id = opts.id;
                blockade.classList.add("cu-blockade");
                if(opts.className) blockade.classList.add(opts.className);
                if(opts.personalClass) blockade.classList.add(opts.personalClass);
                blockade.style.opacity = 0;
                if(opts.zIndex) blockade.style.zIndex = opts.zIndex;
                TweenMax.to(blockade, opts.duration, {delay:opts.delay, alpha: opts.opacity, ease:opts.ease});
                cuppa.addElement(blockade, opts);
        }else{
            if(opts.duration == undefined) opts.duration = 0.2;
            if(opts.ease == undefined) opts.ease = Cubic.easeIn;
            if(opts.removeType == undefined) opts.removeType = "last";  // last (default), first, all
            if(opts.className == undefined) opts.className = ".cu-blockade";
            // get blockades
                var blockades;
                if(opts.id) blockades = cuppa.element("#"+id, {returnType:"first"});
                else blockades = cuppa.element(opts.className, {returnType:opts.removeType});
            if(!Array.isArray(blockades)) blockades = [blockades];
            for(var i = 0; i < blockades.length; i++){
                try{ 
                    TweenMax.to(blockades[i], opts.duration, {delay:opts.delay, alpha:0, ease:opts.ease, onCompleteParams:[blockades[i]], onComplete:function(item){ cuppa.remove(item); } }) 
                }catch(err){ };    
            }
        }
    }
// blockade screen
    cuppa.blockadeScreen = function(value){
        if(value == undefined) value = true;
        if(value) cuppa.blockade({duration:0, opacity:0, zIndex:"max", personalClass:"cu-blockade-screen"});
        else cuppa.blockade({load:false, className:".cu-blockade-screen", duration:0, removeType:"all", delay:0.2});
    };
// noscroll
    cuppa.noscroll = function(value, all){
        if(value == undefined) value = true;
        if(all == undefined) all = false;
        if(value){
            if(all) document.body.classList.add("noscroll-all");
            else document.body.classList.add("noscroll");
        }else{
            document.body.classList.remove("noscroll");
            document.body.classList.remove("noscroll-all");
        };
    };
// requiereJS / IncludeJS / loadJS
    cuppa.requireJSDirectory = {};
    cuppa.requiereJS = function(paths, callback, progress){
        if( typeof(paths) == "string") paths = [paths];
        let loaded = 0;
        let head = document.getElementsByTagName('head')[0];
        for(let i = 0; i < paths.length; i++){
            let path = paths[i];
            if(cuppa.requireJSDirectory[path]){
                onComplete();
            }else{
                cuppa.requireJSDirectory[path] = true;
                let element = document.createElement('script');
                    element.src = path;
                    element.type = 'text/javascript';
                    element.onload = onComplete;
                    head.appendChild(element);
            };
        };
        function onComplete(e){
            loaded++;
            if(loaded >= paths.length && callback){
                callback(loaded, paths.length);
            }else if(progress){
                progress(loaded, paths.length);
            };
        };
    };
    cuppa.includeJS = function(paths, callback, progress){ cuppa.requiereJS(paths, callback, progress); };
    cuppa.loadJS = function(paths, callback, progress){ cuppa.requiereJS(paths, callback, progress); };
// requiereCSS / IncludeCSS / loadCCS
    cuppa.requireCSSDirectory = {};
    cuppa.requiereCSS = function(paths, callback, progress){
        if( typeof(paths) == "string") paths = [paths];
        let loaded = 0;
        let head = document.getElementsByTagName('head')[0];
        for(let i = 0; i < paths.length; i++){
            let path = paths[i];
            if(cuppa.requireCSSDirectory[path]){
                onComplete();
            }else{
                cuppa.requireCSSDirectory[path] = true;
                var element = document.createElement('link');
                    element.rel = "stylesheet";
                    element.type = "text/css";
                    element.href = path;
                    element.onload = onComplete;
                    head.appendChild(element);
            };
        };
        function onComplete(e){
            loaded++;
            if(loaded >= paths.length && callback){
                callback(loaded, paths.length);
            }else if(progress){
                progress(loaded, paths.length);
            };
        };
    };
    cuppa.includeCSS = function(paths, callback, progress){ cuppa.requiereCSS(paths, callback, progress); };
    cuppa.loadCSS = function(paths, callback, progress){ cuppa.requiereCSS(paths, callback, progress); };
 // Dispache Events (Objects)
function EventDispatcher() {};
if(Object.assign){
    Object.assign( EventDispatcher.prototype, {
        addEventListener: function ( type, listener ) {
            if ( this._listeners === undefined ) this._listeners = {};
            var listeners = this._listeners;
            if ( listeners[ type ] === undefined ) {
                listeners[ type ] = [];
            }
            if ( listeners[ type ].indexOf( listener ) === - 1 ) {
                listeners[ type ].push( listener );
            }
        },
        hasEventListener: function ( type, listener ) {
            if ( this._listeners === undefined ) return false;
            var listeners = this._listeners;
            return listeners[ type ] !== undefined && listeners[ type ].indexOf( listener ) !== - 1;
        },
        removeEventListener: function ( type, listener ) {
            if ( this._listeners === undefined ) return;
            var listeners = this._listeners;
            var listenerArray = listeners[ type ];
            if ( listenerArray !== undefined ) {
                var index = listenerArray.indexOf( listener );
                if ( index !== - 1 ) {
                    listenerArray.splice( index, 1 );
                }
            }
        },
        dispatchEvent: function ( event ) {
            if ( this._listeners === undefined ) return;
            var listeners = this._listeners;
            var listenerArray = listeners[ event.type ];
            if ( listenerArray !== undefined ) {
                event.target = this;
                var array = listenerArray.slice( 0 );
                for ( var i = 0, l = array.length; i < l; i ++ ) {
                    array[ i ].call( this, event );
                }
            }
        }
    } );
};
// Base64
var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = Base64._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    },
    decode: function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = Base64._utf8_decode(output);
        return output;
    },
    _utf8_encode: function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    },
    _utf8_decode: function(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
};
// Production steps of ECMA-262, Edition 6, 22.1.2.1
if (!Array.from) {
  Array.from = (function () {
    var toStr = Object.prototype.toString;
    var isCallable = function (fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function (value) {
      var number = Number(value);
      if (isNaN(number)) { return 0; }
      if (number === 0 || !isFinite(number)) { return number; }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike/*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method 
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  }());
};

if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) { // .length of function is 2
      'use strict';
      if (target == null) { // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) { // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
};
 /* INSTANCE 
    params:
        template (required):    id/class to reference
        url/path:                    url/path if is ajax loaded
        zIndex:                 'max', 'auto', number
        append:                 div or elemento to add in
        replace:                div or element to replace in
        noData:                if is true, dont send data to constructor, only by post;
        process: true           if false, only load the instance and dont create any instance                
        
    cuppa.instance({path:"folder/MyObject.php"});
    cuppa.instance({template:".template1"}); // <template class="template1"> ... </template>
    cuppa.instance({path:"folder/class.php", unique:false}); // return the load content, no alter anyting
*/
    cuppa.instance_tag = "template"; // template, xmp (old browsers compatibility)
    cuppa.last_instance;
    cuppa.instance = function(data){
        if(data.data == undefined) data.data = {};
        if(data.async == undefined) data.async = true;
        if(data.remove == undefined) data.remove = false;
        if(data.reload == undefined) data.reload = false;
        if(data.processInstance == undefined) data.processInstance = true;
        if(data.template_tag == undefined) data.template_tag = true;
        if(data.version == undefined) data.version = "1";
        if(data.path) data.url = data.path;
        //++ process
            data.process = function(data){
                data.instance = data.template.replace(".", "");
                data.element = "";
                //++ get template
                    if(data.url_ref){
                        var div = document.getElementById(data.url_ref);
                        var item = div.querySelector("template");
                        if(!item) item = div.querySelector("xmp");
                        if(item){
                            try{ data.element = item.getElementsByClassName(data.template)[0]; }catch(err){ }
                            if(!data.element) data.element = item.innerHTML;
                        }
                    }
                //--
                if(data.unique == undefined) data.unique = cuppa.unique("instance"); 
                data.html = cuppa.uniqueInstance(data);
                cuppa.last_instance = data;
                if(data.zIndex != undefined){
                    if(data.zIndex  == "max") data.zIndex = cuppa.maxZIndex()+1;
                    data.html.style.zIndex = data.zIndex;
                };
                cuppa.addElement(data.html, data);
                try{ data.script = eval(data.html.querySelector("script").innerHTML);  }catch(err){ };
                data.html_base = data.element;
                if(data.script){
                    data.script.instance = data;
                    data.script.html = data.html;                    
                    if(data.parent) data.script.parent = data.parent;
                    data.script.state = new cuppa.state(data.html);
                    //++ update nodes
                        data.script.updateNodes = function(){ 
                            this.nodes = this.node = cuppa.nodes(this.html);
                            if(this.instance.version == "2"){ cuppa.mergeObjects([this, this.nodes]); }
                        }; data.script.updateNodes();
                    //--
                    data.script.instance_name = data.instance;
                    data.script.instance_unique = data.unique;
                    data.script.global = cuppa.global;
                    data.html.instance = data;
                    data.html.script = data.script;
                    data.script.removeChild = function(element){ 
                        try{ element.parentNode.removeChild(element); }catch(err){};
                    };
                    data.script.addChild = function(element, addTo){  
                        addTo = addTo || this.html;
                        addTo.appendChild(element);
                    };
                    data.script.getChild = function(id){
                        try{
                            return this.html.querySelector("#"+id).script;
                        }catch(e){ return null };
                    };
                    if(data.noData){
                        if(data.script.constructor) data.script.constructor();
                        if(data.script[data.unique]) data.script[data.unique]();
                    }else{
                        if(data.script.constructor) data.script.constructor(data.data);
                        if(data.script[data.unique]) data.script[data.unique](data.data);
                    };
                    cuppa.dispatchEvents(this.script);
                };
                
                if(data.callback) data.callback(data.script);
                if(data.complete) data.complete(data.script);
                if(data.remove){ cuppa.remove( document.getElementById(data.url_ref) ) }
                if(data.id && data.parent){ data.script.parent[data.id] = data.script; }
            };
        //--
        if(data.url){
            if(!data.template) data.template = "."+cuppa.getFileDescription(data.url).name;
            data.url_ref = "template_"+cuppa.urlFriendly(data.url);
            if( document.getElementById(data.url_ref) && !data.reload ){
                if(data.processInstance) data.process(data);
                return data;
            }else{
                var fileDesc = cuppa.fileDescription(data.url);
                if( fileDesc.extension.toLowerCase() == "html" || fileDesc.extension.toLowerCase() == "html"){
                    var ajax = cuppa.ajax(data.url, {method:"GET", callback:onDone.bind(data)});
                }else{
                    cuppa.ajax(data.url, {data:data.data, async:data.async, callback:onDone.bind(data)});
                };
                function onDone(result){
                    if(data.template_tag == true || result.search("<template") == -1) result = "<"+cuppa.instance_tag+">"+result+"</"+cuppa.instance_tag+">";
                    if(cuppa.instance_tag != "template"){
                        result = cuppa.replace(result, "<template>", "<"+cuppa.instance_tag+">");
                        result = cuppa.replace(result, "<\/template>", "<\/"+cuppa.instance_tag+">");
                    }
                    if(data.reload){ cuppa.remove(document.getElementById(this.url_ref)) }
                    if(cuppa.instance_tag != "template"){
                        result = cuppa.replace(result, "<template>", "<"+cuppa.instance_tag+">");
                        result = cuppa.replace(result, "<\/template>", "<\/"+cuppa.instance_tag+">");
                    }
                    if(!document.getElementById(data.url_ref)){
                        var nElement = cuppa.newElement("<div id="+this.url_ref+" style='display:none'>"+result+"</div>");
                        cuppa.addElement(nElement, {append:document.body});
                    }
                    if(data.processInstance) this.process(data);
                    if(data.loaded) data.loaded(data);
                };                
                return data;
            };
        }else if(data.template){
            if(data.processInstance) data.process(data);
            return data.script;
        };
    };
/* create unique instance
    data = {}
        data.element = String with HTML String
        data.class = "add a class"
        data.name = "add id tag"
        data.id = "add id tag"
        data.instance = "The class of the current class of file"; 
*/ 
    cuppa.uniqueInstance = function(data){
        if(data.unique == undefined) data.unique = cuppa.unique("instance");
        if(data.unique === false) data.unique = data.instance;

        var element = cuppa.replace(data.element, data.instance, data.unique, {first:true});
            element = cuppa.replace(element, data.instance, data.unique, {first:true, range:["<script>","</script>"]});
            element = cuppa.replace(element, data.instance, data.unique, {range:["<style>","</style>"]});
            
        if(data.search && data.replace){
            if(Array.isArray(search)){
                try{ for(var i = 0; i < data.search.length; i++){ element = cuppa.replace(element, data.search[i], data.replace[i]); } }catch(err){ }
            }else{ element= cuppa.replace(element, data.search, data.replace); }
        };
        element = cuppa.newElement(element);
        //++ assing data
            if(data.name) element.id = data.name;
            if(data.id) element.id = data.id;
            if(data["class"]) element.classList.add(data["class"]);
            if(data["addClass"]) element.classList.add(data["addClass"]);
        //--
        return element;
    };
// instances, preload multiples instances and excecute callback in proggres / complete all
// opts = {urls:[], progress:callback, complete:callback, force:false }
    cuppa.instances = function(opts){
        if(!opts) return;
        opts.loaded = 0;
        if(opts.url) opts.urls = opts.url;
        if(opts.paths) opts.urls = opts.paths;
        if(opts.path) opts.urls = opts.path;
        if(opts.force == undefined) opts.force = false;
        opts.total = opts.urls.length;
        for(var i = 0; i < opts.total; i++){
            var urlRef = cuppa.urlFriendly(opts.urls[i]);
            cuppa.instance({url:opts.urls[i], data:opts, loaded:onLoaded, processInstance:false});
        };
        function onLoaded(item){
            opts.loaded++;
            if(opts.loaded < opts.total){
                if(opts.progress) opts.progress(opts);
            }else{ 
                if(opts.complete) opts.complete(opts);
                if(opts.callback) opts.callback(opts);
            };
        };
    };
    cuppa.preloadInstances = function(opts){ cuppa.instances(opts); };
/* set state */
    cuppa.state = function(html){
        if(typeof html == "string") html = cuppa.newElement(html);
        this.html = html ||  document.body;
        this.data = {};
        this.set = function(name, opts){
            opts = opts || {};
            opts.global = opts.global || false;
            opts.addClass = opts.addClass || "";
            opts.removeClass = opts.removeClass || "";
            opts.css = opts.css || null;
            opts.addCSS = opts.addCSS || null;
            opts.keep = opts.keep || false;
            if(!opts.keep) this.data[name] = opts.value;
            //++ change value / state
                var items = [];
                if(opts.global) items = Array.from(document.body.querySelectorAll("[state="+name+"]"));
                else items = Array.from(this.html.querySelectorAll("[state="+name+"]"));
                if(!items || !items.length) return;
                if(opts.value){
                    for(var i = 0; i < items.length; i++){
                        var item = items[i];
                        if(item.value) item.value = opts.value;
                        else item.innerHTML = opts.value;
                    }
                }
                if(opts.state){
                    for(var i = 0; i < items.length; i++){
                        var item = items[i];
                        if(item.value) item.value = item.getAttribute(opts.state);
                        else item.innerHTML = item.getAttribute(opts.state);
                    }
                }
            //--
            // addClass
                if(opts.addClass) this.addClass(name, opts.addClass, opts.global);
            // removeClass
                if(opts.removeClass) this.removeClass(name, opts.removeClass, opts.global);
            // addCSS
                if(opts.css) this.addCSS(name, opts.css, opts.global);
                if(opts.addCSS) this.addCSS(name, opts.addCSS, opts.global);
            // blockade
                if(opts.blockade === true) cuppa.blockadeScreen(true);
                if(opts.blockade === false) cuppa.blockadeScreen(false);
        };
        this.get = function(name, opts){
            opts = opts || {};
            opts.global = opts.global || false;
            var value = "";
            if(opts.global) value = document.body.querySelector("[state="+name+"]").innerHTML;
            else value = this.html.querySelector("[state="+name+"]").innerHTML;
            return value;
        };
        this.addClass = function(name, value, global){
            var value = value.split(",");
            var elements = [];
            if(global) elements = Array.from(elements.querySelectorAll("[state="+name+"]"));
            else elements = Array.from(this.html.querySelectorAll("[state="+name+"]"));
            for(var i = 0; i < elements.length; i++){
                for(var j = 0; j < value.length; j++){
                    elements[i].classList.add(cuppa.trim(value[j]));
                };
            };
        };
        this.removeClass = function(name, value, global){
            var value = value.split(",");
            var elements = [];
            if(global) elements = Array.from(elements.querySelectorAll("[state="+name+"]"));
            else elements = Array.from(this.html.querySelectorAll("[state="+name+"]"));
            for(var i = 0; i < elements.length; i++){ 
                for(var j = 0; j < value.length; j++){
                    elements[i].classList.remove(cuppa.trim(value[j]));
                };
            };
        };
        this.addAttr = function(name, attr, value, global){
            var elements = [];
            if(global) elements = Array.from(elements.querySelectorAll("[state="+name+"]"));
            else elements = Array.from(this.html.querySelectorAll("[state="+name+"]"));
            for(var i = 0; i < elements.length; i++){ elements[i].setAttribute(attr, value); };
        };
        this.removeAttr = function(name, attr, global){
            var elements = [];
            if(global) elements = Array.from(elements.querySelectorAll("[state="+name+"]"));
            else elements = Array.from(this.html.querySelectorAll("[state="+name+"]"));
            for(var i = 0; i < elements.length; i++){ elements[i].removeAttribute(attr); };
        };
        // css = { property:value, property:value }
        this.addCSS = function(name, css, global){
            var elements = [];
            if(global) elements = Array.from(elements.querySelectorAll("[state="+name+"]"));
            else elements = Array.from(this.html.querySelectorAll("[state="+name+"]"));
            for(var i = 0; i < elements.length; i++){ 
                for (var prop in css) { elements[i].style[prop] = css[prop]; }
            };
        };
        this.css = function(name, css, global){
            this.addCSS(name, css, global);
        };
        this.setData = function(data){
            this.tmp = data;
            Object.keys(this.tmp).forEach(function(key) {
                this.set(key, this.tmp[key]);
            }.bind(this));
        };
    };
// setNodes
    cuppa.nodes = function(html){
        var nodes = {}
        var elements = Array.from(html.querySelectorAll("[id]"));
        for(var i = 0; i < elements.length; i++){ nodes[elements[i].id] = elements[i]; }
        return nodes;
    };
 /* replace in range
    opts = {
        first: false,
        range: [init_string, end_string],
        first_range: false
        split: false;
    } 
*/
    cuppa.replace = function(string, search, replace, opts){
        if(!string) return "";
        opts = opts || {};
        if(opts.range){
            var c_temp1 = string.split(opts.range[0]);
            if(c_temp1.length <= 1 ) return string;
            for(var i = 0; i < c_temp1.length; i++){
                var c_temp2 = c_temp1[i].split(opts.range[1]);
                if(c_temp2.length > 1){
                    if(opts.first){ 
                        if(opts.split) c_temp2[0] = cuppa.replaceSplit(c_temp2[0], search, replace);
                        else c_temp2[0] = c_temp2[0].replace(search, replace);
                    }else{ 
                        if(opts.split) c_temp2[0] = cuppa.replaceSplit(c_temp2[0], search, replace);
                        else c_temp2[0] = c_temp2[0].replace(new RegExp(search, 'g'), replace);
                    }
                    c_temp1[i] = c_temp2.join(opts.range[1]);
                    if(opts.first_range) break;
                }
            }
            string = c_temp1.join(opts.range[0]);
        }else{
            if(opts.first){
                if(opts.split) string = cuppa.replaceSplit(string, search, replace);
                else string = string.replace(search, replace);
            }else{
                if(opts.split) string = cuppa.replaceSplit(string, search, replace);
                else string = string.replace(new RegExp(search, 'g'), replace);
            }
        };
        return string;
    };
    cuppa.replaceSplit = function(string, search, replace){
        return string.split(search).join(replace);
    };
/* Unique value */
    cuppa.unique = function(add_to_init){
        var value = Math.round(Math.random()*9999) + new Date().valueOf();
        if(add_to_init) value = add_to_init + value;
        return value;
    };
/* Method Trim() */
	cuppa.trim = function(string){
	   if(string) return string.replace(/^\s+|\s+$/g, '');
       else return "";
	};
/* Validate if a string is email, Return true of false */
	cuppa.email = function(value){
	   var emailExpression = /^[a-z 0-9][\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/i;
	   return emailExpression.test(cuppa.trim(value));
	};
/* Validate if a string is a url, Return true of false */
    cuppa.url = function(str) {
        var regexp = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        return regexp.test(str);
    }
/* Delete more of two spaces */
	cuppa.deleteDoubleSpaces = function(value){
		var valueExpression = /\s+/gi;
		return value.replace(valueExpression, " ");
	};
/* Search a word inside of a string. Return true or false */
	cuppa.searchWord = function(word, string) {
		word = word.toLowerCase();
		string = string.toLowerCase();
		var result = string.indexOf(word);
		if (result == -1) return false;
		else return true;
	};
    cuppa.search = function(word, string) { return cuppa.searchWord(word, string); };
/* String like, similar to LIKE in MySQL */
    cuppa.stringLike = function(string, like){
        if(!string) return false;
        if(string.indexOf(like) >= 0) return true;
        else return false;
    };
    cuppa.likeString = function(string, like){ return cuppa.stringLike(string, like); }
/* Capitalize */
    cuppa.capitaliseFirstLetter = function(string){
        string = string.toLocaleLowerCase();
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    cuppa.capitaliseAllWords = function(str){
        str = str.toLocaleLowerCase();
        var pieces = str.split(" ");
        for ( var i = 0; i < pieces.length; i++ ){ 
            var j = pieces[i].charAt(0).toUpperCase();
            pieces[i] = j + pieces[i].substr(1);
        }
        return pieces.join(" ");
    };
/* Convert number a money format: 100,000.15 */
	cuppa.numberToMoney = function(value, decimalSeparator) {
        value = String(value);
        if (value == "0" || value == "NaN" || value == "") return "0";
        if (decimalSeparator == undefined) decimalSeparator = ".";
        var moneyFormat = "";
        if(decimalSeparator == "."){
    		var arrayData = value.split(".");
    		var floatData = ""; if (arrayData.length > 1) floatData = "." + arrayData[arrayData.length - 1];
    			arrayData = arrayData[0].split("");
    			arrayData.reverse();
    		for (var i = arrayData.length - 1; i >= 0; i--) {
    			moneyFormat += arrayData[i];
    			if (i > 0) {
    				var result = (i / 3);
    				var result = result - Math.floor(i / 3);
    				if (result == 0 && arrayData[i] != "-") {
    					moneyFormat += ",";
    				}
    			}
    		}
        }else if(decimalSeparator == ","){
            var arrayData = value.split(",");
    		var floatData = ""; if (arrayData.length > 1) floatData = "," + arrayData[arrayData.length - 1];
    			arrayData = arrayData[0].split("");
    			arrayData.reverse();
    		for (var i = arrayData.length - 1; i >= 0; i--) {
    			moneyFormat += arrayData[i];
    			if (i > 0) {
    				var result = (i / 3);
    				var result = result - Math.floor(i / 3);
    				if (result == 0 && arrayData[i] != "-") {
    					moneyFormat += ".";
    				}
    			}
    		}
        }
        moneyFormat += floatData;
		return  moneyFormat;
	};
/* Convert money format to number: 100000.15 */
    cuppa.moneyToNumber = function(value, decimalSeparator){
        value = String(value);
        if (value == "0" || value == "NaN" || value == "") return "0";
        if (decimalSeparator == undefined) decimalSeparator = ".";
        if(decimalSeparator == "."){
            value = cuppa.replace(value, ",", "")            
        }else{
            value = cuppa.replace(value, ".", "");
            value = cuppa.replace(value, ",", ".");
        }
        return parseFloat(value);
    };
/* Convert url string to object */
    cuppa.urlToObject = function(string, urlDecode){
        if(urlDecode == undefined) urlDecode = true;
        if(!string) string = cuppa.getPath();
        if(string.indexOf("?") != -1) string = string.substr(string.indexOf("?")+1);
        if(string.indexOf("#") != -1) string = string.substr(string.indexOf("#")+1);
        var data = string.split("&");
        var object = {}
        if(data.length < 1) return null;
        for(var i = 0; i < data.length; i++){
            var item =  data[i].split("=");
            try{
                if(urlDecode) item[1] = cuppa.urlEncode(item[1]);
                if(item[0]) object[item[0]] = item[1];
            }catch(err){}
        }
        if(!Object.keys(object).length) return null;
        return object;
    };
/* Get UrlFriendly
    Example: news/article-news-1
 */
    cuppa.urlFriendly = function(str,max) {
        if(!str) return;
        if (max === undefined) max = 500;
            var a_chars = new Array();
                a_chars.push(new Array("a",/[áàâãªÁÀÂÃ]/g));
                a_chars.push(new Array("e",/[éèêÉÈÊ]/g));
                a_chars.push(new Array("i",/[íìîÍÌÎ]/g));
                a_chars.push(new Array("o",/[òóôõÓÒÔÕ]/g));
                a_chars.push(new Array("u",/[úùûÚÙÛ]/g));
                a_chars.push(new Array("c",/[çÇ]/g));
                a_chars.push(new Array("n",/[Ññ]/g));
                a_chars.push(new Array("-",/[.]/g));
                a_chars.push(new Array("",/['"\\()\[\]/*++\¿?#:;@$º&*^·’,.!¡%=+|]/g));
        for(var i=0; i < a_chars.length; i++){
            str = str.replace(a_chars[i][1], a_chars[i][0]);
        }
        return str.replace(/\s+/g,'-').replace(/\_+/g,'-').toLowerCase().replace(/\-{2,}/g,'-').replace(/(^\s*)|(\s*$)/g, '').substr(0,max);
    };
/* Get Path vars Vars 
    Exampe: news/article-news-1
            Return: Array('news','article-news-1')
*/
    cuppa.pathVars =  function(str, number_return){
        if(number_return == undefined) number_return = false;
        str = str.split("/");
        var array = new Array();
        for(var i = 0; i < str.length; i++){
            if(str[i]){
                str[i] = cuppa.trim(str[i]);
                if(number_return){
                    var number = parseInt(str[i]);
                    if(number) str[i] = number;
                }
                array.push(str[i]);
            }
        }
        return array;
    };
/* Get UTF8 Encode */    
    cuppa.utf8Encode = function(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
		}
		return utftext;
	};
/* Get UTF8 Decode */
    cuppa.utf8Decode = function(utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		while ( i < utftext.length ) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	};
/* Cut text */
    cuppa.cutText = function(delimiter, text, lenght, string_to_end, delimiter_forced, remove_tags){
        if(text == undefined) text = "";
        if(delimiter == undefined) delimiter = " ";
        if(lenght == undefined) lenght = 200;
        if(string_to_end == undefined) string_to_end = "";
        if(delimiter_forced == undefined) delimiter_forced = false;
        if(remove_tags == undefined) remove_tags = false;
        if(remove_tags) text = cuppa.removeTags(text);
        
        if(delimiter_forced){
            text = text.substr(0, lenght);
            if(cuppa.strrpos(text, delimiter) !== false) text = cuppa.trim(text.substr(0, cuppa.strrpos(text, delimiter)));
            text += string_to_end;
        }else if(text.length > lenght ){
            text = text.substr(0, lenght);
            if(cuppa.strrpos(text, delimiter) !== false) text = cuppa.trim(text.substr(0, cuppa.strrpos(text, delimiter)));
            text += string_to_end;                    
        }
        return text;
    };
/* Strpost*/
    cuppa.strpos = function(haystack, needle, offset) {
      var i = (haystack + '')
        .indexOf(needle, (offset || 0));
      return i === -1 ? false : i;
    };
/* Strrpost */
    cuppa.strrpos = function(haystack, needle, offset) {
      var i = -1;
      if (offset) {
        i = (haystack + '')
          .slice(offset)
          .lastIndexOf(needle);
        if (i !== -1) {
          i += offset;
        }
      } else {
        i = (haystack + '')
          .lastIndexOf(needle);
      }
      return i >= 0 ? i : false;
    };
/* Remove tags */
    cuppa.removeTags = function(input, allowed) {
      allowed = (((allowed || '') + '')
        .toLowerCase()
        .match(/<[a-z][a-z0-9]*>/g) || [])
        .join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
      var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
      return input.replace(commentsAndPhpTags, '')
        .replace(tags, function($0, $1) {
          return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
        });
    };
/* get Filename 
    ex: dir/dir/name.txt, return {name:name, ext:txt, type:txt}
*/
    cuppa.getFileDescription = function(file, forced){
        if (!file) return null;
        if(Array.isArray(file)) file = file[0];
		var separator = "/";
        file =  cuppa.replace(file, "\\\\", "/");
        var array = file.split(separator);
		if (cuppa.trim(array[array.length - 1]) == "") array.pop();
        var obj = {};
            obj.name_complete = array.pop();
            obj.path = array.join(separator) + separator;
            obj.file = obj.path + obj.name_complete;
		var array2 = obj.name_complete.split(".");
        if (array2.length > 1 || forced == "file" ) {
			obj.type = "file";
			if (array2.length > 1) obj.extension = array2.pop().toLowerCase();
			else obj.extension = "";
			obj.name = array2.join(".");
		}else{
			obj.type = "folder";
		}
		return obj;       
    };
    cuppa.fileDescription = function(filePath){ return cuppa.getFileDescription(filePath); }
/* Convert the \n to <br /> */
    cuppa.nl2br = function(value){
        return value.replace(/\r?\n/g, '<br />');
    };
 /* Convert the <br /> to  \n */
    cuppa.br2nl = function(value){
        return value.replace(/<br\s*[\/]?>/gi, "\n");
    };
// JSON Decode
    cuppa.jsonDecode = function(value, base64_decode){
        if(value == undefined || value == null) return "";
        if(base64_decode == undefined) base64_decode = true;
        if(base64_decode) value = Base64.decode(value);
        try{ value = JSON.parse(value); }catch(err){}
        return value;
    };
// JSON Encode
    cuppa.jsonEncode = function(value, base64_encode){
        if(value == undefined || value == null) return "";
        if(base64_encode == undefined) base64_encode = true;
        try{ value = JSON.stringify(value); }catch(err){}
        if(base64_encode) value = Base64.encode(value);
        return value;
    };
// Base64 Decode
    cuppa.base64Decode = function(value){ if(!value) return ''; return Base64.decode(value); };
//  Base64 Encode
    cuppa.base64Encode = function(value){ if(!value) return ''; return Base64.encode(value); };

// URL Encode 
    cuppa.urlEncode = function(string){ return encodeURIComponent(string); };
// URL Decode 
    cuppa.urlDecode = function(string){ string = cuppa.replace(string, " ", "+"); return decodeURIComponent(string); };
/* Number format */    
    cuppa.numberFormat = function(number, decimals, dec_point, thousands_sep) {
      number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
      var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
          var k = Math.pow(10, prec);
          return '' + (Math.round(n * k) / k)
            .toFixed(prec);
        };
      // Fix for IE parseFloat(0.55).toFixed(0) = 0;
          s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
            .split('.');
          if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
          }
          if ((s[1] || '')
            .length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1)
              .join('0');
          }
          return s.join(dec);
    };
// left0
    cuppa.left0 = function(value){
        value = parseFloat(value);
        if(value < 10) value = "0"+ value;
        return value;
    }
 // global
    cuppa.global = {};
//  dataCenter
// add and remove data in one place
    cuppa.data = { };
    cuppa.setData = function(name, data){
        cuppa.data[name] = data;
        cuppa.executeListener(name, data);
    };
    cuppa.getData = function(name, callback){
        var data = cuppa.data[name];
        if(data && callback){ 
            callback(data);
        }else if(callback){
            cuppa.addListener(name, callback);
        };
        return data;
    };
    cuppa.deleteData = function(name){ cuppa.data[name] = null; };
// add / remove / execute global listeners
    cuppa.listeners = {};
    cuppa.addListener = function(name, callback){
        if(!cuppa.listeners[name]) cuppa.listeners[name] = [];
        //cuppa.removeListener(name, callback);
        cuppa.listeners[name].push(callback);
    };
    cuppa.removeListener = function(name, callback){
        if(!cuppa.listeners[name]) cuppa.listeners[name] = [];
        var array =  cuppa.listeners[name];
        for(var i = 0 ; i < array.length; i++ ){
            if(array[i] === callback){
                array.splice(i, 1);
            };
        };
    };
    cuppa.removeListenerGroup = function(name){
        delete cuppa.listeners[name];
    };
    cuppa.executeListener = function(name, data){
        if(!cuppa.listeners[name]) cuppa.listeners[name] = [];
        var array =  cuppa.listeners[name];
        for(var i = 0 ; i < array.length; i++ ){
            array[i](data);
        };
    };
/* Make Object Available to Dispach Event
    cuppa.dispatchEvents(element); // add methods to manage the dispachers.
    // dispache an event
        element.dispatchEvent({ type: "MY_EVENT", message: "My Message" });
*/
    cuppa.dispatchEvents = function(element){
        if(!element.dispatchEvent){ Object.assign( element, EventDispatcher.prototype ); };
    }; cuppa.dispatchEvents(cuppa);
/* on / off
    EventManager, Estructure 
    cuppa.eventGroups =	{ 'groupName':  Map<Element>:[{event:String, callback:Function}, {event:String, callback:Function}, ]
                                        Map<Element>:[{event:String, callback:Function}, {event:String, callback:Function}, ]
*/
    cuppa.eventGroups = [];
    // Add Event listener
        cuppa.on = function(elements, event, callback, groupName, useCapture) {
            if(!elements) return;
            if(event == "removed") event = "DOMNodeRemoved";
            elements = cuppa.element(elements);
            cuppa.off(elements, event, callback, groupName); // prevent duplicate events
            if(!groupName) groupName = "default";
            if(useCapture == undefined) useCapture = false;

            if(!cuppa.eventGroups[groupName]) cuppa.eventGroups[groupName] = new Map();
            for(var i = 0; i < elements.length; i++){
                var element = elements[i];
                    element.addEventListener(event, callback, useCapture);
                var events = cuppa.eventGroups[groupName].get(element);
                if(!events) events = new Array();
                events.push({event:event, callback:callback});
                cuppa.eventGroups[groupName].set(element, events);
            }
        };
     // Remove a single event
        cuppa.off = function(elements, event, callback, groupName){
            elements = cuppa.element(elements);
            if(!groupName) groupName = "default";
            if(!cuppa.eventGroups[groupName]) return;
            if(!elements) return;
            if(event == "removed") event = "DOMNodeRemoved";
            for(var i = 0; i < elements.length; i++){
                var events = cuppa.eventGroups[groupName].get(elements[i]);
                if(!events) break;
                for(var j = events.length-1; j >= 0; j--){
                    if(callback){
                        if(events[j].event == event && events[j].callback === callback ){
                            elements[i].removeEventListener(events[j].event, events[j].callback);
                            events.splice(j, 1);
                            break;
                        };
                    }else{
                        if(events[j].event == event ){
                            elements[i].removeEventListener(events[j].event, events[j].callback);
                            events.splice(j, 1);
                        };
                    };
                };
                cuppa.eventGroups[groupName].set(elements[i], events);
            };
        };
    // Remove event by Group
        cuppa.offGroup = function(groupName){
            if(!groupName) groupName = "default";
            var map = cuppa.eventGroups[groupName];
            if(!map) return;
            map.forEach(function(events, element) {
                for(var i = 0; i < events.length; i++){
                    element.removeEventListener(events[i].event, events[i].callback);
                };
            });
            map["delete"](groupName);
        };
/*  Remove duplicate in Array
    array: cuppa.removeDuplicate(array)
*/
    cuppa.removeDuplicate = function(a,b,c){
        if(!a.length) return null;
        b=a.length;
        while(c=--b)while(c--)a[b]!==a[c]||a.splice(c,1);
        return a;
    };
/* Clone object */
    cuppa.cloneObject = function(object){ 
        var object2 = Object.assign({}, object);
        return object2;
    };
// ObjectToURL
    cuppa.objectToURL = function(object){
        var str = "";
        for(var key in object) {
            if(str != "") { str += "&"; }
            if(object[key]) str += key + "=" + (object[key]);
            else str += key;
        };
        return str;
    };
// clone Array
    cuppa.cloneArray = function(array){
        return array.slice(0);
    };
    cuppa.arrayClone = function(array){ return cuppa.cloneArray(array); }
/* Get value of string with URLFormat 
    Example: &var1=mi_var1&var2=mi_var2&var3=mi_var3
            cuppa.urlValue('var2')
            return mi_var2
*/
	cuppa.urlValue = function(name, url){
        if(!url) url = cuppa.getPath();
        /* new way
            var url = new URL(url);
            var value = url.searchParams.get(name);
            return value;
        */
		var regexS = "[\\?&]"+name+"=([^&#]*)";
		var regex = new RegExp (regexS);
		var tmpURL = url;
        var result = regex.exec(tmpURL);
        if(result == null) return "";
            result = result[1];
            result = cuppa.replace(result, "%20", " ");
            result = cuppa.replace(result, "\\+", " ");
		return result;
	};
/* Short Object ASC or DESC */
    cuppa.shortObject = function(object, reverse){
        var keys = Object.keys(object);
        keys.sort();
        if(reverse) keys.reverse();
        var tmpObject = {}
        for(i = 0; i < keys.length; i++){
            tmpObject[keys[i]] = object[keys[i]];
        };
       return tmpObject;
    };
// swich img.svg to svg
cuppa.imgToSVG = cuppa.img2SVG = function(elements, callback){
    if(!elements) elements = ".svg";
    elements = cuppa.element(elements);
    for(var i = 0; i < elements.length; i++){
        cuppa.svgSwitch(elements[i], callback);
    };
};
    cuppa.svgSwitch = function(element, callback){
        var src = element.getAttribute("src"); if(!src) return;
        var classNames = element.getAttribute("class");
        var request = new XMLHttpRequest();
            request.onload = onComplete;
            request.open("GET", element.getAttribute("src"));
            request.send();
            function onComplete () {
                var parent = element.parentNode;
                var temp = document.createElement('div');
                    temp.innerHTML = this.responseText;
                var svg = temp.querySelector("svg");
                    if(!svg){ log("[cuppa.svgSwitch] error to load SVG on: ",element); return; }
                    svg.setAttribute("class", classNames);
                    if(classNames && parent) parent.replaceChild(svg, element);
                if(callback) callback(svg);   
            };
    };
/* menu
    type:1, menuAnchor:".cu-menu-anchor"
*/
    cuppa.menu = function(opts){
        this.opts = {type:1, menu:'.cu-menu', anchor:".cu-menu-anchor"};
        this.opts = cuppa.mergeObjects([this.opts, opts]);
        this.element = cuppa.element(this.opts.menu, {query:true})[0];
        this.anchor = cuppa.element(this.opts.anchor, {query:true})[0];
        if(!this.element) return;
        // show fixed menu if anchor.y <= 0;
        // show normal menu if scroll.y = 0;
        this.type1 = function(){
            var scrollPos = cuppa.scrollPosition();
            if(!this.anchor) return;
            var anchorPos = cuppa.dim(this.anchor);
            if(anchorPos.y3 <= 0){
                if(this.element.fixed) return;
                this.element.fixed = true;
                var dim = cuppa.dim(this.element);
                cuppa.addClass(this.element, "cu-menu-fixed-top");
                TweenMax.killTweensOf(this.element);
                var tl = new TimelineMax();
                    tl.fromTo(this.element, 0.4, {top:-dim.height},{top:0});
            }else if(!scrollPos.y){
                if(!this.element.fixed) return;
                this.element.fixed = false;
                cuppa.removeClass(this.element, "cu-menu-fixed-top");
            }
        }.bind(this);

        this.onScroll = function(e){
            if(this.opts.type == 1) this.type1();
        }.bind(this); cuppa.scroll(this.onScroll); this.onScroll();

        

        /*
        if(!element) element = ".cu-menu";
        element = cuppa.element(element, {query:true})[0];
        if(!element) return;
        function onScroll(e){
            var pos = cuppa.scrollPosition();
            if(opts.type == 1){
                var m
            }
        //}; cuppa.scroll(onScroll); onScroll();
        //function
        */
    };
/* footer fixed */
    cuppa.footerFixed = function(element){
        if(!element) element = ".footer-fixed";
        element = cuppa.element(element, {query:true})[0];
        if(!element) return;
        function ajust(e){
            var dim = cuppa.dim(element);
            cuppa.css(document.body, {"margin-bottom":dim.height+"px"});
        }; cuppa.on(window, "resize", ajust); cuppa.on(window, "load", ajust); ajust();
    }
/* autoDimention 
    Example:
    <div data-cu-height="100%">
    <script> cuppa.autoDimention(); </script>
*/
    cuppa.autoDimention = function(elements){
        this.elements = elements;
        // get elements in dom
            if(this.elements == undefined){
                this.elements = [];
                this.elements = this.elements.concat(cuppa.element("[data-cu-height]"));
                this.elements = this.elements.concat(cuppa.element("[data- data-cu-width]"));
            };
        // resize
            this.resize = function(){
                for(var i = 0; i < this.elements.length; i++){
                    var element = this.elements[i];
                    var dim = cuppa.dim(element);
                    // height
                        var attr = element.getAttribute("data-cu-height");
                        if(attr){
                            if(cuppa.search("%", attr)){
                                var value = dim.width*(parseFloat(attr)/100);
                                cuppa.css(element,{height:value+"px"});
                            };
                            if(cuppa.search("vh", attr)){
                                var value = cuppa.height()*(parseFloat(attr)/100);
                                cuppa.css(element,{height:value+"px"});
                            };
                            if(cuppa.search("vw", attr)){
                                var value = cuppa.width()*(parseFloat(attr)/100);
                                cuppa.css(element,{height:value+"px"});
                            };
                        };
                    // width
                        var attr = element.getAttribute("data- data-cu-width");
                        if(attr){
                            if(cuppa.search("vw", attr)){
                                var percent = parseFloat(attr)/100;
                                var width = cuppa.width()*percent;
                                cuppa.css(element,{"width":width+"px"});
                                cuppa.css(element,{"margin-left":"0px"});
                                var dim = cuppa.dim(element);
                                var x = -dim.x + ( cuppa.width() - width )*0.5;
                                cuppa.css(element, {"margin-left":x+"px"});
                            };
                            if(cuppa.search("%", attr)){
                                var percent = parseFloat(attr)/100;
                                var parent = cuppa.parent(element);
                                var dim = cuppa.dim(parent);
                                cuppa.css(element,{width:dim.width*percent+"px"});
                            };
                        };
                };
            }.bind(this); window.addEventListener("resize", this.resize); this.resize();
    }; cuppa.autoDim = function(elements){ new cuppa.autoDimention(elements); };
/* is Mobile */
    cuppa.isMobile = function() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };
// Touch support
    cuppa.isTouch = cuppa.touchSupport = function() {
        if ('ontouchstart' in document.documentElement) { return true; }else{ return false; }
    };
/* flash support */
    cuppa.flashSupport = function(){
        var hasFlash = false;
        try {
            var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
            if (fo) { hasFlash = true; }
        } catch (e) {
            if (navigator.mimeTypes && navigator.mimeTypes['application/x-shockwave-flash'] != undefined && navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin) {
                hasFlash = true;
            };
        };
        return hasFlash;
    };
/* join an array / object in a string */
    cuppa.join = function(item, glue){
        if(glue == undefined) glue = ",";
        var string = "";
        var arr = Object.keys(item).map(function (key) { return item[key]; });
            arr.forEach(function(item, index){
                if(index) string += glue;
                string += item;
            });
        return string;
    };
/* parseFloat */
    cuppa.toNumber = function(string){
        if(isNaN(string) || !string) return 0;
        else return parseFloat(string);
    };
    cuppa.parseFloat = function(string){ return cuppa.toNumber(string); }
/* isNumber */
    cuppa.isNaN = function(value){
        return isNaN(parseFloat(value));
    };
/* parseFloat */
    cuppa.toNumber = function(string){
        if(isNaN(string) || !string) return 0;
        else return parseFloat(string);
    };
    cuppa.parseFloat = function(string){ return cuppa.toNumber(string); }
/* scroll */
    cuppa.scroll = function(callback, element){
        if(!element || element == "body") element = window;
        element.addEventListener('scroll', callback);
    };
    // get Position
    cuppa.scrollPosition = function(element){
        var pos = {x:0, y:0}
        if(!element || element == "body" || cuppa.elementType(element) == "body" || element == window){
            pos.x = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
            pos.y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
        }else{
            pos.x = element.scrollLeft;
            pos.y = element.scrollTop;
        };
        return pos;
    };
    // get Percent
    cuppa.scrollPercent = function(element){
        if(element == undefined) element = document.body;
        var element = cuppa.element(element)[0];
        var percent = {x:0, y:0};
        var position = cuppa.scrollPosition(element);
            // x
            percent.x = position.x / (element.clientWidth - window.innerWidth);
            if(percent.x < 0) percent.x = 0; if(percent.x > 1) percent.x = 1;
            // y
            percent.y = position.y / (element.clientHeight - window.innerHeight);
            if(percent.y < 0) percent.y = 0; if(percent.y > 1) percent.y = 1;
        return percent;
    }
    /* move
        opts = {
            x:0, // -1 or null or 'dont set' = no scrolling
            y:0, // -1 or null or 'dont set' = no scrolling
            duration:0.3,
            ease:Cubic.easeInOut,
            percent:false, // if true x & y =  0 to 1
            progressCallback:function,
            completeCallback:function,
        }
    */
    cuppa.scrollMove = function(target, opts){
        if(!target) target = document.body;
        else target = cuppa.element(target, {returnType:"first"});
        if(!target) return;
        var scrollX = true, scrollY = true;
        if(opts == undefined) opts = {x:null, y:0};
        if(opts.x == undefined || opts.x == null || opts.x == -1){ scrollX = false; opts.x = 0; }
        if(opts.y == undefined || opts.y == null || opts.y == -1){ scrollY = false; opts.y = 0; }
        // opts
            opts.target = target;
            opts = opts || {};
            opts.duration = (opts.duration == undefined) ? 0.3 : opts.duration;
            opts.ease = opts.ease || Linear.easeNone;
            opts.percent = opts.percent || false;
        // percent
            if(opts.percent){
                var dim = cuppa.dim(target);
                if(cuppa.elementType(target) == "body"){
                    opts.x = (dim.width-window.innerWidth)*opts.x;
                    opts.y = (dim.height-window.innerHeight)*opts.y;
                }else{ 
                    opts.x  = 0; opts.y = 0;
                };
            };
        // scroll
            if(cuppa.elementType(target) == "body") target = "html, body";
            if(scrollX && scrollY){
                TweenMax.to(target, opts.duration, { scrollLeft:opts.x, scrollTop:opts.y, ease: opts.ease, onUpdate:onProgress, onUpdateParams:[opts], onComplete:onComplete, onCompleteParams:[opts] } );
            }else if(scrollX){
                TweenMax.to(target,  opts.duration, { scrollLeft:opts.x, ease: opts.ease, onUpdate:onProgress, onUpdateParams:[opts], onComplete:onComplete, onCompleteParams:[opts] } );
            }else if(scrollY){
                TweenMax.to(target,  opts.duration, { scrollTop:opts.y, ease: opts.ease, onUpdate:onProgress, onUpdateParams:[opts], onComplete:onComplete, onCompleteParams:[opts] } );
            };
        function onProgress(opts){ if(opts.progressCallback) opts.progressCallback(opts); };
        function onComplete(opts){ if(opts.completeCallback) opts.completeCallback(opts); };
    }; 
    cuppa.moveScroll = function(target, opts){ cuppa.scrollMove(target, opts); };
/* Visible on screen
    element: html node
    threshold: 0 (number)
    mode: visible, above, below
*/
   cuppa.visible = function(element, threshold, mode) {
      threshold = threshold || 0;
      mode = mode || 'visible';
      var rect = element.getBoundingClientRect();
      var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
      var above = rect.bottom - threshold < 0;
      var below = rect.top - viewHeight + threshold >= 0;
      return mode === 'above' ? above : (mode === 'below' ? below : !above && !below);
    };
/* animate
    class='cu-tweenmax'
    attributes
        data-a-init='y:200, alpha:0' 
        data-a-to='y:-100, alpha:1, duration:0.8, ease:Cubic.easeOut,' 
        data-a-to-2='y:0, ease:Cubic.easeOut' 
        data-a-gap="100" 
        // animate number
            data-a-to='numberTo:200, duration:2, ease:Cubic.easeOut' 
            data-a-to-2='numberFrom:200, numberTo:400, duration:2, ease:Cubic.easeOut' 
*/
    cuppa.tweenmax = function(elements){
        this.windowLoaded = false;
        // init
        this.elements = elements;
        if(!this.elements) this.elements = document.getElementsByClassName("cu-tweenmax");
        for(var i = 0; i < this.elements.length; i++){
            var element = this.elements[i];
            var paramsString = element.getAttribute("data-a-init");
            if(paramsString){
                var tmp = paramsString.split(",");
                var params = {};
                    tmp.map(function(element){ 
                        var tmp2 = element.split(":"); 
                        var key = cuppa.trim(tmp2[0]);
                        var value = cuppa.trim(tmp2[1]);
                        if(isNaN(value)) params[key] = value; 
                        else if(key && value != undefined) params[key] = cuppa.parseFloat(value); 
                    });
                TweenLite.set(element, params);
            };
            // if data-a-init-child set, get childrens
            var paramsStringChild = element.getAttribute("data-a-init-child");
            if(paramsStringChild){
                var childrens = element.children;
                var tmp = paramsStringChild.split(",");
                var params = {};
                    tmp.map(function(element){ 
                        var tmp2 = element.split(":"); 
                        var key = cuppa.trim(tmp2[0]);
                        var value = cuppa.trim(tmp2[1]);
                        if(isNaN(value)) params[key] = value; 
                        else if(key && value != undefined) params[key] = cuppa.parseFloat(value); 
                    });
                TweenLite.set(childrens, params);
            };
        };
        // scroll
        this.scroll = function(){
            for(var i = 0; i < this.elements.length; i++){
                var element = this.elements[i];
                var gap = cuppa.parseFloat(element.getAttribute("data-a-gap")) || 0;
                var visible = cuppa.visible(element, gap);
                var start = element.getAttribute("data-a-start");
                if(start == "load" && !this.windowLoaded) return;
                if(visible && !element.animated){
                    element.animated = true;
                    var timeLineOptions = this.getAttrData(element, "data-a-opts");
                    element.timeline = new TimelineMax(timeLineOptions);
                    element.timelineNumber = new TimelineMax(timeLineOptions);
                    var params = this.getParams(element);
                    for(var j = 0; j < params.length; j++){
                        element.timeline.to(element, params[j].duration, params[j].params);
                        // animate numbers
                            if(params[j].numberTo){
                                var n1 = { value: params[j].numberFrom || parseInt(element.innerHTML) };
                                element.timelineNumber.to(n1, params[j].duration, {value: params[j].numberTo, delay:params[j].params.delay, ease:params[j].params.ease, onUpdateParams:[n1, element], 
                                    onUpdate: function (number, element) {
                                        element.innerHTML = Math.ceil(number.value);
                                    }
                                });
                            }
                    };
                    var childParams = this.getChildParams(element);
                    if(childParams){
                        TweenMax.staggerTo(element.children, childParams.duration, childParams.params, childParams.stagger);
                    };
                };
            };
        }.bind(this);
        // getParams
        this.getParams = function(element){
            var data = [];
            var index = 1;
            while(index > 0){
                var paramsStr;
                var attr = "data-a-to-"+index;
                if(index == 1) paramsStr = element.getAttribute("data-a-to");
                else paramsStr = element.getAttribute(attr);
                if(!paramsStr){ index = 0; break; }
                params = paramsStr.split(",");
                var tween = {duration:0.6, params:{}};
                for(var j = 0; j < params.length; j++){
                    var tmp2 = params[j].split(":"); 
                    var key = cuppa.trim(tmp2[0]);
                    var value = cuppa.trim(tmp2[1]);
                    if(key == "duration") tween.duration = cuppa.parseFloat(value);
                    else if(key == "numberFrom") tween.numberFrom = cuppa.parseFloat(value);
                    else if(key == "numberTo") tween.numberTo = cuppa.parseFloat(value);
                    else if(key == "number") tween.numberTo = cuppa.parseFloat(value);
                    else if(value == "true") opts[key] = true;
                    else if(value == "false") opts[key] = false;
                    else if(isNaN(value)) tween.params[key] = value;
                    else if(key && value != undefined) tween.params[key] = cuppa.parseFloat(value); 
                };
                data.push(tween);
                index++;
            };
            return data;
        }.bind(this);
        // getAttrData
        this.getAttrData = function(element, attr){
            var opts = {};
            var attr = cuppa.attr(element, "data-a-opts");
                if(!attr) return opts;
                attr = attr.split(",");
            for(var j = 0; j < attr.length; j++){
                try{
                    var tmp2 = attr[j].split(":"); 
                    var key = cuppa.trim(tmp2[0]);
                    var value = cuppa.trim(tmp2[1]);
                    if(value == "true") opts[key] = true;
                    else if(value == "false") opts[key] = false;
                    else if(isNaN(value)) opts[key] = value;
                    else if(key && value != undefined) opts[key] = cuppa.parseFloat(value); 
                }catch(err){ }
            };
            return opts;
        }.bind(this);
        // getChild Params
        this.getChildParams = function(element){
            var params = element.getAttribute("data-a-stagger-child");
            if(!params) return;
                params = params.split(",");
            var tween = {duration:0.6, params:{}, stagger:0.2};
            for(var j = 0; j < params.length; j++){
                var tmp2 = params[j].split(":"); 
                var key = cuppa.trim(tmp2[0]);
                var value = cuppa.trim(tmp2[1]);
                if(key == "duration") tween.duration = cuppa.parseFloat(value);
                else if(key == "stagger") tween.stagger = cuppa.parseFloat(value);
                if(value == "true") tween.params[key] = true;
                else if(value == "false") tween.params[key] = false;
                else if(isNaN(value)) tween.params[key] = value;
                else if(key && value != undefined) tween.params[key] = cuppa.parseFloat(value); 
            };
            return tween;
        }.bind(this);
        cuppa.scroll(this.scroll); this.scroll();
        // windowLoaded
        this.onLoaded = function(e){
            cuppa.off(window, "load", this.onLoaded);
            this.windowLoaded = true;
            this.scroll();
        }.bind(this); cuppa.on(window, "load", this.onLoaded);

    };
/* Packery
    Example:  new cuppa.packery();
    <div class="cu-packery">
        div class="item" style="width:50%; height:400px;"></div>
        <div class="item" style="width:25%; height:200px;"></div>
        <div class="item" style="width:25%; height:200px;"></div>
    </div>
*/
    cuppa.packery = function(elements, opts){
        if(this.elements == undefined) this.elements = ".cu-packery";
        this.elements = cuppa.element(this.elements);
        this.opts = opts || {};
        this.opts.itemSelector = this.opts.itemSelecto || '.item';
        this.opts.transitionDuration = this.opts.transitionDuration || 0;
        this.ajust = function(){
            for(var i = 0; i < this.elements.length; i++){
                var element = this.elements[i];
                var pckry = new Packery(element, this.opts);
            };
        }.bind(this); this.ajust();
        cuppa.on(window, "resize", this.ajust);
    };
/* layers 
    opts = {
        duration:0.2
        target:window
    }
*/
    cuppa.layer = function(elements, opts){
        this.opts = opts || {};
        this.opts.duration = this.opts.duration || 0.2;
        this.opts.target =this.opts.target || document;
        //header1 wrapp
        this.elements = elements;
        if(!this.elements) this.elements = document.getElementsByClassName("cu-layer");
        for(var i = 0; i < this.elements.length; i++){
            var element = this.elements[i];
            var xRange = element.getAttribute("data-x-range");
            var yRange = element.getAttribute("data-y-range");
            var xRotate = element.getAttribute("data-x-rotate");
            var yRotate = element.getAttribute("data-y-rotate");
            if(xRange){ 
                element.xRange = xRange.split(",");
                    element.xRange[0] = parseFloat(element.xRange[0]);
                    element.xRange[1] = parseFloat(element.xRange[1]);
            }
            if(yRange){
                element.yRange = yRange.split(",");
                element.yRange[0] = parseFloat(element.yRange[0]);
                element.yRange[1] = parseFloat(element.yRange[1]);
            }
            if(xRotate){
                element.xRotate = xRotate.split(",");
                element.xRotate[0] = parseFloat(element.xRotate[0]);
                element.xRotate[1] = parseFloat(element.xRotate[1]);
            }
            if(yRotate){
                element.yRotate = yRotate.split(",");
                element.yRotate[0] = parseFloat(element.yRotate[0]);
                element.yRotate[1] = parseFloat(element.yRotate[1]);
            }
        };
        this.mouseMove = function(e){
            var percX = cuppa.percent(e.screenX, 0, cuppa.width());
            var percY = cuppa.percent(e.screenY, 0, cuppa.height());
            for(var i = 0; i < this.elements.length; i++){
                var element = this.elements[i];
                if(element.xRange){
                    var posX = cuppa.random(element.xRange[0], element.xRange[1], percX);
                    TweenMax.to(element, this.opts.duration, {x:posX});
                }
                if(element.yRange){
                    var posY = cuppa.random(element.yRange[0], element.yRange[1], percY);
                    TweenMax.to(element, this.opts.duration, {y:posY});
                }
                if(element.xRotate){
                    var value = cuppa.random(element.xRotate[0], element.xRotate[1], percX);
                    TweenMax.set(element, {transformPerspective:600})
                    TweenMax.to(element, this.opts.duration, {rotationY:value});
                }
                if(element.yRotate){
                    var value = cuppa.random(element.yRotate[0], element.yRotate[1], percY);
                    TweenMax.set(element, {transformPerspective:600});
                    TweenMax.to(element, this.opts.duration, {rotationX:value});
                }
            }
        }.bind(this); 
        this.opts.target.addEventListener("mousemove", this.mouseMove);
    };
/* responsive image */
    cuppa.responsiveImage = function(elements, opts){ 
        this.opts = cuppa.mergeObjects([{property:"width"  }, opts]);
        if(elements == undefined) elements = "img.responsive";
        this.elements = cuppa.element(elements);
        this.onLoad = function(element){
            if(element.currentTarget) element = element.currentTarget;
            var noresponsive = ( cuppa.hasClass(element, "noresponsive") || cuppa.hasClass(element, "no-responsive") );
            if(noresponsive) return;
            var dim = cuppa.dim(element);
            if(this.opts.property == "width"){
                var width = dim.width;
                if(!width) width = element.naturalWidth;
                if(width){
                    cuppa.css(element, {width:"100%", "max-width":width+"px", height:"auto"});
                }else{

                }
            };
        }.bind(this);
        cuppa.on(this.elements, "load", this.onLoad);
        this.elements.forEach(this.onLoad);

        //jQuery(element).each(onLoad);
        //jQuery(window).load(function(){ jQuery(element).each(onLoad); });
    };
/* ParallaxBg
    <div class="parallax_bg" style="background-image:url(images/bg.jpg)" >
    new cuppa.parallaxBg('.parallax_bg');
    opts = {}
    opts.invert = false;
*/
    cuppa.parallaxBackground = function(elements, opts){
        if(elements == undefined) elements = ".parallax-bg";
        elements = cuppa.element(elements); if(!elements.length) return;
        this.opts = opts || {};
        this.opts.invert = this.opts.invert || false; 
        this.items = [];
        for(var i = 0; i < elements.length; i++){
            if(elements[i].style.backgroundImage){
                var item = {}
                    item.element = elements[i];
                    item.url = elements[i].style.backgroundImage;
                        item.url = cuppa.replace(item.url, 'url\\("', '');
                        item.url = cuppa.replace(item.url, '"\\)', '');
                        item.url = cuppa.replace(item.url, 'url\\(', '');
                        item.url = cuppa.replace(item.url, '\\)', '');
                    item.img = cuppa.newElement("<img src='"+item.url+"' class='parallax-bg-img no-responsive' style='display:none; position: absolute; top: 0px; left: 0px; width: 100%; height: auto;' ></img>");
                    cuppa.prepend(item.img,item.element);
                    item.element.style.overflow = "hidden";
                this.items.push(item);
            }
        }
        
        this.onScroll = function(){
            for(var i = 0; i < this.items.length; i++){
                var item = this.items[i];
                var dim = cuppa.dim(item.element);
                var percent = cuppa.percent(dim.y3, -dim.height, window.innerHeight, this.opts.invert);
                if(percent > 1) percent = 1; if(percent < 0) percent = 0;
                var img = item.img;
                var dim_img = cuppa.dim(img);
                var pos = -percent*(dim_img.height - dim.height);
                if(pos > 0) pos = 0;
                img.style.top = pos + "px";
            }
        }.bind(this);
        
        this.resize = function(e){
            for(var i = 0; i < this.items.length; i++){
                var item = this.items[i];
                var dim_ele = cuppa.dim(item.element);
                var dim_img = cuppa.dim(item.img);
                if(dim_ele.height >= dim_img.height-20){
                    TweenMax.set(item.img, {display:"none"});
                }else{
                    TweenMax.set(item.img, {display:"block"});
                    this.onScroll();
                }
            }
        }.bind(this);
        cuppa.scroll(this.onScroll); this.onScroll(); 
        window.addEventListener("load", this.onScroll, true);
        window.addEventListener("resize", this.resize); 
        window.addEventListener("load", this.resize, true);
        this.resize();
        return this;
    };    
    cuppa.parallaxBg = function(elements, options){ new cuppa.parallaxBackground(elements, options); };      
// css
    /* Set / Get
        set 
            element = element || array of elements
        get
            element = element
            opts = {}
            opts.number = false; // true: force to return number
    */
    cuppa.css = function(elements, property, opts){
        if(!elements) return;
        elements = cuppa.element(elements);
        for(var k = 0; k < elements.length; k++){
            var element = elements[k];
            if(typeof(property) == "object"){
                if(!Array.isArray(element)) element = [element];
                for(var i = 0; i < element.length; i++){
                    for (var css in property) { 
                        var value = property[css];
                        var priority = "";
                        if(value){
                            if(value.indexOf("!important") != -1){
                                priority = "important";
                                value = value.replace("!important", "");
                            };
                            element[i].style.setProperty( cuppa.trim(css), cuppa.trim(value), priority);
                        };
                    };
                };
            }else{
                // opts default
                    opts = opts || {};
                    opts.number = opts.number || false;
                // get value
                    try{
                        var style = window.getComputedStyle(element);
                        value = style.getPropertyValue(property);
                        if(opts.number) value = parseFloat(value) || 0;
                    }catch(err){ value = null; };
                return value;
            };
        };
    };
/* maxIndex */
    cuppa.maxZIndex = function(allElements){
        var zIndex = 1;
        var childs;
        if(allElements == undefined) allElements = true;
        if(allElements) childs = cuppa.element("*");
        for(var i = 0; i <  childs.length; i++){
            var child = childs[i];
            var style = getComputedStyle(child);
            var zIndexTemp = cuppa.parseFloat(style.zIndex);
            if(zIndexTemp > zIndex) zIndex = zIndexTemp;
        }
        return zIndex;
    };
/* blur */
    cuppa.blur = function(){
        if (document.activeElement != document.body) document.activeElement.blur();
        cuppa.unselect();
    };
// focus
    cuppa.focus = function(element){ element.focus(); };
/* unselect */
    cuppa.unselect = function(){
        if (document.selection) {
            document.selection.empty();
        }else if( window.getSelection) {
            window.getSelection().removeAllRanges();
        };
    };
/* merge, create a new obj with the values of objs in Array.
    If create_new_object = true, create a new Oject an Add all element to it, else join to the first object all elements
    create_new_object = false
*/
    cuppa.mergeObjects = function(array_objs, create_new_object){
        if(!create_new_object){
            var obj1 = array_objs.shift();
            for(var i = 0; i < array_objs.length; i++){
                var obj = array_objs[i];
                if(obj){ for (var attrname in obj) { obj1[attrname] =  obj[attrname]; } }
            };
            return obj1;
        }else{
            var tmp_obj = {};
            for(var i = 0; i < array_objs.length; i++){
                var obj = array_objs[i];
                if(obj){ for (var attrname in obj) { tmp_obj[attrname] = obj[attrname]; } }
            };
            return tmp_obj;
        };
    }; cuppa.joinObjects = function(array_objs, create_new_object){ return cuppa.mergeObjects(array_objs, create_new_object); };
/* is Mobile */
    cuppa.isMobile = function() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };
/* flash support */
    cuppa.flashSupport = function(){
        var hasFlash = false;
        try {
            var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
            if (fo) { hasFlash = true; }
        } catch (e) {
            if (navigator.mimeTypes && navigator.mimeTypes['application/x-shockwave-flash'] != undefined && navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin) {
                hasFlash = true;
            }
        }
        return hasFlash;
    };
/* WheelSmooth
    var scroll = cuppa.wheelSmooth(target);
        scroll.destroy();
    
    If is used in Body, add the next CSS: body, html{ height: 100%; }
*/
    cuppa.wheelSmooth = function(target, options){
        if(target == undefined) target = document.body;
        // opts
            this.options = options || {};
            this.options.scrollingCallback = this.options.scrollingCallback || null;
            this.options.fricton = this.options.fricton || 0.9;
            this.options.vy = this.options.vy || 0;
            this.options.stepAmt = this.options.stepAmt || 3;
            this.options.minMovement = this.options.minMovement || 0.1;
            this.options.ts = this.options.ts || 0.1;
            this.target = cuppa.element(target, {returnType:"first"});
        // variables
            this.target = target;
            this.container = target;
            this.running = false;
            this.currentY = 0;
            this.targetY = 0;
            this.oldY = 0;
            this.maxScrollTop = 0;
            this.minScrollTop = 0;
            this.direction = 0;
        // methods;
            this.updateScrollTarget = function (amt) {
                this.targetY += amt;
                this.options.vy += (this.targetY - this.oldY) * this.options.stepAmt;
                this.oldY = this.targetY;
            }.bind(this);
            
            this.render = function () {
                if (this.options.vy < -(this.options.minMovement) || this.options.vy > this.options.minMovement) {
                    this.currentY = (this.currentY + this.options.vy);
                    if (this.currentY > this.maxScrollTop) {
                        this.currentY = this.options.vy = 0;
                    } else if (this.currentY < this.minScrollTop) {
                        this.options.vy = 0;
                        this.currentY = this.minScrollTop;
                    }
                    cuppa.scrollMove(this.target, {y:-this.currentY, duration:0});
                    this.options.vy *= this.options.fricton;
                    if(this.options.scrollingCallback){ this.options.scrollingCallback(this); }
                }
            }.bind(this);

            this.animateLoop = function () {
                if(!this.running) return;
                cuppa.requestAnimationFrame(this.animateLoop);
                this.render();
            }.bind(this)
            
            this.onUpdateSize = function () {
                if(this.container.tagName == "BODY") this.container = document.querySelector("html");
                var dim = cuppa.dim(this.container);
                this.minScrollTop = dim.clientHeight - dim.scrollHeight;
            }.bind(this);

            this.onWheel = function (e) {
                this.running = true;
                e.preventDefault();  e.stopPropagation();
                var evt = e.originalEvent;
                this.onUpdateSize();
                var delta = 0;
                    if(e.detail) delta = -1*e.detail;
                    if(e.deltaY) delta = 1*e.deltaY/40;
                    if(e.wheelDelta) delta = 1*e.wheelDelta/40;
                var dir = delta < 0 ? -1 : 1;
                if (dir != this.direction) { 
                    this.options.vy = 0;
                    this.direction = dir;
                }
                this.currentY = -cuppa.scrollPosition(this.target).y;
                this.delta = delta;
                this.updateScrollTarget(delta);
            }.bind(this);

            this.destroy = function(){
                this.container.removeEventListener("mousewheel", this.onWheel);
                this.container.removeEventListener("DOMMouseScroll", this.onWheel);
                window.removeEventListener("resize", this.onUpdateSize); 
            }.bind(this);

            this.addEvents = function(){
                 this.container.addEventListener("mousewheel", this.onWheel);
                 this.container.addEventListener("DOMMouseScroll", this.onWheel);
                 window.addEventListener("resize", this.onUpdateSize); 
            }.bind(this);

        // init
            this.destroy(); this.addEvents(); this.onUpdateSize();
            var pos = cuppa.scrollPosition(this.container);
            this.targetY = this.oldY = pos.y; this.currentY = -this.targetY;
            if(this.options.scrollingCallback) this.options.scrollingCallback();
            if(!this.running){ this.running = true; this.animateLoop(); }
        return this;
    };
    cuppa.wheelSmoothDisable = function(target){
        if(target == undefined) target = document.body;
        //$(target).smoothWheelRemove();
    };
/* requestAnimationFrame */
    cuppa.requestAnimationFrame = function (callback) {
        window.requestAnimationFrame(callback) ||
        window.webkitRequestAnimationFrame(callback) ||
        window.mozRequestAnimationFrame(callback) ||
        window.oRequestAnimationFrame(callback) ||
        window.msRequestAnimationFrame(callback) ||
        function (callback) { window.setTimeout(callback, 1000 / 60);  }; 
    };
/* Set Cookie, By default, the cookie is deleted when the browser is closed */
	cuppa.setCookie = function(name, value, exdays) {
	   if(exdays){
            var exdate = new Date();
                exdate.setDate(exdate.getDate() + exdays);
            var value = escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
            document.cookie = name + "=" + value + ";path=/";
        }else{
            document.cookie = name + "=" + value + ";path=/";
        }
	};
/* Get Cookie */
	cuppa.getCookie = function(name) {
		var results = document.cookie.match ( '(^|;) ?' + name + '=([^;]*)(;|$)' );
		if ( results ) return ( unescape ( results[2] ) );
		else return null;
	};
/* Delete Cookie*/ 
	cuppa.deleteCookie = function(name){
		var cookie_date = new Date ( );  // current date & time
		cookie_date.setTime ( cookie_date.getTime() - 1 );
		document.cookie = name += "=; expires=" + cookie_date.toGMTString();
	};
 // local / session storage
    cuppa.sessionStorage = function(name, value, cookie){
        if(cookie == undefined) cookie = true;
        if(value == undefined){ 
            return sessionStorage.getItem(name);
        }else{ 
            sessionStorage.setItem(name, value);
            if(cookie) cuppa.setCookie(name, value);
        };
    };
    cuppa.localStorage = function(name, value, cookie){
        if(cookie == undefined) cookie = true;
        if(value == undefined){ 
            return localStorage.getItem(name);
        }else{ 
            localStorage.setItem(name, value);
            if(cookie) cuppa.setCookie(name, value);
        };
    };
/* Config URL Friendly HTML5
    setParams params: { path:string, title:string, data:object }
 */ 
    cuppa.getPath = function(returnArray){
        var basePath = document.querySelector("base");
        var path = window.location.href;
        if(basePath) path = cuppa.replace(path, basePath.getAttribute("href"), "");
        if(returnArray) path = path.split("/");
        return path;
    };
    cuppa.setPath = function(path, title, callback){
        if(title == undefined) title = ""; if(path == undefined || path == "") path = " ";
        window.history.pushState(path, title, path);
        if(callback) callback();
    };
    cuppa.back = function(){
        window.history.back();
    };
    cuppa.forward = function(){
        window.history.forward();
    };
    cuppa.getPathData = function(path, opts){
        if(!path) path = cuppa.getPath();
        opts = cuppa.mergeObjects([{removeFirst:false}, opts]);
        var obj = {url:path};
        // get base
            base = path;
            if(base.indexOf("?") != -1) base = base.substr(0, base.indexOf("?"));
            if(base.indexOf("#") != -1) base = base.substr(0, base.indexOf("#"));
            obj.base = base;
            obj.baseArray = base.split("/");
            // remove first
                if(opts.removeFirst){ 
                    obj.baseArray.shift();
                    obj.base = obj.baseArray.join("/");
                }
        // get data
            var dataStr = path;
            if(dataStr.indexOf("?") != -1 || dataStr.indexOf("#") != -1){
                if(dataStr.indexOf("?") != -1) dataStr = dataStr.substr(path.indexOf("?")+1);
                if(dataStr.indexOf("#") != -1) dataStr = dataStr.substr(path.indexOf("#")+1);
                var dataArray = dataStr.split("&");
                var data = {};
                for(var i = 0; i < dataArray.length; i++){
                    var parts = dataArray[i].split("=");
                    if(parts[0]) data[parts[0]] = parts[1] || '';
                };
                obj.data = data;
            }else{ obj.data = {}; };
        return obj;
    };
    cuppa.pathData = function(path, opts){ return cuppa.getPathData(path, opts); };
/* sumArray */
    cuppa.sumArray = function(data){
        var total = 0;
        for(var i = 0; i < data.length; i++){ total += parseFloat(data[i]); }
        return total;
    };
// part of Number
    cuppa.numberParts = function(number){
        var parts = String(number).split(".");
        parts[0] = (parts[0]) ? parseFloat(parts[0]): 0;
        parts[1] = (parts[1]) ? parseFloat("."+parts[1]): 0;
        return parts;
    };
/* managerURL
*   new cuppa.managerURL(opts);
*   opts = {
*       autoInit:true;
*       updateLinks:true;
*       callback:Function
*   }
* */
    cuppa.managerURL = new function(opts){
        this.opts = cuppa.mergeObjects([{updateLinks:false, autoInit:true }, opts]);
        this.titles = {};
        this.path;
        this.pathArray;
        this.callbacks = [];
        // setPath
            this.setPath = function(path, title){
                if(path != undefined) cuppa.setPath(path, title);
                this.path = cuppa.getPath();
                this.pathArray = cuppa.getPath(true);
                if(title) document.title = title;
                if(this.opts.callback) this.opts.callback(this.path, this.pathArray);
                cuppa.dispatchEvent({ type: "URL_CHANGE", message: this });
                cuppa.dispatchEvent({ type: "CHANGE_URL", message: this });
                for(var i = 0; i < this.callbacks.length; i++){
                    try{ this.callbacks[i](this.path, this.pathArray); }catch(err){ }
                }
            }.bind(this);
            this.set = function(path, title){ this.setPath(path, title); }.bind(this);
        // Auto configure 'a' tags
            this.updateLinks = function(elements){
                if(!elements) elements = cuppa.element("a");
                cuppa.on(elements, "click", this.onClick);
            }.bind(this);
            this.update = function(elements){ this.updateLinks(elements); }.bind(this);

            this.onClick = function(e){
                var element = e.currentTarget;
                var href = element.getAttribute("href");
                var target = element.getAttribute("target");
                var title = element.getAttribute("title");
                if(href == undefined || href.search("http") != -1) return;
                if(target && target != "_self") return;
                e.preventDefault();
                this.setPath(href, title);
            }.bind(this);

            if(this.opts.updateLinks) this.updateLinks();
        // onHistory
            this.onHistory = function(e){
                this.path = e.state || "";
                this.pathArray = this.path.split("/");
                if(this.opts.callback) this.opts.callback(this.path, this.pathArray);
                cuppa.dispatchEvent({ type: "URL_CHANGE", message: this });
                cuppa.dispatchEvent({ type: "CHANGE_URL", message: this });
                for(var i = 0; i < this.callbacks.length; i++){
                    try{ this.callbacks[i](this.path, this.pathArray); }catch(err){ }
                }
            }.bind(this);
            cuppa.on(window, "popstate", this.onHistory);
        // addCallback
            this.addCallback = function(callback){
                this.callbacks.push(callback);
            }.bind(this);
        // init
            if(this.opts.autoInit) this.setPath();
        return this;
    }; cuppa.path = cuppa.managerURL;
/* ajax
    opts{
        data:Object
        callback:Function
        method:"POST" // GET
        async: true // true,false
        header:{key:value, key:value}
    }
*/
    cuppa.ajax = function(url, opts, callback){
        // opts
            opts = opts || { };
            opts.method = opts.method || "POST";
            if(opts.async == undefined) opts.async = true;
            var request = new XMLHttpRequest();
                request.open(opts.method, url, opts.async);
            //++ add header
                request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                if(opts.header){
                    for (var key in opts.header) {
                        request.setRequestHeader(key, opts.header[key]);
                    };
                };
            //--
            request.onload = onComplete;
            if(opts.data) request.send(cuppa.objectToURL(opts.data));
            else request.send();
            function onComplete () {
                var result = this.responseText;
                if(opts.callback) opts.callback(result);
                if(callback) callback(result);
            };
        return request;
    };
/* Capitalize */
    cuppa.capitalize = function(string, firstWord) {
        if(firstWord) return string.charAt(0).toUpperCase() + string.slice(1);

        var pieces = string.split(" ");
        for ( var i = 0; i < pieces.length; i++ ) { var j = pieces[i].charAt(0).toUpperCase(); pieces[i] = j + pieces[i].substr(1); }
        return pieces.join(" ");
    }
/* Add EnterFrame listener */
    cuppa.enter_frame_list = [];
    cuppa.enterFrame = function(callback, fps, groupName){ cuppa.addEnterFrame(callback, fps, groupName); }
    cuppa.tick = function(callback, fps, groupName){ cuppa.addEnterFrame(callback, fps, groupName); }
    cuppa.addEnterFrame = function(callback, fps, groupName){
        if(fps == undefined) fps = 60;
        if(groupName == undefined) groupName = "default";
        var fps = (1000/fps)/1000;
        //++ Crate instance
            var instance = {}
                instance.callback = callback;
                instance.fps = fps;
                instance.groupName = groupName;
                instance["function"] = function(instance){ 
                    callback();
                    TweenMax.delayedCall(instance.fps, instance["function"], [instance] );
                };
               instance["function"](instance);
        //--
        cuppa.enter_frame_list.push(instance);
    };
    cuppa.removeEnterFrame = function(callback){
        var i;
        for(i = 0; i < cuppa.enter_frame_list.length; i++){
            var instance = cuppa.enter_frame_list[i];
            if(instance.callback === callback){
                TweenMax.killTweensOf(instance["function"]);
                break;
            };
        };
        cuppa.enter_frame_list.splice(i, 1);
    };
    cuppa.removeEnterFrameGroup = function(groupName){
        if(groupName == undefined) groupName = "default";
        for(i = 0; i < cuppa.enter_frame_list.length; i++){
            var instance = cuppa.enter_frame_list[i];
            if(instance.groupName == groupName){
                TweenMax.killTweensOf(instance["function"]);
            };
        };
    };
/* timer
    timer = new timer(opts);
    opts = { 
        callback:function(item){}
    }
*/
    cuppa.timer = function(opts){
        this.hours = 0; this.minuts = 0; this.seconds = 0;
        this.running = false;
        this.interval;
        this.opts = opts || {};
        this.calculate = function(){
            this.seconds += 1;
            if(this.seconds == 60){
                this.seconds = 0;
                this.minuts +=1;
            }
            if (this.minuts == 60) {
                this.seconds = 0;
                this.minuts = 0;
                this.hours += 1; 
            }
            if(this.opts.callback) this.opts.callback(this);
        }.bind(this);

        this.start = function(reset){
            this.destroy();
            if(reset) this.reset();
            this.interval = setInterval(this.calculate, 1000);
            this.running = true;
            if(this.opts.callback) this.opts.callback(this);
        }.bind(this);

        this.stop = function(reset){
            this.destroy();
            if(reset) this.reset();
            this.running = false;
        }.bind(this);

        this.reset = function(){
            this.hours = 0; this.minuts = 0; this.seconds = 0;
        }.bind(this);

        this.getSeconds = function(){
            return ((this.hours*60*60)+(this.minuts*60)+this.seconds);
        }.bind(this);

        this.destroy = function(){
            if(this.interval){ clearInterval(this.interval); this.interval = null; };
        }.bind(this);
    };
/* cover 
    opts = {
        invert:false, 
        force: width, height
    }
*/
    cuppa.coverImage = function(elements, opts){
        this.opts = opts || {};
        if(elements == undefined) elements = "img.cover";
        this.elements = cuppa.element(elements, {query:true});
        cuppa.css(this.elements, {opacity:0, position:"absolute"});

        this.resize = function(){
            for(var i = 0; i < this.elements.length; i++){
                var element = this.elements[i];
                if(element.realWidth && element.realHeight){
                    var parent = cuppa.parent(element);
                    var parentDim = cuppa.dim(parent);
                    var nDim = cuppa.newDim(element.realWidth, element.realHeight, parentDim.width, parentDim.height, this.opts.invert, this.opts.force);
                    var xPos = (parentDim.width - nDim.width)*0.5;
                    var yPos = (parentDim.height - nDim.height)*0.5;
                    cuppa.css(element, {width:nDim.width+"px", height:nDim.height+"px", left:xPos+"px", top:yPos+"px"});
                }
            }
        }.bind(this); cuppa.on(window, "resize", this.resize);

        this.processImage = function(element){
            if(element.currentTarget) element = element.currentTarget;
            element.realWidth = element.width;
            element.realHeight = element.height;
            this.resize();
            TweenMax.to(element, 0.3, {alpha:1});
        }.bind(this); cuppa.on(this.elements, "load", this.processImage);
        
        cuppa.on(window, "load", function(){
            for(var j = 0; j < this.elements.length; j++){ this.processImage(this.elements[j]); };
        }.bind(this));
    };
/* copy
    element = html node, input, textarea
*/
    cuppa.copy = function(element, opts){
        opts = cuppa.mergeObjects([{success:null, error:null, alert:false, innerHTML:false}, opts]);
        if(opts.callback) opts.success = opts.callback;
        element = cuppa.element(element)[0];
        if(cuppa.elementType(element) != "textarea" && cuppa.elementType(element) != "input"){
            var textArea;
            if(opts.innerHTML) textArea = cuppa.newElement("<textarea style='position:absolute; top:0; left:0; width:0, height:0; opacity:0'>"+element.innerHTML+"</textarea>");
            else  textArea = cuppa.newElement("<textarea style='position:absolute; top:0; left:0; width:0, height:0; opacity:0'>"+element.outerHTML+"</textarea>");
                cuppa.append(textArea, document.body);
                textArea.select();
                try { document.execCommand('copy'); if(opts.success) opts.success(); }catch(err){ if(opts.error) opts.error(); }
                cuppa.remove(textArea);
        }else{
            var textArea = cuppa.newElement("<textarea style='position:absolute; top:0; left:0; width:0, height:0; opacity:0'>"+element.value+"</textarea>");
                cuppa.append(textArea, document.body);
                textArea.select();
                try { document.execCommand('copy'); if(opts.success) opts.success(); }catch(err){ if(opts.error) opts.error(); }
                cuppa.remove(textArea);
        };
        if(opts.alert) alert(opts.alert);
    }.bind(this);
/* anchorSmooth
        element = 'a' default;
*/
    cuppa.anchorSmooth = function(elements, opts){
        this.opts = cuppa.mergeObjects([{ duration:0.7, ease:Expo.easeInOut, gap:0, callback:null }, opts]);
        if(!elements) elements = "a";
        this.elements = cuppa.element(elements);
        this.onClick = function(e){
            var href = cuppa.attr(e.currentTarget, "href");
            if(!href) return;
            var anchor_str = href.split("#");
                anchor_str = anchor_str.pop();
            var anchor = null;
            if(!anchor) anchor = cuppa.element("a[name="+anchor_str+"]")[0];
            if(!anchor) return;

            e.preventDefault();
            var dim = cuppa.dim(anchor);
            cuppa.moveScroll(document.body, { x:0, y:dim.y + this.opts.gap, duration:this.opts.duration, ease:this.opts.ease });
            cuppa.setPath(href);
            if(this.opts.callback) this.opts.callback.callback(anchor_str);
        }.bind(this); cuppa.on(this.elements, "click", this.onClick);
    };
// includeHTML
    cuppa.includeHTML = function(elements, opts){
        //opts = cuppa.mergeObjects([{}, opts]);
        if(!elements) elements = "[cu-include]";
        this.elements = cuppa.element(elements);

        this.process = function(element){
            var url = cuppa.attribute(element, "cu-include");
            cuppa.ajax(url, {callback:function(result){
                var html = cuppa.newElement(result);
                if(cuppa.attribute(element, "cu-replace") != undefined){
                    cuppa.replaceElement(html, element);
                }else{ 
                    cuppa.append(html, element);
                }
            }});
        }.bind(this);
        this.elements.forEach(this.process);
    };
// selectText
    cuppa.selectText = function(element, start, end){
        start = start || 0;
        end = end || element.value.length;
        element.setSelectionRange(start, end);
    };
/* tabs
    <div id="tab1" class="tab" tab-content="#tabContent1" >Tab1</div>
    <div id="tab2" class="tab" tab-content="#tabContent2" >Tab2</div>

    new cuppa.tabs(this.html.querySelectorAll(".tab"), {height:true});

* */
    cuppa.tabs = function(elements, opts){
        this.elements = cuppa.element(elements);
        this.elementContents = [];
        this.opts = cuppa.mergeObjects([{display:"block", height:false}, opts]);

        this.hide = function(elements){
            if(!elements) elements = this.elementContents;
            
            if(this.opts.height) cuppa.css(elements, {height:"0px"});
            else cuppa.hide(elements, {duration:0});
        }.bind(this);

        this.show = function(e){
            if(e.currentTarget) e = e.currentTarget;
            this.hide();
            cuppa.removeClass(this.elements, "selected");
            cuppa.addClass(e, "selected");
            if(this.opts.height) cuppa.css(e.tabContent, {height:"auto"});
            else cuppa.show(e.tabContent, {duration:0});
        }.bind(this);

        // process
            this.elements.forEach(function(item, index){
                // get tab content
                    var tabContent = cuppa.attr(item, "tab-content");
                        tabContent = cuppa.element(tabContent)[0];
                    this.elementContents.push(tabContent);
                    item.tabContent = tabContent;
                // hide tab
                    this.hide();
            }.bind(this));
        // init
            this.show(this.elements[0]);
            cuppa.on(this.elements, "click", this.show);

    };
/* language */
    cuppa.lang = function(){ return (document.documentElement.lang || "").toLowerCase(); };
    cuppa.language = function(){ return cuppa.lang(); }
    cuppa.currentLanguage = function(){ return cuppa.lang(); }
/* accordeon */
    cuppa.accordion = function(element, btn , opts){
        this.element = cuppa.element(element)[0];
        this.btn = cuppa.element(btn)[0];
        this.opts = cuppa.mergeObjects([{init:"collapsed"}, opts]);
        this.childContent = cuppa.childrens(this.element)[0];
        if(this.opts.init == "collapsed") cuppa.css(this.element, {height:"0px"});
        this.element.accordion = this.btn.accordion = this;
        this.open = function(value){
            var dim = cuppa.dim(this.element);
            if(value.currentTarget || value == undefined){
                if(!dim.height) value = true;
                else value = false;
            };
            var dim2 = cuppa.dim(this.childContent );
            TweenMax.killTweensOf([this.element, this.btn]);
            if(value){
                var tl = new TimelineMax();
                    tl.add(function(){ cuppa.addClass([this.element, this.btn], "open") }.bind(this));
                    tl.to(this.element, 0.4, {height:dim2.height, ease:Cubic.easeInOut});
                    tl.set(this.element, {height:"auto"});
            }else{
                var tl = new TimelineMax();
                    tl.set(this.element, {height:dim2.height});
                    tl.to(this.element, 0.4, {height:0, ease:Cubic.easeInOut});
                    tl.add(function(){ cuppa.removeClass([this.element, this.btn], "open") }.bind(this));
            };
        }.bind(this);
        cuppa.on(this.btn, "click", this.open);
    };
/* browser
     cuppa.browser() // return edge
*/
    cuppa.browser = function() {
        userAgentString = navigator.userAgent;
        var browsers = [
            [ 'edge', /Edge\/([0-9\._]+)/ ],
            [ 'yandexbrowser', /YaBrowser\/([0-9\._]+)/ ],
            [ 'vivaldi', /Vivaldi\/([0-9\.]+)/ ],
            [ 'kakaotalk', /KAKAOTALK\s([0-9\.]+)/ ],
            [ 'chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/ ],
            [ 'crios', /CriOS\/([0-9\.]+)(:?\s|$)/ ],
            [ 'firefox', /Firefox\/([0-9\.]+)(?:\s|$)/ ],
            [ 'fxios', /FxiOS\/([0-9\.]+)/ ],
            [ 'opera', /Opera\/([0-9\.]+)(?:\s|$)/ ],
            [ 'opera', /OPR\/([0-9\.]+)(:?\s|$)$/ ],
            [ 'ie', /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/ ],
            [ 'ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/ ],
            [ 'ie', /MSIE\s(7\.0)/ ],
            [ 'bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/ ],
            [ 'android', /Android\s([0-9\.]+)/ ],
            [ 'ios', /Version\/([0-9\._]+).*Mobile.*Safari.*/ ],
            [ 'safari', /Version\/([0-9\._]+).*Safari/ ]
        ];
        return browsers.map(function (rule) {
            if (rule[1].test(userAgentString)) {
                var match = rule[1].exec(userAgentString);
                var version = match && match[1].split(/[._]/).slice(0,3);

                if (version && version.length < 3) {
                    Array.prototype.push.apply(version, (version.length == 1) ? [0, 0] : [0]);
                }

                return {
                    name: rule[0],
                    version: version.join('.')
                };
            }
        }).filter(Boolean).shift();
    };
 /* Get percent betwen 2 range */
    cuppa.percent = function(n, min, max, invert){
        var percent = (n-min)/(max-min);
        if(percent < 0) percent = 0;
        else if(percent > 1) percent = 1;
        if(invert) percent = 1-percent;
        return percent
    };
/* random */
    cuppa.random = function(min, max, percent) { 
        var rand = percent || Math.random();
        return Math.floor(rand * (max - min)) + min;
    };
/* randomString */
    cuppa.randomString = function(length, characters){
        length = length || 5;
        characters = characters ||  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var text = "";
        for( var i=0; i < length; i++ ){
            text += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return text;
    };
/* random color
        alpha: 'random', number (0-1)
*/
    cuppa.randomColor = function(alpha){
        if(alpha == undefined) alpha = Math.random();
        var color =  "rgba("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+alpha+")";
        return color;
    };
/* Get new dimensions 
    force:width,height
*/
    cuppa.newDim = function(width, height, new_width, new_height, invert, force){ return cuppa.newDimensions(width, height, new_width, new_height, invert, force); }
	cuppa.newDimensions = function(width, height, new_width, new_height, invert, force) {
		if(!invert) invert = false;
        width = parseFloat(width); height = parseFloat(height); new_width = parseFloat(new_width); new_height = parseFloat(new_height);
		var porcent = 1 + ((new_width - width) / width);
        if(force == "width"){
            var porcent = 1 + ((new_width - width) / width);
                new_width = width*porcent;
				new_height = height*porcent;
                return {width:new_width, height:new_height, scale:porcent}
        }else if(force == "height"){
            var porcent = 1 + ((new_height - height) / height);
                new_width = width*porcent;
                new_height = height*porcent;
                return {width:new_width, height:new_height, scale:porcent}
        }
        
		if(!invert){
			if(height*porcent >= new_height){
				new_width = width*porcent;
				new_height = height*porcent;
			}else{
				porcent = 1 + ((new_height - height)/height);
				new_width = width*porcent;
				new_height = height*porcent;
			}
		}else{
			if(height*porcent <= new_height){
				new_width = width*porcent;
				new_height = height*porcent;
			}else{
				porcent = 1 + ((new_height - height)/height);
				new_width = width*porcent;
				new_height = height*porcent;
			}
		}
		return {width:new_width, height:new_height, scale:porcent}
	};
  /* Get real dimentions
   *  Recomendable add all inner element inside the container without scroll "wrapper"
   */
    cuppa.dim = function(element){ return cuppa.dimentions(element); }
    cuppa.dimentions = function(element){
        if(element == undefined || element == "body" ) element = document.body;
        var value = {width:0, height:0, x:0, y:0 };
        // change parents elements
            var parents = cuppa.parents(element);
            var tmpParents = new Array();
            for(var i = 0; i < parents.length; i++){ if( cuppa.css(parents[i], "display") == "none" ) tmpParents.push(parents[i]); }
            if(cuppa.css(element, "display") == "none") tmpParents.push(element);
            cuppa.css(tmpParents, {display:"block", visibility:"hidden"});
            
            var clientRect = element.getBoundingClientRect();
            var scrollPos = cuppa.scrollPosition();
            var style = getComputedStyle(element);
        // x,y (position from init of document) - not work
            value.x = clientRect.left + window.scrollX;
            value.y = clientRect.top + window.scrollY;
        // x2,y2 (position from parent element) - work
            value.x2 = element.offsetLeft; 
            value.y2 = element.offsetTop;
        // x3,y3 (fixed position on window) - work
            value.x3 = clientRect.left; 
            value.y3 =  clientRect.top;
        // dimentions, + border, + padding
            value.width = element.offsetWidth;
            value.height = element.offsetHeight;
        // dimentions, - border, - padding 
            value.width2 = element.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
            value.height2 = element.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
        // dimentions, - border
            value.width3 = element.clientWidth;
            value.height3 = element.clientHeight;
        // dimentions, + border, + padding, + margin 
            value.width4 = element.offsetWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight);
            value.height4 = element.offsetHeight + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
        // scroll dimensions
            value.scrollWidth = element.scrollWidth;
            value.scrollHeight = element.scrollHeight;
        // client dimentions
            value.clientWidth = element.clientWidth;
            value.clientHeight = element.clientHeight;
        // return parents to default
            cuppa.css(tmpParents, {display:"none", visibility:"visible"});
        return value;
    };
// width / height
    cuppa.width = function(outer){ 
        if(outer) return window.innerWidth;
        else return document.documentElement.clientWidth; 
    }
    cuppa.height = function(outer){ 
        if(outer) return window.innerHeight;
        else return document.documentElement.clientHeight;
    }
// Get arc params
    cuppa.arcParams = function(x, y, radius, startAngle, endAngle){
        function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
            var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
            return {
                x: centerX + (radius * Math.cos(angleInRadians)),
                y: centerY + (radius * Math.sin(angleInRadians))
            };
        };
        var start = polarToCartesian(x, y, radius, endAngle);
        var end = polarToCartesian(x, y, radius, startAngle);
        var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
        var d = [
            "M", start.x, start.y, 
            "A", radius, radius, 0, arcSweep, 0, end.x, end.y,
            "L", x,y,
            "L", start.x, start.y
        ].join(" ");
        return d;       
    };
// Get the oposite dimention of a triangle rectangle
    cuppa.getOpositeDimention = function(longitude, angle){
        angle = (angle/180)*Math.PI;
        var A = angle;
        var b = longitude;
        var C = 90;
        var B = 180-C-Math.abs(A);
        var c = b/Math.cos(A);
        var a =b*Math.tan(A); 
        return a;
    };
 /* Ace editor, element:textArea
    opts = {
        width:"100%",
        height:"auto",
        mode:"html" (default),
        disable:false,
    }
*/
    cuppa.aceEditor = function(elements, opts, aceOpts){
        this.opts = cuppa.mergeObjects([{width:"100%", height:"auto", mode:"html", disable:false}, opts]);
        this.aceOpts = cuppa.mergeObjects([{
                enableBasicAutocompletion:true, readOnly:false, showPrintMargin:true, displayIndentGuides:true, 
                showLineNumbers:true, showGutter:true, enableSnippets: true, enableLiveAutocompletion: true, theme:"ace/theme/twilight",
                mode:"ace/mode/html"
            }, aceOpts]);
        if(elements == undefined) elements = ".ace";
        this.change = function(e, editor){ editor.textArea.value = editor.getValue(); };
        this.elements = cuppa.element(elements);
        this.elements.forEach(function(element){
            if(!element) return;
            if(element.aceProcessed) return;
            var aceOptions = cuppa.mergeObjects([this.aceOpts,   JSON.parse(cuppa.attribute(element, "ace-opts")) ], true);

            element.aceProcessed = true;
            cuppa.hide(element, {duration:0});
            var div = cuppa.newElement("<div></div>");
                div.element = element;
                cuppa.attribute(div, "id", "ace"+cuppa.unique());
                cuppa.css(div, {width:this.opts.width, height:this.opts.height, overflow:"hidden"});
                cuppa.after(div, element);
            var editor = ace.edit(div);
                editor.textArea = element;
                editor.getSession().setUseWorker(false);
                editor.getSession().setValue(element.value);
                editor.addEventListener('change', this.change);
                editor.setOptions(aceOptions);
                if(this.opts.height == "auto") editor.setOptions({ maxLines: Infinity });
        }.bind(this));
    };
/* Dropdown */
    cuppa.dropdown = function(element, buttonElement, opts){
        this.element = cuppa.element(element)[0];
        this.buttonElement = cuppa.element(buttonElement)[0];
        this.opts = cuppa.mergeObjects([{ scrollClose:true, stopProgation:false, mouseActionOpen:"click", mouseActionClose:"click", display:"block" }, opts]);
        cuppa.css(this.element, {display:"none", opacity:0});
        // open Dropbox
            this.open = function(e){
                if(cuppa.hasClass(this.buttonElement, "cu-drop-open") ){ this.close(); return; }
                cuppa.addClass(this.buttonElement, "cu-drop-open");
                cuppa.addClass(this.element, "cu-drop-open");
                TweenMax.to(this.element, 0.2, {alpha:1, display:this.opts.display});
                cuppa.off(window, this.opts.mouseActionClose, this.close);
                TweenMax.delayedCall(0.1, function(){cuppa.on(window, this.opts.mouseActionClose, this.close); }.bind(this));
                if(this.opts.scrollClose){ cuppa.off(window, "scroll", this.close); cuppa.on(window, "scroll", this.close); };
                if(this.opts.stopProgation) cuppa.on(element, "click", function(e){ e.stopPropagation(); });
            }.bind(this); cuppa.on(this.buttonElement, this.opts.mouseActionOpen, this.open);

        // close Dropbox
            this.close = function(){
                cuppa.removeClass(this.buttonElement, "cu-drop-open");
                cuppa.off(window, this.opts.mouseActionClose, this.close);
                cuppa.off(window, "scroll", this.close);
                TweenMax.killTweensOf(this.element);
                TweenMax.to(this.element, 0.2, {alpha:0, display:"none"});
            }.bind(this);

        this.element.dropdown = this.element.buttonElement = this;
        return this;
    };
/* Serialize forms 
    Cuppa serialize, return the input values on a Object, name:value 
*/
    cuppa.serialize = function(element, json_encode, base64_encode){
        if(json_encode == undefined) json_encode = false;
        if(base64_encode == undefined) base64_encode = true;
        element = cuppa.element(element,{query:true})[0];
        var formItems = element.querySelectorAll("input, textarea, select");
        var object = {}
        for(var i = 0; i < formItems.length; i++){
            var field = formItems[i];
            var name = field.getAttribute("name");
            if(name){
                if(field.getAttribute("type") == "checkbox" ){
                    object[name] = field.checked;
                }else if(field.getAttribute("type") == "radio"){
                    object[name] =  field.value;
                }else{
                    object[name] = field.value;
                }
                if(typeof object[name] === "string") object[name] = cuppa.trim(object[name]);
            };
        };
        if(json_encode && object) object = cuppa.jsonEncode(object, base64_encode);
        return object;
    };
/* Input filter.
    Example: new cuppa.inputFilter(element, '0-9');
*/
    cuppa.inputFilter = function(element, values){
        this.values = values || "0-9";
        this.values = "["+values+"]";
        this.validate = function(event){
            var input = event.currentTarget;
            if (event.type =='keypress'){
                // 8 = backspace, 9 = tab, 13 = enter, 35 = end, 36 = home, 37 = left, 39 = right, 46 = delete
                var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
                if(key == 8 || key == 9 || key == 13 || key == 35 || key == 36|| key == 37 || key == 39 || key == 46){
                    // if charCode = key & keyCode = 0
                    // 35 = #, 36 = $, 37 = %, 39 = ', 46 = .
                    if (event.charCode == 0 && event.keyCode == key){
                        return true;                                             
                    };
                };
                
                if((key == 99|| key == 120 ) && event.ctrlKey){  // copy / cut
                    return; 
                }else if(key == 118 && event.ctrlKey){ // paste
                    var string = event.clipboardData.getData('text/plain');
                    var regex = new RegExp('^('+this.values+')+$');
                }else{
                    var string = String.fromCharCode(key);
                    var regex = new RegExp(this.values);
                }
            }else if (event.type =='paste'){
                var string = event.clipboardData.getData('text/plain');
                var regex = new RegExp('^('+this.values+')+$');
            }else{ return; };

            if(!regex.test(string)){
                event.preventDefault();
            }
            return true;
        }.bind(this);
        cuppa.on(element, "keypress", this.validate, "cuppaInputFilter");
        //cuppa.on(element, "keyup", this.validate, "cuppaInputFilter");
        cuppa.on(element, "paste", this.validate, "cuppaInputFilter");
    };
    cuppa.inputFilterRemove = function(element){
        cuppa.off(element, "keypress", "", "cuppaInputFilter");
        //cuppa.on(element, "keyup", this.validate, "cuppaInputFilter");
        cuppa.off(element, "paste", "", "cuppaInputFilter");
    };
/* Get Ages from date (YYYY/MM/DD) ) */
    cuppa.getAge = function(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) { age--; }
        return age;
    };
/* Get Diferent of dates (YYYY/MM/DD) */
    cuppa.dateDiff = function(date1, date2, opts){
        if(!opts) opts = {}
        if(opts.addCero == undefined) opts.addCero = false;

        date1 = cuppa.replace(date1, "-", "/");
        date1 = new Date(date1);
        if(date2 == undefined){ 
            date2 = new Date();
        }else{ 
            date2 = cuppa.replace(date2, "-", "/");
            date2 = new Date(date2);
        }
        var diff = new Date(date2.getTime() - date1.getTime());
        var data = {}
            data.date = diff;
            data.time = diff.getTime(); // miliseconds
            data.years = diff.getUTCFullYear() - 1970; if(data.years < 0 ) data.years = 0;
            data.months = diff.getUTCMonth(); if(data.months < 0 ) data.months = 0;
            data.days = parseInt((diff) / (1000 * 60 * 60 * 24));
            data.hours = parseInt(Math.abs(diff) / (1000 * 60 * 60) % 24);
            data.minutes =  parseInt(Math.abs(diff) / (1000 * 60) % 60);
            data.seconds = parseInt(Math.abs(diff) / (1000) % 60);

            data.years = cuppa.parseFloat(data.years);
            data.months = cuppa.parseFloat(data.months);
            data.days = cuppa.parseFloat(data.days);
            data.hours = cuppa.parseFloat(data.hours);
            data.minutes = cuppa.parseFloat(data.minutes);
            data.seconds = cuppa.parseFloat(data.seconds);
        if(opts.addCero){
            data.years = (data.years > 9) ? data.years : "0"+data.years;
            data.months = (data.months > 9) ? data.months : "0"+data.months;
            data.days = (data.days > 9) ? data.days : "0"+data.days;
            data.hours = (data.hours > 9) ? data.hours : "0"+data.hours;
            data.minutes = (data.minutes > 9) ? data.minutes : "0"+data.minutes;
            data.seconds = (data.seconds > 9) ? data.seconds : "0"+data.seconds;
        }
        return data;
    };
/* secondsToTime conver 150 > 00:02:30
* */
    cuppa.secondsToTime = function (theSeconds){
        var hours  = parseInt(theSeconds / 3600);
            hours  = hours > 9 ? hours  : "0" + hours;
        var minutes  = parseInt((theSeconds  - (hours * 3600)) / 60);
            minutes  = minutes > 9 ? minutes : "0" + minutes ;
        var seconds  = parseInt(theSeconds  - ((hours * 3600) + (minutes * 60)));
            seconds  = seconds > 9 ? seconds  : "0" + seconds;
        return hours + ":" + minutes + ":" + seconds;
    };
    cuppa.seconds2Time = function(theSeconds){ return cuppa.secondsToTime(theSeconds); };
/* month diff */
    cuppa.monthDiff = function(d1, d2){
        if(d2 == undefined) d2 = new Date();
        var months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth() + 1;
        months += d2.getMonth();
        return months <= 0 ? 0 : months;
    };
    cuppa.dateMonthDiff = function(d1, d2){ return cuppa.monthDiff(d1,d2); };

// enter_key  
    cuppa.enterKey = function(element, callBack, data){
        element.addEventListener("keyup", function(e){
            if(e.which == 13) {
                cuppa.blur();
                callBack(data);
            };
        });
    };
    cuppa.keyEnter = function(elelemt, callBack, data){ cuppa.enterKey(element, callBack, data); };
// exit key
    cuppa.exitKey = function(element, callBack, data){
        element.addEventListener("keyup", function(e){
            if(e.which == 27) {
                cuppa.blur();
                callBack(data);
            };
        });
    };
    cuppa.keyExit = function(elelemt, callBack, data){ cuppa.exitKey(element, callBack, data); };
/* pagination */
    cuppa.pagination = function(opts){
        this.opts = { currentPage:1, totalPages:5, callback:null, append:null, update:null, selectPageLabel:"Select Page", pageLabel:"Page", nextLabe:"Next", lastLabel:"Last", backLabel:"Back", firstLabel:"First" }
        this.opts = cuppa.mergeObjects([this.opts, opts]);
        this.element = cuppa.newElement("<div class='cu-pagination'></div>");
        if(this.opts.totalPages <= 1){
            if(this.opts.append) this.opts.append.innerHTML = "";
            if(this.opts.update) this.opts.update.innerHTML = "";
            return;
        }
        // change
            this.change = function(e){
                var page = this.opts.currentPage;
                if(e.currentTarget.id == 'first') page = 1;
                else if(e.currentTarget.id == 'back') page--;
                else if(e.currentTarget.id == 'next') page++;
                else if(e.currentTarget.id == 'last') page = this.opts.totalPages;
                else if(e.currentTarget.id == "select") page = cuppa.toNumber(e.currentTarget.value);
                if(page && page != this.opts.currentPage && this.opts.callback) this.opts.callback(page);
            }.bind(this);
        // back / first
            if(this.opts.currentPage > 1){
                var first = cuppa.newElement("<div id='first' class='cu-paginator-first cu-paginator-button'>"+ this.opts.firstLabel +"</div>");
                var back = cuppa.newElement("<div id='back' class='cu-paginator-back cu-paginator-button'>"+ this.opts.backLabel +"</div>");
                cuppa.append(first, this.element);
                cuppa.append(back, this.element);
                cuppa.on([first, back], "click", this.change);
            }
        // Label
            var label = cuppa.newElement("<div class='cu-paginator-label'>"+this.opts.pageLabel+" "+this.opts.currentPage+"/"+this.opts.totalPages+"</div>");
            cuppa.append(label, this.element);
        // next / last
            if(this.opts.currentPage < this.opts.totalPages){
                var next = cuppa.newElement("<div id='next' class='cu-paginator-next cu-paginator-button'>"+ this.opts.nextLabe +"</div>");
                var last = cuppa.newElement("<div id='last' class='cu-paginator-last cu-paginator-button'>"+ this.opts.lastLabel +"</div>");
                cuppa.append(next, this.element);
                cuppa.append(last, this.element);
                cuppa.on([next, last], "click", this.change);
            }
        // select
            var select = cuppa.newElement("<select id='select' class='cu-paginator-select'></select>");
            var opt = cuppa.newElement("<option>"+this.opts.selectPageLabel+"</option>");
            cuppa.append(opt, select);
            for(var i = 1; i <= this.opts.totalPages; i++){
                if(i != this.opts.currentPage){
                    var opt = cuppa.newElement("<option value='"+i+"'>"+i+"</option>");
                    cuppa.append(opt, select);
                };
            };
            cuppa.append(select, this.element);
            cuppa.on(select, "change", this.change);
        // append
            if(this.opts.append) cuppa.append(this.element, this.opts.append);
            if(this.opts.update) cuppa.update(this.element, this.opts.update);
        return this;
    };
/* Upload file
    Require jquery_file_upload
    <link href="js/jquery_file_upload/css/jquery_file_upload.css" rel="stylesheet" type="text/css" />
    <script src="js/jquery/jquery.js"></script>
    <script src="js/jquery_file_upload/vendor/jquery.ui.widget.js"></script>
    <script src="js/jquery_file_upload/jquery.iframe-transport.js"></script>
    <script src="js/jquery_file_upload/jquery.fileupload.js"></script>
    Example: cuppa.fileUpload2('.div_element', opts);
*/
    cuppa.fileUpload = function(element, opts){
        if(opts == undefined) opts = {};
        if(!opts.php_path) opts.php_path = 'administrator/js/jquery_file_upload/server/php/';
        if(!opts.folder) opts.folder = "upload_files";
        if(!opts.unique_name) opts.unique_name = true;
        if(!opts.resize_width) opts.resize_width = "";
        if(!opts.resize_height) opts.resize_height = "";
        if(!opts.crop) opts.crop = "";
        if(!opts.compress) opts.compress = "";
        opts.element = element;
        opts.file = $('<input class="cuppa-file-type" type="file" />').get(0);
        if(opts.accept) $(opts.file).attr("accept",opts.accept)
        $(opts.element).append(opts.file).css("overflow","hidden");
        //++ config
            var params = {}
            params.jqXHR;
            params.url = opts.php_path;
            params.formData = {path:opts.folder, unique_name:opts.unique_name, resize_width:opts.resize_width, resize_height:opts.resize_height, crop:opts.crop, compress:opts.compress};
            params.dataType = 'json';
            params.item_reference = opts.element;
            params.opts = opts;
            params.add = function (e, data) {
                var options = jQuery(this).data()[Object.keys(jQuery(this).data())[0]].options;
                options.jqXHR = data.submit();
            }
            params.send = function(e,  data){
                var name = data.files[0].name;
                var options = jQuery(this).data()[Object.keys(jQuery(this).data())[0]].options;
                options.file_name = name;
                if(options.opts.start) options.opts.start(options);
                if(options.opts.init) options.opts.init(options);
            }
            params.progressall = function(e, data){
                var options = jQuery(this).data()[Object.keys(jQuery(this).data())[0]].options;
                var progress = Math.round((data.loaded / data.total)*100);
                if(options.opts.progress) options.opts.progress( {options:options, progress:progress} );
            }
            params.done = function(e,data){
                var options = jQuery(this).data()[Object.keys(jQuery(this).data())[0]].options;
                var url = "media/"+options.opts.folder+"/"+data.result.files[0].name;
                if(options.opts.callback) options.opts.callback( {options:options, file:url, data:data.result.files[0] } );
                if(options.opts.complete) options.opts.complete( {options:options, file:url, data:data.result.files[0] } );
            }
            params.fail = function(e,data){
                var options = jQuery(this).data()[Object.keys(jQuery(this).data())[0]].options;
                try{ console.log(data.messages); }catch(err){}
                if(optionsoptions.opts.error) options.opts.error(data);
            }
            $(opts.file).fileupload(params);
        //--
    };
/* optionSelector
    This method receive a array of elements and add selected class to the element clicked similar to Input.Radio
        options.toggle = false|true
        options.multiple = false|true
        options.callback = options.change = function(item, data);

*/
    cuppa.optionSelector = function(elements, options){
        this.options = { toggle:true, multiple:false, callback:null, selected:null };
        this.options = cuppa.mergeObjects([this.options, options]);
        this.elements = cuppa.element(elements);
    };
/* checkbox
    new cuppa.toggle(element, {callback:this.toggleColumn});
    element.selected = return true/false
* */
    cuppa.toggle = function(elements, opts){
        this.opts = { callback:null, selected:false, initCallback:true, classSelected:"cu-toggle-selected" };
        this.opts = cuppa.mergeObjects([this.opts, opts]);
        this.elements = cuppa.element(elements);

        this.change = function(element, selected){
            if(element.currentTarget) element = element.currentTarget;
            if(selected == undefined){
                if(cuppa.hasClass(element, this.opts.classSelected)) selected = false;
                else selected = true;
            }
            selected = JSON.parse(selected);
            if(selected === false) cuppa.removeClass(element, this.opts.classSelected);
            else cuppa.addClass(element, this.opts.classSelected);
            element.selected = selected;
            if(this.opts.callback) this.opts.callback( element, element.selected );
        }.bind(this);
        // init value
            cuppa.on(this.elements, "click", this.change);
            cuppa.addClass(this.elements, "cu-toggle");
            if(JSON.parse(this.opts.selected)){ cuppa.addClass(this.elements, this.opts.classSelected); }
            this.elements.forEach(function(element){
                element.selected = cuppa.hasClass(element, this.opts.classSelected);
                if(this.opts.initCallback) this.opts.callback( element, element.selected );
            }.bind(this));
        return this;
    };