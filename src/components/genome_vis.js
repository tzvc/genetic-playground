import React from "react";
import styled from "styled-components";

const GenVisContainer = styled.div`
	width: 15rem;
	word-wrap: break-word;

	font-size: 1em;
	color: white;
	font-family: "Source Code Pro", monospace;
`;

const GenBitChange = styled.span`
	font-size: 1em;
	color: red;
	font-family: "Source Code Pro", monospace;
`;

const GenomeVis = ({ exGenome, genome }) => (
	<GenVisContainer>
		{Array.from(genome).map((bit, idx) =>
			bit === exGenome[idx] ? bit : <GenBitChange>{bit}</GenBitChange>
		)}
	</GenVisContainer>
);

export default GenomeVis;
