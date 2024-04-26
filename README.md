# QR Code generator for Svelte & SvelteKit

## Install

Use your package manager to install the module:

```shell
npm install @castlenine/svelte-qrcode
```

## Adding QR Codes to a svelte file in Svelte or SvelteKit

Now you can start adding QR Codes to your pages.

```svelte
<script lang="ts">
  import QRCode from "@castlenine/svelte-qrcode"
</script>

<QRCode content="Test" />
```

![Alt text](https://github.com/Castlenine/svelte-qrcode/blob/master/readme/sample1.svg?sanitize=true)

## Quick Response Codes

While conventional bar codes are capable of storing a maximum of approximately 20 digits, QR Code is capable of handling several dozen to several hundred times more information.

QR Code is capable of handling all types of data, such as numeric and alphabetic characters, Kanji, Kana, Hiragana, symbols, binary, and control codes. Up to 7,089 characters can be encoded in one symbol.

## Properties

### Content

Content is the string value that needs to be send to the code reader. The text is normally an URL to a web site, or a code that is used by an application, for example in handling secrets in time-based one-time password applications.

```svelte
<QRCode content="https://duxreserve.com" />
```

### Size, padding and responsive

You can set the size used for generation, the larger the size, the more information you are able to store in the QR code. The size is also used for the container in pixels. You can also specify the padding in module units, and recommended minimum is 4.

With the `isResponsive` settings enabled, the size settings will only be used in the code calculation, and the container will adapt and use all available space in its parent element.

```svelte
<QRCode content="https://duxreserve.com" size={50} />

<QRCode content="https://duxreserve.com" padding={10} />

<QRCode content="https://duxreserve.com" isResponsive />
```

### Colors

With the color settings, you can control both the front and background color (in hexadecimal color or "transparent").

```svelte
<QRCode content="https://duxreserve.com" color="#009900" />

<QRCode content="https://duxreserve.com" backgroundColor="#009900" color="#ffffff" />
```

![Alt text](https://github.com/Castlenine/svelte-qrcode/blob/master/readme/sample2.svg?sanitize=true)

#### QR Code error correction

QR Code has error correction capability to restore data if the code is dirty or damaged. Four error correction levels are available to choose according to the operating environment. Raising this level improves error correction capability but also increases the amount of data QR Code size.
To select error correction level, various factors such as the operating environment and QR Code size need to be considered. Level Q or H may be selected for factory environment where QR Code get dirty, whereas Level L may be selected for a clean environment with the large amount of data. Typically, Level M (15%) is most frequently selected.

- Level `L` Approx 7%
- Level `M` Approx 15% (default value)
- Level `Q` Approx 25%
- Level `H` Approx 30%

```svelte
<QRCode content="https://duxreserve.com" errorCorrection="L" />

<QRCode content="https://duxreserve.com" errorCorrection="M" />

<QRCode content="https://duxreserve.com" errorCorrection="Q" />

<QRCode content="https://duxreserve.com" errorCorrection="H" />
```

### Centered logo

You can add a logo to the center of the QR code; it will be automatically scaled to fit and inserted in the generated SVG image.

There are four properties you can set for the logo:

- `logoPath`: The path to the logo image, which can be either a local path or a URL. Typically, the logo file is located in the static folder
- `logoBackgroundColor`: The hexadecimal background color of the logo. If left undefined, the background will default to the QR code's `backgroundColor` property
- `logoPadding`: The padding around the logo in pixels. The default is 4 pixels
- `logoSize`: The size of the logo as a percentage of the QR code's width. The default is 15% of the QR code size

**Note:** It is recommended that the QR Code error correction level be set to M or higher to ensure the QR code remains functional with the logo

**Tested with:** .svg, .png, .jpeg, .gif & .webp

```svelte
<QRCode content="https://duxreserve.com" logoPath="logo/lightning.svg" />

<QRCode content="https://duxreserve.com" logoPath="logo/lightning.svg" logoBackgroundColor="#009900" />

<QRCode content="https://duxreserve.com" logoPath="logo/lightning.svg" logoBackgroundColor="#009900" logoPadding={10} />

<QRCode content="https://duxreserve.com" logoPath="logo/lightning.svg" logoBackgroundColor="#009900" logoWidth={20} />
```

![Alt text](https://github.com/Castlenine/svelte-qrcode/blob/master/readme/sample4.svg?sanitize=true)

## Downloading the QR Code

You can download the QR code as an SVG file by using an anchor tag that initiates the download. To enable this functionality, set the `dispatchDownloadLink` property to `true` and listen for the `downloadLinkGenerated` event to retrieve the download URL.

You should also add the `download` attribute to the anchor tag to specify the filename for the downloaded file.

Additionally, include the `target="_blank"` attribute in the anchor tag to open the download in a new tab.

```svelte
<script>
  import { QRCode } from '$lib/index';

  let downloadUrl = '';

  const handleDownloadLinkGenerated = (url = '') => {
    downloadUrl = url;
  };
</script>

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
```

## For use with Time-based one-time passwords (TOTP)

Sample URL for a John Doe user on the Acme app:

```svelte
<QRCode content="otpauth://totp/ACME%20Co:john.doe@email.com?secret=HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ&issuer=ACME%20Co&algorithm=SHA1&digits=6&period=30" />
```

![Alt text](https://github.com/Castlenine/svelte-qrcode/blob/master/readme/sample3.svg?sanitize=true)

## Acknowledgement

Thank you Bo Nørgaard [@bonosoft](https://github.com/bonosoft) for the [original code](https://github.com/bonosoft/svelte-qrcode)
