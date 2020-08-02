/**
 * BLOCK: iamport-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

import PaymentSetting from '../edit/PaymentSetting';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
export default registerBlockType( 'cgb/iamport-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( '아임포트 블록', 'iamport-block' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( '아임포트 블록', 'iamport-block' ),
    __( '아임포트', 'iamport-block' ),
    __( '결제', 'iamport-block' ),
    __( '일반결제', 'iamport-block' ),
    __( '정기결제', 'iamport-block' ),
  ],
  attributes: {
    buttonName: { // 결제 버튼 라벨
      type: 'string',
      selector: 'button',
    },
    buttonClassName: { // 결제 버튼 클래스 이름
      type: 'string',
      selector: 'input',
    },
    modalClassName: { // 결제 팝업 클래스 이름
      type: 'string',
      selector: 'input',
    },
    title: { // 결제 모달 타이틀
      type: 'string',
      selector: 'input',
    },
    description: { // 결제 모달 설명
      type: 'string',
      selector: 'input',
    },
    name: { // 주문명
      type: 'string',
      selector: 'input',
    },
    amountType: { // 결제 금액 유형
      type: 'string',
      selector: 'input',
    },
    amountOptions: { // 결제금액 정보
      type: 'array',
      selector: 'input',
    },
    currency: { // 화폐 단위
      type: 'string',
      selector: 'input',
    },
    payMethods: { // 결제 수단 정보
      type: 'array',
      selector: 'input',
    },
    pgs: { // 결제 수단 별 PG사 정보
      type: 'object',
      selector: 'input',
    },
    pgMids: { // 결제 수단 별 PG 상점아이디 정보
      type: 'object',
      selector: 'input',
    },
    cardQuota: { // 신용카드 할부 개월수
      type: 'number',
      selector: 'select',
    },
    vbankDue: { // 가상계좌 입금 기한
      type: 'number',
      selector: 'select',
    },
    digital: { // 실물 컨텐츠 여부
      type: 'boolean',
      selector: 'input',
    },
    redirectAfter: { // 결제 후 이동될 URL
      type: 'string',
      selector: 'input',
    },
    customFields: { // 커스텀 입력 필드 정보
      type: 'array',
      selector: 'input',
    },
  },

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
  edit: props => <PaymentSetting {...props} />,

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
  save: () => null,
} );
