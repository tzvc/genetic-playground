import React from "react";
import styled from "styled-components";
import Logo from "./logo";

const Overlay = styled.div`
	position: absolute;
	z-index: 2;
	margin: 2rem;
`;

const LeftPanelOverlay = () => (
	<Overlay>
		<Logo />
	</Overlay>
);

export default LeftPanelOverlay;
