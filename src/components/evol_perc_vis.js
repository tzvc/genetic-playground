import React from "react";
import styled from "styled-components";

const NegPerc = styled.span`
	font-size: 1em;
	color: #d21f3c;
	font-family: "Source Code Pro", monospace;
`;

const EvolPercVis = ({ perc }) =>
	perc >= 0 ? (
		`+${perc.toFixed(1)}%`
	) : (
		<NegPerc>{`${perc.toFixed(1)}%`}</NegPerc>
	);

export default EvolPercVis;
