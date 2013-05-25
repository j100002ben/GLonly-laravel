<script src="{{ asset('js/justfont-app.min.js') }}"></script>
<script>
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-39783774-2']);
  _gaq.push(['_setDomainName', 'glonly.tw']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
</script>
<script>
ga('create', 'UA-39783774-1', 'glonly.tw');
ga('send', 'pageview');
window.track = function(a,b,c,d){
	_gaq.push(['_trackEvent', a, b, c]);
	ga('send', 'event', a, b, c);
}
</script>