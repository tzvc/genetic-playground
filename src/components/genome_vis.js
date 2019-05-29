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
	const current_params = decodeFloatsFromBinaryStr(current_genome, 3);
	const params_history = genome_history.map(genome =>
		decodeFloatsFromBinaryStr(genome, 3)
	);
	return (
		<>
			<StatLine>Fittest individual:</StatLine>
			<StatLine>genome:</StatLine>

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
			<StatLine>
				&nbsp;p_gain:&nbsp;&nbsp;&nbsp;&nbsp;i_gain:&nbsp;&nbsp;&nbsp;&nbsp;d_gain:
			</StatLine>
			<StatLine>
				{current_params.map((param, param_idx) => {
					let lastChange = change_color_lookup.length - 1;
					for (const [ex_p_idx, ex_param] of params_history.entries())
						if (ex_param[param_idx] !== param) {
							lastChange = ex_p_idx;
							break;
						}
					return (
						<GenBitChange
							key={param_idx}
							color={change_color_lookup[lastChange]}
						>
							{`${param.toFixed(7)}`}&nbsp;&nbsp;
						</GenBitChange>
					);
				})}
			</StatLine>
		</>
	);
};

export default GenomeEvolutionVis;
