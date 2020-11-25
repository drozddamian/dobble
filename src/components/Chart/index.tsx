import React from 'react'
import { CartesianGrid, XAxis, YAxis, BarChart, Bar, Tooltip } from 'recharts'
import styled from "styled-components";

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
  <BarChart width={700} height={250} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey={xAxisDataKey} />
    <YAxis />
    <Bar dataKey={dataKey} barSize={20} fill="#82ca9d" />
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
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
`
const TooltipContainer = styled.div`
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 3px 10px 1px rgba(209,209,209,1);
  border-radius: 5px;
`

const AxisLabel = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.s18};
`

const TooltipLabel = styled(AxisLabel)`
  padding-top: 3px;
  font-size: ${({ theme }) => theme.fontSize.smallText};
`

export default Chart