<script lang="ts">
	import type { Options } from './generate';

	import { createEventDispatcher, onMount } from 'svelte';

	import { QRCode } from './generate';

	export let data = ''; // Data of the QR code

	export let typeNumber = 0; // Type number (1 ~ 40), or 0 for auto detection

	export let backgroundColor = '#ffffff'; // Hexadecimal color code or 'transparent', can be color css name (TOCHECK)
	export let color = '#000000'; // Hexadecimal color code
	export let anchorColor = color; // Hexadecimal color code
	export let moduleColor = color; // Hexadecimal color code

	export let errorCorrectionLevel = 'M'; // Error correction level. Possible values are 'L', 'M', 'Q', 'H'

	export let isJoin = false; // If set to true, the QR code will be generated as a single SVG element. If set to false, each square will be an individual SVG element
	export let isResponsive = false; // If set to true, the QR code will be responsive

	export let padding = 4; // Padding around the QR code in pixels
	export let size = 256; // Width and height dimensions in pixels of the QR code
	export let width = size; // Width dimension in pixels of the QR code
	export let height = size; // Height dimension in pixels of the QR code

	export let logoInBase64 = ''; // base64-encoded logo image. If it's an empty string (`''`) or undefined, it will be ignored. Use this property instead of `logoPath` for faster logo loading times
	export let logoPath = ''; // If it's an empty string (`''`), no logo will be added. Otherwise, the logo will be centered on the QR code. Typically, the logo file is located in the static folder
	export let logoBackgroundColor = ''; // Hexadecimal color code or 'transparent' for the logo background. If it's an empty string (`''`), the background color for the logo will be the same as the QR code backgroundColor property
	export let logoPadding = 4; // Padding around the logo in pixels
	export let logoWidth = 15; // Size of the logo in percentage relative to the QR code width
	export let waitForLogo = false; // If set to true, the QR code will not render until the logo has fully loaded

	export let dispatchDownloadLink = false; // If set to true, a download link will be generated for the QR code and dispatched to the parent component
	export let downloadLinkFileFormat = 'svg'; // The file format of the download link. Possible values are 'svg', 'png', 'jpg', 'jpeg', 'webp'. Default is 'svg'

	const dispatch = createEventDispatcher();

	const OPTIONS: Options = {
		data,
		typeNumber,
		backgroundColor,
		anchorColor,
		moduleColor,
		errorCorrectionLevel,
		join: isJoin,
		container: isResponsive ? 'svg-viewbox' : 'svg',
		padding,
		width,
		height,
		logoInBase64,
		logoBackgroundColor,
		logoPadding,
		logoWidth,
	};

	// If the logo is not set, the QR code will be visible immediately
	// Otherwise, it will be visible after the logo has been loaded if `waitForLogo` is set to true
	let qrCodeIsVisible: boolean = Boolean(logoInBase64) || !waitForLogo;

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
			console.error('convertImageToBase64: Failed to convert logo to base64:', error);

			return '';
		}
	};

	const convertQrCodeToFileFormat = (qrCodeSvg: string): void => {
		// Create a Blob from the SVG data
		const QR_CODE_BLOB = new Blob([qrCodeSvg], { type: 'image/svg+xml' });

		const QR_CODE_URL = URL.createObjectURL(QR_CODE_BLOB);

		if (downloadLinkFileFormat === 'svg') {
			// Dispatch the download link for the SVG file without converting it
			dispatch('downloadLinkGenerated', {
				url: QR_CODE_URL,
			});
		} else {
			// Load and convert the SVG file to the specified file format
			const IMAGE = new Image();

			IMAGE.onload = () => {
				// Create a canvas and draw the image onto it
				const CANVAS = document.createElement('canvas');

				CANVAS.width = IMAGE.width;
				CANVAS.height = IMAGE.height;

				const CTX = CANVAS.getContext('2d');

				if (CTX) {
					CTX.drawImage(IMAGE, 0, 0);

					const FILE_FORMAT =
						{
							png: 'image/png',
							jpg: 'image/jpeg',
							jpeg: 'image/jpeg',
							webp: 'image/webp',
						}[downloadLinkFileFormat] || 'image/png';

					// Convert canvas to the desired file format
					const CONVERTED_FILE_URL = CANVAS.toDataURL(FILE_FORMAT);

					dispatch('downloadLinkGenerated', {
						url: CONVERTED_FILE_URL,
					});
				}
			};

			IMAGE.onerror = () => {
				console.error('convertQrCodeToFileFormat: Error loading or converting the image');
			};

			IMAGE.src = QR_CODE_URL;
		}
	};

	onMount(async () => {
		if (!logoInBase64 && logoPath) {
			// Reload the QR Code with logo included from the logoPath
			OPTIONS.logoInBase64 = await convertImageToBase64(logoPath);

			qrCode = new QRCode(OPTIONS);
		}

		qrCodeIsVisible = true;

		if (dispatchDownloadLink && qrCode.svg() != null) {
			convertQrCodeToFileFormat(qrCode.svg());
		}
	});
