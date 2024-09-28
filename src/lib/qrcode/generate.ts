/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable no-loops/no-loops */
/* eslint-disable security/detect-object-injection */

/**
 * @fileoverview
 *
 * @version 1.0.0 (2023-03-20)
 * @author Bonosoft, Bo Norgaard
 *
 * @version 1.1.0 (2023-09-04)
 * @editor Alexandre Castlenine
 *
 * - Code formatted
 * - Converted to TypeScript
 * - Replaced prototypes with class
 * - Code still has no dependencies
 *
 * @version 1.2.0 (2024-04-26)
 * @editor Alexandre Castlenine
 *
 * - Added the possibility to have an image (logo) in the center of the QRCode in base64 format
 *
 * @version 2.0.0 (2024-04-29)
 * @editor Alexandre Castlenine
 *
 * - Rename some properties to make them more explicit (follow the migration guide to learn more)
 * - Added anchorsOuterColor and anchorsInnerColor properties
 * - Added shape property
 * - Code refactored to use template literals
 *
 * @version 2.1.0 (2024-04-30)
 * @editor Alexandre Castlenine
 *
 * - Added haveBackgroundRoundedEdges
 *
 * @version 2.2.0 (2024-04-30)
 * @editor Alexandre Castlenine
 *
 * - Added haveGappedModules
 *
 * @version 2.3.0 (2024-09-27)
 * @editor x032205
 *
 * - Made logos adjust size to fit modules
 * - Made logo padding use modules as units
 *
 */

//---------------------------------------------------------------------
// QRCode for JavaScript
// Copyright (c) 2009 Kazuhiko Arase
//   https://kazuhikoarase.github.io/qrcode-generator/js/demo/
// Licensed under the MIT license:
//   http://www.opensource.org/licenses/mit-license.php
// The word "QR Code" is registered trademark of
// DENSO WAVE INCORPORATED
//---------------------------------------------------------------------

interface Options {
	data: string; // Data of the QR code to be encoded
	typeNumber:
		| 0 // Auto detection
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
	errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H'; // Error correction level
	backgroundColor: string; // Background color of the QR code
	modulesColor: string; // Color for QR modules
	anchorsOuterColor: string; // Outer color of QR anchors
	anchorsInnerColor: string; // Inner color of QR anchors
	shape: 'square' | 'circle'; // Shape of the QR code modules and anchors
	haveBackgroundRoundedEdges: boolean; // If set to true, the QR code will have rounded edges
	haveGappedModules: boolean; // If set to true, the QR code will have gapped modules
	join: boolean; // If set to true, the QR code will be generated as a single SVG element. If set to false, each square will be an individual SVG element
	container?: string; // Container element to render the QR code
	padding: number; // Padding around the QR code
	width: number; // Width dimension in pixels of the QR code
	height: number; // Height dimension in pixels of the QR code
	logoInBase64?: string; // Base64 image to be used as a logo in the center of the QR code
	logoBackgroundColor?: string; // Background color of the logo
	logoPadding?: number; // Padding around the logo
	logoWidth?: number; // Width of the logo in percentage relative to the QR code width
	logoHeight?: number; // Height of the logo in percentage relative to the QR code height
}

const QR_CODE_LIMIT_LENGTH = [
	[17, 14, 11, 7],
	[32, 26, 20, 14],
	[53, 42, 32, 24],
	[78, 62, 46, 34],
	[106, 84, 60, 44],
	[134, 106, 74, 58],
	[154, 122, 86, 64],
	[192, 152, 108, 84],
	[230, 180, 130, 98],
	[271, 213, 151, 119],
	[321, 251, 177, 137],
	[367, 287, 203, 155],
	[425, 331, 241, 177],
	[458, 362, 258, 194],
	[520, 412, 292, 220],
	[586, 450, 322, 250],
	[644, 504, 364, 280],
	[718, 560, 394, 310],
	[792, 624, 442, 338],
	[858, 666, 482, 382],
	[929, 711, 509, 403],
	[1003, 779, 565, 439],
	[1091, 857, 611, 461],
	[1171, 911, 661, 511],
	[1273, 997, 715, 535],
	[1367, 1059, 751, 593],
	[1465, 1125, 805, 625],
	[1528, 1190, 868, 658],
	[1628, 1264, 908, 698],
	[1732, 1370, 982, 742],
	[1840, 1452, 1030, 790],
	[1952, 1538, 1112, 842],
	[2068, 1628, 1168, 898],
	[2188, 1722, 1228, 958],
	[2303, 1809, 1283, 983],
	[2431, 1911, 1351, 1051],
	[2563, 1989, 1423, 1093],
	[2699, 2099, 1499, 1139],
	[2809, 2213, 1579, 1219],
	[2953, 2331, 1663, 1273],
];

enum QRMode {
	MODE_NUMBER = 1 << 0,
	MODE_ALPHA_NUM = 1 << 1,
	MODE_8BIT_BYTE = 1 << 2,
	MODE_KANJI = 1 << 3,
}

enum QRErrorCorrectLevel {
	L = 1,
	M = 0,
	Q = 3,
	H = 2,
}

enum QRMaskPattern {
	PATTERN000 = 0,
	PATTERN001 = 1,
	PATTERN010 = 2,
	PATTERN011 = 3,
	PATTERN100 = 4,
	PATTERN101 = 5,
	PATTERN110 = 6,
	PATTERN111 = 7,
}

class QRBitBuffer {
	public buffer: number[];
	public length: number;

	public constructor() {
		this.buffer = [];
		this.length = 0;
	}

	public get(index: number) {
		const BUFFER_INDEX = Math.floor(index / 8);
		return ((this.buffer[BUFFER_INDEX] >>> (7 - (index % 8))) & 1) == 1;
	}

	public put(num: number, length: number) {
		for (let i = 0; i < length; i++) {
			this.putBit(((num >>> (length - i - 1)) & 1) == 1);
		}
	}

	public getLengthInBits() {
		return this.length;
	}

	public putBit(bit: boolean) {
		const BUFFER_INDEX = Math.floor(this.length / 8);
		if (this.buffer.length <= BUFFER_INDEX) {
			this.buffer.push(0);
		}
		if (bit) {
			this.buffer[BUFFER_INDEX] |= 0x80 >>> this.length % 8;
		}
		this.length++;
	}
}

class QRRSBlock {
	public totalCount: number;
	public dataCount: number;

	public constructor(totalCount: number, dataCount: number) {
		this.totalCount = totalCount;
		this.dataCount = dataCount;
	}

