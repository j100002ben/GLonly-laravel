<?php

class Home_Controller extends Base_Controller {

	/*
	|--------------------------------------------------------------------------
	| The Default Controller
	|--------------------------------------------------------------------------
	|
	| Instead of using RESTful routes and anonymous functions, you might wish
	| to use controllers to organize your application API. You'll love them.
	|
	| This controller responds to URIs beginning with "home", and it also
	| serves as the default controller for the application, meaning it
	| handles requests to the root of the application.
	|
	| You can respond to GET requests to "/home/profile" like so:
	|
	|		public function action_profile()
	|		{
	|			return "This is your profile!";
	|		}
	|
	| Any extra segments are passed to the method as parameters:
	|
	|		public function action_profile($id)
	|		{
	|			return "This is the profile for user {$id}.";
	|		}
	|
	*/

	public function action_index()
	{
		return View::make('home.index');
	}

	public function action_registration()
	{
		$time = time();
		$start_time = strtotime("2013-08-01 00:00:00 GMT+8");
		$end_time = strtotime("2013-08-31 23:59:59 GMT+8");
		if ( $time > $start_time AND $time < $end_time ) {
			return View::make('home.registration')
				->with('start_time', $start_time)
				->with('end_time', $end_time);

			/*
			return Redirect::to('https://docs.google.com/forms/d/'.
				'1lmKKaPaXntM9KEaDIUTjq2rlN_D4RFf_9mhBZ0kQhos/'.
				'viewform?entry.1677042488&entry.1385487865&entry.'.
				'1787948090&entry.505554217&entry.586857048&entry.'.
				'1644652406=1&entry.916073990=1&entry.221816683&entry.'.
				'225837570&entry.1318214892=%E5%90%8C%E4%BA%BA+/+'.
				'%E4%BA%8C%E6%AC%A1%E5%89%B5%E4%BD%9C&entry.1802719544='.
				'%E5%85%A8%E5%B9%B4%E9%BD%A1&entry.133011554='.
				'%E6%9C%AA%E5%AE%9A&entry.785285632&entry.1133850059');
			*/
		} else {
			if ( $time <= $start_time ) {
				return View::make('home.wait_registration')
					->with('start_time', $start_time)
					->with('end_time', $end_time);
			}else {
				return View::make('home.finish_registration');
			}
		}
	}

}