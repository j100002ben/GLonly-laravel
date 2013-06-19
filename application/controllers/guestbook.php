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
		
		$manage_link = get_guestbook_manage_link('post', $post->id);
		$message = Swift_Message::newInstance('[GLonly.tw] Guestbook New Post')
		    ->setFrom(array('server@glonly.tw'=>'GLonly Server'))
		    ->setTo(array('2013yurionly@gmail.com'=>'GLonly Service'))
		    ->setBcc(array('glonly@clients.poka.tw'=>'Client-GLonly'))
		    ->setReplyTo(array('glonly@clients.poka.tw'=>'Client-GLonly'))
		    ->setBody(<<<EOT
{$post->post_nickname}新增一則留言
日期：{$post->created_at}
Email：{$post->post_title}
標題：{$post->post_title}
以下為留言內容：
────────────────────────────────────────
{$post->post_body}
────────────────────────────────────────
管理連結：
{$manage_link}
EOT
		,'text/plain');
		$this->mailer->send($message);
		
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
	
	public function action_manage($type, $id, $base64_encrypted_key, $base64_hash, $status = null)
	{
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
		
		$encrypted_key = base64_decode(strtr( $base64_encrypted_key, '+/=', '!_-'));
		$hash = base64_decode(strtr( $base64_hash, '+/=', '!_-'));
		
		$prefix = $type;
		$key = Crypter::decrypt($encrypted_key);
		if ( ! $key ) {
			return Response::error('404');
		}
		
		$unhash_str = '';
		$unhash_str .= '@' . $resource->id;
		$unhash_str .= '@' . $resource->{$prefix . '_nickname'};
		$unhash_str .= '@' . $resource->{$prefix . '_email'};
		$unhash_str .= '@' . $resource->{$prefix . '_type'};
		$unhash_str .= '@' . $resource->created_at;
		
		$hash_str = hash_hmac('sha512', $unhash_str, $key);
		
		if ( $hash !== crypt($hash_str, $hash) ) {
			return Response::error('404');
		}
		
		if ( ! empty($status) ) {
			if ( $status != 'public' && $status != 'private' ) {
				return Response::error('404');
			}
			$resource->{$prefix . '_status'} = $status;
			$resource->save();
			
			return Redirect::to_route('guestbook.manage', 
                array( $type, $id, $base64_encrypted_key, $base64_hash ) );
		}
		
		$resource_output = array();
		$attr_names = array(
            'ID' => 'id',
            '暱稱' => 'nickname',
            'Email' => 'email',
            '標題' => 'title',
            '內容' => 'body',
            '回應數量' => 'reply_num',
            '狀態' => 'status',
            '建立時間' => 'created_at',
            '修改時間' => 'updated_at'
            );
		
		if ( $prefix == 'reply' ) {
			unset($attr_names['標題']);
			unset($attr_names['回應數量']);
		}
		
		foreach ( $attr_names as $label => $attr ) {
			if ( in_array($attr, array( 'id', 'reply_num', 'created_at', 'updated_at' )) ) {
				$resource_output[$label] = $resource->{$attr};
			} else {
				$resource_output[$label] = $resource->{$prefix . '_' . $attr};
			}
		}
		
		return View::make('guestbook.manage')
			->with('resource', $resource_output)
			->with('prefix', $prefix);
	}

}