	private RS_BLOCK_TABLE = [
		[1, 26, 19],
		[1, 26, 16],
		[1, 26, 13],
		[1, 26, 9],
		[1, 44, 34],
		[1, 44, 28],
		[1, 44, 22],
		[1, 44, 16],
		[1, 70, 55],
		[1, 70, 44],
		[2, 35, 17],
		[2, 35, 13],
		[1, 100, 80],
		[2, 50, 32],
		[2, 50, 24],
		[4, 25, 9],
		[1, 134, 108],
		[2, 67, 43],
		[2, 33, 15, 2, 34, 16],
		[2, 33, 11, 2, 34, 12],
		[2, 86, 68],
		[4, 43, 27],
		[4, 43, 19],
		[4, 43, 15],
		[2, 98, 78],
		[4, 49, 31],
		[2, 32, 14, 4, 33, 15],
		[4, 39, 13, 1, 40, 14],
		[2, 121, 97],
		[2, 60, 38, 2, 61, 39],
		[4, 40, 18, 2, 41, 19],
		[4, 40, 14, 2, 41, 15],
		[2, 146, 116],
		[3, 58, 36, 2, 59, 37],
		[4, 36, 16, 4, 37, 17],
		[4, 36, 12, 4, 37, 13],
		[2, 86, 68, 2, 87, 69],
		[4, 69, 43, 1, 70, 44],
		[6, 43, 19, 2, 44, 20],
		[6, 43, 15, 2, 44, 16],
		[4, 101, 81],
		[1, 80, 50, 4, 81, 51],
		[4, 50, 22, 4, 51, 23],
		[3, 36, 12, 8, 37, 13],
		[2, 116, 92, 2, 117, 93],
		[6, 58, 36, 2, 59, 37],
		[4, 46, 20, 6, 47, 21],
		[7, 42, 14, 4, 43, 15],
		[4, 133, 107],
		[8, 59, 37, 1, 60, 38],
		[8, 44, 20, 4, 45, 21],
		[12, 33, 11, 4, 34, 12],
		[3, 145, 115, 1, 146, 116],
		[4, 64, 40, 5, 65, 41],
		[11, 36, 16, 5, 37, 17],
		[11, 36, 12, 5, 37, 13],
		[5, 109, 87, 1, 110, 88],
		[5, 65, 41, 5, 66, 42],
		[5, 54, 24, 7, 55, 25],
		[11, 36, 12],
		[5, 122, 98, 1, 123, 99],
		[7, 73, 45, 3, 74, 46],
		[15, 43, 19, 2, 44, 20],
		[3, 45, 15, 13, 46, 16],
		[1, 135, 107, 5, 136, 108],
		[10, 74, 46, 1, 75, 47],
		[1, 50, 22, 15, 51, 23],
		[2, 42, 14, 17, 43, 15],
		[5, 150, 120, 1, 151, 121],
		[9, 69, 43, 4, 70, 44],
		[17, 50, 22, 1, 51, 23],
		[2, 42, 14, 19, 43, 15],
		[3, 141, 113, 4, 142, 114],
		[3, 70, 44, 11, 71, 45],
		[17, 47, 21, 4, 48, 22],
		[9, 39, 13, 16, 40, 14],
		[3, 135, 107, 5, 136, 108],
		[3, 67, 41, 13, 68, 42],
		[15, 54, 24, 5, 55, 25],
		[15, 43, 15, 10, 44, 16],
		[4, 144, 116, 4, 145, 117],
		[17, 68, 42],
		[17, 50, 22, 6, 51, 23],
		[19, 46, 16, 6, 47, 17],
		[2, 139, 111, 7, 140, 112],
		[17, 74, 46],
		[7, 54, 24, 16, 55, 25],
		[34, 37, 13],
		[4, 151, 121, 5, 152, 122],
		[4, 75, 47, 14, 76, 48],
		[11, 54, 24, 14, 55, 25],
		[16, 45, 15, 14, 46, 16],
		[6, 147, 117, 4, 148, 118],
		[6, 73, 45, 14, 74, 46],
		[11, 54, 24, 16, 55, 25],
		[30, 46, 16, 2, 47, 17],
		[8, 132, 106, 4, 133, 107],
		[8, 75, 47, 13, 76, 48],
		[7, 54, 24, 22, 55, 25],
		[22, 45, 15, 13, 46, 16],
		[10, 142, 114, 2, 143, 115],
		[19, 74, 46, 4, 75, 47],
		[28, 50, 22, 6, 51, 23],
		[33, 46, 16, 4, 47, 17],
		[8, 152, 122, 4, 153, 123],
		[22, 73, 45, 3, 74, 46],
		[8, 53, 23, 26, 54, 24],
		[12, 45, 15, 28, 46, 16],
		[3, 147, 117, 10, 148, 118],
		[3, 73, 45, 23, 74, 46],
		[4, 54, 24, 31, 55, 25],
		[11, 45, 15, 31, 46, 16],
		[7, 146, 116, 7, 147, 117],
		[21, 73, 45, 7, 74, 46],
		[1, 53, 23, 37, 54, 24],
		[19, 45, 15, 26, 46, 16],
		[5, 145, 115, 10, 146, 116],
		[19, 75, 47, 10, 76, 48],
		[15, 54, 24, 25, 55, 25],
		[23, 45, 15, 25, 46, 16],
		[13, 145, 115, 3, 146, 116],
		[2, 74, 46, 29, 75, 47],
		[42, 54, 24, 1, 55, 25],
		[23, 45, 15, 28, 46, 16],
		[17, 145, 115],
		[10, 74, 46, 23, 75, 47],
		[10, 54, 24, 35, 55, 25],
		[19, 45, 15, 35, 46, 16],
		[17, 145, 115, 1, 146, 116],
		[14, 74, 46, 21, 75, 47],
		[29, 54, 24, 19, 55, 25],
		[11, 45, 15, 46, 46, 16],
		[13, 145, 115, 6, 146, 116],
		[14, 74, 46, 23, 75, 47],
		[44, 54, 24, 7, 55, 25],
		[59, 46, 16, 1, 47, 17],
		[12, 151, 121, 7, 152, 122],
		[12, 75, 47, 26, 76, 48],
		[39, 54, 24, 14, 55, 25],
		[22, 45, 15, 41, 46, 16],
		[6, 151, 121, 14, 152, 122],
		[6, 75, 47, 34, 76, 48],
		[46, 54, 24, 10, 55, 25],
		[2, 45, 15, 64, 46, 16],
		[17, 152, 122, 4, 153, 123],
		[29, 74, 46, 14, 75, 47],
		[49, 54, 24, 10, 55, 25],
		[24, 45, 15, 46, 46, 16],
		[4, 152, 122, 18, 153, 123],
		[13, 74, 46, 32, 75, 47],
		[48, 54, 24, 14, 55, 25],
		[42, 45, 15, 32, 46, 16],
		[20, 147, 117, 4, 148, 118],
		[40, 75, 47, 7, 76, 48],
		[43, 54, 24, 22, 55, 25],
		[10, 45, 15, 67, 46, 16],
		[19, 148, 118, 6, 149, 119],
		[18, 75, 47, 31, 76, 48],
		[34, 54, 24, 34, 55, 25],
		[20, 45, 15, 61, 46, 16],
	];

