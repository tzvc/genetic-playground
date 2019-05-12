export const addLeadingZeros = (str, targetLength) => {
	return "0".repeat(targetLength - str.length) + str;
};
