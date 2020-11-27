import React, { ReactElement, useState } from 'react'
import styled, { css } from 'styled-components'
import SectionTitle from '../UI/SectionTitle'

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
                isActive={tab === activeTab}
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
  padding-bottom: 16px;
`

const SwitchButtonsSeparator = styled.div`
  width: 3px;
  height: auto;
  margin: 0 10px;
  transform: rotate(16deg);
  background-color: ${({ theme }) => theme.colors.darkBlue};
`

const SwitchButton = styled(SectionTitle)<{ isActive: boolean }>`
  color: ${({ theme }) => theme.colors.inputBorder};
  transition: color .2s ease-in-out;
  cursor: pointer;
  width: auto;
  
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