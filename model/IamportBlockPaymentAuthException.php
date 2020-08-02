<?php
if ( !class_exists('IamportBlockPaymentAuthException') ) {
	class IamportBlockPaymentAuthException extends Exception {
		public function __construct($message, $code) {
			parent::__construct($message, $code);
		}
	}
}