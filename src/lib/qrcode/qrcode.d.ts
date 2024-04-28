import { SvelteComponent } from 'svelte';

// TODO: typing for QRCode component is not yet complete. Please refer to the README.md file for more information.

declare class QRCode extends SvelteComponent {
	constructor(options: any);

	$$prop_def: {
		data: string; // Data of the QR code

		typeNumber?:
			| 0 // Automatic type number
			| 1
			| 2
			| 3
			| 4
			| 5
			| 6
			| 7
			| 8
			| 9
			| 10
			| 11
			| 12
			| 13
			| 14
			| 15
			| 16
			| 17
			| 18
			| 19
			| 20
			| 21
			| 22
			| 23
			| 24
			| 25
			| 26
			| 27
			| 28
			| 29
			| 30
			| 31
			| 32
			| 33
			| 34
			| 35
			| 36
			| 37
			| 38
			| 39
			| 40; // Type number (1 ~ 40), or 0 for auto detection

		backgroundColor?: string; // Hexadecimal color code or 'transparent'
		color?: string; // Hexadecimal color code
		moduleColor?: string; // Color for regular modules
		anchorOuterColor?: string; // Color of the outer anchors
		anchorInnerColor?: string; // Color of the inner anchors

		shape?: 'square' | 'circle'; // Shape of the QR code squares

		errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'; // Error correction level. Possible values are 'L', 'M', 'Q', 'H'

		isJoin?: boolean; // If set to true, the QR code will be generated as a single SVG element. If set to false, each square will be an individual SVG element
		isResponsive?: boolean; // If set to true, the QR code will be responsive

		padding?: number; // Padding around the QR code
		size?: number; // Width and height dimensions in pixels of the QR code
		width?: number; // Width dimension in pixels of the QR code
		height?: number; // Height dimension in pixels of the QR code

		logoInBase64?: string; // base64-encoded logo image. If it's an empty string (`''`) or undefined, it will be ignored. Use this property instead of `logoPath` for faster logo loading times
		logoPath?: string; // If it's an empty string (`''`), no logo will be added. Otherwise, the logo will be centered on the QR code. Typically, the logo file is located in the static folder
		logoBackgroundColor?: string; // Hexadecimal color code or 'transparent' for the logo background. If it's an empty string (`''`), the background color for the logo will be the same as the QR code backgroundColor property
		logoPadding?: number; // Padding around the logo
		logoWidth?: number; // Size of the logo in percentage relative to the QR code width
		waitForLogo?: boolean; // If set to true, the QR code will not render until the logo has fully loaded

		dispatchDownloadLink?: boolean; // If set to true, a download link will be generated for the QR code and dispatched to the parent component
		downloadLinkFileFormat?: 'svg' | 'png' | 'jpg' | 'jpeg' | 'webp'; // The file format of the download link. Possible values are 'svg', 'png', 'jpg', 'jpeg', 'webp'
	};
}

export default QRCode;
