import React, { useEffect } from 'react'
import styled from 'styled-components'
import { isNil } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAccount } from '../../redux/account'
import LoadingComponent from '../../components/Loader/CircleLoader'
import theme from '../../utils/theme'
import { Wrapper } from './AuthSection'
import { SectionTitle } from './index'

interface Props {
  userId: string;
}

const PlayerSection: React.FC<Props> = (props: Props) => {
  const { userId } = props
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAccount(userId))
  }, [])

  const { accountData, isLoading } = useSelector(state => state.account)

  if (isLoading || isNil(accountData)) {
    return <LoadingComponent color={theme.colors.white} />
  }
  const { nick } = accountData

  return (
    <Wrapper>
      <PlayerInfoContainer>
        <SectionTitle>
          {nick}
        </SectionTitle>

      </PlayerInfoContainer>
    </Wrapper>
  )
}

const PlayerInfoContainer = styled.div`

`

export default PlayerSection
