import React from 'react'
import styled from 'styled-components'
import { CartesianGrid, XAxis, YAxis, BarChart, Bar, Tooltip } from 'recharts'
import theme from '../../utils/theme'

interface Props {
  data: Array<any>;
  dataKey: string;
  tooltipLabel?: string;
  xAxisDataKey: string;
}

interface TooltipProps {
  axisLabel: string;
  payload: any;
  label: string;
}

const CustomTooltip: React.FC<TooltipProps> = ({ axisLabel, label, payload }) => {
  if (!payload[0]?.value) {
    return null
  }
  return (
    <TooltipContainer>
      <AxisLabel>{axisLabel}</AxisLabel>
      <TooltipLabel>{`${label} : ${payload[0].value}`}</TooltipLabel>
    </TooltipContainer>
  );
}

const Chart: React.FC<Props> = ({
  data,
  dataKey,
  tooltipLabel,
  xAxisDataKey
}) => (
  <Wrapper>
    <BarChart
      width={700}
      height={250}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={xAxisDataKey} />
      <YAxis />

      <Bar
        barSize={20}
        dataKey={dataKey}
        fill={theme.colors.darkBlue08}
      />

      {tooltipLabel && (
        <Tooltip
          cursor={false}
          // @ts-ignore
          content={(data) => (
            <CustomTooltip
              axisLabel={data.label}
              payload={data.payload}
              label={tooltipLabel}
            />
          )}/>
      )}
    </BarChart>
  </Wrapper>
)

const Wrapper = styled.div`
  overflow-x: scroll;
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
  font-size: ${({ theme }) => theme.fontSize.s13};
`
const TooltipContainer = styled.div`
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 3px 10px 1px rgba(209,209,209,1);
  border-radius: 5px;
`

const AxisLabel = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.s13};
`

const TooltipLabel = styled(AxisLabel)`
  padding-top: 3px;
  font-size: ${({ theme }) => theme.fontSize.smallText};
`

export default Chart