</script>

<!--
@component
### QR Code

@param data (string) Data to encode in QR code

&nbsp;

@param typeNumber (number) Type number (1 ~ 40), or 0 for auto detection. Default is 0

&nbsp;

@param backgroundColor (string) The background color of the QR Code in hexadecimal format or 'transparent'. Default is '#ffffff'
@param color (string) The color of the QR Code in hexadecimal format. Default is '#000000'
@param anchorColor (string) The color of the anchor in the QR Code in hexadecimal format. Default is the same as the color property
@param moduleColor (string) The color of the module in the QR Code in hexadecimal format. Default is the same as the color property

&nbsp;

@param errorCorrectionLevel (string) The error correction level of the QR Code. Possible values: 'L', 'M', 'Q', 'H'. Default is 'M'

&nbsp;

@param isJoin (boolean) // If set to true, the QR code will be generated as a single SVG element. If set to false, each square will be an individual SVG element. Default is false
**Note:** The `isJoin` property is useful for performance optimization, especially when generating a large number of QR Codes. However, you cannot have different colors for the anchor and module when `isJoin` is set to true
@param isResponsive (boolean) With the responsive settings enabled, the size settings will only be used in the code calculation
and the container will adapt and use all available space in its parent element. Default is true

&nbsp;

@param padding (number) Padding around the QR Code. Default is 4 pixels
@param size (number) Width and height dimensions in pixels of the QR code. Default is 256 pixels
@param width (number) The width of the QR Code in pixels. Default is the same as the size property
@param height (number) The height of the QR Code in pixels. Default is the same as the size property

&nbsp;

@param logoInBase64 (string) base64-encoded logo image. If it's an empty string (`''`) or undefined, it will be ignored. Use this property instead of `logoPath` for faster logo loading times.
There is no validation of the base64 encoding; ensure it is valid. Default is '' (no logo)
@param logoPath (string) The path to the logo file to be added to the center of the QR Code. Default is '' (no logo).
**Note:** With the logo, it is recommended to have a minimum error correction level of 'M' to ensure the QR Code is readable
@param logoBackgroundColor (string) The background color of the logo in hexadecimal format or 'transparent'. Default is '' (same as the QR Code backgroundColor property)
@param logoPadding (number) Padding around the logo in pixels. Default is 4 pixels
@param logoWidth (number) The size of the logo in percentage relative to the QR Code width. Default is 15%
@param waitForLogo (boolean) If set to true, the QR Code will not render until the logo has fully loaded. Default is false

&nbsp;

@param dispatchDownloadLink (boolean) If set to true, a download link will be generated for the QR Code and dispatched to the parent component. Default is false
@param downloadLinkFileFormat (string) The file format of the download link. Possible values: 'svg', 'png', 'jpg', 'jpeg', 'webp'. Default is 'svg'

&nbsp;
&nbsp;
@dispatch downloadLinkGenerated (string) The download link for the QR Code is generated and dispatched to the parent component if the `dispatchDownloadLink` property is set to true

-->
{#if qrCodeIsVisible}
	{@html qrCode.svg()}
{/if}
