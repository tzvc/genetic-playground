import React from "react";
import styled from "styled-components";

const AuthorWrapper = styled.div`
	align-self: flex-end;
	font-size: 0.8rem;
	color: white;
	font-family: "Source Code Pro", monospace;
`;

const AuthorLink = styled.a`
	color: white;
	text-decoration: none;
	&:hover {
		cursor: pointer;
		opacity: 0.8;
	}
`;

const Author = () => (
	<AuthorWrapper>
		Made with ❤️ by{" "}
		<AuthorLink href="https://github.com/theochampion">
			Théo Champion
		</AuthorLink>
	</AuthorWrapper>
);

export default Author;