	public getRSBlocks(typeNumber: number, errorCorrectLevel: QRErrorCorrectLevel) {
		const RS_BLOCK = this.getRsBlockTable(typeNumber, errorCorrectLevel);
		if (RS_BLOCK == undefined) {
			throw new Error(`bad rs block @ typeNumber:${typeNumber}/errorCorrectLevel:${errorCorrectLevel}`);
		}
		const LENGTH = RS_BLOCK.length / 3;
		const LIST = [];
		for (let i = 0; i < LENGTH; i++) {
			const COUNT = RS_BLOCK[i * 3 + 0];
			const TOTAL_COUNT = RS_BLOCK[i * 3 + 1];
			const DATA_COUNT = RS_BLOCK[i * 3 + 2];
			for (let j = 0; j < COUNT; j++) {
				LIST.push(new QRRSBlock(TOTAL_COUNT, DATA_COUNT));
			}
		}
		return LIST;
	}

	public getRsBlockTable(typeNumber: number, errorCorrectLevel: QRErrorCorrectLevel) {
		switch (errorCorrectLevel) {
			case QRErrorCorrectLevel.L:
				return this.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
			case QRErrorCorrectLevel.M:
				return this.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
			case QRErrorCorrectLevel.Q:
				return this.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
			case QRErrorCorrectLevel.H:
				return this.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
			default:
				return undefined;
		}
	}
}

class QR8bitByte {
	public mode: QRMode;
	private data: string;
	private parsedData: number[];

	public constructor(data: string) {
		this.mode = QRMode.MODE_8BIT_BYTE;
		this.data = data;
		this.parsedData = [];

		// Added to support UTF-8 Characters
		for (let i = 0, l = this.data.length; i < l; i++) {
			const BYTE_ARRAY: number[] = [];
			const CODE = this.data.charCodeAt(i);

			if (CODE > 0x10000) {
				BYTE_ARRAY[0] = 0xf0 | ((CODE & 0x1c0000) >>> 18);
				BYTE_ARRAY[1] = 0x80 | ((CODE & 0x3f000) >>> 12);
				BYTE_ARRAY[2] = 0x80 | ((CODE & 0xfc0) >>> 6);
				BYTE_ARRAY[3] = 0x80 | (CODE & 0x3f);
			} else if (CODE > 0x800) {
				BYTE_ARRAY[0] = 0xe0 | ((CODE & 0xf000) >>> 12);
				BYTE_ARRAY[1] = 0x80 | ((CODE & 0xfc0) >>> 6);
				BYTE_ARRAY[2] = 0x80 | (CODE & 0x3f);
			} else if (CODE > 0x80) {
				BYTE_ARRAY[0] = 0xc0 | ((CODE & 0x7c0) >>> 6);
				BYTE_ARRAY[1] = 0x80 | (CODE & 0x3f);
			} else {
				BYTE_ARRAY[0] = CODE;
			}
			this.parsedData.push(...BYTE_ARRAY);
		}

		this.parsedData = Array.prototype.concat.apply([], this.parsedData);

		if (this.parsedData.length != this.data.length) {
			this.parsedData.unshift(191);
			this.parsedData.unshift(187);
			this.parsedData.unshift(239);
		}
	}

	public getLength() {
		return this.parsedData.length;
	}

	public write(buffer: any) {
		for (let i = 0, l = this.parsedData.length; i < l; i++) {
			buffer.put(this.parsedData[i], 8);
		}
	}
}

class QRMath {
	private EXP_TABLE: number[] = new Array(256);
	private LOG_TABLE: number[] = new Array(256);

	public constructor() {
		for (let i = 0; i < 8; i++) {
			this.EXP_TABLE[i] = 1 << i;
		}
		for (let i = 8; i < 256; i++) {
			this.EXP_TABLE[i] = this.EXP_TABLE[i - 4] ^ this.EXP_TABLE[i - 5] ^ this.EXP_TABLE[i - 6] ^ this.EXP_TABLE[i - 8];
		}
		for (let i = 0; i < 255; i++) {
			this.LOG_TABLE[this.EXP_TABLE[i]] = i;
		}
	}

	public glog(n: number) {
		if (n < 1) {
			throw new Error(`glog(${n})`);
		}
		return this.LOG_TABLE[n];
	}

	public gexp(n: number) {
		while (n < 0) {
			n += 255;
		}
		while (n >= 256) {
			n -= 255;
		}
		return this.EXP_TABLE[n];
	}
}

class QRPolynomial {
	private num: number[];
	private qrMath = new QRMath();

	public constructor(num: number[], shift: number) {
		if (num.length == undefined) {
			throw new Error(`num.length:undefined/${shift}`);
		}
		let offset = 0;
		while (offset < num.length && num[offset] == 0) {
			offset++;
		}
		this.num = new Array(num.length - offset + shift);
		for (let i = 0; i < num.length - offset; i++) {
			this.num[i] = num[i + offset];
		}
	}

	public get(index: number) {
		return this.num[index];
	}

	public getLength() {
		return this.num.length;
	}

	public multiply(e: QRPolynomial) {
		const NUM = new Array(this.getLength() + e.getLength() - 1);
		for (let i = 0; i < this.getLength(); i++) {
			for (let j = 0; j < e.getLength(); j++) {
				NUM[i + j] ^= this.qrMath.gexp(this.qrMath.glog(this.get(i)) + this.qrMath.glog(e.get(j)));
			}
		}
		return new QRPolynomial(NUM, 0);
	}

	public mod(e: QRPolynomial): QRPolynomial {
		if (this.getLength() - e.getLength() < 0) {
			return this;
		}
		const RATIO = this.qrMath.glog(this.get(0)) - this.qrMath.glog(e.get(0));
		const NUM = new Array(this.getLength());
		for (let i = 0; i < this.getLength(); i++) {
			NUM[i] = this.get(i);
		}
		for (let i = 0; i < e.getLength(); i++) {
			NUM[i] ^= this.qrMath.gexp(this.qrMath.glog(e.get(i)) + RATIO);
		}
		return new QRPolynomial(NUM, 0).mod(e);
	}
}

