import React from "react";
import styled from "styled-components";

const Button = styled.button`
	padding: 0.5rem 1rem;
	border: 2px solid white;
	background-color: transparent;
	color: white;
	font-size: 1rem;
	font-family: "Source Code Pro", monospace;
	cursor: pointer;
	&:hover {
		opacity: 0.8;
	}
`;

export default Button;
