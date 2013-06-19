<?php

class Post extends Eloquent {
	
	public static $table = 'posts';

	public static $key = 'id';
	
	public static $timestamps = true;
	
	public static $hidden = array('post_email', 'post_type', 'post_status', 'updated_at');
	
	public function replys()
	{
		return $this->has_many('Reply', 'post_id');
	}
	
	public function get_post_nickname()
	{
		return nl2br( e($this->get_attribute('post_nickname')) );
	}
	
	public function get_post_title()
	{
		return nl2br( e($this->get_attribute('post_title')) );
	}
	
	public function get_post_body()
	{
		return nl2br( e($this->get_attribute('post_body')) );
	}
	
	public function get_created_at()
	{
		return date('Y.m.d H:i', strtotime( $this->get_attribute('created_at')));
	}
	
}