class QRCodeModel {
	private typeNumber: number;
	private errorCorrectLevel: QRErrorCorrectLevel;
	public modules: (boolean | null)[][];
	private moduleCount: number;
	private dataCache: number[];
	private dataList: QR8bitByte[];
	private qrUtil = new QRUtil();

	public constructor(typeNumber: number, errorCorrectLevel: QRErrorCorrectLevel) {
		this.typeNumber = typeNumber;
		this.errorCorrectLevel = errorCorrectLevel;
		this.modules = [];
		this.moduleCount = 0;
		this.dataCache = [];
		this.dataList = [];
	}

	public addData(data: string) {
		const NEW_DATA = new QR8bitByte(data);
		this.dataList.push(NEW_DATA);
		this.dataCache = [];
	}

	public isDark(row: number, col: number) {
		if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
			throw new Error(`${row},${col}`);
		}
		return this.modules[row][col];
	}

	public getModuleCount() {
		return this.moduleCount;
	}

	public makeImpl(test: boolean, maskPattern: number) {
		this.moduleCount = this.typeNumber * 4 + 17;
		this.modules = new Array(this.moduleCount);
		for (let row = 0; row < this.moduleCount; row++) {
			this.modules[row] = new Array(this.moduleCount);
			for (let col = 0; col < this.moduleCount; col++) {
				this.modules[row][col] = null;
			}
		}
		this.setupPositionProbePattern(0, 0);
		this.setupPositionProbePattern(this.moduleCount - 7, 0);
		this.setupPositionProbePattern(0, this.moduleCount - 7);
		this.setupPositionAdjustPattern();
		this.setupTimingPattern();
		this.setupTypeInfo(test, maskPattern);
		if (this.typeNumber >= 7) {
			this.setupTypeNumber(test);
		}

		if (this.dataCache.length == 0) {
			this.dataCache = this.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
		}
		this.mapData(this.dataCache, maskPattern);
	}

	public getBestMaskPattern() {
		let minLostPoint = 0;
		let pattern = 0;
		for (let i = 0; i < 8; i++) {
			this.makeImpl(true, i);
			const LOST_POINT = this.qrUtil.getLostPoint(this);
			if (i == 0 || minLostPoint > LOST_POINT) {
				minLostPoint = LOST_POINT;
				pattern = i;
			}
		}
		return pattern;
	}

	make() {
		this.makeImpl(false, this.getBestMaskPattern());
	}

	public setupPositionProbePattern(row: number, col: number) {
		for (let r = -1; r <= 7; r++) {
			if (row + r <= -1 || this.moduleCount <= row + r) continue;
			for (let c = -1; c <= 7; c++) {
				if (col + c <= -1 || this.moduleCount <= col + c) continue;
				if ((0 <= r && r <= 6 && (c == 0 || c == 6)) || (0 <= c && c <= 6 && (r == 0 || r == 6)) || (2 <= r && r <= 4 && 2 <= c && c <= 4)) {
					this.modules[row + r][col + c] = true;
				} else {
					this.modules[row + r][col + c] = false;
				}
			}
		}
	}

	public setupTimingPattern() {
		for (let r = 8; r < this.moduleCount - 8; r++) {
			if (this.modules[r][6] != null) {
				continue;
			}
			this.modules[r][6] = r % 2 == 0;
		}
		for (let c = 8; c < this.moduleCount - 8; c++) {
			if (this.modules[6][c] != null) {
				continue;
			}
			this.modules[6][c] = c % 2 == 0;
		}
	}

	public setupPositionAdjustPattern() {
		const POSITION = this.qrUtil.getPatternPosition(this.typeNumber);
		for (let i = 0; i < POSITION.length; i++) {
			for (let j = 0; j < POSITION.length; j++) {
				const ROW = POSITION[i];
				const COL = POSITION[j];
				if (this.modules[ROW][COL] != null) {
					continue;
				}
				for (let r = -2; r <= 2; r++) {
					for (let c = -2; c <= 2; c++) {
						if (r == -2 || r == 2 || c == -2 || c == 2 || (r == 0 && c == 0)) {
							this.modules[ROW + r][COL + c] = true;
						} else {
							this.modules[ROW + r][COL + c] = false;
						}
					}
				}
			}
		}
	}

	public setupTypeNumber(test: boolean) {
		const BITS = this.qrUtil.getBCHTypeNumber(this.typeNumber);
		for (let i = 0; i < 18; i++) {
			const MOD = !test && ((BITS >> i) & 1) == 1;
			this.modules[Math.floor(i / 3)][(i % 3) + this.moduleCount - 8 - 3] = MOD;
		}
		for (let i = 0; i < 18; i++) {
			const MOD = !test && ((BITS >> i) & 1) == 1;
			this.modules[(i % 3) + this.moduleCount - 8 - 3][Math.floor(i / 3)] = MOD;
		}
	}

	public setupTypeInfo(test: boolean, maskPattern: number) {
		const DATA = (this.errorCorrectLevel << 3) | maskPattern;
		const BITS = this.qrUtil.getBCHTypeInfo(DATA);
		for (let i = 0; i < 15; i++) {
			const MOD = !test && ((BITS >> i) & 1) == 1;
			if (i < 6) {
				this.modules[i][8] = MOD;
			} else if (i < 8) {
				this.modules[i + 1][8] = MOD;
			} else {
				this.modules[this.moduleCount - 15 + i][8] = MOD;
			}
		}
		for (let i = 0; i < 15; i++) {
			const MOD = !test && ((BITS >> i) & 1) == 1;
			if (i < 8) {
				this.modules[8][this.moduleCount - i - 1] = MOD;
			} else if (i < 9) {
				this.modules[8][15 - i - 1 + 1] = MOD;
			} else {
				this.modules[8][15 - i - 1] = MOD;
			}
		}
		this.modules[this.moduleCount - 8][8] = !test;
	}

	public mapData(data: number[], maskPattern: number) {
		let inc = -1;
		let row = this.moduleCount - 1;
		let bitIndex = 7;
		let byteIndex = 0;
		for (let col = this.moduleCount - 1; col > 0; col -= 2) {
			if (col == 6) col--;
			while (true) {
				for (let c = 0; c < 2; c++) {
					if (this.modules[row][col - c] == null) {
						let dark = false;
						if (byteIndex < data.length) {
							dark = ((data[byteIndex] >>> bitIndex) & 1) == 1;
						}
						const MASK = this.qrUtil.getMask(maskPattern, row, col - c);
						if (MASK) {
							dark = !dark;
						}
						this.modules[row][col - c] = dark;
						bitIndex--;
						if (bitIndex == -1) {
							byteIndex++;
							bitIndex = 7;
						}
					}
				}
				row += inc;
				if (row < 0 || this.moduleCount <= row) {
					row -= inc;
					inc = -inc;
					break;
				}
			}
		}
	}

	private PAD0 = 0xec;
	private PAD1 = 0x11;

	public createData(typeNumber: number, errorCorrectLevel: QRErrorCorrectLevel, dataList: QR8bitByte[]) {
		const QR_RS_BLOCK = new QRRSBlock(0, 0);

		const RS_BLOCKS = QR_RS_BLOCK.getRSBlocks(typeNumber, errorCorrectLevel);
		const BUFFER = new QRBitBuffer();
		for (let i = 0; i < dataList.length; i++) {
			const DATA = dataList[i];
			BUFFER.put(DATA.mode, 4);
			BUFFER.put(DATA.getLength(), this.qrUtil.getLengthInBits(DATA.mode, typeNumber));
			DATA.write(BUFFER);
		}
		let totalDataCount = 0;
		for (let i = 0; i < RS_BLOCKS.length; i++) {
			totalDataCount += RS_BLOCKS[i].dataCount;
		}
		if (BUFFER.getLengthInBits() > totalDataCount * 8) {
			throw new Error(`code length overflow: (${BUFFER.getLengthInBits()} > ${totalDataCount * 8})`);
		}
		if (BUFFER.getLengthInBits() + 4 <= totalDataCount * 8) {
			BUFFER.put(0, 4);
		}
		while (BUFFER.getLengthInBits() % 8 != 0) {
			BUFFER.putBit(false);
		}
		while (true) {
			if (BUFFER.getLengthInBits() >= totalDataCount * 8) {
				break;
			}
			BUFFER.put(this.PAD0, 8);
			if (BUFFER.getLengthInBits() >= totalDataCount * 8) {
				break;
			}
			BUFFER.put(this.PAD1, 8);
		}
		return this.createBytes(BUFFER, RS_BLOCKS);
	}

	public createBytes(buffer: QRBitBuffer, rsBlocks: QRRSBlock[]) {
		let offset = 0;
		let maxDcCount = 0;
		let maxEcCount = 0;
		const DC_DATA = new Array(rsBlocks.length);
		const EC_DATA: number[][] = new Array(rsBlocks.length);
		for (let r = 0; r < rsBlocks.length; r++) {
			const DC_COUNT = rsBlocks[r].dataCount;
			const EC_COUNT = rsBlocks[r].totalCount - DC_COUNT;
			maxDcCount = Math.max(maxDcCount, DC_COUNT);
			maxEcCount = Math.max(maxEcCount, EC_COUNT);
			DC_DATA[r] = new Array(DC_COUNT);
			for (let i = 0; i < DC_DATA[r].length; i++) {
				DC_DATA[r][i] = 0xff & buffer.buffer[i + offset];
			}
			offset += DC_COUNT;
			const RS_POLY = this.qrUtil.getErrorCorrectPolynomial(EC_COUNT);
			const RAW_POLY = new QRPolynomial(DC_DATA[r], RS_POLY.getLength() - 1);
			const MOD_POLY = RAW_POLY.mod(RS_POLY);
			EC_DATA[r] = new Array(RS_POLY.getLength() - 1);
			for (let i = 0; i < EC_DATA[r].length; i++) {
				const MOD_INDEX = i + MOD_POLY.getLength() - EC_DATA[r].length;
				EC_DATA[r][i] = MOD_INDEX >= 0 ? MOD_POLY.get(MOD_INDEX) : 0;
			}
		}
		let totalCodeCount = 0;
		for (let i = 0; i < rsBlocks.length; i++) {
			totalCodeCount += rsBlocks[i].totalCount;
		}
		const DATA: number[] = new Array(totalCodeCount);
		let index = 0;
		for (let i = 0; i < maxDcCount; i++) {
			for (let r = 0; r < rsBlocks.length; r++) {
				if (i < DC_DATA[r].length) {
					DATA[index++] = DC_DATA[r][i];
				}
			}
		}
		for (let i = 0; i < maxEcCount; i++) {
			for (let r = 0; r < rsBlocks.length; r++) {
				if (i < EC_DATA[r].length) {
					DATA[index++] = EC_DATA[r][i];
				}
			}
		}
		return DATA;
	}
}

