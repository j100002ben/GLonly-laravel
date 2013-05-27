;"use strict";
(function(window, undefined){
	var document = window.document
	  , $ = window.jQuery
	  , Raphael = window.Raphael
	  , html_class = document.getElementsByTagName('html')[0].className
	  , ieflag = {
			normal: ! /lte-ie9/i.test(html_class),
			ie: /*@cc_on!@*/false,
			ie9: /is-ie9/i.test(html_class),
			ie8: /is-ie8/i.test(html_class),
			lteie9: /lte-ie9/i.test(html_class),
			lteie8: /lte-ie8/i.test(html_class),
			lteie7: /lte-ie7/i.test(html_class)
		}
	  , GLonly = {}
	  ;
	GLonly.resize_window = function(){
  		var height = $(document.body).height()
  		  , $body = $('#menu-group')
  		  , $header = $('#header')
  		  , iframeWin = $('.fancybox-iframe').get(0)
  		  , scale
  		  , y
  		  ;
  		if( iframeWin !== undefined && iframeWin ){
  			iframeWin.contentWindow.postMessage('resize-window', window.location.origin);
  		}
  		if( height < 650 ) {
  			scale = height / 650;
  			y = ( 650 - height ) / 2 * scale;
  			$body.css({
  				transform: "translate(0,-" + y + "px) scale(" + scale + "," + scale + ")"
  			});
  			y = y * 0.9;
  			$header.css({
  				transform: "translate(0,-" + y + "px) scale(" + scale + "," + scale + ")"
  			});
  		} else {
  			$body.add($header).css({
  				transform: "translate(0,0) scale(1,1)"
  			});
  		}
	};
	GLonly.modal_loaded = function(){
		var iframeWin = $('.fancybox-iframe').get(0);
  		if( iframeWin !== undefined && iframeWin ){
  			iframeWin.contentWindow.postMessage('modal-loaded', window.location.origin);
  		}
	};
	GLonly.view = {
		
	};
	GLonly.data = {
		current_group: '',
		current_page: ''
	};
	GLonly.events = {
		'trigger_page': function(target_id){
			var $target = $('#' + target_id)
			  , $page_inner = $target.find('.page-body-inner')
			  , $old_target = $target.parent().find('.page-container.active')
			  , old_target_id = $old_target.attr('id')
			  , tjscroll;
			$('#page-group').find('li.'+old_target_id).removeClass('active')
			.end().find('li.'+target_id).addClass('active');
			$old_target.removeClass('active');
			$target.addClass('active');
			if( tjscroll = $page_inner.data('TJScroll') ){
				tjscroll.refresh.call(tjscroll);
			}else{
				$page_inner.TJScroll({
					enabled:true,
					hScroll:false,
					vScroll:true,
					hScrollbar:false,
					vScrollbar:true,
					bounceLock: true
				});
			}
			GLonly.data.current_page = target_id;
		}
	};
	GLonly.network = {
		
	};
	GLonly.start = function(){
		GLonly.init.draw_line.call(GLonly, function(){
			$('html').addClass('jf-finish');
		});
	};
	GLonly.init = {
		page: function(){
		  		console.log('exec init page');
		  		var menu_tap
		  		  , $wrapper = $('#wrapper')
		  		  , $page_group = $('#page-group')
		  		  , page_animate = false
		  		  ;
		  		$(document).on('touchmove', function(e) { 
					e.preventDefault();
					e.stopPropagation();
				});
				$(document.body).css('overflow', 'hidden');
				$('a.page-header-back').on('click', function(){
					if( page_animate ) return false;
					page_animate = true;
					$(this).closest('.page-content').removeClass('static');
					$page_group.removeClass('static');
					setTimeout(function(){
						$page_group.css('left', '100%');
						GLonly.data.current_group = GLonly.data.current_page = '';
						page_animate = false;
					}, 1000);
					return false;
				});
				$('a[href="#construstion"]').on('click', function(e){
					$.fancybox.open({
						href : $(this).attr('href'),
						type : 'inline',
						padding : 10,
						width		: '100%',
						height		: '100%',
						autoSize	: true,
						closeClick	: true,
						hideOnContentClick: true
					});
			  		e.preventDefault();
					e.stopPropagation();
					return false;
				});
				$('.page-menu-list li a', $page_group).on('click', function(e){
					var $this = $(this)
					  , page_target = $this.attr('page-target')
					  ;
					if( $this.attr('href') == '#construstion' ) return false;
					GLonly.events.trigger_page(page_target);
					return false;
				});
				$('#menu-list a').on('click', function(e){
					var $this = $(this)
					  , page_id = $this.attr('page-id')
					  , page_target = $this.attr('page-target')
					  ;
					if( $this.attr('href') == '#construstion' ) return false;
					switch(page_id){
						case "event-page":
						case "circle-page":
						case "rule-page":
							GLonly.data.current_group = page_id;
							$page_group.css('left', '0px').addClass('static');
							$('#'+page_id).addClass('static');
							GLonly.events.trigger_page(page_target);
							break;
						default:
							break;
					}
					return false;
				});
				if(ieflag.ie){
					GLonly.init.ie_page.call(this);
				}
				setTimeout(function(){
					if( $('html').hasClass('jf-loading') ){
						return setTimeout(arguments.callee,1000/30);
					}
					GLonly.start.call(GLonly);
				},1000/30);
			},
		traditional_page: function(){
		  		console.log('exec init traditional page');
			},
		draw_line: function(callback){
				callback = callback || function(){};
				var $d = $('#drawings-group-inner')
				  , width = $d.width()
				  , height = $d.height()
				  , half_width = width / 2
				  , canvas = Raphael("drawings-group-inner", width, height)
				  , start_point = ['M', half_width, 265]
				  , left_start_point = ['M', half_width - 250, 265]
				  , left_points = []
				  , left_bottom_points = []
				  , right_start_point = ['M', half_width + 250, 265]
				  , right_points = []
				  , right_bottom_points = []
				  ;	
				left_bottom_points.push({
					point: left_start_point,
					time: 1000,
					delay: 700
				});
				left_bottom_points.push({
					point: ['M', half_width - 250, 400],
					time: 1000
				});
				left_points.push({
					point: start_point,
					time: 1000
					});
				left_points.push({
					point: ['L', half_width - 350, 265],
					time: 1000
					});
				left_points.push({
					point: ['L', half_width - 350, 190],
					time: 1000
					});
				
				right_bottom_points.push({
					point: right_start_point,
					time: 1000,
					delay: 700
				});
				right_bottom_points.push({
					point: ['M', half_width + 250, 400],
					time: 1000
				});
				right_points.push({
					point: start_point,
					time: 1000
					});
				right_points.push({
					point: ['L', half_width + 350, 265],
					time: 1000
					});
				right_points.push({
					point: ['L', half_width + 350, 190],
					time: 1000
					});
				
				var left_paths = []
				  , left_bottom_paths = []
				  , right_paths = []
				  , right_bottom_paths = []
				  ;
				var point_animate_seq = function(paths, points, i){
					if( i >= points.length - 1) return callback.call();
					if( points[i].delay !== undefined && points[i].delay ){
						setTimeout(function(){
							point_animate_seq(paths, points, i);
						}, points[i].delay);
						delete points[i].delay;
						return ;
					}
					var a = points[i].point
					  , b = points[i+1].point
					  ;
					a[0] = 'M';
					b[0] = 'L';
					paths[i] = canvas.path(a);
					paths[i].attr({
						stroke: '#CCC', 
						opacity: 0.5,
						"stroke-width": 8,
						"stroke-linecap": 'round',
						"stroke-linejoin": 'round',
						"stroke-dasharray": '-'
						});
					paths[i].animate( { path: [a, b] } , points[i].time, function(){
						point_animate_seq(paths, points, i+1);
					} );
					return ;
				};
				point_animate_seq(left_paths, left_points, 0);
				point_animate_seq(left_bottom_paths, left_bottom_points, 0);
				point_animate_seq(right_paths, right_points, 0);
				point_animate_seq(right_bottom_paths, right_bottom_points, 0);
			},
		ie_page: function(){
		  		
			}
	};
	$(function(){
		GLonly.resize_window();
	  	$(window).resize(GLonly.resize_window);
	  	$('a[rel="fancybox-iframe"]').click(function(e){
	  		$.fancybox.open({
				href : $(this).attr('href'),
				type : 'iframe',
				padding : 5,
				maxWidth	: 800,
				maxHeight	: 600,
				fitToView	: false,
				width		: '70%',
				height		: '70%',
				autoSize	: false,
				closeClick	: true,
				afterShow	: GLonly.modal_loaded,
				onUpdate	: GLonly.modal_loaded
			});
	  		e.preventDefault();
			e.stopPropagation();
	  		return false;
	  	});
		if( $.fn.jquery == '2.0.0' ){
			GLonly.init.page.call(this);
		}else{
			GLonly.init.traditional_page.call(this);
		}
	});
	
	$.extend({ ieflag: ieflag });
	window.ieflag = ieflag;
	window.GLonly = GLonly;
})(this);