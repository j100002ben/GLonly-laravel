@include('share.html_modal_head')
<body class="modal-body">
<!--[if gte IE 8]><!-->
<div id="modal-wrapper">
	<div id="modal-page">
		<div id="modal-page-inner" class="guestbook-new-page">
			<h3>新增回應</h3>
			{{ Form::open() }}
			{{ Form::token() }}
			<div>
				<div style="text-align:center;"><a href="{{ url('guestbook/post/' . $post_id) }}">回到留言</a></div>
				<h4>暱稱</h4>
				<p>
					{{ Form::text('nickname', Input::old('nickname'), array('class' => 'input') ) }}
					{{ $errors->has('nickname') ? $errors->first('nickname', '<br><span>:message</span>') : '' }}</p>
				<h4>Email（不會顯示）</h4>
				<p>
					{{ Form::text('email', Input::old('email'), array('class' => 'input') ) }}
					{{ $errors->has('email') ? $errors->first('email', '<br><span>:message</span>') : '' }}</p>
				<h4>回應內容</h4>
				<p>
					{{ Form::textarea('text', Input::old('text'), array('class' => 'text') ) }}
					{{ $errors->has('text') ? $errors->first('text', '<br><span>:message</span>') : '' }}</p>
				<script type="text/javascript"
			       src="//www.google.com/recaptcha/api/challenge?k=6Ld_CeMSAAAAAP2ceuvkBoaaFln7MEWBxMxpazZ8">
			    </script>
			    <noscript>
			       <iframe src="//www.google.com/recaptcha/api/noscript?k=6Ld_CeMSAAAAAP2ceuvkBoaaFln7MEWBxMxpazZ8"
			           height="300" width="500" frameborder="0"></iframe><br>
			       <textarea name="recaptcha_challenge_field" rows="3" cols="40">
			       </textarea>
			       <input type="hidden" name="recaptcha_response_field"
			           value="manual_challenge">
			    </noscript>
				{{ $errors->has('recaptcha_response_field') ? '<p><br><span>驗證碼錯誤，請重新輸入。</span></p>' : '' }}
				<h4>
					按下送出表示您同意我們的 <a target="_blank" href="{{ url('privacy') }}">隱私權條款</a> &nbsp;&nbsp;
					{{ Form::button('送出') }}</h4>
			</div>
			{{ Form::close() }}
		</div>
	</div>
</div>
@include('share.html_modal_foot')
<!--<![endif]-->
@include('share.outdated_browser')
</body>
</html>
