<?php

class Guestbook_Controller extends Base_Controller {
	
	public function action_list()
	{
		$posts = Post::where_post_type('guestbook')
					->where_post_status('public')
					->order_by('created_at', 'desc')->get();
		
		return json_encode( array_map( function($post){
			return $post->to_array();
		}, $posts ) );
	}
	
	public function action_post($post_id)
	{
		$post = Post::find($post_id);
		if( ! $post OR $post->post_type != 'guestbook' OR $post->post_status != 'public' ){
			return Response::error('404');
		}
		$replys = $post->replys()
						->where_reply_type('guestbook')
						->where_reply_status('public')
						->order_by('created_at', 'desc')->get();
		$replys = array_map( function($reply){
			return $reply->to_array();
		}, $replys );
		$post = $post->to_array();
		
		return View::make('guestbook.post')
			->with('post', $post)
			->with('replys', $replys);
	}
	
	public function action_new()
	{
		Validator::register('email_domain', function($attribute, $value, $parameters)
		{
			if ( strpos($value, '@') === false ) {
				return false;
			}
			list($username,$domain) = explode('@',$value);
		    return checkdnsrr($domain,'MX');
		});
		$messages = array(
		    'required'  => '此欄位必須填寫。',
		    'email' => '請輸入正確的Email格式。',
		    'max' => '字串長度限制為 :max 字以內。',
		    'email_domain' => '無法查詢到此網域的 MX 記錄，請檢查網址是否有輸入錯誤。'
		);
		
		$input = Input::all();
		$rules = array(
		    'nickname'  => 'required|max:30',
		    'email' => 'required|email|email_domain',
		    'title' => 'required|max:50',
		    'text' => 'required|max:300',
		    'recaptcha_response_field' => 'recaptcha:6Ld_CeMSAAAAADAKChtzpf7bgExenteeRBy-h0M9'
		);
		$validation = Validator::make($input, $rules, $messages);
		if ( $validation->fails() ) {
	        return Redirect::to('guestbook/new')->with_input()->with_errors($validation);
	    }
		
		$post = new Post;
		
		$post->post_nickname = $input['nickname']; 
		$post->post_email = $input['email'];
		$post->post_title = $input['title'];
		$post->post_body = $input['text'];
		$post->post_type = 'guestbook';
		$post->post_status = 'public';
		$post->save();
		
		return Redirect::to('guestbook/success');
	}
	
	public function action_reply_new($post_id)
	{
		$post = Post::find($post_id);
		if( ! $post OR $post->post_type != 'guestbook' OR $post->post_status != 'public' ){
			return Response::error('404');
		}
		
		Validator::register('email_domain', function($attribute, $value, $parameters)
		{
			if ( strpos($value, '@') === false ) {
				return false;
			}
			list($username,$domain) = explode('@',$value);
		    return checkdnsrr($domain,'MX');
		});
		$messages = array(
		    'required'  => '此欄位必須填寫。',
		    'email' => '請輸入正確的Email格式。',
		    'max' => '字串長度限制為 :max 字以內。',
		    'email_domain' => '無法查詢到此網域的 MX 記錄，請檢查網址是否有輸入錯誤。'
		);
		
		$input = Input::all();
		$rules = array(
		    'nickname'  => 'required|max:30',
		    'email' => 'required|email|email_domain',
		    'text' => 'required|max:300',
		    'recaptcha_response_field' => 'recaptcha:6Ld_CeMSAAAAADAKChtzpf7bgExenteeRBy-h0M9'
		);
		$validation = Validator::make($input, $rules, $messages);
		if ( $validation->fails() ) {
	        return Redirect::to('guestbook/post/reply/' . $post_id)->with_input()->with_errors($validation);
	    }
	    
	    $data = array(
    		'reply_nickname' => $input['nickname'],
			'reply_email' => $input['email'],
			'reply_body' => $input['text'],
			'reply_type' => 'guestbook',
			'reply_status' => 'public'
    	);
		
		$reply = $post->replys()->insert($data);
		$reply_num = $post->replys()
						->where_reply_type('guestbook')
						->where_reply_status('public')
						->order_by('created_at', 'desc')->count();
		$post->reply_num = $reply_num;
		$post->save();
		return Redirect::to('guestbook/post/' . $post_id);
	}

}