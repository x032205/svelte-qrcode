import { SvelteComponent } from 'svelte';

declare class QRCode extends SvelteComponent {
	constructor(options: any);

	$$prop_def: {
		content: string; // Content of the QR code

		backgroundColor?: string; // Hexadecimal color code or 'transparent'
		color?: string; // Hexadecimal color code
		errorCorrection?: 'L' | 'M' | 'Q' | 'H'; // Error correction level. Possible values are 'L', 'M', 'Q', 'H'
		isResponsive?: boolean; // If set to true, the QR code will be responsive
		padding?: number; // Padding around the QR code in pixels
		size?: number; // Size of the QR code in pixels

		logoPath?: string; // If left empty, no logo will be added. Otherwise, the logo will be centered on the QR code. Typically, the logo file is located in the static folder
		logoBackgroundColor?: string; // Hexadecimal background color of the logo. If empty, the background will be the same as the QR code background color
		logoPadding?: number; // Padding around the logo in pixels
		logoWidth?: number; // Size of the logo in percentage relative to the QR code width

		dispatchDownloadLink?: boolean; // If set to true, a download link will be generated for the QR code and dispatched to the parent component
	};
}

export default QRCode;