class QRUtil {
	private data = {
		PATTERN_POSITION_TABLE: [
			[],
			[6, 18],
			[6, 22],
			[6, 26],
			[6, 30],
			[6, 34],
			[6, 22, 38],
			[6, 24, 42],
			[6, 26, 46],
			[6, 28, 50],
			[6, 30, 54],
			[6, 32, 58],
			[6, 34, 62],
			[6, 26, 46, 66],
			[6, 26, 48, 70],
			[6, 26, 50, 74],
			[6, 30, 54, 78],
			[6, 30, 56, 82],
			[6, 30, 58, 86],
			[6, 34, 62, 90],
			[6, 28, 50, 72, 94],
			[6, 26, 50, 74, 98],
			[6, 30, 54, 78, 102],
			[6, 28, 54, 80, 106],
			[6, 32, 58, 84, 110],
			[6, 30, 58, 86, 114],
			[6, 34, 62, 90, 118],
			[6, 26, 50, 74, 98, 122],
			[6, 30, 54, 78, 102, 126],
			[6, 26, 52, 78, 104, 130],
			[6, 30, 56, 82, 108, 134],
			[6, 34, 60, 86, 112, 138],
			[6, 30, 58, 86, 114, 142],
			[6, 34, 62, 90, 118, 146],
			[6, 30, 54, 78, 102, 126, 150],
			[6, 24, 50, 76, 102, 128, 154],
			[6, 28, 54, 80, 106, 132, 158],
			[6, 32, 58, 84, 110, 136, 162],
			[6, 26, 54, 82, 110, 138, 166],
			[6, 30, 58, 86, 114, 142, 170],
		],
		G15: (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0),
		G18: (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0),
		G15_MASK: (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1),
	};

	public getBCHTypeInfo(data: number) {
		let d = data << 10;
		while (this.getBCHDigit(d) - this.getBCHDigit(this.data.G15) >= 0) {
			d ^= this.data.G15 << (this.getBCHDigit(d) - this.getBCHDigit(this.data.G15));
		}
		return ((data << 10) | d) ^ this.data.G15_MASK;
	}

