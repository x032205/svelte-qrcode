<script lang="ts">
	import { QRCode } from '$lib/index';

	let downloadUrl = '';
	let downloadUrlJoin = '';

	let downloadUrlCustomColor = '';

	let downloadUrlDirectBase64 = '';

	let downloadUrlPng = '';
	let downloadUrlJpg = '';
	let downloadUrlJpeg = '';
	let downloadUrlWebp = '';

	const handleDownloadLinkGenerated = (url = '') => {
		downloadUrl = url;
	};

	const handleDownloadLinkGeneratedJoin = (url = '') => {
		downloadUrlJoin = url;
	};

	const handleDownloadLinkGeneratedCustomColor = (url = '') => {
		downloadUrlCustomColor = url;
	};

	const handleDownloadLinkGeneratedForDirectBase64 = (url = '') => {
		downloadUrlDirectBase64 = url;
	};

	const handleDownloadLinkGeneratedPng = (url = '') => {
		downloadUrlPng = url;
	};

	const handleDownloadLinkGeneratedJpg = (url = '') => {
		downloadUrlJpg = url;
	};

	const handleDownloadLinkGeneratedJpeg = (url = '') => {
		downloadUrlJpeg = url;
	};

	const handleDownloadLinkGeneratedWebp = (url = '') => {
		downloadUrlWebp = url;
	};
</script>

<svelte:head>
	<title>Test QRCode component</title>
</svelte:head>

<h1>Standard QR Code</h1>
<div>
	<QRCode data="This is a test" />

	<QRCode data="https://duxreserve.com" />

	<QRCode data="https://duxreserve.com?lang=fr" />
</div>

<h1>Bitcoin address</h1>

<strong>Not mine, just random address for testing purposes</strong>

<div>
	<!-- Genesis block address: -->
	<QRCode data="bitcoin:04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f" />

	<!-- 4th halving address: -->
	<QRCode data="bitcoin:18cBEMRxXHqzWWCxZNtU91F5sbUNKhL5PX" />

	<QRCode data="bitcoin:bc1qmhcxtwkcmkqlpajmd09ygzxwwujql74vdpzwd5" />

	<QRCode data="bitcoin:bc1qmhcxtwkcmkqlpajmd09ygzxwwujql74vdpzwd5" typeNumber={4} />

	<QRCode data="bitcoin:bc1qmhcxtwkcmkqlpajmd09ygzxwwujql74vdpzwd5" errorCorrectionLevel="H" />

	<QRCode data="bitcoin:bc1qmhcxtwkcmkqlpajmd09ygzxwwujql74vdpzwd5" typeNumber={4} errorCorrectionLevel="H" />
</div>

<h2>Default not join vs join</h2>
<div>
	<QRCode data="https://duxreserve.com" />
	<QRCode data="https://duxreserve.com" isJoin />
</div>

<h2>Size 50 to 200</h2>
<div>
	<QRCode data="https://duxreserve.com" size={50} />
	<QRCode data="https://duxreserve.com" size={100} />
	<QRCode data="https://duxreserve.com" size={150} />
	<QRCode data="https://duxreserve.com" size={200} />
</div>

<h2>Size with different width and height</h2>
<div>
	<!-- This one may not work for QR scanning -->
	<QRCode data="https://duxreserve.com" width={100} />
	<QRCode data="https://duxreserve.com" width={100} height={150} />
	<QRCode data="https://duxreserve.com" width={150} height={150} />
</div>

<h2>Padding 0 to 20</h2>
<div>
	<QRCode data="https://duxreserve.com" padding={0} />
	<QRCode data="https://duxreserve.com" padding={5} />
	<QRCode data="https://duxreserve.com" padding={10} />
	<QRCode data="https://duxreserve.com" padding={20} />
</div>

<h2>Colors</h2>
<div>
	<QRCode data="https://duxreserve.com" color="#990000" />
	<QRCode data="https://duxreserve.com" color="#009900" />
	<QRCode data="https://duxreserve.com" backgroundColor="#009900" color="#ffffff" />

	<QRCode data="https://duxreserve.com" backgroundColor="#000000" color="#ffffff" />

	<QRCode data="https://duxreserve.com" anchorOuterColor="#00ff00" anchorInnerColor="blue" />

	<QRCode data="https://duxreserve.com" backgroundColor="yellow" moduleColor="red" anchorInnerColor="green" />
</div>

<h2>Shape</h2>
<div style="display: flex;">
	<div>
		<QRCode data="https://duxreserve.com" shape="square" />
		<p>square (default)</p>
	</div>
	<div>
		<QRCode data="https://duxreserve.com" shape="circle" />
		<p>circle</p>
	</div>
</div>

<h2>Error correction L, M, Q, and H</h2>
<div>
	<QRCode data="https://duxreserve.com" errorCorrectionLevel="L" />
	<QRCode data="https://duxreserve.com" errorCorrectionLevel="M" />
	<QRCode data="https://duxreserve.com" errorCorrectionLevel="Q" />
	<QRCode data="https://duxreserve.com" errorCorrectionLevel="H" />
