import React from "react";
import styled from "styled-components";

const SettingInputLineWrapper = styled.div`
	margin-bottom: 0.5rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: stretch;
`;

const SettingName = styled.div`
	font-size: 1em;
	color: white;
	font-family: "Source Code Pro", monospace;
`;

const SettingInput = styled.input`
	margin-left: 0.5rem;
	width: 4rem;
	padding: 0.2rem 0.5rem;
	display: inline-block;
	border: 1px solid #333;
	background-color: transparent;
	font-size: 1em;
	color: white;
	font-family: "Source Code Pro", monospace;
	outline: none;
	&:disabled {
		border-color: transparent;
	}
`;

const SettingSelect = styled.select`
	margin-left: 0.5rem;
	width: 8rem;
	padding: 0.2rem 0.5rem;
	display: inline-block;
	border: 1px solid #333;
	-webkit-appearance: none;
	-webkit-border-radius: 0px;
	background-color: transparent;
	font-size: 1em;
	color: white;
	font-family: "Source Code Pro", monospace;
	outline: none;
	&:disabled {
		border-color: transparent;
	}
`;

const SettingSelectOption = styled.option``;

const SettingInputLine = ({ name, value, options, disabled }) => {
	console.log({ name, value, options });
	return (
		<SettingInputLineWrapper>
			<SettingName>{`${name}:`}</SettingName>
			{options === undefined ? (
				<SettingInput disabled={disabled} value={"0.2"} />
			) : (
				<SettingSelect disabled={disabled}>
					{options.map(option => (
						<SettingSelectOption key={option.name}>
							{option.name}
						</SettingSelectOption>
					))}
				</SettingSelect>
			)}
			)}
		</SettingInputLineWrapper>
	);
};

export default SettingInputLine;
