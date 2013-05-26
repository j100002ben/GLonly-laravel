@include('share.html_head')
<body class="">
<!--[if gte IE 8]><!-->
	<div id="wrapper">
		<header>
			<div id="header">
				<div id="header-inner">
					<h1>《百年好合》2014 百合Only</h1>
					<h2>"Love for All Seasons" 2014 Girls Love Festival</h2>
					<ul>
						<li>2014.03.08</li>
						<li>Y17台北市青少年育樂中心<br>二樓（展覽中心）</li>
					</ul>
				</div>
			</div>
		</header>
		<div id="body">
			<div id="menu-group">
				<div id="menu-group-inner">
					<div id="center-image"></div>
					<div id="center-logo"></div>
					<nav>
						<ul id="menu-list">
							<li class="menu-list list-event">
								<div class="bg"></div>
								<div class="img"></div>
								<div class="text">
									<span class="ct">活動資訊</span>
									<span class="et">Events</span>
								</div>
								<div class="list">
									<ul class="menu-sublist">
										<li><a page-id="event-page" page-target="event-info" class="list" href="{{ url('event') }}">活動資訊</a></li>
										<li><a page-id="event-page" page-target="event-ticket" class="list" href="#construstion">售票/入場</a></li>
										<li><a page-id="event-page" page-target="event-area" class="list" href="{{ url('event/area') }}">場地位置</a></li>
									</ul>
								</div>
							</li>
							<li class="menu-list list-rules">
								<div class="bg"></div>
								<div class="img"></div>
								<div class="text">
									<span class="ct">參與規範</span>
									<span class="et">Rules</span>
								</div>
								<div class="list">
									<ul class="menu-sublist">
										<li><a class="list" href="#construstion">活動守則</a></li>
										<li><a class="list" href="#construstion">一般參加者</a></li>
										<li><a class="list" href="#construstion">Cosplayer</a></li>
									</ul>
								</div>
							</li>
							<li class="menu-list list-circle">
								<div class="bg"></div>
								<div class="img"></div>
								<div class="text">
									<span class="ct">社團資訊</span>
									<span class="et">Circle</span>
								</div>
								<div class="list">
									<ul class="menu-sublist">
										<li><a page-id="circle-page" page-target="circle-info" class="list" href="{{ url('circle') }}">報名須知</a></li>
										<li><a class="list" href="#construstion">社團規範</a></li>
										<li><a class="list" href="#construstion">社團名單</a></li>
										<li><a class="list" href="#construstion">攤位地圖</a></li>
										<li><a class="list" href="#construstion">社團宣傳區</a></li>
										<li><a class="list" href="#construstion">注意事項</a></li>
									</ul>
								</div>
							</li>
							<li class="menu-list list-special">
								<div class="bg"></div>
								<div class="img"></div>
								<div class="text">
									<span class="ct">特別企劃</span>
									<span class="et">special</span>
								</div>
								<div class="list">
									<ul class="menu-sublist">
										<li><a class="list" href="#construstion">紀念合本</a></li>
										<li><a class="list" href="#construstion">現場活動</a></li>
									</ul>
								</div>
							</li>
						</ul>
					</nav>
				</div>
			</div>
			<div id="page-group"><div id="page-group-inner">
				<div id="event-page" class="page-content">
					<div class="page-content-inner">
						<div class="page-menu">
							<div class="page-menu-inner">
								<a class="page-header-back" href="#">
									<span class="gicon-arrow-arrow-left"></span>
									Back
								</a>
								<ul class="page-menu-list">
									<li class="event-info active"><a class="list" page-target="event-info" href="{{ url('event') }}">活動資訊</a></li>
									<li class="event-ticket"><a class="list" page-target="event-ticket" href="#construstion">售票/入場</a></li>
									<li class="event-area"><a class="list" page-target="event-area" href="{{ url('event/area') }}">場地位置</a></li>
								</ul>
							</div>
						</div>
						<div class="page-background"></div>
						<div class="page-container active" id="event-info">
							<div class="page-header">
								<h3>活動資訊</h3>
							</div>
							<div class="page-body">
								<div class="page-body-wrapper">
									<div class="page-body-inner">
										<div class="page-body-content">
										<p>《百年好合》2014 百合Only</p>
										<p class="small">"Love for All Seasons"<br>2014 Girls Love Festival</p>
										<hr>
										<p class="small">活動日期：　　2014.03.08</p>
										<p class="small">Y17台北市青少年育樂中心 二樓</p>
										<p class="small">台北市中正區仁愛路一段17號</p>
										<hr>
										<p class="small">門票費用：新台幣 $150 元</p>
										<p class="small">預計招募攤位數：　　60攤</p>
										<p class="small">社團報名日期：　　　&nbsp;未定</p>
										<p class="small">預售票販售期間：　　&nbsp;未定</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="page-container" id="event-area">
							<div class="page-header">
								<h3>場地位置</h3>
							</div>
							<div class="page-body">
								<div class="page-body-wrapper">
									<div class="page-body-inner">
										<div class="page-body-content">
										<p class="small">※決定排隊動線後會公布詳細會場周邊路線圖。</p>
										<p><img src="{{ asset('img/y17-map.jpg') }}" alt="會場地圖"></p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div id="circle-page" class="page-content">
					<div class="page-content-inner">
						<div class="page-menu">
							<div class="page-menu-inner">
								<a class="page-header-back" href="#">
									Back
									<span class="gicon-arrow-arrow-left"></span>
								</a>
								<ul class="page-menu-list">
									<li class="circle-info active"><a class="list" page-target="circle-info" href="{{ url('circle') }}">報名須知</a></li>
								</ul>
							</div>
						</div>
						<div class="page-background"></div>
						<div class="page-container active" id="circle-info">
							<div class="page-header">
								<h3>社團報名須知</h3>
							</div>
							<div class="page-body">
								<div class="page-body-wrapper">
									<div class="page-body-inner">
										<div class="page-body-content">
										<p>本場僅限販售描寫女性間情感之作品或週邊。<br>（如果有定義不明確的問題，請向主辦單位做確認）</p>
										<ul>
											<li class="small">募集攤位數：60攤。</li>
											<li class="small">每一攤位入場人數：3人（兩人需購買場刊）。</li>
											<li class="small">錄取方式：滿額抽籤制。</li>
											<li class="small">報名連結（報名開始後公布）。</li>
											<li class="small">限制級作品請在封面標示為「18禁」（或向主辦單位索取18禁貼紙），亦禁止販賣給未成年，且見本不得展示出18禁內容。</li>
											<li class="small">禁止販售二手作品與非自創作品，若要販售非自創作品之社團需要取得原作授權並向主辦單位報備證明。</li>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div></div>
			<div id="drawings-group">
				<div id="drawings-group-inner">
					
				</div>
			</div>
			<div id="icon-group">
				<div id="icon-group-inner">
					
				</div>
			</div>
		</div>
	</div>
	@include('share.construction');
	@include('share.html_foot')
<!--<![endif]-->
@include('share.outdated_browser')
</body>
</html>
