import React from "react";
import styled from "styled-components";
import Logo from "./logo";

const Overlay = styled.div`
	position: absolute;
	z-index: 2;
	margin: 3rem;
`;

const LeftPanelOverlay = ({ children }) => (
	<Overlay>
		<Logo />
		{children}
	</Overlay>
);

export default LeftPanelOverlay;
