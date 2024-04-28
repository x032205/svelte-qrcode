import { SvelteComponent } from 'svelte';

declare class QRCode extends SvelteComponent {
	constructor(options: any);

	$$prop_def: {
		data: string; // Data of the QR code

		backgroundColor?: string; // Hexadecimal color code or 'transparent'
		color?: string; // Hexadecimal color code
		errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'; // Error correction level. Possible values are 'L', 'M', 'Q', 'H'
		isJoin?: boolean; // If set to true, the QR code will be generated as a single SVG element. If set to false, each square will be an individual SVG element
		isResponsive?: boolean; // If set to true, the QR code will be responsive
		padding?: number; // Padding around the QR code in pixels
		size?: number; // Width and height dimensions in pixels of the QR code
		width?: number; // Width dimension in pixels of the QR code
		height?: number; // Height dimension in pixels of the QR code

		logoInBase64?: string; // base64-encoded logo image. If it's an empty string (`''`) or undefined, it will be ignored. Use this property instead of `logoPath` for faster logo loading times
		logoPath?: string; // If it's an empty string (`''`), no logo will be added. Otherwise, the logo will be centered on the QR code. Typically, the logo file is located in the static folder
		logoBackgroundColor?: string; // Hexadecimal color code or 'transparent' for the logo background. If it's an empty string (`''`), the background color for the logo will be the same as the QR code backgroundColor property
		logoPadding?: number; // Padding around the logo in pixels
		logoWidth?: number; // Size of the logo in percentage relative to the QR code width
		waitForLogo?: boolean; // If set to true, the QR code will not render until the logo has fully loaded

		dispatchDownloadLink?: boolean; // If set to true, a download link will be generated for the QR code and dispatched to the parent component
		downloadLinkFileFormat?: 'svg' | 'png' | 'jpg' | 'jpeg' | 'webp'; // The file format of the download link. Possible values are 'svg', 'png', 'jpg', 'jpeg', 'webp'
	};
}

export default QRCode;
