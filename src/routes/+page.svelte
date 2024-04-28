<script>
	import { QRCode } from '$lib/index';

	let downloadUrl = '';
	let downloadUrlDirectBase64 = '';

	const handleDownloadLinkGenerated = (url = '') => {
		downloadUrl = url;
	};

	const handleDownloadLinkGeneratedForDirectBase64 = (url = '') => {
		downloadUrlDirectBase64 = url;
	};
</script>

<svelte:head>
	<title>Test QRCode component</title>
</svelte:head>

<h1>Standard QR Code</h1>
<div>
	<QRCode data="Test" />

	<QRCode data="https://duxreserve.com" />

	<QRCode data="https://duxreserve.com?lang=fr" />
</div>

<h1>Bitcoin address</h1>

<strong>Not ours, just random address for testing purposes</strong>

<div>
	<!-- Genesis block address: -->
	<QRCode data="bitcoin:04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f" />

	<!-- 4th halving address: -->
	<QRCode data="bitcoin:18cBEMRxXHqzWWCxZNtU91F5sbUNKhL5PX" />

	<QRCode data="bitcoin:bc1qmhcxtwkcmkqlpajmd09ygzxwwujql74vdpzwd5" />
</div>

<h2>Size 50 to 200</h2>
<div>
	<QRCode data="https://duxreserve.com" size={50} />
	<QRCode data="https://duxreserve.com" size={100} />
	<QRCode data="https://duxreserve.com" size={150} />
	<QRCode data="https://duxreserve.com" size={200} />
</div>

<h2>Padding 0 to 20</h2>
<div>
	<QRCode data="https://duxreserve.com" padding={0} />
	<QRCode data="https://duxreserve.com" padding={5} />
	<QRCode data="https://duxreserve.com" padding={10} />
	<QRCode data="https://duxreserve.com" padding={20} />
</div>

<h2>Colors and background colors</h2>
<div>
	<QRCode data="https://duxreserve.com" color="#990000" />
	<QRCode data="https://duxreserve.com" color="#009900" />
	<QRCode data="https://duxreserve.com" backgroundColor="#009900" color="#ffffff" />

	<QRCode data="https://duxreserve.com" backgroundColor="#000000" color="#ffffff" />
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
	<QRCode data="https://duxreserve.com" logoPath="logo/lightning.svg" logoBackgroundColor="#009900" />
</div>

<div>
	<QRCode data="https://duxreserve.com" logoPath="/logo/lightning.svg" logoBackgroundColor="#009900" logoPadding={10} />
</div>

<div>
	<QRCode data="https://duxreserve.com" logoPath="/logo/lightning.svg" logoBackgroundColor="#009900" logoWidth={20} />
</div>

<div>
	<QRCode data="https://duxreserve.com" logoPath="/logo/lightning.svg" logoBackgroundColor="transparent" logoWidth={20} />
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
<!-- QRCode size of 256x256 + padding of 4 px = 260px total -->
<div style="min-width: 260px; min-height: 260px;">
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

<h2>Time based one time passwords configuration sample</h2>
<div>
	<QRCode data="otpauth://totp/ACME%20Co:john.doe@email.com?secret=HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ&issuer=ACME%20Co&algorithm=SHA1&digits=6&period=30" />
</div>
