import styled, { css } from 'styled-components'
import { InputContainer } from './Input'

interface FormWrapperProps {
  error?: string | null;
}

const FormWrapper = styled.form` 
  display: flex;
  flex-direction: column;
  align-items: center;
  
  ${(props: FormWrapperProps) => props.error && css`
    ${InputContainer}:after {
      background-color: ${({ theme }) => theme.colors.error};
      transform: translateY(5px);
    }
  `};
`

export default FormWrapper
