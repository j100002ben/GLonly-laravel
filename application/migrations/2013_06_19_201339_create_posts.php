<?php

class Create_Posts {

	/**
	 * Make changes to the database.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('posts', function($table) {
			
			$table->engine = 'InnoDB';
			
            $table->increments('id');
            $table->string('post_title', 255);
            $table->text('post_body');
            $table->integer('reply_num')->unsigned()->default(0);
            $table->string('post_nickname');
            $table->string('post_email');
            $table->string('post_type', 20);
            $table->string('post_status', 20);
            $table->timestamps();
            
            $table->index(array('post_status', 'post_type'));
        });
	}

	/**
	 * Revert the changes to the database.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('posts');
	}

}