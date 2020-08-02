<?php
if ( !class_exists('IamportBlockPaymentResult') ) {
	class IamportBlockPaymentResult {

		public $success = false;
		public $data;
		public $error;

		public function __construct($success=false, $data=null, $error=null) {
			$this->success = $success;
			$this->data = $data;
			$this->error = $error;
		}

	}
}