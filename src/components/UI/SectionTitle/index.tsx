import styled, { css } from "styled-components";

interface SectionTitleProps {
  width?: string;
  padding?: string;
}

export default styled.h2`
  display: flex;
  font-family: ${({ theme }) => theme.fonts.russo};
  font-size: ${({ theme }) => theme.fonts.smallTitle};
  color: ${({ theme }) => theme.colors.darkBlue};
  width: 100%;
  ${(props: SectionTitleProps) => props.width && css`
    width: ${props.width};
  `};
  
  ${(props: SectionTitleProps) => props.padding && css`
    padding: ${props.padding};
  `};
  
  @media (min-width: ${({ theme }) => theme.rwd.desktop.xs}) {
    align-self: flex-start;
  }
`