	public getBCHTypeNumber(data: number) {
		let d = data << 12;
		while (this.getBCHDigit(d) - this.getBCHDigit(this.data.G18) >= 0) {
			d ^= this.data.G18 << (this.getBCHDigit(d) - this.getBCHDigit(this.data.G18));
		}
		return (data << 12) | d;
	}

	public getBCHDigit(data: any) {
		let digit = 0;
		while (data != 0) {
			digit++;
			data >>>= 1;
		}
		return digit;
	}

	public getPatternPosition(typeNumber: number) {
		return this.data.PATTERN_POSITION_TABLE[typeNumber - 1];
	}

	public getMask(maskPattern: QRMaskPattern, i: number, j: number) {
		switch (maskPattern) {
			case QRMaskPattern.PATTERN000:
				return (i + j) % 2 == 0;
			case QRMaskPattern.PATTERN001:
				return i % 2 == 0;
			case QRMaskPattern.PATTERN010:
				return j % 3 == 0;
			case QRMaskPattern.PATTERN011:
				return (i + j) % 3 == 0;
			case QRMaskPattern.PATTERN100:
				return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
			case QRMaskPattern.PATTERN101:
				return ((i * j) % 2) + ((i * j) % 3) == 0;
			case QRMaskPattern.PATTERN110:
				return (((i * j) % 2) + ((i * j) % 3)) % 2 == 0;
			case QRMaskPattern.PATTERN111:
				return (((i * j) % 3) + ((i + j) % 2)) % 2 == 0;
			default:
				throw new Error('bad maskPattern: undefined');
		}
	}

	public getErrorCorrectPolynomial(errorCorrectLength: number) {
		const QR_MATH = new QRMath();
		let a = new QRPolynomial([1], 0);
		for (let i = 0; i < errorCorrectLength; i++) {
			a = a.multiply(new QRPolynomial([1, QR_MATH.gexp(i)], 0));
		}
		return a;
	}

	public getLengthInBits(mode: QRMode, type: number) {
		if (1 <= type && type < 10) {
			switch (mode) {
				case QRMode.MODE_NUMBER:
					return 10;
				case QRMode.MODE_ALPHA_NUM:
					return 9;
				case QRMode.MODE_8BIT_BYTE:
					return 8;
				case QRMode.MODE_KANJI:
					return 8;
				default:
					throw new Error('mode: undefined');
			}
		} else if (type < 27) {
			switch (mode) {
				case QRMode.MODE_NUMBER:
					return 12;
				case QRMode.MODE_ALPHA_NUM:
					return 11;
				case QRMode.MODE_8BIT_BYTE:
					return 16;
				case QRMode.MODE_KANJI:
					return 10;
				default:
					throw new Error('mode: undefined');
			}
		} else if (type < 41) {
			switch (mode) {
				case QRMode.MODE_NUMBER:
					return 14;
				case QRMode.MODE_ALPHA_NUM:
					return 13;
				case QRMode.MODE_8BIT_BYTE:
					return 16;
				case QRMode.MODE_KANJI:
					return 12;
				default:
					throw new Error('mode: undefined');
			}
		} else {
			throw new Error(`type: ${type}`);
		}
	}

	public getLostPoint(qrCode: QRCodeModel) {
		const MODULE_COUNT = qrCode.getModuleCount();
		let lostPoint = 0;
		for (let row = 0; row < MODULE_COUNT; row++) {
			for (let col = 0; col < MODULE_COUNT; col++) {
				let sameCount = 0;
				const DARK = qrCode.isDark(row, col);
				for (let r = -1; r <= 1; r++) {
					if (row + r < 0 || MODULE_COUNT <= row + r) {
						continue;
					}
					for (let c = -1; c <= 1; c++) {
						if (col + c < 0 || MODULE_COUNT <= col + c) {
							continue;
						}
						if (r == 0 && c == 0) {
							continue;
						}
						if (DARK == qrCode.isDark(row + r, col + c)) {
							sameCount++;
						}
					}
				}
				if (sameCount > 5) {
					lostPoint += 3 + sameCount - 5;
				}
			}
		}
		for (let row = 0; row < MODULE_COUNT - 1; row++) {
			for (let col = 0; col < MODULE_COUNT - 1; col++) {
				let count = 0;
				if (qrCode.isDark(row, col)) count++;
				if (qrCode.isDark(row + 1, col)) count++;
				if (qrCode.isDark(row, col + 1)) count++;
				if (qrCode.isDark(row + 1, col + 1)) count++;
				if (count == 0 || count == 4) {
					lostPoint += 3;
				}
			}
		}
		for (let row = 0; row < MODULE_COUNT; row++) {
			for (let col = 0; col < MODULE_COUNT - 6; col++) {
				if (
					qrCode.isDark(row, col) &&
					!qrCode.isDark(row, col + 1) &&
					qrCode.isDark(row, col + 2) &&
					qrCode.isDark(row, col + 3) &&
					qrCode.isDark(row, col + 4) &&
					!qrCode.isDark(row, col + 5) &&
					qrCode.isDark(row, col + 6)
				) {
					lostPoint += 40;
				}
			}
		}
		for (let col = 0; col < MODULE_COUNT; col++) {
			for (let row = 0; row < MODULE_COUNT - 6; row++) {
				if (
					qrCode.isDark(row, col) &&
					!qrCode.isDark(row + 1, col) &&
					qrCode.isDark(row + 2, col) &&
					qrCode.isDark(row + 3, col) &&
					qrCode.isDark(row + 4, col) &&
					!qrCode.isDark(row + 5, col) &&
					qrCode.isDark(row + 6, col)
				) {
					lostPoint += 40;
				}
			}
		}
		let darkCount = 0;
		for (let col = 0; col < MODULE_COUNT; col++) {
			for (let row = 0; row < MODULE_COUNT; row++) {
				if (qrCode.isDark(row, col)) {
					darkCount++;
				}
			}
		}
		const RATIO = Math.abs((100 * darkCount) / MODULE_COUNT / MODULE_COUNT - 50) / 5;
		lostPoint += RATIO * 10;
		return lostPoint;
	}
}

class QRCode {
	private options: Options;
	private qrCodeModel: QRCodeModel;

