@include('share.html_modal_head')
<body class="modal-body" id="guestbook-post-modal">
<!--[if gte IE 8]><!-->
<div id="modal-wrapper">
	<div id="modal-page">
		<div id="modal-page-inner" class="guestbook-post-page">
			<div class="guest-group">
				<div class="guest-post">
					<div class="guest-post-title">
						{{ $post['post_title'] }}
					</div>
					<div class="guest-post-body">
						{{ $post['post_body'] }}
					</div>
					<hr class="guest-hr">
					<div class="guest-post-info">
						<div class="left">
							<i>{{ $post['post_nickname'] }}</i>
						</div>
						<div class="right">
							{{ $post['created_at'] }}
						</div>
					</div>
					<div class="guest-post-info" style="margin-bottom:30px;">
						<a href="{{ url('guestbook/post/reply/' . $post['id']) }}">回應</a>
					</div>
					@foreach ($replys as $reply)
						<div class="guest-reply-body">
							{{ $reply['reply_body'] }}
						</div>
						<hr class="guest-reply-hr">
						<div class="guest-reply-info">
							<div class="left">
								<i>{{ $reply['reply_nickname'] }}</i>
							</div>
							<div class="right">
								{{ $reply['created_at'] }}
							</div>
						</div>
					@endforeach
				</div>
			</div>
		</div>
	</div>
</div>
<script>
(function(window){
	window.parent.postMessage('guestbook-reload', window.location.origin);
})(this);
</script>
@include('share.html_modal_foot')
<!--<![endif]-->
@include('share.outdated_browser')
</body>
</html>
