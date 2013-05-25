window.jfAsyncInit = function () {
    jf.main({
        'appId': 'e2510f16VwT5XHbraM7MKTaHR3qT2MdKu1jBGGtTppUF0K0R_uDa3ktbQ7mcNDOyCPJtSCY4MOtOxSWjB4pAJ8rT6ca9tUuIPML9PaiaaJPtH96PgsgSdZc8UlOyysfDDv8VwTLKRnzuQjDTRAKZntVGZvG3BX7k2-IZ5-qbaGQuGkL9-mo=',
        'p': '9094',
        'font': {
            'xingothic-tc-w4': {
                'css': {
                    '0': '.xingothic-tc-w4'
                },
                'alias': 'xingothic-tc-w4'
            },
            'xingothic-tc-w8': {
                'css': {
                    '0': '.xingothic-tc-w8'
                },
                'alias': 'xingothic-tc-w8'
            },
            'xingothic-tc-w6': {
                'css': {
                    '0': '.xingothic-tc-w6'
                },
                'alias': 'xingothic-tc-w6'
            }
        }
    })
};
;(function(window, undefined){
	var document = window.document
	  , h = document.getElementsByTagName("html")[0]
      , trigger = function(status, old_status){
      		if( h.classList ){
      			( old_status && h.classList.remove(old_status) );
      			h.classList.add(status);
      		}else{
      			if( old_status ){
      				h.className = h.className.replace(new RegExp("(\\s|^)"+old_status+"(\\s|$)","g"), " ");
      			}
        		h.className += " " + status;
      		}
      		( window.jQuery && ( window.jQuery(document).trigger(status) ) );
      	}
      , e = setTimeout(function () {
      		trigger('jf-inactive', 'jf-loading');
      		var script_node = document.getElementById('jf-script');
      		if( script_node ){
      			script_node.onload = script_node.onreadystatechange = null;
      			script_node.parentNode.removeChild(script_node);
      		}
	    }, 3000)
      , jfscript = document.createElement("script")
      , d = false
      , s = document.getElementsByTagName("script")[0]
      ;
    trigger('jf-loading');
    jfscript.id = "jf-script";
    jfscript.type = "text/javascript";
    jfscript.async = true;
    jfscript.src = 'http://ds.justfont.com/js/stable/v/1.13/';
    jfscript.onload = jfscript.onreadystatechange = function () {
        var a = this.readyState;
        if (d || a && a != "complete" && a != "loaded") {
            return ;
        }
        d = true;
        clearTimeout(e);
    };
    s.parentNode.insertBefore(jfscript, s)
})(this);