</div>

<h2>Responsive</h2>
<div style="width:30%; height:30%;">
	<QRCode data="https://duxreserve.com" isResponsive />
</div>

<h2>With logo</h2>
<div>
	<QRCode data="https://duxreserve.com" logoPath="/logo/lightning.svg" />
</div>

<div>
	<!-- Works without the first slash -->
	<QRCode data="https://duxreserve.com" logoPath="logo/lightning.svg" logoBackgroundColor="#009900" />
</div>

<div>
	<!-- You can set decimal logoPadding  -->
	<QRCode data="https://duxreserve.com" logoPath="/logo/lightning.svg" logoBackgroundColor="#009900" logoPadding={14.125} />
</div>

<div>
	<!-- You can set decimal logoSize  -->
	<QRCode data="https://duxreserve.com" logoPath="/logo/lightning.svg" logoBackgroundColor="#009900" logoSize={22.1} />
</div>

<p>Logo width & height</p>
<div>
	<!-- You can set a different logoWidth and LogoHeight  -->
	<QRCode data="https://duxreserve.com" logoPath="/logo/lightning.svg" logoBackgroundColor="#009900" logoWidth={20} logoHeight={30} />

	<QRCode data="https://duxreserve.com" logoPath="/logo/lightning.svg" logoBackgroundColor="#009900" width={256} height={200} logoWidth={20} logoHeight={30} />
</div>

<div>
	<QRCode data="https://duxreserve.com" logoPath="/logo/lightning.svg" logoBackgroundColor="transparent" logoSize={20} />
</div>

<div>
	<QRCode data="https://duxreserve.com" logoPath="/logo/lightning.png" />
</div>

<div>
	<QRCode data="https://duxreserve.com" logoPath="/logo/lightning.jpeg" />
</div>

<div>
	<QRCode data="https://duxreserve.com" logoPath="/logo/lightning.webp" />
</div>

<div>
	<QRCode data="https://duxreserve.com" logoPath="/logo/lightning.gif" />
</div>

<p>Wait for logo</p>

<div style="min-width: 260px; min-height: 260px;">
	<!-- Set the min-width and min-height to prevent the element from resizing when the logo is loaded -->
	<QRCode data="https://duxreserve.com" logoPath="/logo/lightning.gif" waitForLogo />
</div>

<p>Direct base64 encoded image</p>
<div>
	<QRCode
		data="https://duxreserve.com"
		logoInBase64="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Im0xOC40OTYgMTAuNzA5bC04LjYzNiA4Ljg4Yy0uMjQuMjQ2LS42MzgtLjAzOS0uNDgyLS4zNDVsMy4wNzQtNi4wNjZhLjMuMyAwIDAgMC0uMjY4LS40MzZINS43MThhLjMuMyAwIDAgMS0uMjE0LS41MWw4LjAxLTguMTE1Yy4yMzItLjIzNS42MTguMDIzLjQ4OS4zMjhMMTEuNzA2IDkuODZhLjMuMyAwIDAgMCAuMjguNDE3bDYuMjkxLS4wNzhhLjMuMyAwIDAgMSAuMjIuNTA5Ii8+PC9zdmc+"
		logoBackgroundColor="#eeff00"
	/>
</div>

<p>Direct base64 encoded image with wait for logo (should be ignored)</p>
<div>
	<QRCode
		data="https://duxreserve.com"
		logoInBase64="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Im0xOC40OTYgMTAuNzA5bC04LjYzNiA4Ljg4Yy0uMjQuMjQ2LS42MzgtLjAzOS0uNDgyLS4zNDVsMy4wNzQtNi4wNjZhLjMuMyAwIDAgMC0uMjY4LS40MzZINS43MThhLjMuMyAwIDAgMS0uMjE0LS41MWw4LjAxLTguMTE1Yy4yMzItLjIzNS42MTguMDIzLjQ4OS4zMjhMMTEuNzA2IDkuODZhLjMuMyAwIDAgMCAuMjguNDE3bDYuMjkxLS4wNzhhLjMuMyAwIDAgMSAuMjIuNTA5Ii8+PC9zdmc+"
		logoBackgroundColor="#eeff00"
		waitForLogo
	/>
</div>

<p>External URL</p>
<div>
	<QRCode
		data="https://duxreserve.com"
		logoPath="https://upload.wikimedia.org/wikipedia/commons/a/a8/Lightning_bolt_simple.png"
		logoBackgroundColor="#009900"
	/>
</div>

<p>Incorrect path (no logo)</p>
<div>
	<QRCode data="https://duxreserve.com" logoPath="/logo/lightning/image.png" />
</div>

<h2>With download link generated</h2>
<div>
	<QRCode
		data="https://duxreserve.com"
		logoPath="/logo/lightning.svg"
		dispatchDownloadLink
		on:downloadLinkGenerated={(data) => handleDownloadLinkGenerated(data.detail.url)}
	/>
