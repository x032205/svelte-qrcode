<script>
	import { QRCode } from '$lib/index';

	let downloadUrl = '';

	const handleDownloadLinkGenerated = (url = '') => {
		downloadUrl = url;
	};
</script>

<svelte:head>
	<title>Test QRCode component</title>
</svelte:head>

<h1>Standard QR Code</h1>
<div>
	<QRCode content="Test" />

	<QRCode content="https://duxreserve.com" />

	<QRCode content="https://duxreserve.com?lang=fr" />
</div>

<h1>Bitcoin address</h1>

<strong>Not ours, just random address for testing purposes</strong>

<div>
	<!-- Genesis block address: -->
	<QRCode
		content="bitcoin:04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f"
	/>

	<!-- 4th halving address: -->
	<QRCode content="bitcoin:18cBEMRxXHqzWWCxZNtU91F5sbUNKhL5PX" />

	<QRCode content="bitcoin:bc1qmhcxtwkcmkqlpajmd09ygzxwwujql74vdpzwd5" />
</div>

<h2>Size 50 to 200</h2>
<div>
	<QRCode content="https://duxreserve.com" size={50} />
	<QRCode content="https://duxreserve.com" size={100} />
	<QRCode content="https://duxreserve.com" size={150} />
	<QRCode content="https://duxreserve.com" size={200} />
</div>

<h2>Padding 0 to 20</h2>
<div>
	<QRCode content="https://duxreserve.com" padding={0} />
	<QRCode content="https://duxreserve.com" padding={5} />
	<QRCode content="https://duxreserve.com" padding={10} />
	<QRCode content="https://duxreserve.com" padding={20} />
</div>

<h2>Colors and background colors</h2>
<div>
	<QRCode content="https://duxreserve.com" color="#990000" />
	<QRCode content="https://duxreserve.com" color="#009900" />
	<QRCode content="https://duxreserve.com" backgroundColor="#009900" color="#ffffff" />

	<QRCode content="https://duxreserve.com" backgroundColor="#000000" color="#ffffff" />
</div>

<h2>Error correction L, M, Q, and H</h2>
<div>
	<QRCode content="https://duxreserve.com" errorCorrection="L" />
	<QRCode content="https://duxreserve.com" errorCorrection="M" />
	<QRCode content="https://duxreserve.com" errorCorrection="Q" />
	<QRCode content="https://duxreserve.com" errorCorrection="H" />
</div>

<h2>Responsive</h2>
<div style="width:30%; height:30%;">
	<QRCode content="https://duxreserve.com" isResponsive />
</div>

<h2>With logo</h2>
<div>
	<QRCode content="https://duxreserve.com" logoPath="logo/lightning.svg" />
</div>

<div>
	<QRCode content="https://duxreserve.com" logoPath="logo/lightning.svg" logoBackgroundColor="#009900" />
</div>

<div>
	<QRCode content="https://duxreserve.com" logoPath="logo/lightning.svg" logoBackgroundColor="#009900" logoPadding={10} />
</div>

<div>
	<QRCode content="https://duxreserve.com" logoPath="logo/lightning.svg" logoBackgroundColor="#009900" logoWidth={20} />
</div>

<div>
	<QRCode content="https://duxreserve.com" logoPath="logo/lightning.svg" logoBackgroundColor="transparent" logoWidth={20} />
</div>

<div>
	<QRCode content="https://duxreserve.com" logoPath="logo/lightning.png" />
</div>

<div>
	<QRCode content="https://duxreserve.com" logoPath="logo/lightning.jpeg" />
</div>

<div>
	<QRCode content="https://duxreserve.com" logoPath="logo/lightning.webp" />
</div>

<div>
	<QRCode content="https://duxreserve.com" logoPath="logo/lightning.gif" />
</div>

<h2>With download link generated</h2>
<div>
	<QRCode
		content="https://duxreserve.com"
		logoPath="logo/lightning.svg"
		dispatchDownloadLink
		on:downloadLinkGenerated={(data) => handleDownloadLinkGenerated(data.detail.url)}
	/>
</div>

{#if downloadUrl}
	<a href={downloadUrl} download="QR-code-filename" target="_blank">Download QR Code</a>
{/if}

<h2>Time based one time passwords configuration sample</h2>
<div>
	<QRCode content="otpauth://totp/ACME%20Co:john.doe@email.com?secret=HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ&issuer=ACME%20Co&algorithm=SHA1&digits=6&period=30" />
</div>
