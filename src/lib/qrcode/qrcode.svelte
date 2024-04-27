<script lang="ts">
	import type { Options } from './generate';

	import { createEventDispatcher, onMount } from 'svelte';

	import { QRCode } from './generate';

	export let content = ''; // Content of the QR code

	export let backgroundColor = '#ffffff'; // Hexadecimal color code or 'transparent'
	export let color = '#000000'; // Hexadecimal color code
	export let errorCorrection = 'M'; // Error correction level. Possible values are 'L', 'M', 'Q', 'H'
	export let isResponsive = false; // If set to true, the QR code will be responsive
	export let padding = 4; // Padding around the QR code in pixels
	export let size = 150; // Size of the QR code in pixels

	export let base64Image = ''; // base64-encoded logo image. If it's an empty string (`''`) or undefined, it will be ignored. Use this property instead of `logoPath` for faster logo loading times
	export let logoPath = ''; // If it's an empty string (`''`), no logo will be added. Otherwise, the logo will be centered on the QR code. Typically, the logo file is located in the static folder
	export let logoBackgroundColor = ''; // Hexadecimal color code or 'transparent' for the logo background. If it's an empty string (`''`), the background color for the logo will be the same as the QR code backgroundColor property
	export let logoPadding = 4; // Padding around the logo in pixels
	export let logoWidth = 15; // Size of the logo in percentage relative to the QR code width

	export let dispatchDownloadLink = false; // If set to true, a download link will be generated for the QR code and dispatched to the parent component

	const dispatch = createEventDispatcher();

	const OPTIONS: Options = {
		content,
		background: backgroundColor,
		color,
		ecl: errorCorrection,
		container: isResponsive ? 'svg-viewbox' : 'svg',
		padding,
		width: size,
		height: size,
		join: true,
		typeNumber: 4,
		base64Image,
		logoBackgroundColor,
		logoPadding,
		logoWidth,
	};

	let qrCode: QRCode = new QRCode(OPTIONS);

	const convertImageToBase64 = async (filePath: string): Promise<string> => {
		try {
			const RESPONSE = await fetch(filePath);

			if (!RESPONSE.ok) {
				throw new Error('Failed to fetch the logo image');
			}

			// Get the blob directly with its original MIME type
			const LOGO_BLOB: Blob = await RESPONSE.blob();

			// Read the blob as a DataURL using FileReader
			return new Promise<string>((resolve, reject) => {
				const READER = new FileReader();

				READER.onload = () => resolve(READER.result as string);
				READER.onerror = () => reject(new Error('Failed to read the blob as base64'));
				READER.readAsDataURL(LOGO_BLOB);
			});
		} catch (error) {
			console.error('Failed to convert logo to base64:', error);

			return '';
		}
	};

	onMount(async () => {
		if (!base64Image && logoPath) {
			// Reload the QR Code with logo included from the logoPath
			OPTIONS.base64Image = await convertImageToBase64(logoPath);

			qrCode = new QRCode(OPTIONS);
		}

		if (dispatchDownloadLink && qrCode.svg() != null) {
			const QR_CODE_BLOB: Blob = new Blob([qrCode.svg()], { type: 'image/svg+xml' });

			const QR_CODE_URL: string = URL.createObjectURL(QR_CODE_BLOB);

			dispatch('downloadLinkGenerated', {
				url: QR_CODE_URL,
			});
		}
	});
</script>

<!--
@component
### QR Code

@param content (string) The content of the QR Code to be encoded

&nbsp;

@param backgroundColor (string) The background color of the QR Code in hexadecimal format or 'transparent'. Default is '#ffffff'
@param color (string) The color of the QR Code in hexadecimal format. Default is '#000000'
@param errorCorrection (string) The error correction level of the QR Code. Possible values: 'L', 'M', 'Q', 'H'. Default is 'M'
@param isResponsive (boolean) With the responsive settings enabled, the size settings will only be used in the code calculation
and the container will adapt and use all available space in its parent element. Default is true
@param padding (number) Padding around the QR Code. Default is 4 pixels
@param size (number) The size of the QR Code in pixels. Default is 150 pixels

&nbsp;

@param base64Image (string) base64-encoded logo image. If it's an empty string (`''`) or undefined, it will be ignored. Use this property instead of `logoPath` for faster logo loading times.
There is no validation of the base64 encoding; ensure it is valid. Default is '' (no logo)
@param logoPath (string) The path to the logo file to be added to the center of the QR Code. Default is '' (no logo).
**Note:** With the logo, it is recommended to have a minimum error correction level of 'M' to ensure the QR Code is readable
@param logoBackgroundColor (string) The background color of the logo in hexadecimal format or 'transparent'. Default is '' (same as the QR Code backgroundColor property)
@param logoPadding (number) Padding around the logo in pixels. Default is 4 pixels
@param logoWidth (number) The size of the logo in percentage relative to the QR Code width. Default is 15%

&nbsp;

@param dispatchDownloadLink (boolean) If set to true, a download link will be generated for the QR Code and dispatched to the parent component. Default is false

&nbsp;
&nbsp;

@dispatch downloadLinkGenerated (string) The download link for the QR Code is generated and dispatched to the parent component if the `dispatchDownloadLink` property is set to true
-->

{@html qrCode.svg()}
