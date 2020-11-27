import React, { ReactElement, useState } from 'react'
import styled, { css } from 'styled-components'

interface Props {
  componentSwitcherData: {
    [id: string]: {
      title: string;
      component: ReactElement;
    }
  }
}

const ComponentSwitcher: React.FC<Props> = ({ componentSwitcherData }) => {
  const switcherTabs = Object.keys(componentSwitcherData)
  const [activeTab, setActiveTab] = useState(switcherTabs[0])
  const switchComponent = componentSwitcherData[activeTab].component

  const handleSwitchClick = (event: any): void => {
    const button = event.target as HTMLButtonElement
    setActiveTab(button.id)
  }

  return (
    <Wrapper>
      <SwitchContainer>
        {switcherTabs.map((tab, index) => {
          const isLastTab = index === switcherTabs.length - 1
          return (
            <>
              <SwitchButton
                id={tab}
                isActive={activeTab === tab}
                onClick={handleSwitchClick}
              >
                {componentSwitcherData[tab].title}
              </SwitchButton>

              {!isLastTab && (
                <SwitchButtonsSeparator />
              )}
            </>
          )
        })}
      </SwitchContainer>

      <SwitchContent>
        {switchComponent}
      </SwitchContent>
    </Wrapper>
  )
}

const Wrapper = styled.div`
 display: flex;
 flex-direction: column;
`

const SwitchContainer = styled.div`
  display: flex;
`

const SwitchButtonsSeparator = styled.div`
  width: 2px;
  height: auto;
  transform: rotate(16deg);
  background-color: ${({ theme }) => theme.colors.darkBlue};
`

const SwitchButton = styled.button<{ isActive?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.russo};
  font-size: ${({ theme }) => theme.fonts.smallTitle};
  color: ${({ theme }) => theme.colors.inputBorder};
  transition: color .2s ease-out;
  
  ${(props) => props.isActive && css`
    color: ${({ theme }) => theme.colors.darkBlue};
  `};
  
${(props) => !props.isActive && css`
  :hover {
    color: ${({ theme }) => theme.colors.darkBlue08}; 
  }
`};
`

const SwitchContent = styled.div``

export default ComponentSwitcher