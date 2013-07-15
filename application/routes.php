<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Simply tell Laravel the HTTP verbs and URIs it should respond to. It is a
| breeze to setup your application using Laravel's RESTful routing and it
| is perfectly suited for building large applications and simple APIs.
|
| Let's respond to a simple GET request to http://example.com/hello:
|
|		Route::get('hello', function()
|		{
|			return 'Hello World!';
|		});
|
| You can even respond to more than one URI:
|
|		Route::post(array('hello', 'world'), function()
|		{
|			return 'Hello World!';
|		});
|
| It's easy to allow URI wildcards using (:num) or (:any):
|
|		Route::put('hello/(:any)', function($name)
|		{
|			return "Welcome, $name.";
|		});
|
*/

Route::get('/', function()
{
	return View::make('home.index')
		->with('page_title', '');
});

Route::get('/registration', function()
{
	return Redirect::to('https://docs.google.com/forms/d/'.
		'1lmKKaPaXntM9KEaDIUTjq2rlN_D4RFf_9mhBZ0kQhos/'.
		'viewform?entry.1677042488&entry.1385487865&entry.'.
		'1787948090&entry.505554217&entry.586857048&entry.'.
		'1644652406=1&entry.916073990=1&entry.221816683&entry.'.
		'225837570&entry.1318214892=%E5%90%8C%E4%BA%BA+/+'.
		'%E4%BA%8C%E6%AC%A1%E5%89%B5%E4%BD%9C&entry.1802719544='.
		'%E5%85%A8%E5%B9%B4%E9%BD%A1&entry.133011554='.
		'%E6%9C%AA%E5%AE%9A&entry.785285632&entry.1133850059');
});

Route::get('news', function()
{
	return View::make('home.news')
		->with('page_title', '');
});

Route::get('guestbook/list', 'guestbook@list');

Route::get('guestbook/post/reply/(:num)', function($post_id)
{
	return View::make('guestbook.reply-new')
		->with('post_id', $post_id)
		->with('page_title', '');
});

Route::post('guestbook/post/reply/(:num)', 'guestbook@reply_new');

Route::get('guestbook/post/(:num)', 'guestbook@post');

Route::get('guestbook/new', function()
{
	return View::make('guestbook.new')
		->with('page_title', '');
});

Route::get('guestbook/success', function()
{
	return View::make('guestbook.success')
		->with('page_title', '');
});

Route::post('guestbook/new', 'guestbook@new');

Route::get('credit', function()
{
	return View::make('home.credit')
		->with('page_title', '');
});

Route::get('privacy', function()
{
	return View::make('home.privacy')
		->with('page_title', '');
});

/*
Route::get('guestbook/manage/link/(:any)/(:num)', function($type, $id){
	return get_guestbook_manage_link($type, $id);
});
*/

function get_guestbook_manage_link($type, $id){
	$resource = null;
	$prefix = '';
	if ( $type == 'post' ) {
		$resource = Post::find($id);
	}
	if ( $type == 'reply' ) {
		$resource = Reply::find($id);
	}
	if ( ! $resource ) {
		return Response::error('404');
	}
	$prefix = $type;
	$key = Str::random(32);
	$encrypted_key = Crypter::encrypt($key);
	
	$unhash_str = '';
	$unhash_str .= '@' . $resource->id;
	$unhash_str .= '@' . $resource->{$prefix . '_nickname'};
	$unhash_str .= '@' . $resource->{$prefix . '_email'};
	$unhash_str .= '@' . $resource->{$prefix . '_type'};
	$unhash_str .= '@' . $resource->created_at;
	
	$hash_str = hash_hmac('sha512', $unhash_str, $key);
	$hash = crypt($hash_str, '$6$rounds=10000$' . Str::random(16) . '$');
	
	return route('guestbook.manage', array(
		$type, $id, strtr( base64_encode( $encrypted_key ), '+/=', '!_-'), 
		strtr( base64_encode( $hash ), '+/=', '!_-') ));
}

Route::get('guestbook/manage/(:any)/(:num)/(:any)/(:any)/(:any?)', 
   	array('as' => 'guestbook.manage', 'uses' => 'guestbook@manage') );

/*
|--------------------------------------------------------------------------
| Application 404 & 500 Error Handlers
|--------------------------------------------------------------------------
|
| To centralize and simplify 404 handling, Laravel uses an awesome event
| system to retrieve the response. Feel free to modify this function to
| your tastes and the needs of your application.
|
| Similarly, we use an event to handle the display of 500 level errors
| within the application. These errors are fired when there is an
| uncaught exception thrown in the application. The exception object
| that is captured during execution is then passed to the 500 listener.
|
*/

Event::listen('404', function()
{
	return Response::error('404');
});

Event::listen('500', function($exception)
{
	return Response::error('500');
});

/*
|--------------------------------------------------------------------------
| Route Filters
|--------------------------------------------------------------------------
|
| Filters provide a convenient method for attaching functionality to your
| routes. The built-in before and after filters are called before and
| after every request to your application, and you may even create
| other filters that can be attached to individual routes.
|
| Let's walk through an example...
|
| First, define a filter:
|
|		Route::filter('filter', function()
|		{
|			return 'Filtered!';
|		});
|
| Next, attach the filter to a route:
|
|		Route::get('/', array('before' => 'filter', function()
|		{
|			return 'Hello World!';
|		}));
|
*/

Route::filter('before', function()
{
	if( Request::env() == 'production' ) {
		// if( !Request::secure() ) return Redirect::to_secure(URI::current(), 301);
	}
});

Route::filter('after', function($response)
{
	// Do stuff after every request to your application...
});

Route::filter('csrf', function()
{
	if (Request::forged()) return Response::error('500');
});

Route::filter('auth', function()
{
	if (Auth::guest()) return Redirect::to('login');
});