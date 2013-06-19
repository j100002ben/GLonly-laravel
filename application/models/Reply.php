<?php

class Reply extends Eloquent {
	
	public static $table = 'replys';

	public static $key = 'id';
	
	public static $timestamps = true;
	
	public $includes = array('post');
	
	public static $hidden = array('reply_email', 'reply_type', 'reply_status', 'updated_at');
	
	public function post()
	{
		return $this->belongs_to('Post');
	}
	
	public function get_reply_nickname()
	{
		return nl2br( e($this->get_attribute('reply_nickname')) );
	}
	
	public function get_reply_body()
	{
		return nl2br( e($this->get_attribute('reply_body')) );
	}
	
	public function get_created_at()
	{
		return date('Y.m.d H:i', strtotime( $this->get_attribute('created_at')));
	}
	
}