	public constructor(userOptions: any) {
		this.options = {
			data: '',
			typeNumber: 0,
			errorCorrectionLevel: 'M',
			backgroundColor: '#ffffff',
			modulesColor: '#000000',
			anchorsOuterColor: '#000000',
			anchorsInnerColor: '#000000',
			shape: 'square',
			haveBackgroundRoundedEdges: false,
			haveGappedModules: false,
			join: false,
			container: 'svg',
			padding: 1,
			width: 256,
			height: 256,
		};

		if (typeof userOptions === 'string') userOptions = { data: userOptions };
		if (userOptions) {
			for (const I in userOptions as Options) {
				// @ts-ignore
				this.options[I] = userOptions[I];
			}
		}

		if (this.options.data.length === 0 || this.options.data.length > 7089) {
			throw new Error("Expected 'data' to be non-empty and with a maximum of 6.92KB!");
		}
		if (this.options.padding < 1) this.options.padding = 1;
		if (this.options.width < 1) this.options.width = 256;
		if (this.options.height < 1) this.options.height = 256;

		const DATA = this.options.data;
		const TYPE = this._getTypeNumber(DATA, this.options.errorCorrectionLevel);
		const ERROR_CORRECTION_LEVEL = this._getErrorCorrectLevel(this.options.errorCorrectionLevel);
		this.qrCodeModel = new QRCodeModel(TYPE, ERROR_CORRECTION_LEVEL);
		this.qrCodeModel.addData(DATA);
		this.qrCodeModel.make();
	}

	public _getErrorCorrectLevel(errorCorrectionLevel: string) {
		switch (errorCorrectionLevel.toUpperCase()) {
			case 'L':
				return QRErrorCorrectLevel.L;

			case 'M':
				return QRErrorCorrectLevel.M;

			case 'Q':
				return QRErrorCorrectLevel.Q;

			case 'H':
				return QRErrorCorrectLevel.H;

			default:
				throw new Error(`Unknown error correction level: ${errorCorrectionLevel}`);
		}
	}

	public _getTypeNumber(data: string, errorCorrectionLevel: string) {
		const LENGTH = this._getUTF8Length(data);

		let type = 1;
		let limit = 0;

		for (let i = 0, len = QR_CODE_LIMIT_LENGTH.length; i <= len; i++) {
			const TABLE = QR_CODE_LIMIT_LENGTH[i];
			if (!TABLE) {
				throw new Error(`Data too long: expected ${limit} but got ${LENGTH}`);
			}

			switch (errorCorrectionLevel.toUpperCase()) {
				case 'L':
					limit = TABLE[0];
					break;

				case 'M':
					limit = TABLE[1];
					break;

				case 'Q':
					limit = TABLE[2];
					break;

				case 'H':
					limit = TABLE[3];
					break;

				default:
					throw new Error(`Unknown error correction level: ${errorCorrectionLevel}`);
			}

			if (LENGTH <= limit) {
				break;
			}

			type++;
		}
		if (type > QR_CODE_LIMIT_LENGTH.length) {
			throw new Error('Data too long');
		}

		return type;
	}

	public _getUTF8Length(data: string) {
		const RESULT = encodeURI(data)
			.toString()
			.replace(/\%[0-9a-fA-F]{2}/g, 'a');
		return RESULT.length + (RESULT.length != data.length ? 3 : 0);
	}

	public isAnchor(x: number, y: number, length: number): boolean {
		if (x <= 7) return y <= 7 || y >= length - 7;
		if (y <= 7) return x >= length - 7;
		return false;
	}

