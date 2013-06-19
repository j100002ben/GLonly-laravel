var _jf = _jf || [];
_jf.push(['_setAppId', 'e2510f16VwT5XHbraM7MKTaHR3qT2MdKu1jBGGtTppUF0K0R_uDa3ktbQ7mcNDOyCPJtSCY4MOtOxSWjB4pAJ8rT6ca9tUuIPML9PaiaaJPtH96PgsgSdZc8UlOyysfDDv8VwTLKRnzuQjDTRAKZntVGZvG3BX7k2-IZ5-qbaGQuGkL9-mo=']);
_jf.push(['p','9094']);
_jf.push(['_setFont','xingothic-tc-w4','css','.xingothic-tc-w4']);
_jf.push(['_setFont','xingothic-tc-w4','alias','xingothic-tc-w4']);
_jf.push(['_setFont','xingothic-tc-w6','css','.xingothic-tc-w6']);
_jf.push(['_setFont','xingothic-tc-w6','alias','xingothic-tc-w6']);
_jf.push(['_setFont','xingothic-tc-w8','css','.xingothic-tc-w8']);
_jf.push(['_setFont','xingothic-tc-w8','alias','xingothic-tc-w8']);
_jf.push(['_eventPreload',function(){
	// preload event.
}]);
_jf.push(['_eventLoaded',function(){
	// loading event.
}]);
_jf.push(['_eventActived',function(){
	// actived event.
}]);
_jf.push(['_eventInactived',function(){
	// inactived event.
}]);


(function(window, document, classNameProp, classListProp, scriptUrl, undefined){
	var _jf = window["_jf"];
	if( _jf.constructor === Object ) return ;
	
	var timer
	  , htmlElement = document.getElementsByTagName("html")[0]
	  , hasClassList = !! htmlElement[classListProp]
	  , triggerEvent = function(eventName){
		  	for(var i in _jf){
				if( _jf[i][0] == eventName ){
					if( false === _jf[i][1].call(_jf) ) break ;
				}
			}
	  	}
	  , hasClass = function(className){
			if( hasClassList ){
				return htmlElement[classListProp].contains( className );
			}else{
				return !! htmlElement[classNameProp].match(new RegExp("(\\s|^)"+className+"(\\s|$)","g"));
			}
		};
	  ;
	_jf.addClass = function(className){
		if( hasClass(className) ) return ;
		if( hasClassList ){
			htmlElement[classListProp].add( className );
		}else{
			htmlElement[classNameProp] += " " + className;
		}
	};
	_jf.removeClass = function(className){
		if( hasClassList ){
	  		htmlElement[classListProp].remove( className );
	  	}else{
	  		htmlElement[classNameProp] = htmlElement[classNameProp].replace(new RegExp("(\\s|^)"+className+"(\\s|$)","g"), " ");
	  	}
	};
	_jf.addScript = function(url, type, async, timeout, success, error){
		success = success || function(){};
		error = error || function(){};
		var scriptElement = document.createElement( 'script' )
		  , scriptFirstElement = document.getElementsByTagName( 'script' )[0]
		  , timer
		  , flag = false
		  ;
		if( timeout ){
			timer = setTimeout(function () {
				scriptElement.src = "";
	  			scriptElement.onerror = scriptElement.onload = scriptElement.onreadystatechange = null;
	  			scriptElement.parentNode.removeChild( scriptElement );
	  			scriptElement = null;
	  			error;
	  		}, timeout);
		}
		scriptElement.type = type || 'text/javascript';
		scriptElement.async = async;
		scriptElement.onload = scriptElement.onreadystatechange = function ( _, isAbort ) {
			if( !flag && ( ! scriptElement.readyState || /loaded|complete/.test( scriptElement.readyState ) ) ) {
				flag = true;
				if( timeout ){
					clearTimeout( timer );
				}
				scriptElement.src = "";
	  			scriptElement.onerror = scriptElement.onload = scriptElement.onreadystatechange = null;
	  			scriptElement.parentNode.removeChild( scriptElement );
				scriptElement = null;
				if ( !isAbort ) {
					setTimeout(function(){success();}, 200);
				}
			}
		};
		scriptElement.onerror = function (errorMsg, url, lineNumber){
			if( timeout ){
				clearTimeout( timer );
			}
			scriptElement.src = "";
  			scriptElement.onerror = scriptElement.onload = scriptElement.onreadystatechange = null;
  			scriptElement.parentNode.removeChild( scriptElement );
			scriptElement = null;
			_jf.removeClass('jf-loading');
			_jf.addClass('jf-inactive');
			triggerEvent('_eventInactived');
  			return true;
  		};
		scriptElement.src = url;
		scriptFirstElement.parentNode.insertBefore( scriptElement, scriptFirstElement );
	};
	triggerEvent('_eventPreload');
	_jf.addClass('jf-loading');
	_jf.addScript(scriptUrl, 'text/javascript', false, 3000, null, function(){
		_jf.removeClass('jf-loading');
		_jf.addClass('jf-inactive');
		triggerEvent('_eventInactived');
	});
	
})(this, this.document, 'className', 'classList', '/js/justfont-stable-1.13.js?t=20130619');
