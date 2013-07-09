/*
 * justFont Font Loader
 * v2.2.0 justfont (www.justfont.com)
 * Copyright 2013 (c) 
 * Benjamin Peng (j100002ben@gmail.com) and justFont Development Team
 * Licensed under the Affero General Public License.
 * 
 * justFont dom Ready
 * Modified from jQuery
 * Copyright 2013 jQuery Foundation and other contributors
 * http://jquery.com/
 * 
 * justFont Promise Object Modified from promisejs 
 * Copyright 2012-2013 (c) Pierre Duquesne <stackp@online.fr>
 * Licensed under the New BSD License.
 *
 * Sizzle CSS Selector Engine v1.9.3 (http://sizzlejs.com/)
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 *
 * date: 2013/07/06
 */

(function(window, document, undefined){
	var _jf = window["_jf"];
	if( _jf.constructor === Object ) return ;
	
	var Deferred = function () {
		  return {
				resolved:false,
				resolved_arguments:null,
				queue:[],
				done: function(cb){
					if (this.resolved){
						cb.apply(this,this.resolved_arguments);
					} else {
						this.queue.push(cb);
					}
				},
				resolve: function(){
					this.resolved = true;
					this.resolved_arguments = arguments;
					for (var i = 0 ; i < this.queue.length ;++i){
						this.queue[i].apply(this,this.resolved_arguments);
					}
				}
			};
		},
		justFont = {
			addScript: _jf["addScript"],
			appId: '',
			p: '',
			domain: window.location.host,
			url: window.location.href
		}
	  ;
	delete(_jf["addScript"]);
	
	/*
	 *  justFont dom Ready
	 *  Modified from jQuery
	 *  
	 *  Deferred Object By TonyQ
	 *  https://gist.github.com/tony1223/5529412
	 */

	(function(window, document, undefined){
		
	    var readyBound = false,
			readyWait = 1,
			isReady = false,
			readyList,
				
			// Handle when the DOM is ready
			ready = function( wait ) {
					// Abort if there are pending holds or we're already ready
					if ( wait === true ? --readyWait : isReady ) {
						return;
					}

					// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
					if ( !document.body ) {
						return setTimeout( ready );
					}

					// Remember that the DOM is ready
					isReady = true;

					// If a normal DOM Ready event fired, decrement, and wait if need be
					if ( wait !== true && --readyWait > 0 ) {
						return;
					}

					// If there are functions bound, to execute
					readyList.resolve();
					
				},
			
			promise = function() {
					if ( !readyList ) {

						readyList = Deferred();

						// Catch cases where $(document).ready() is called after the browser event has already occurred.
						// we once tried to use readyState "interactive" here, but it caused issues like the one
						// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
						if ( document.readyState === "complete" ) {
							// Handle it asynchronously to allow scripts the opportunity to delay ready
							setTimeout( ready );

						// Standards-based browsers support DOMContentLoaded
						} else if ( document.addEventListener ) {
							// Use the handy event callback
							document.addEventListener( "DOMContentLoaded", completed, false );

							// A fallback to window.onload, that will always work
							window.addEventListener( "load", completed, false );

						// If IE event model is used
						} else {
							// Ensure firing before onload, maybe late but safe also for iframes
							document.attachEvent( "onreadystatechange", completed );

							// A fallback to window.onload, that will always work
							window.attachEvent( "onload", completed );

							// If IE and not a frame
							// continually check to see if the document is ready
							var top = false;

							try {
								top = window.frameElement == null && document.documentElement;
							} catch(e) {}

							if ( top && top.doScroll ) {
								(function doScrollCheck() {
									if ( !isReady ) {

										try {
											// Use the trick by Diego Perini
											// http://javascript.nwbox.com/IEContentLoaded/
											top.doScroll("left");
										} catch(e) {
											return setTimeout( doScrollCheck, 50 );
										}

										// detach all dom ready events
										detach();

										// and execute any waiting functions
										ready();
									}
								})();
							}
						}
					}
					return readyList;
				},
			
			// The ready event handler
			completed = function( event ) {
					// readyState === "complete" is good enough for us to call the dom ready in oldIE
					if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
						detach();
						ready();
					}
				},
			// Clean-up method for dom ready events
			detach = function() {
					if ( document.addEventListener ) {
						document.removeEventListener( "DOMContentLoaded", completed, false );
						window.removeEventListener( "load", completed, false );

					} else {
						document.detachEvent( "onreadystatechange", completed );
						window.detachEvent( "onload", completed );
					}
				},

		// This is the public function that people can use to hook up ready.
			DomReady = function(fn, args) {
					promise().done( fn );
				};
		
		justFont.DomReady = DomReady;
		
	})(this, this.document);
	
	/*
	 *  MD5 function
	 */
	(function(window) {

		var md5 = function (D) {
			var E;
			var y = function (x, k) {
				return (x << k) | (x >>> (32 - k))
			};
			var I = function (Y, x) {
				var aa, k, X, Z, W;
				X = (Y & 2147483648);
				Z = (x & 2147483648);
				aa = (Y & 1073741824);
				k = (x & 1073741824);
				W = (Y & 1073741823) + (x & 1073741823);
				if (aa & k) {
					return (W ^ 2147483648 ^ X ^ Z)
				}
				if (aa | k) {
					if (W & 1073741824) {
						return (W ^ 3221225472 ^ X ^ Z)
					} else {
						return (W ^ 1073741824 ^ X ^ Z)
					}
				} else {
					return (W ^ X ^ Z)
				}
			};
			var r = function (k, X, W) {
				return (k & X) | ((~k) & W)
			};
			var q = function (k, X, W) {
				return (k & W) | (X & (~W))
			};
			var p = function (k, X, W) {
				return (k ^ X ^ W)
			};
			var n = function (k, X, W) {
				return (X ^ (k | (~W)))
			};
			var v = function (X, W, ab, aa, k, Y, Z) {
				X = I(X, I(I(r(W, ab, aa), k), Z));
				return I(y(X, Y), W)
			};
			var f = function (X, W, ab, aa, k, Y, Z) {
				X = I(X, I(I(q(W, ab, aa), k), Z));
				return I(y(X, Y), W)
			};
			var G = function (X, W, ab, aa, k, Y, Z) {
				X = I(X, I(I(p(W, ab, aa), k), Z));
				return I(y(X, Y), W)
			};
			var u = function (X, W, ab, aa, k, Y, Z) {
				X = I(X, I(I(n(W, ab, aa), k), Z));
				return I(y(X, Y), W)
			};
			var e = function (aa) {
				var ab;
				var X = aa.length;
				var W = X + 8;
				var x = (W - (W % 64)) / 64;
				var Z = (x + 1) * 16;
				var ac = new Array(Z - 1);
				var k = 0;
				var Y = 0;
				while (Y < X) {
					ab = (Y - (Y % 4)) / 4;
					k = (Y % 4) * 8;
					ac[ab] = (ac[ab] | (aa.charCodeAt(Y) << k));
					Y++
				}
				ab = (Y - (Y % 4)) / 4;
				k = (Y % 4) * 8;
				ac[ab] = ac[ab] | (128 << k);
				ac[Z - 2] = X << 3;
				ac[Z - 1] = X >>> 29;
				return ac
			};
			var s = function (X) {
				var k = "",
					x = "",
					Y, W;
				for (W = 0; W <= 3; W++) {
					Y = (X >>> (W * 8)) & 255;
					x = "0" + Y.toString(16);
					k = k + x.substr(x.length - 2, 2)
				}
				return k
			};
			var t = function (k) {
				if (k === null || typeof k === "undefined") {
					return ""
				}
				var ab = (k + "");
				var ac = "",
					x, Y, W = 0;
				x = Y = 0;
				W = ab.length;
				for (var X = 0; X < W; X++) {
					var aa = ab.charCodeAt(X);
					var Z = null;
					if (aa < 128) {
						Y++
					} else {
						if (aa > 127 && aa < 2048) {
							Z = String.fromCharCode((aa >> 6) | 192) + String.fromCharCode((aa & 63) | 128)
						} else {
							Z = String.fromCharCode((aa >> 12) | 224) + String.fromCharCode(((aa >> 6) & 63) | 128) + String.fromCharCode((aa & 63) | 128)
						}
					} if (Z !== null) {
						if (Y > x) {
							ac += ab.slice(x, Y)
						}
						ac += Z;
						x = Y = X + 1
					}
				}
				if (Y > x) {
					ac += ab.slice(x, W)
				}
				return ac
			};
			var F = [],
				M, h, H, w, g, V, U, T, S, P = 7,
				N = 12,
				K = 17,
				J = 22,
				C = 5,
				B = 9,
				A = 14,
				z = 20,
				o = 4,
				m = 11,
				l = 16,
				j = 23,
				R = 6,
				Q = 10,
				O = 15,
				L = 21;
			D = t(D);
			F = e(D);
			V = 1732584193;
			U = 4023233417;
			T = 2562383102;
			S = 271733878;
			E = F.length;
			for (M = 0; M < E; M += 16) {
				h = V;
				H = U;
				w = T;
				g = S;
				V = v(V, U, T, S, F[M + 0], P, 3614090360);
				S = v(S, V, U, T, F[M + 1], N, 3905402710);
				T = v(T, S, V, U, F[M + 2], K, 606105819);
				U = v(U, T, S, V, F[M + 3], J, 3250441966);
				V = v(V, U, T, S, F[M + 4], P, 4118548399);
				S = v(S, V, U, T, F[M + 5], N, 1200080426);
				T = v(T, S, V, U, F[M + 6], K, 2821735955);
				U = v(U, T, S, V, F[M + 7], J, 4249261313);
				V = v(V, U, T, S, F[M + 8], P, 1770035416);
				S = v(S, V, U, T, F[M + 9], N, 2336552879);
				T = v(T, S, V, U, F[M + 10], K, 4294925233);
				U = v(U, T, S, V, F[M + 11], J, 2304563134);
				V = v(V, U, T, S, F[M + 12], P, 1804603682);
				S = v(S, V, U, T, F[M + 13], N, 4254626195);
				T = v(T, S, V, U, F[M + 14], K, 2792965006);
				U = v(U, T, S, V, F[M + 15], J, 1236535329);
				V = f(V, U, T, S, F[M + 1], C, 4129170786);
				S = f(S, V, U, T, F[M + 6], B, 3225465664);
				T = f(T, S, V, U, F[M + 11], A, 643717713);
				U = f(U, T, S, V, F[M + 0], z, 3921069994);
				V = f(V, U, T, S, F[M + 5], C, 3593408605);
				S = f(S, V, U, T, F[M + 10], B, 38016083);
				T = f(T, S, V, U, F[M + 15], A, 3634488961);
				U = f(U, T, S, V, F[M + 4], z, 3889429448);
				V = f(V, U, T, S, F[M + 9], C, 568446438);
				S = f(S, V, U, T, F[M + 14], B, 3275163606);
				T = f(T, S, V, U, F[M + 3], A, 4107603335);
				U = f(U, T, S, V, F[M + 8], z, 1163531501);
				V = f(V, U, T, S, F[M + 13], C, 2850285829);
				S = f(S, V, U, T, F[M + 2], B, 4243563512);
				T = f(T, S, V, U, F[M + 7], A, 1735328473);
				U = f(U, T, S, V, F[M + 12], z, 2368359562);
				V = G(V, U, T, S, F[M + 5], o, 4294588738);
				S = G(S, V, U, T, F[M + 8], m, 2272392833);
				T = G(T, S, V, U, F[M + 11], l, 1839030562);
				U = G(U, T, S, V, F[M + 14], j, 4259657740);
				V = G(V, U, T, S, F[M + 1], o, 2763975236);
				S = G(S, V, U, T, F[M + 4], m, 1272893353);
				T = G(T, S, V, U, F[M + 7], l, 4139469664);
				U = G(U, T, S, V, F[M + 10], j, 3200236656);
				V = G(V, U, T, S, F[M + 13], o, 681279174);
				S = G(S, V, U, T, F[M + 0], m, 3936430074);
				T = G(T, S, V, U, F[M + 3], l, 3572445317);
				U = G(U, T, S, V, F[M + 6], j, 76029189);
				V = G(V, U, T, S, F[M + 9], o, 3654602809);
				S = G(S, V, U, T, F[M + 12], m, 3873151461);
				T = G(T, S, V, U, F[M + 15], l, 530742520);
				U = G(U, T, S, V, F[M + 2], j, 3299628645);
				V = u(V, U, T, S, F[M + 0], R, 4096336452);
				S = u(S, V, U, T, F[M + 7], Q, 1126891415);
				T = u(T, S, V, U, F[M + 14], O, 2878612391);
				U = u(U, T, S, V, F[M + 5], L, 4237533241);
				V = u(V, U, T, S, F[M + 12], R, 1700485571);
				S = u(S, V, U, T, F[M + 3], Q, 2399980690);
				T = u(T, S, V, U, F[M + 10], O, 4293915773);
				U = u(U, T, S, V, F[M + 1], L, 2240044497);
				V = u(V, U, T, S, F[M + 8], R, 1873313359);
				S = u(S, V, U, T, F[M + 15], Q, 4264355552);
				T = u(T, S, V, U, F[M + 6], O, 2734768916);
				U = u(U, T, S, V, F[M + 13], L, 1309151649);
				V = u(V, U, T, S, F[M + 4], R, 4149444226);
				S = u(S, V, U, T, F[M + 11], Q, 3174756917);
				T = u(T, S, V, U, F[M + 2], O, 718787259);
				U = u(U, T, S, V, F[M + 9], L, 3951481745);
				V = I(V, h);
				U = I(U, H);
				T = I(T, w);
				S = I(S, g)
			}
			var i = s(V) + s(U) + s(T) + s(S);
			return i.toLowerCase()
		};
		
		justFont.md5 = md5;

	})( window );
	
	/*
	 *  End of MD5 function
	 */
	
	/*
	 *  justFont Promise Object
	 *  Modified from promisejs 
	 *  
	 *  Copyright 2012-2013 (c) Pierre Duquesne <stackp@online.fr>
	 *  Licensed under the New BSD License.
	 *  https://github.com/stackp/promisejs
	 */
	(function(window) {

	    var join = function (promises) {
			        var p = new Promise();
			        var total = promises.length;
			        var numdone = 0;
			        var results = [];

			        function notifier(i) {
			            return function() {
			                numdone += 1;
			                results[i] = Array.prototype.slice.call(arguments);
			                if (numdone === total) {
			                    p.done(results);
			                }
			            };
			        }

			        for (var i = 0; i < total; i++) {
			            promises[i].then(notifier(i));
			        }

			        return p;
			    },
			chain = function (funcs, args) {
					var p = new Promise();
			        if (funcs.length === 0) {
			            p.done.apply(p, args);
			        } else {
			            funcs[0].apply(null, args).then(function() {
			                funcs.splice(0, 1);
			                chain(funcs, arguments).then(function() {
			                    p.done.apply(p, arguments);
			                });
			            });
			        }
			        return p;
			    },
			_encode = function (data) {
			        var result = "";
			        if (typeof data === "string") {
			            result = data;
			        } else {
			            var e = encodeURIComponent;
			            for (var k in data) {
			                if (data.hasOwnProperty(k)) {
			                    result += '&' + e(k) + '=' + e(data[k]);
			                }
			            }
			            result = result ? result.substr(1) : "";
			        }
			        return result;
			    },
			new_xhr = function () {
			        var xhr;
			        if( window.XDomainRequest ) {
			            xhr = new XDomainRequest();
			        }else if( window.XMLHttpRequest ) {
			        	xhr = new XMLHttpRequest();
			        }else{
			        	xhr = null;
			        }
			        return xhr;
			    },
			ajax = function (method, url, data, headers) {
			        var p = new Promise();
			        var xhr, payload;
			        data = data || {};
			        headers = headers || {};
			        
			        payload = _encode(data);
			        if (method === 'GET' && payload) {
			            url += '?' + payload;
			            payload = null;
			        }
			        
			        try {
			            xhr = new_xhr(method, url);
			            if( !xhr ){
				        	p.done(promise.ENOXHR, "");
				            return p;
				        }
			        } catch (e) {
			            p.done(promise.ENOXHR, "");
			            return p;
			        }
			        
			        if("withCredentials" in xhr){
			        	xhr.open(method, url, true);
			        }else{
			        	xhr.open(method, url);
			        }
			        
			        var timeout = promise.ajaxTimeout
			          , timer;
			        headers = headers || {};
			        
			        if( window.XDomainRequest ){
			        	if (timeout) {
			        		xhr.timeout = timeout;
			        	}
			        	xhr.ontimeout = function(){
			        		p.done(promise.ETIMEOUT, "");
			        		xhr.ontimeout = xhr.onerror = xhr.onload = xhr.onprogress = null;
			        	};
			        	xhr.onerror = function(){
			        		p.done(promise.EONERROR, xhr.responseText);
			        		xhr.ontimeout = xhr.onerror = xhr.onload = xhr.onprogress = null;
			        	};
			        	xhr.onload = function(){
			        		p.done(null, xhr.responseText);
			        		xhr.ontimeout = xhr.onerror = xhr.onload = xhr.onprogress = null;
			        	};
			        	xhr.onprogress = function(){
			        		
			        	};
			        }else if( window.XMLHttpRequest ){
			        	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			        	if (timeout) {
				            timer = setTimeout(function() {
					            xhr.abort();
					            p.done(promise.ETIMEOUT, "");
					        }, timeout);
				        }
			        	
			        	xhr.onreadystatechange = function() {
				            if (xhr.readyState === 4) {
				            	if (timeout) {
					                clearTimeout(timer);
					            }
					            xhr.onreadystatechange = null;
				                if (!xhr.status ||
			                           (xhr.status < 200 || xhr.status >= 300) &&
			                           xhr.status !== 304) {
				                    p.done(null, xhr.responseText);
				                } else {
				                    p.done(promise.EONERROR, xhr.responseText);
				                }
				            }
				        };
			        }
			        
			        xhr.send(payload);
			        
			        return p;
			    },
			Promise = function () {
			        this._callbacks = [];
			    };
	    
	    Promise.prototype = {
	    	constructor: Promise,
	    	then: function(func, context) {
	    			var p;
			        if (this._isdone) {
			            p = func.apply(context, this.result);
			        } else {
			            p = new Promise();
			            this._callbacks.push(function () {
			                var res = func.apply(context, arguments);
			                if (res && typeof res.then === 'function')
			                    res.then(p.done, p);
			            });
			        }
			        return p;
			    },
		    done: function() {
		    		this.result = arguments;
			        this._isdone = true;
			        for (var i = 0; i < this._callbacks.length; i++) {
			            this._callbacks[i].apply(null, arguments);
			        }
			        this._callbacks = [];
			    }
	    };

	    var promise = {
	        Promise: Promise,
	        join: join,
	        chain: chain,
	        encode: _encode,
	        get: function(url, data, headers) {
		            return ajax('GET', url, data, headers);
		        },
	        ENOXHR: 1,
        	ETIMEOUT: 2,
        	EONERROR: 3,
        	
        	ajaxTimeout: 0
        	
	    };
	    
	    justFont.promise = promise;
	    
	})( window );
	
	/*
	 *  End of Promisejs lib
	 */
	 
	/*!
	 * Sizzle CSS Selector Engine v1.9.3
	 * http://sizzlejs.com/
	 *
	 * Copyright 2013 jQuery Foundation, Inc. and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: @DATE
	 */
	(function( window, undefined ) {

	var i,
		support,
		cachedruns,
		Expr,
		getText,
		isXML,
		compile,
		outermostContext,
		sortInput,

		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,

		// Instance-specific data
		expando = "sizzle" + -(new Date()),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		hasDuplicate = false,
		sortOrder = function() { return 0; },

		// General-purpose constants
		strundefined = typeof undefined,
		MAX_NEGATIVE = 1 << 31,

		// Instance methods
		hasOwn = ({}).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf if we can't use a native one
		indexOf = arr.indexOf || function( elem ) {
			var i = 0,
				len = this.length;
			for ( ; i < len; i++ ) {
				if ( this[i] === elem ) {
					return i;
				}
			}
			return -1;
		},

		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

		// Regular expressions

		// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",
		// http://www.w3.org/TR/css3-syntax/#characters
		characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

		// Loosely modeled on CSS identifier characters
		// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
		// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = characterEncoding.replace( "w", "w#" ),

		// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
			"*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

		// Prefer arguments quoted,
		//   then not containing pseudos/brackets,
		//   then attribute selectors/non-parenthetical expressions,
		//   then anything else
		// These preferences are here to reduce the number of selectors
		//   needing tokenize in the PSEUDO preFilter
		pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

		rsibling = new RegExp( whitespace + "*[+~]" ),
		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*)" + whitespace + "*\\]", "g" ),

		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),

		matchExpr = {
			"ID": new RegExp( "^#(" + characterEncoding + ")" ),
			"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
			"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},

		rnative = /^[^{]+\{\s*\[native \w/,

		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,

		rescape = /'|\\/g,

		// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
		funescape = function( _, escaped, escapedWhitespace ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ?
				escaped :
				// BMP codepoint
				high < 0 ?
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		};

	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			(arr = slice.call( preferredDoc.childNodes )),
			preferredDoc.childNodes
		);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?

			// Leverage slice if possible
			function( target, els ) {
				push_native.apply( target, slice.call(els) );
			} :

			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			}
		};
	}

	function Sizzle( selector, context, results, seed ) {
		var match, elem, m, nodeType,
			// QSA vars
			i, groups, old, nid, newContext, newSelector;

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}

		context = context || document;
		results = results || [];

		if ( !selector || typeof selector !== "string" ) {
			return results;
		}

		if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
			return [];
		}

		if ( documentIsHTML && !seed ) {

			// Shortcuts
			if ( (match = rquickExpr.exec( selector )) ) {
				// Speed-up: Sizzle("#ID")
				if ( (m = match[1]) ) {
					if ( nodeType === 9 ) {
						elem = context.getElementById( m );
						// Check parentNode to catch when Blackberry 4.6 returns
						// nodes that are no longer in the document #6963
						if ( elem && elem.parentNode ) {
							// Handle the case where IE, Opera, and Webkit return items
							// by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}
					} else {
						// Context is not a document
						if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
							contains( context, elem ) && elem.id === m ) {
							results.push( elem );
							return results;
						}
					}

				// Speed-up: Sizzle("TAG")
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Speed-up: Sizzle(".CLASS")
				} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// QSA path
			if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
				nid = old = expando;
				newContext = context;
				newSelector = nodeType === 9 && selector;

				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					groups = tokenize( selector );

					if ( (old = context.getAttribute("id")) ) {
						nid = old.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", nid );
					}
					nid = "[id='" + nid + "'] ";

					i = groups.length;
					while ( i-- ) {
						groups[i] = nid + toSelector( groups[i] );
					}
					newContext = rsibling.test( selector ) && context.parentNode || context;
					newSelector = groups.join(",");
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch(qsaError) {
					} finally {
						if ( !old ) {
							context.removeAttribute("id");
						}
					}
				}
			}
		}

		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}

	/**
	 * For feature detection
	 * @param {Function} fn The function to test for native support
	 */
	function isNative( fn ) {
		return rnative.test( fn + "" );
	}

	/**
	 * Create key-value caches of limited size
	 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];

		function cache( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key += " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key ] = value);
		}
		return cache;
	}

	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}

	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created div and expects a boolean result
	 */
	function assert( fn ) {
		var div = document.createElement("div");

		try {
			return !!fn( div );
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if ( div.parentNode ) {
				div.parentNode.removeChild( div );
			}
			// release memory in IE
			div = null;
		}
	}

	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied if the test fails
	 * @param {Boolean} test The result of a test. If true, null will be set as the handler in leiu of the specified handler
	 */
	function addHandle( attrs, handler, test ) {
		attrs = attrs.split("|");
		var current,
			i = attrs.length,
			setHandle = test ? null : handler;

		while ( i-- ) {
			// Don't override a user's handler
			if ( !(current = Expr.attrHandle[ attrs[i] ]) || current === handler ) {
				Expr.attrHandle[ attrs[i] ] = setHandle;
			}
		}
	}

	/**
	 * Fetches boolean attributes by node
	 * @param {Element} elem
	 * @param {String} name
	 */
	function boolHandler( elem, name ) {
		// XML does not need to be checked as this will not be assigned for XML documents
		var val = elem.getAttributeNode( name );
		return val && val.specified ?
			val.value :
			elem[ name ] === true ? name.toLowerCase() : null;
	}

	/**
	 * Fetches attributes without interpolation
	 * http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	 * @param {Element} elem
	 * @param {String} name
	 */
	function interpolationHandler( elem, name ) {
		// XML does not need to be checked as this will not be assigned for XML documents
		return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
	}

	/**
	 * Uses defaultValue to retrieve value in IE6/7
	 * @param {Element} elem
	 * @param {String} name
	 */
	function valueHandler( elem ) {
		// Ignore the value *property* on inputs by using defaultValue
		// Fallback to Sizzle.attr by returning undefined where appropriate
		// XML does not need to be checked as this will not be assigned for XML documents
		if ( elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	}

	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns Returns -1 if a precedes b, 1 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				( ~b.sourceIndex || MAX_NEGATIVE ) -
				( ~a.sourceIndex || MAX_NEGATIVE );

		// Use IE sourceIndex if available on both nodes
		if ( diff ) {
			return diff;
		}

		// Check if b follows a
		if ( cur ) {
			while ( (cur = cur.nextSibling) ) {
				if ( cur === b ) {
					return -1;
				}
			}
		}

		return a ? 1 : -1;
	}

	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction(function( argument ) {
			argument = +argument;
			return markFunction(function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;

				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ (j = matchIndexes[i]) ] ) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}

	/**
	 * Detect xml
	 * @param {Element|Object} elem An element or a document
	 */
	isXML = Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};

	// Expose support vars for convenience
	support = Sizzle.support = {};

	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var doc = node ? node.ownerDocument || node : preferredDoc,
			parent = doc.parentWindow;

		// If no document and documentElement is available, return
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}

		// Set our document
		document = doc;
		docElem = doc.documentElement;

		// Support tests
		documentIsHTML = !isXML( doc );

		// Support: IE>8
		// If iframe document is assigned to "document" variable and if iframe has been reloaded,
		// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
		if ( parent && parent.frameElement ) {
			parent.attachEvent( "onbeforeunload", function() {
				setDocument();
			});
		}

		/* Attributes
		---------------------------------------------------------------------- */

		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
		support.attributes = assert(function( div ) {

			// Support: IE<8
			// Prevent attribute/property "interpolation"
			div.innerHTML = "<a href='#'></a>";
			addHandle( "type|href|height|width", interpolationHandler, div.firstChild.getAttribute("href") === "#" );

			// Support: IE<9
			// Use getAttributeNode to fetch booleans when getAttribute lies
			addHandle( booleans, boolHandler, div.getAttribute("disabled") == null );

			div.className = "i";
			return !div.getAttribute("className");
		});

		// Support: IE<9
		// Retrieving value should defer to defaultValue
		support.input = assert(function( div ) {
			div.innerHTML = "<input>";
			div.firstChild.setAttribute( "value", "" );
			return div.firstChild.getAttribute( "value" ) === "";
		});

		// IE6/7 still return empty string for value,
		// but are actually retrieving the property
		addHandle( "value", valueHandler, support.attributes && support.input );

		/* getElement(s)By*
		---------------------------------------------------------------------- */

		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function( div ) {
			div.appendChild( doc.createComment("") );
			return !div.getElementsByTagName("*").length;
		});

		// Check if getElementsByClassName can be trusted
		support.getElementsByClassName = assert(function( div ) {
			div.innerHTML = "<div class='a'></div><div class='a i'></div>";

			// Support: Safari<4
			// Catch class over-caching
			div.firstChild.className = "i";
			// Support: Opera<10
			// Catch gEBCN failure to find non-leading classes
			return div.getElementsByClassName("i").length === 2;
		});

		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function( div ) {
			docElem.appendChild( div ).id = expando;
			return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
		});

		// ID find and filter
		if ( support.getById ) {
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
					var m = context.getElementById( id );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					return m && m.parentNode ? [m] : [];
				}
			};
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
		} else {
			// Support: IE6/7
			// getElementById is not reliable as a find shortcut
			delete Expr.find["ID"];

			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};
		}

		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== strundefined ) {
					return context.getElementsByTagName( tag );
				}
			} :
			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					while ( (elem = results[i++]) ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			};

		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
			if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};

		/* QSA/matchesSelector
		---------------------------------------------------------------------- */

		// QSA and matchesSelector support

		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];

		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See http://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];

		if ( (support.qsa = isNative(doc.querySelectorAll)) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( div ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// http://bugs.jquery.com/ticket/12359
				div.innerHTML = "<select><option selected=''></option></select>";

				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !div.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}

				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}
			});

			assert(function( div ) {

				// Support: Opera 10-12/IE8
				// ^= $= *= and empty values
				// Should not select anything
				// Support: Windows 8 Native Apps
				// The type attribute is restricted during .innerHTML assignment
				var input = doc.createElement("input");
				input.setAttribute( "type", "hidden" );
				div.appendChild( input ).setAttribute( "t", "" );

				if ( div.querySelectorAll("[t^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}

				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":enabled").length ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}

				// Opera 10-11 does not throw on post-comma invalid pseudos
				div.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}

		if ( (support.matchesSelector = isNative( (matches = docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ) {

			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( div, "div" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( div, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			});
		}

		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

		/* Contains
		---------------------------------------------------------------------- */

		// Element contains another
		// Purposefully does not implement inclusive descendent
		// As in, an element does not contain itself
		contains = isNative(docElem.contains) || docElem.compareDocumentPosition ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				));
			} :
			function( a, b ) {
				if ( b ) {
					while ( (b = b.parentNode) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};

		/* Sorting
		---------------------------------------------------------------------- */

		// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
		// Detached nodes confoundingly follow *each other*
		support.sortDetached = assert(function( div1 ) {
			// Should return 1, but returns 4 (following)
			return div1.compareDocumentPosition( doc.createElement("div") ) & 1;
		});

		// Document order sorting
		sortOrder = docElem.compareDocumentPosition ?
		function( a, b ) {

			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b );

			if ( compare ) {
				// Disconnected nodes
				if ( compare & 1 ||
					(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

					// Choose the first element that is related to our preferred document
					if ( a === doc || contains(preferredDoc, a) ) {
						return -1;
					}
					if ( b === doc || contains(preferredDoc, b) ) {
						return 1;
					}

					// Maintain original order
					return sortInput ?
						( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
						0;
				}

				return compare & 4 ? -1 : 1;
			}

			// Not directly comparable, sort on existence of method
			return a.compareDocumentPosition ? -1 : 1;
		} :
		function( a, b ) {
			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];

			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;

			// Parentless nodes are either documents or disconnected
			} else if ( !aup || !bup ) {
				return a === doc ? -1 :
					b === doc ? 1 :
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
					0;

			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}

			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( (cur = cur.parentNode) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( (cur = cur.parentNode) ) {
				bp.unshift( cur );
			}

			// Walk down the tree looking for a discrepancy
			while ( ap[i] === bp[i] ) {
				i++;
			}

			return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[i], bp[i] ) :

				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 :
				bp[i] === preferredDoc ? 1 :
				0;
		};

		return doc;
	};

	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};

	Sizzle.matchesSelector = function( elem, expr ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		// Make sure that attribute selectors are quoted
		expr = expr.replace( rattributeQuotes, "='$1']" );

		if ( support.matchesSelector && documentIsHTML &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

			try {
				var ret = matches.call( elem, expr );

				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch(e) {}
		}

		return Sizzle( expr, document, null, [elem] ).length > 0;
	};

	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};

	Sizzle.attr = function( elem, name ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		var fn = Expr.attrHandle[ name.toLowerCase() ],
			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = ( fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined );

		return val === undefined ?
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null :
			val;
	};

	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};

	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;

		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}

		return results;
	};

	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			for ( ; (node = elem[i]); i++ ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (see #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes

		return ret;
	};

	Expr = Sizzle.selectors = {

		// Can be adjusted by the user
		cacheLength: 50,

		createPseudo: markFunction,

		match: matchExpr,

		attrHandle: {},

		find: {},

		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},

		preFilter: {
			"ATTR": function( match ) {
				match[1] = match[1].replace( runescape, funescape );

				// Move the given value to match[3] whether quoted or unquoted
				match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

				if ( match[2] === "~=" ) {
					match[3] = " " + match[3] + " ";
				}

				return match.slice( 0, 4 );
			},

			"CHILD": function( match ) {
				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[1] = match[1].toLowerCase();

				if ( match[1].slice( 0, 3 ) === "nth" ) {
					// nth-* requires argument
					if ( !match[3] ) {
						Sizzle.error( match[0] );
					}

					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
					match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

				// other types prohibit arguments
				} else if ( match[3] ) {
					Sizzle.error( match[0] );
				}

				return match;
			},

			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[5] && match[2];

				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}

				// Accept quoted arguments as-is
				if ( match[3] && match[4] !== undefined ) {
					match[2] = match[4];

				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

					// excess is a negative index
					match[0] = match[0].slice( 0, excess );
					match[2] = unquoted.slice( 0, excess );
				}

				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},

		filter: {

			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() { return true; } :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},

			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];

				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
					});
			},

			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );

					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}

					result += "";

					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.slice( -check.length ) === check :
						operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
						false;
				};
			},

			"CHILD": function( type, what, argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";

				return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :

					function( elem, context, xml ) {
						var cache, outerCache, node, diff, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType;

						if ( parent ) {

							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [ forward ? parent.firstChild : parent.lastChild ];

							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {
								// Seek `elem` from a previously-cached index
								outerCache = parent[ expando ] || (parent[ expando ] = {});
								cache = outerCache[ type ] || [];
								nodeIndex = cache[0] === dirruns && cache[1];
								diff = cache[0] === dirruns && cache[2];
								node = nodeIndex && parent.childNodes[ nodeIndex ];

								while ( (node = ++nodeIndex && node && node[ dir ] ||

									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {

									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										outerCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}

							// Use previously-cached element index if available
							} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
								diff = cache[1];

							// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
							} else {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
										// Cache the index of each encountered element
										if ( useCache ) {
											(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},

			"PSEUDO": function( pseudo, argument ) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );

				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}

				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction(function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf.call( seed, matched[i] );
								seed[ idx ] = !( matches[ idx ] = matched[i] );
							}
						}) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}

				return fn;
			}
		},

		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function( selector ) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );

				return matcher[ expando ] ?
					markFunction(function( seed, matches, context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;

						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( (elem = unmatched[i]) ) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) :
					function( elem, context, xml ) {
						input[0] = elem;
						matcher( input, null, xml, results );
						return !results.pop();
					};
			}),

			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),

			"contains": markFunction(function( text ) {
				return function( elem ) {
					return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
				};
			}),

			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {
				// lang value must be a valid identifier
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
					return false;
				};
			}),

			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},

			"root": function( elem ) {
				return elem === docElem;
			},

			"focus": function( elem ) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},

			// Boolean properties
			"enabled": function( elem ) {
				return elem.disabled === false;
			},

			"disabled": function( elem ) {
				return elem.disabled === true;
			},

			"checked": function( elem ) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
			},

			"selected": function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}

				return elem.selected === true;
			},

			// Contents
			"empty": function( elem ) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
				//   not comment, processing instructions, or others
				// Thanks to Diego Perini for the nodeName shortcut
				//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4 ) {
						return false;
					}
				}
				return true;
			},

			"parent": function( elem ) {
				return !Expr.pseudos["empty"]( elem );
			},

			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},

			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},

			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},

			"text": function( elem ) {
				var attr;
				// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
				// use getAttribute instead to test this case
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type );
			},

			// Position-in-collection
			"first": createPositionalPseudo(function() {
				return [ 0 ];
			}),

			"last": createPositionalPseudo(function( matchIndexes, length ) {
				return [ length - 1 ];
			}),

			"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			}),

			"even": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"odd": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			})
		}
	};

	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}

	function tokenize( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];

		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}

		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;

		while ( soFar ) {

			// Comma and first run
			if ( !matched || (match = rcomma.exec( soFar )) ) {
				if ( match ) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[0].length ) || soFar;
				}
				groups.push( tokens = [] );
			}

			matched = false;

			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				});
				soFar = soFar.slice( matched.length );
			}

			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice( matched.length );
				}
			}

			if ( !matched ) {
				break;
			}
		}

		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :
				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	}

	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[i].value;
		}
		return selector;
	}

	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			checkNonElements = base && dir === "parentNode",
			doneName = done++;

		return combinator.first ?
			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
			} :

			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var data, cache, outerCache,
					dirkey = dirruns + " " + doneName;

				// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
				if ( xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || (elem[ expando ] = {});
							if ( (cache = outerCache[ dir ]) && cache[0] === dirkey ) {
								if ( (data = cache[1]) === true || data === cachedruns ) {
									return data === true;
								}
							} else {
								cache = outerCache[ dir ] = [ dirkey ];
								cache[1] = matcher( elem, context, xml ) || cachedruns;
								if ( cache[1] === true ) {
									return true;
								}
							}
						}
					}
				}
			};
	}

	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[i]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[0];
	}

	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;

		for ( ; i < len; i++ ) {
			if ( (elem = unmatched[i]) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}

		return newUnmatched;
	}

	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction(function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,

				// Get initial elements from seed or context
				elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,

				matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

						// ...intermediate processing is necessary
						[] :

						// ...otherwise use results directly
						results :
					matcherIn;

			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}

			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );

				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( (elem = temp[i]) ) {
						matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
					}
				}
			}

			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) ) {
								// Restore matcherIn since elem is not yet a final match
								temp.push( (matcherIn[i] = elem) );
							}
						}
						postFinder( null, (matcherOut = []), temp, xml );
					}

					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) &&
							(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

							seed[temp] = !(results[temp] = elem);
						}
					}
				}

			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		});
	}

	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[0].type ],
			implicitRelative = leadingRelative || Expr.relative[" "],
			i = leadingRelative ? 1 : 0,

			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf.call( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
			} ];

		for ( ; i < len; i++ ) {
			if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
				matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
			} else {
				matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[j].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
						).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}

		return elementMatcher( matchers );
	}

	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		// A counter to specify which element is currently being matched
		var matcherCachedRuns = 0,
			bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, expandContext ) {
				var elem, j, matcher,
					setMatched = [],
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					outermost = expandContext != null,
					contextBackup = outermostContext,
					// We must always have either seed elements or context
					elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1);

				if ( outermost ) {
					outermostContext = context !== document && context;
					cachedruns = matcherCachedRuns;
				}

				// Add elements passing elementMatchers directly to results
				// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
				for ( ; (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;
						while ( (matcher = elementMatchers[j++]) ) {
							if ( matcher( elem, context, xml ) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
							cachedruns = ++matcherCachedRuns;
						}
					}

					// Track unmatched elements for set filters
					if ( bySet ) {
						// They will have gone through all possible matchers
						if ( (elem = !matcher && elem) ) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}

				// Apply set filters to unmatched elements
				matchedCount += i;
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( (matcher = setMatchers[j++]) ) {
						matcher( unmatched, setMatched, context, xml );
					}

					if ( seed ) {
						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !(unmatched[i] || setMatched[i]) ) {
									setMatched[i] = pop.call( results );
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}

					// Add matches to results
					push.apply( results, setMatched );

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {

						Sizzle.uniqueSort( results );
					}
				}

				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}

	compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];

		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !group ) {
				group = tokenize( selector );
			}
			i = group.length;
			while ( i-- ) {
				cached = matcherFromTokens( group[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}

			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
		}
		return cached;
	};

	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
	}

	function select( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			match = tokenize( selector );

		if ( !seed ) {
			// Try to minimize operations if there is only one group
			if ( match.length === 1 ) {

				// Take a shortcut and set the context if the root selector is an ID
				tokens = match[0] = match[0].slice( 0 );
				if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
						support.getById && context.nodeType === 9 && documentIsHTML &&
						Expr.relative[ tokens[1].type ] ) {

					context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
					if ( !context ) {
						return results;
					}
					selector = selector.slice( tokens.shift().value.length );
				}

				// Fetch a seed set for right-to-left matching
				i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
				while ( i-- ) {
					token = tokens[i];

					// Abort if we hit a combinator
					if ( Expr.relative[ (type = token.type) ] ) {
						break;
					}
					if ( (find = Expr.find[ type ]) ) {
						// Search, expanding context for leading sibling combinators
						if ( (seed = find(
							token.matches[0].replace( runescape, funescape ),
							rsibling.test( tokens[0].type ) && context.parentNode || context
						)) ) {

							// If seed is empty or no tokens remain, we can return early
							tokens.splice( i, 1 );
							selector = seed.length && toSelector( tokens );
							if ( !selector ) {
								push.apply( results, seed );
								return results;
							}

							break;
						}
					}
				}
			}
		}

		// Compile and execute a filtering function
		// Provide `match` to avoid retokenization if we modified the selector above
		compile( selector, match )(
			seed,
			context,
			!documentIsHTML,
			results,
			rsibling.test( selector )
		);
		return results;
	}

	// Deprecated
	Expr.pseudos["nth"] = Expr.pseudos["eq"];

	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();

	// One-time assignments

	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

	// Initialize against the default document
	setDocument();

	// Support: Chrome<<14
	// Always assume duplicates if they aren't passed to the comparison function
	[0, 0].sort( sortOrder );
	support.detectDuplicates = hasDuplicate;

	justFont.find = Sizzle;
	justFont.getText = Sizzle.getText;

	})( window );
	
	/*
	 *  End of Sizzle lib
	 */
	
	var fontContainer = function( fontName, fontAlias, fontSelectors, fontEnglish){
  		this.fontName = fontName;
  		this.fontAlias = fontAlias || [];
  		this.fontSelectors = fontSelectors || [];
  		this.fontEnglish = fontEnglish || [];
  		this.fontUrl = [];
  		this.flag = {};
  		this.chars = [];
  		this.string = '';
	};
	fontContainer.prototype = {
		constructor: fontContainer,
		toString: function(){
			if( this.string !== null ) return this.string;
			return ( this.string = this.chars.join("") );
		},
		fontAliasRegex: function(){
			var alias = this.fontAlias.join("|");
			return alias ? new RegExp(alias, "") : null;
		},
		getFontSelectors: function(){
			return this.fontSelectors;
		},
		getFontAlias: function(){
			return this.fontAlias;
		},
		getFontEnglish: function(){
			return this.fontEnglish;
		},
		getFontUrl: function( loaded ){
			var arr = [];
			loaded = loaded !== true && loaded !== null ? false : loaded;
			for(var i in this.fontUrl){
				if(loaded !== null){
					if( this.fontUrl[i]["loaded"] !== loaded ) {
						continue;
					}
				}
				arr.push({
					name: this.fontName,
					index: i,
					url: this.fontUrl[i]["url"],
					loaded: this.fontUrl[i]["loaded"]
				});
			}
			return arr;
		},
		setFontUrlLoaded: function( index ){
			( this.fontUrl[index] && ( this.fontUrl[index]["loaded"] = true ) );
		},
		updateAliasFont: function(){
			var nodes = document.getElementsByTagName("*")
	  		  , aliasRegex = this.fontAliasRegex()
	  		  , fontFamily
	  		  ;
	  		if( aliasRegex ){
				for(var ni in nodes){
					if( ( fontFamily = getFontFamily(nodes[ni]) ) ){
						if( aliasRegex.test(fontFamily) ){
							this.uniqueChars( justFont.getText(nodes[ni]) );
						}
					}
				}
			}
		},
		updateSelectorsFont: function(){
			var selectors = this.fontSelectors.join(", ");
			var nodes = selectors ? justFont.find( selectors, document ) : [];
			( nodes && this.uniqueChars( justFont.getText(nodes) ) );
		},
		addSelectors: function( selectors ) {
			var arr = [];
			if ( selectors.indexOf(',') >= 0 ) {
				arr = selectors.split(',');
				for (var i in arr) {
					this.fontSelectors.push( trim(arr[i]) );
				}
			} else {
				this.fontSelectors.push( trim(selectors) );
			}
		},
		addAlias: function( alias ) {
			this.fontAlias.push( alias );
		},
		addEnglish: function( english ) {
			this.fontEnglish.push( '"' + english + '"' );
		},
		addFontUrl: function( url ) {
			this.fontUrl.push( {
				url: url,
				loaded: false
			} );
		},
		uniqueChars: function( str ) {
			str = str.replace(regexSpace, "").replace(regexAnd, "").split("");
			var len = str.length
			  , change = false
			  ;
			for (var i = 0; i < len; i++) {
				if ( ! ( str[i] in this.flag ) ) {
					change = true;
					this.flag[ str[i] ] = true;
					this.chars.push( str[i] );
				}
			}
			if( change ) {
				this.string = null;
			}
		}
	};
	var userAgent = window.navigator.userAgent
	  , isIE = /MSIE/g.test( userAgent )
	  , ieVersion = isIE ? parseInt( userAgent.split(";")[1].split(" ")[2], 10) : ""
	  , isIE8 = ( isIE && ieVersion < 9 )
	  , supportCurrentStyle = true
	  , regexSpace = /^[\s]+|[\s]+|&nbsp;|\u3000+/gi
	  , regexAnd = /&/gi
	  , rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
	  , core_trim = "".trim
	  , trim = core_trim && !core_trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				core_trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		}
	  , getFontFamily = function( dom ){
	  		if( ! dom ) return "";
	  		var s = supportCurrentStyle ? dom.currentStyle : window.getComputedStyle( dom, null );
	  		return s ? ( s.fontFamily || "" ) : "";
		}
	  , fontType = isIE8 ? "eot" : "woff"
	  , getFontUrlByType = function( url ){
	  		return url
	  			.replace(new RegExp("(^https?:\/\/)","i"),"//")
	  			.replace('ds3.justfont.com', 'jf-ds3.glonly.tw') + "?type=" + fontType;
		}
	  , getFontSrcByType = function( url ){
	  		if( fontType == "eot" ){
	  			return 'url(' + url + ')';
	  		}else{
	  			return 'local(" "), url(' + url + ') format("woff")';
	  		}
		}
	  , builder = function( _jf ){
	  		var fonts = {}
			  , events = {
					"Preload": Deferred(),
					"DomReady": Deferred(),
					"SettingsLoaded": Deferred(),
					"Actived": Deferred(),
					"Inactived": Deferred()
				}
	  		  , parseMethod = {
					"_setAppId": function(appId){
						justFont.appId = appId;
					},
					"p": function(p){
						justFont.p = p;
					},
					"_setFont": function(fontName, key, value){
						fonts[fontName] = fonts[fontName] || new fontContainer(fontName);
						switch(key){
							case 'css':
								fonts[fontName].addSelectors(value);
								break;
							case 'alias':
								fonts[fontName].addAlias(value);
								break;
							case 'english':
								fonts[fontName].addEnglish(value);
								break;
						}
					},
					"_event": function(eventName, callback){
						if( eventName && events[eventName] ) {
							events[eventName].done(callback);
						}
					}
				}
			  , parser = function(configs){
			  		var args , method;
			  		for(var i in configs){
			  			args = configs[i];
						if( ! args || args.constructor !== Array ) {
							continue;
						}
						method = args.splice(0,1);
						if ( ! method || ! method[0] ) {
							continue;
						}
						method = method[0];
						if( parseMethod[method] ){
							parseMethod[method].apply(null, args);
						}else if( 0 == method.indexOf('_event') ) {
							args.splice(0, 0, method.substr(6));
							parseMethod['_event'].apply(null, args);
						}
					}
				}
			  , traverseFontAlias = function(){
			  		var nodes = document.getElementsByTagName("*")
			  		  , fontFamily
			  		  , regex
			  		  , aliasRegex = {};
			  		  ;
			  		supportCurrentStyle = !! document.body.currentStyle;
			  		for( var i in fonts ){
						if( ( regex = fonts[i].fontAliasRegex() ) ){
							aliasRegex[i] = regex;
						}
					}
					for(var ni in nodes){
						if( nodes[ni].nodeType == 1 && ( fontFamily = getFontFamily(nodes[ni]) ) ){
							for( var i in aliasRegex ){
								if( aliasRegex[i].test(fontFamily) ){
									fonts[i].uniqueChars( justFont.getText(nodes[ni]) );
								}
							}
						}
					}
				}
			  , updateAllSelectorsFont = function(){
			  		for( var i in fonts ) {
						fonts[i].updateSelectorsFont();
					}
				}
			  , getAllFontUrls = function( loaded ){
			  		var arr = []
			  		  , urls
			  		  ;
			  		for(var i in fonts) {
			  			urls = fonts[i].getFontUrl( loaded );
			  			for(var j in urls){
			  				arr.push( urls[j] );
			  			}
			  		}
			  		return arr;
				}
			  , triggerEvent = function(eventName){
			  		if( eventName && events[eventName] ) {
						events[eventName].resolve();
					}
			  	}
			  , addEvent = function(eventName, callback){
			  		callback = callback || function(){};
			  		if( eventName && events[eventName] ) {
						events[eventName].done(callback);
					}
				}
			  , getFontsData = function(){
			  		var arr = {}
			  		  , fontString
			  		  ;
			  		for( var i in fonts ) {
			  			if( ( fontString = fonts[i].toString() ) ){
							arr["font["+i+"]"] = fontString;
						}
					}
					return arr;
				}
			  , md5code = function(){
					var string = ''
					  , fontString
					  ;
					for( var i in fonts ) {
						if( ( fontString = fonts[i].toString() ) ){
							string += i + fontString;
						}
					}
					return justFont.md5(string + justFont.url + justFont.appId + justFont.p);
				}
			  , getAjaxRecept = function(){
			  		var url = "//jf-ds2.glonly.tw/post/recept/"
			  		  , data = getFontsData()
			  		  ;
			  		if ( is_empty(data) ) {
			  			return window.getData( {"error":{"code":1109}} );
			  		}
			  		data["callback"] = "getData";
			  		data["key"] = justFont.appId;
					data["addr"] = justFont.url;
					data["md5"] = md5code();
					data["p"] = justFont.p;
					url += "?" + justFont.promise.encode(data);
					
					justFont.addScript(url, 'text/javascript', true, 2000, null, function(){
						triggerEvent("Inactived");
					});
				}
			  , getAjaxFont = function(url, callback){
			  		var p = justFont.promise.get(url);
			  		p.then(function(error, result) {
						if( error ) {
							return false;
						}
						callback();
						return true;
					});
			  		return p;
				}
			  , addBadgeImage = function(data){
			  		if( data["enable"] != "true" ) {
			  			return ;
			  		}
			  		var badgeImage
					  , badgeStyle = {
					  		"position": "fixed",
							"zIndex": "2000000000",
							"right": "0px",
							"bottom": "0px",
							"cursor": "pointer",
							"borderWidth": "0px",
							"borderStyle": "initial",
							"borderColor": "initial",
							"borderImage": "initial",
							"content": "none",
							"display": "inline",
							"float": "none",
							"height": "32px",
							"left": "auto",
							"margin": "0px",
							"maxHeight": "32px",
							"maxWidth": "83px",
							"minHeight": "32px",
							"minWidth": "83px",
							"orphans": "2",
							"outlineStyle": "none",
							"outlineWidth": "initial",
							"outlineColor": "initial",
							"overflowX": "visible",
							"overflowY": "visible",
							"padding": "0px",
							"pageBreakAfter": "auto",
							"pageBreakBefore": "auto",
							"pageBreakInside": "auto",
							"tableLayout": "auto",
							"textIndent": "0px",
							"top": "auto",
							"unicodeBidi": "normal",
							"verticalAlign": "baseline",
							"visibility": "visible",
							"widows": "2",
							"width": "83px"
						}
					  ;
					badgeImage = document.createElement('img');
					badgeImage["width"] = 83;
					badgeImage["height"] = 32;
					badgeImage["src"] = data["pic"];
					badgeImage["title"] = "Information about the fonts used on this site";
					badgeImage["alt"] = "Fonts by justfont";
					badgeImage["id"] = "justfont-badge";
					for(var style in badgeStyle){
						if( badgeImage["style"][style] !== undefined ) {
							badgeImage["style"][style] = badgeStyle[style];
						}
					}
					badgeImage.onclick = function() {
						window.open( data["link"], "Continue_to_Application");
						return false;
					};
					document.body.appendChild(badgeImage);
				}
			  , generateFontStyle = function(data){
			  		var rules = []
			  		  , cssClassList
			  		  , font
			  		  , fontUrl
			  		  , fontSrc
			  		  , aliasList
			  		  , selectorsList
			  		  , fontFamilies
			  		  , styleElement
			  		  , stylesheet = ''
			  		  , frag
			  		  , tmp
			  		  , nodes = []
			  		  ;
			  		for(var fontName in data) {
			  			font = fonts[fontName];
			  			fontUrl = getFontUrlByType( data[fontName] );
			  			font.addFontUrl( fontUrl );
			  			fontSrc = getFontSrcByType( fontUrl );
			  			aliasList = font.getFontAlias();
			  			if ( is_empty(aliasList) ) {
			  				aliasList = [ fontName ];
			  			}
			  			
			  			for(var i in aliasList){
			  				rules.push([ '@font-face', '{ font-family: "' + aliasList[i] + '";src: ' + fontSrc + ";}" ]);
			  			}
			  			selectorsList = font.getFontSelectors() || [];
			  			cssClassList = [];
			  			for(var i in selectorsList){
			  				cssClassList.push( ".jf-active " + selectorsList[i] );
			  			}
			  			fontFamilies = font.getFontEnglish() || [];
			  			fontFamilies.push( '"' + aliasList[0] + '"' );
			  			rules.push([ cssClassList.join(", "),  
			  				" { font-family: " + fontFamilies.join(", ") + '; }' ]);
			  		}
			  		if ( ! isIE8 ) {
			  			styleElement = document.createElement('style');
			  			document.getElementsByTagName("head")[0].appendChild(styleElement);
			  			// Safari does not see the new stylesheet unless you append something.
						// However!  IE will blow chunks, so ... filter it thusly:
						if( ! window.createPopup ) {
						   styleElement.appendChild(document.createTextNode(''));
						}
						styleElement = document.styleSheets[document.styleSheets.length - 1];
			  		}
					for(var i in rules){
						if( isIE8 ) {
							stylesheet += rules[i][0] + rules[i][1];
						} else {
							if( styleElement.insertRule ) {
								try { 
									styleElement.insertRule(rules[i][0] + rules[i][1], styleElement.cssRules.length); 
								} catch(e) {}
							} else {
								try { 
									styleElement.addRule(rules[i][0], rules[i][1]); 
								} catch(e) {}
							}
						}
					}
					if( isIE8 ) {
						frag = document.createDocumentFragment();
						tmp = frag.appendChild( document.createElement("div") );
						tmp.innerHTML = "X<div><style type='text/css'>" + stylesheet + '</style></div>';
						tmp = tmp.lastChild;
						merge( nodes, tmp.childNodes );
						while ( tmp.firstChild ) {
							tmp.removeChild( tmp.firstChild );
						}
						tmp = frag.lastChild;
						if ( tmp ) {
							frag.removeChild( tmp );
						}
						tmp = null;
						frag.appendChild(nodes[0]);
						document.getElementsByTagName("head")[0].appendChild(frag);
					}
				}
			  , merge = function( first, second ) {
					var l = second.length,
						i = first.length,
						j = 0;

					if ( typeof l === "number" ) {
						for ( ; j < l; j++ ) {
							first[ i++ ] = second[ j ];
						}
					} else {
						while ( second[j] !== undefined ) {
							first[ i++ ] = second[ j++ ];
						}
					}
					first.length = i;
					return first;
				}
			  , loadFont = function(){
			  		var urls = getAllFontUrls( false )
			  		  , tasks = []
			  		for(var i in urls){
			  			if( typeof urls[i] == 'object' ){
			  				tasks.push( createLoadFontTask( urls[i]) );
			  			}
			  		}
			  		justFont.promise.join(tasks).then(function(results){
			  			var success = true;
			  			for(var i in results){
			  				if( ! results[i] ){
			  					success = false;
			  				}
			  			}
			  			if( ! success ){
			  				triggerEvent("Inactived");
			  				return ;
			  			}
			  			triggerEvent("Actived");
			  		});
				}
			  , createLoadFontTask = function(url){
			  		return getAjaxFont( url["url"], function(){
		  					( fonts[url["name"]] && fonts[url["name"]].setFontUrlLoaded( url["index"] ) );
		  				});
				}
			  , is_empty = function(obj){
					var hasOwn = ({}).hasOwnProperty;
					// null and undefined are empty
					if (obj == null) return true;
					// Assume if it has a length property with a non-zero value
					// that that property is correct.
					if (obj.length && obj.length > 0)    return false;
					if (obj.length === 0)  return true;
				
					for (var key in obj) {
						if (hasOwn.call(obj, key))    return false;
					}
				
					return true;			  		
				}
			  , Push = function(){
			  		var args = arguments;
					method = Array.prototype.splice.call(args, 0, 1);
					if ( ! method || ! method[0] ) {
						return ;
					}
					method = method[0];
					if( 0 == method.indexOf('_event') ) {
						Array.prototype.splice.call(args, 0, 0, method.substr(6));
						parseMethod['_event'].apply(null, args);
					}
				}
			  ;
			
			parser( _jf );
			triggerEvent("Preload");
			window.getData = function(response){
				var data, success = true;
				triggerEvent("SettingsLoaded");
				for(var key in response){
					data = response[key];
					switch( key ){
						case 'badge':
							addBadgeImage(data);
							break;
						case 'font':
							if( typeof data != "object" ){
								success = false;
							}else{
								generateFontStyle(data);
								loadFont();
							}
							break;
						case 'error':
							success = false;
							break;
					}
				}
				if( ! success ) {
					triggerEvent("Inactived");
				}
				
				window["getData"] = undefined;
				try{
					delete window["getData"];
				}catch(e){}
			};
			justFont.DomReady(function(){
				triggerEvent("DomReady");
				traverseFontAlias();
				updateAllSelectorsFont();
				getAjaxRecept();
			});
	  		return {
	  			push: Push
	  		};
		}
	  ;
	
	window["_jf"] = _jf = builder(_jf);
})(this, this.document);
