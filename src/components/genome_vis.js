import React from "react";
import styled from "styled-components";
// components
import StatLine from "./stat_line";
// utils
import { decodeFloatsFromBinaryStr } from "../utils/string";

const GenVisContainer = styled.div`
	width: 300px;
	word-wrap: break-word;
	margin-top: 0.5em;
	font-size: 0.8em;
	color: white;
	font-family: "Source Code Pro", monospace;
`;

const GenBitChange = styled.span`
	font-size: 1em;
	color: ${props => props.color};
	font-family: "Source Code Pro", monospace;
`;

const change_color_lookup = ["#df2644", "#e96a7f", "#f19dab", "#fff"];

const GenomeEvolutionVis = ({ genomes }) => {
	const [current_genome] = genomes.slice(-1);
	const genome_history = genomes.slice(-4, -1).reverse();
	const params_history = genome_history.map(genome =>
		decodeFloatsFromBinaryStr(genome, 3)
	);
	return (
		<>
			<StatLine>Fittest individual genome:</StatLine>
			<GenVisContainer>
				{Array.from(current_genome).map((bit, bit_idx) => {
					let lastChange = change_color_lookup.length - 1;
					for (const [gen_idx, genome] of genome_history.entries())
						if (Array.from(genome)[bit_idx] !== bit) {
							lastChange = gen_idx;
							break;
						}
					return (
						<GenBitChange key={bit_idx} color={change_color_lookup[lastChange]}>
							{bit}
						</GenBitChange>
					);
				})}
			</GenVisContainer>
			<StatLine>{`Fittest individual params:`}</StatLine>
			{/* <StatLine>{`k_p:${p_gain.toFixed(3)} k_i:${i_gain.toFixed(
				3
			)} k_d:${d_gain.toFixed(3)}`}</StatLine> */}
		</>
	);
};

export default GenomeEvolutionVis;