</div>

{#if downloadUrl}
	<a href={downloadUrl} download="QR-code-filename" target="_blank">Download QR Code</a>
{/if}

<h2>With download link generated for not join</h2>
<div>
	<QRCode
		data="https://duxreserve.com"
		logoPath="/logo/lightning.svg"
		isJoin
		dispatchDownloadLink
		on:downloadLinkGenerated={(data) => handleDownloadLinkGeneratedJoin(data.detail.url)}
	/>
</div>

{#if downloadUrlJoin}
	<a href={downloadUrlJoin} download="QR-code-filename-not-join" target="_blank">Download QR Code join</a>
{/if}

<h2>With download link generated for custom color</h2>
<div>
	<QRCode
		data="https://duxreserve.com"
		backgroundColor="yellow"
		moduleColor="red"
		anchorOuterColor="green"
		anchorInnerColor="orange"
		logoPath="/logo/lightning.svg"
		logoBackgroundColor="blue"
		dispatchDownloadLink
		on:downloadLinkGenerated={(data) => handleDownloadLinkGeneratedCustomColor(data.detail.url)}
	/>
</div>

{#if downloadUrlCustomColor}
	<a href={downloadUrlCustomColor} download="QR-code-filename-not-join" target="_blank">Download QR Code custom color</a>
{/if}

<p>Direct base64 encoded image</p>
<div>
	<QRCode
		data="https://duxreserve.com"
		logoInBase64="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Im0xOC40OTYgMTAuNzA5bC04LjYzNiA4Ljg4Yy0uMjQuMjQ2LS42MzgtLjAzOS0uNDgyLS4zNDVsMy4wNzQtNi4wNjZhLjMuMyAwIDAgMC0uMjY4LS40MzZINS43MThhLjMuMyAwIDAgMS0uMjE0LS41MWw4LjAxLTguMTE1Yy4yMzItLjIzNS42MTguMDIzLjQ4OS4zMjhMMTEuNzA2IDkuODZhLjMuMyAwIDAgMCAuMjguNDE3bDYuMjkxLS4wNzhhLjMuMyAwIDAgMSAuMjIuNTA5Ii8+PC9zdmc+"
		logoBackgroundColor="#eeff00"
		dispatchDownloadLink
		on:downloadLinkGenerated={(data) => handleDownloadLinkGeneratedForDirectBase64(data.detail.url)}
	/>
</div>

{#if downloadUrl}
	<a href={downloadUrlDirectBase64} download="QR-code-filename-direct-base64" target="_blank">Download QR Code</a>
{/if}

<p>With download link generated for PNG</p>
<div>
	<QRCode
		data="https://duxreserve.com"
		logoPath="/logo/lightning.svg"
		dispatchDownloadLink
		downloadLinkFileFormat="png"
		on:downloadLinkGenerated={(data) => handleDownloadLinkGeneratedPng(data.detail.url)}
	/>
</div>

{#if downloadUrlPng}
	<a href={downloadUrlPng} download="QR-code-filename-png" target="_blank">Download QR Code in png format</a>
{/if}

<p>With download link generated for JPG</p>
<div>
	<QRCode
		data="https://duxreserve.com"
		logoPath="/logo/lightning.svg"
		dispatchDownloadLink
		downloadLinkFileFormat="jpg"
		on:downloadLinkGenerated={(data) => handleDownloadLinkGeneratedJpg(data.detail.url)}
	/>
</div>

{#if downloadUrlJpg}
	<a href={downloadUrlJpg} download="QR-code-filename-jpg" target="_blank">Download QR Code in jpeg (jpg) format</a>
{/if}

<p>With download link generated for JPEG</p>
<div>
	<QRCode
		data="https://duxreserve.com"
		logoPath="/logo/lightning.svg"
		dispatchDownloadLink
		downloadLinkFileFormat="jpeg"
		on:downloadLinkGenerated={(data) => handleDownloadLinkGeneratedJpeg(data.detail.url)}
	/>
</div>

{#if downloadUrlJpeg}
	<a href={downloadUrlJpeg} download="QR-code-filename-jpeg" target="_blank">Download QR Code in jpeg format</a>
{/if}

<p>With download link generated for WEBP</p>
<div>
	<QRCode
		data="https://duxreserve.com"
		logoPath="/logo/lightning.svg"
		dispatchDownloadLink
		downloadLinkFileFormat="webp"
		on:downloadLinkGenerated={(data) => handleDownloadLinkGeneratedWebp(data.detail.url)}
	/>
</div>

{#if downloadUrlWebp}
	<a href={downloadUrlWebp} download="QR-code-filename-webp" target="_blank">Download QR Code in webp format</a>
{/if}

<h2>Time based one time passwords configuration sample</h2>
<div>
	<QRCode data="otpauth://totp/ACME%20Co:john.doe@email.com?secret=HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ&issuer=ACME%20Co&algorithm=SHA1&digits=6&period=30" />
</div>
