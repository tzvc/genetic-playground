import { lerp } from "./math";

export const addLeadingZeros = (str, targetLength) => {
	return "0".repeat(targetLength - str.length) + str;
};

export const decodeFloatsFromBinaryStr = (binStr, floatNb) => {
	const paramBitLength = binStr.length / floatNb;
	let decoded = [];
	for (let i = 0; i < binStr.length; i += paramBitLength)
		decoded.push(
			lerp(
				parseInt(binStr.substr(i, paramBitLength), 2),
				0,
				Number.MAX_SAFE_INTEGER,
				0.0,
				1.0
			)
		);
	return decoded;
};

export const hashCode = str =>
	str
		.split("")
		.reduce(
			(prevHash, currVal) =>
				((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0,
			0
		);