	public svg(): string {
		const WIDTH = this.options.width;
		const HEIGHT = this.options.height;

		const MODULES = this.qrCodeModel.modules;
		const LENGTH = MODULES.length;

		const X_SIZE = WIDTH / (LENGTH + 2 * this.options.padding);
		const Y_SIZE = HEIGHT / (LENGTH + 2 * this.options.padding);

		const JOIN = this.options.join;

		const BACKGROUND_RECT = this.options.haveBackgroundRoundedEdges
			? `<rect x="0" y="0" width="${WIDTH}" height="${HEIGHT}" rx="10" style="fill:${this.options.backgroundColor};"/>`
			: `<rect x="0" y="0" width="${WIDTH}" height="${HEIGHT}" style="fill:${this.options.backgroundColor};shape-rendering:crispEdges;"/>`;

		let modulesSvgData = '';

		let anchorsSvgData = '';

		let pathSvgData = '';

		for (let y = 0; y < LENGTH; y++) {
			for (let x = 0; x < LENGTH; x++) {
				const MODULE = MODULES[x][y];
				if (MODULE) {
					let px: number | string = x * X_SIZE + this.options.padding * X_SIZE;
					let py: number | string = y * Y_SIZE + this.options.padding * Y_SIZE;

					if (JOIN) {
						// Modules as a part of svg path data
						if (this.options.haveGappedModules && !this.isAnchor(x, y, LENGTH)) {
							let w: number | string = X_SIZE - X_SIZE * (10 / 100) + px;
							let h: number | string = Y_SIZE - Y_SIZE * (10 / 100) + py;

							px = Number.isInteger(px) ? Number(px) : px.toFixed(2);
							py = Number.isInteger(py) ? Number(py) : py.toFixed(2);
							w = Number.isInteger(w) ? Number(w) : w.toFixed(2);
							h = Number.isInteger(h) ? Number(h) : h.toFixed(2);

							pathSvgData += `M${px},${py} V${h} H${w} V${py} H${px} Z `;
						} else {
							let w: number | string = X_SIZE + px;
							let h: number | string = Y_SIZE + py;

							px = Number.isInteger(px) ? Number(px) : px.toFixed(2);
							py = Number.isInteger(py) ? Number(py) : py.toFixed(2);
							w = Number.isInteger(w) ? Number(w) : w.toFixed(2);
							h = Number.isInteger(h) ? Number(h) : h.toFixed(2);

							pathSvgData += `M${px},${py} V${h} H${w} V${py} H${px} Z `;
						}
					} else {
						if (!this.isAnchor(x, y, LENGTH)) {
							if (this.options.shape !== 'square') {
								// Modules as circle element
								modulesSvgData += `<circle class="module" cx="${px + X_SIZE / 2}" cy="${py + Y_SIZE / 2}" r="${Math.min(X_SIZE, Y_SIZE) / (this.options.haveGappedModules ? 2.4 : 2)}" style="fill:${this.options.modulesColor};"/>`;
							} else {
								// Modules as rectangle element
								modulesSvgData += `<rect class="module" x="${px}" y="${py}" width="${this.options.haveGappedModules ? X_SIZE - X_SIZE * (10 / 100) : X_SIZE}" height="${this.options.haveGappedModules ? Y_SIZE - Y_SIZE * (10 / 100) : Y_SIZE}" style="fill:${this.options.modulesColor};shape-rendering:crispEdges;"/>`;
							}
						}
					}
				}
			}
		}

		if (JOIN) {
			// Anchors included in the path data when join is true
			modulesSvgData = `<path x="0" y="0" style="fill:${this.options.modulesColor};shape-rendering:crispEdges;" d="${pathSvgData}" />`;
		} else {
			const ANCHORS = [
				['top-left', this.options.padding, this.options.padding],
				['top-right', LENGTH - 7 + this.options.padding, this.options.padding],
				['bottom-left', this.options.padding, LENGTH - 7 + this.options.padding],
			];

			for (const [position, x, y] of ANCHORS) {
				let outerPath = `M${Number(x)} ${Number(y)} h7 v7 h-7 v-7z m1 1 v5 h5 v-5 h-5 z`;
				let innerPath = `M${Number(x) + 2} ${Number(y) + 2} h3 v3 h-3 v-3 z`;

				if (this.options.shape !== 'square') {
					outerPath = `M${
						Number(x) + 0.5
					} ${Number(y)}h6s0.5 0 .5 .5v6s0 .5-.5 .5h-6s-.5 0-.5-.5v-6s0-.5 .5-.5zm.75 1s-.25 0-.25 .25v4.5s0 .25 .25 .25h4.5s.25 0 .25-.25v-4.5s0-.25 -.25 -.25h-4.5z`;
					innerPath = `M${Number(x) + 2.5} ${Number(y) + 2} h2 s.5 0 .5 .5 v2 s0 .5-.5 .5 h-2 s-.5 0-.5-.5 v-2 s0-.5 .5-.5 z`;
				}
				const OUTER_ANCHOR = `<path class="anchor-outer" fill="${this.options.anchorsOuterColor}" transform="scale(${X_SIZE}, ${Y_SIZE})" d="${outerPath}" />`;
				const INNER_ANCHOR = `<path class="anchor-inner" fill="${this.options.anchorsInnerColor}" transform="scale(${X_SIZE}, ${Y_SIZE})" d="${innerPath}" />`;

				anchorsSvgData += `<g data-position="${position}" ${this.options.shape !== 'square' ? '' : 'style="shape-rendering:crispEdges;"'}>${OUTER_ANCHOR} ${INNER_ANCHOR}</g>`;
			}

			anchorsSvgData = `<g class="anchors">${anchorsSvgData}</g>`;
		}

		let svg = '';
		switch (this.options.container) {
			case 'svg':
				svg = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="${WIDTH}" height="${HEIGHT}">${BACKGROUND_RECT}${anchorsSvgData}${modulesSvgData}</svg>`;
				break;

			// Viewbox for responsive use in a browser
			case 'svg-viewbox':
				svg = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 ${WIDTH} ${HEIGHT}">${BACKGROUND_RECT}${anchorsSvgData}${modulesSvgData}</svg>`;
				break;

			// Without a container
			default:
				svg = BACKGROUND_RECT + anchorsSvgData + modulesSvgData;
				break;
		}

		// Insert logo in base64 format if provided
		if (this.options.logoInBase64) {
			const QR_CODE_WIDTH_SIZE = this.options.width;
			const QR_CODE_HEIGHT_SIZE = this.options.height;

			// Get the size of each module
			const MODULE_COUNT = this.qrCodeModel.getModuleCount();
			const MODULE_SIZE = QR_CODE_WIDTH_SIZE / (MODULE_COUNT + 2 * this.options.padding);

			// Get the relative logo size
			const LOGO_REL_WIDTH = (QR_CODE_WIDTH_SIZE * (this.options.logoWidth || 0)) / 100;
			const LOGO_REL_HEIGHT = (QR_CODE_WIDTH_SIZE * (this.options.logoWidth || 0)) / 100;

			// Adjust logo to fit modules
			const LOGO_CEIL_W = Math.ceil(LOGO_REL_WIDTH / MODULE_SIZE);
			const LOGO_CEIL_H = Math.ceil(LOGO_REL_HEIGHT / MODULE_SIZE);
			const ADJUSTED_LOGO_CEIL_W = LOGO_CEIL_W + (MODULE_COUNT % 2 === LOGO_CEIL_W % 2 ? 0 : 1);
			const ADJUSTED_LOGO_CEIL_H = LOGO_CEIL_H + (MODULE_COUNT % 2 === LOGO_CEIL_H % 2 ? 0 : 1);
			const LOGO_WIDTH = ADJUSTED_LOGO_CEIL_W * MODULE_SIZE;
			const LOGO_HEIGHT = ADJUSTED_LOGO_CEIL_H * MODULE_SIZE;

			const LOGO_PADDING = (this.options.logoPadding || 0) * MODULE_SIZE;
			const LOGO_BACKGROUND_COLOR = this.options.logoBackgroundColor || this.options.backgroundColor;

			const LOGO_X = QR_CODE_WIDTH_SIZE / 2 - LOGO_WIDTH / 2;
			const LOGO_Y = QR_CODE_HEIGHT_SIZE / 2 - LOGO_HEIGHT / 2; // Center the logo
			const LOGO_BACKGROUND_X = QR_CODE_WIDTH_SIZE / 2 - LOGO_WIDTH / 2 - LOGO_PADDING;
			const LOGO_BACKGROUND_Y = QR_CODE_HEIGHT_SIZE / 2 - LOGO_HEIGHT / 2 - LOGO_PADDING;
			const LOGO_BACKGROUND_WIDTH = LOGO_WIDTH + LOGO_PADDING * 2;
			const LOGO_BACKGROUND_HEIGHT = LOGO_HEIGHT + LOGO_PADDING * 2;

			const LOGO_BACKGROUND_RECT = `<rect x="${LOGO_BACKGROUND_X}" y="${LOGO_BACKGROUND_Y}" width="${LOGO_BACKGROUND_WIDTH}" height="${LOGO_BACKGROUND_HEIGHT}" fill="${LOGO_BACKGROUND_COLOR}" style="shape-rendering:crispEdges;"/>`;
			const LOGO = `<image href="${this.options.logoInBase64}" x="${LOGO_X}" y="${LOGO_Y}" width="${LOGO_WIDTH}" height="${LOGO_HEIGHT}" preserveAspectRatio="xMidYMid meet"/>`;

			const CLOSING_TAG_POS = svg.lastIndexOf('</svg>');

			svg = svg.substring(0, CLOSING_TAG_POS) + LOGO_BACKGROUND_RECT + LOGO + svg.substring(CLOSING_TAG_POS);
		}

		return svg;
	}
}

export { QRCode };
export type { Options };
