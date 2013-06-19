<?php

class Create_Replys {

	/**
	 * Make changes to the database.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('replys', function($table) {
			
			$table->engine = 'InnoDB';
			
            $table->increments('id');
            $table->integer('post_id')->nullable();
            $table->text('reply_body');
            $table->string('reply_nickname');
            $table->string('reply_email');
            $table->string('reply_type', 20);
            $table->string('reply_status', 20);
            $table->timestamps();
            
            $table->index(array('reply_status', 'reply_type'));
            $table->index('post_id');
        });
	}

	/**
	 * Revert the changes to the database.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('replys');
	}

}