<?php

if ( !class_exists('IamportCustomShortcode') ) {
  
	class IamportCustomShortcode {

    private $atts;
    private $content;

		public function __construct($shortcodeString) {
      $this->atts = shortcode_parse_atts($shortcodeString);

      // 숏코드 스트링으로부터 숏코드 컨텐츠 파싱
      $pattern = get_shortcode_regex();
      preg_match("/$pattern/s", $shortcodeString, $matches);
      $this->content = $matches[5];
    }
    
    public function convertToJsonString() {
      $a = shortcode_atts(array(
        'type' 			  => 'text',
        'required' 		=> false,
        'options' 		=> array(),
        'placeholder' => '',
        'data-for'		=> '',
        'default'     => '',
        'label'       => '',
        'link'        => '',
      ), $this->atts);

      $type = $a['type'];
      return array(
        'type'              => $this->getType($type, $a),
        'label'             => $this->getLabel($type, $a),
        'placeholder'       => $a['placeholder'],
        'required'          => filter_var($a['required'], FILTER_VALIDATE_BOOLEAN),
        'options'           => $this->getOptions($a),
        'agreementOptions'  => $this->getAgreementOptions($type, $a)
      );
    }
    
    private function getType($type) {
      switch ($type) {
        case 'check':
          return 'checkbox';
        case 'select':
          return 'dropdown';
        default:
          return $type;
      }
    }

    private function getLabel($type, $a) {
      if ($type == 'agreement') {
        return $a['label'];
      }
      return $this->content;
    }

    private function getOptions($a) {
      $options = $a['options'];
      if (empty($options)) {
        return array();
      }
      return explode(',', $options);
    }

    private function getAgreementOptions($type, $a) {
      if ($type == 'agreement') {
        // 약관동의
        $agreementLink = $a['link'];
        $agreementLabel = $a['label'];
        $customFields['label'] = $agreementLabel;

        $agreementOption = array();
        if (empty($agreementLink)) {
          // 전문
          $agreementOption['label'] = $agreementLabel;
          $agreementOption['type'] = 'content';
          $agreementOption['value'] = $this->content;
        } else {
          // 링크
          $agreementOption['label'] = $agreementLabel;
          $agreementOption['type'] = 'link';
          $agreementOption['value'] = $agreementLink;
        }
        return array($agreementOption);
      }
      return array();
    }
  } // end of Class

} // end of if
