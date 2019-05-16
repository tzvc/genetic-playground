import React from "react";
import styled from "styled-components";

const LogoWrapper = styled.div`
	padding: 1em;
`;

const LogoText = styled.div`
	float: left;
	clear: left;
	font-size: 1.5em;
	color: black;
	background-color: white;
	padding: 0.2rem 0.3rem;
	margin-bottom: 0.2rem;
	font-family: "Source Code Pro", monospace;
`;

const Logo = () => (
	<LogoWrapper>
		<LogoText>genetic</LogoText>
		<LogoText>playground</LogoText>
	</LogoWrapper>
);

export default Logo;
