<?php
if ( !class_exists('IamportBlockPaymentRequestException') ) {
	class IamportBlockPaymentRequestException extends Exception {

		protected $response;

		public function __construct($response) {
			$this->response = $response;

			parent::__construct($response->message, $response->code);
		}

	}
}