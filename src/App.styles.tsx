import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";

export const StyledContainer = styled(Container).attrs({
  className: "my-4",
})``;

export const StyledStack = styled(Stack).attrs({
  className: "mb-2",
  direction: "horizontal",
  gap: 2,
})``;

export const H1 = styled.h1.attrs({ className: "me-auto" })``;

export const Grid = styled.div.attrs({})`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  align-items: flex-start;
`;
