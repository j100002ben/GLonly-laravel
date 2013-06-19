@include('share.html_modal_head')
<body class="modal-body">
<!--[if gte IE 8]><!-->
<div id="modal-wrapper">
	<div id="modal-page">
		<div id="modal-page-inner" class="guestbook-new-page">
			<h3>管理{{ $prefix == 'post' ? '留言' : '回應' }}</h3>
			<div>
				<h4>狀態設定</h4>
				<p>
					<a href="{{ URL::current() }}/public">顯示</a></p>
				<p>
					<a href="{{ URL::current() }}/private">隱藏</a></p>
			</div>
			<h3>詳細資料</h3>
			<div>
				@foreach ( $resource as $label => $value)
				<h4>{{ $label }}</h4>
				<p>{{ $value }}</p>
				@endforeach
			</div>
		</div>
	</div>
</div>
@include('share.html_modal_foot')
<!--<![endif]-->
@include('share.outdated_browser')
</body>
</html>
