import styled, { css } from 'styled-components'

export const SCCalendarModal = styled.div`
  position: absolute;
  z-index: 10000;
`

export const Calendar = styled.div`
  text-align: center;
  width: 435px;
  border: 1px solid #9b9b9b;
  border-radius: 3px;
  background-color: #ffffff;
  padding: 5px;
  position: absolute;
  z-index: 1000;
  box-sizing: content-box;
`

export const PeriodSelector = styled.div`
  position: relative;
  height: 30px;
`

export const ContainerBlock = styled.div`
  margin: auto;
  display: inline-block;
`

export const PeriodDate = styled.div`
  text-align: center;
  padding-top: 5px;
  color: #2c3135;
`
export const PeriodButton = styled.div`
  cursor: pointer;
  position: absolute;
  top: 5px;
  font-size: 20px;
  ${(props) =>
    props.left &&
    css`
      left: 15px;
    `} ${(props) =>
    props.right &&
    css`
      right: 15px;
    `};
`

export const MinuteSelector = styled.div`
  text-align: left;
  margin-left: 128px;
  opacity: 1;
  ${(props) =>
    props.disabled &&
    css`
      opacity: 0;
    `};
`
export const SimpleDisplay = styled.div`
  display: inline-block;
  margin: 3px;
  border-radius: 3px;
  padding: 5px 15px;
  font-size: 12px;
  color: #9b9b9b;
  user-select: none;
`
export const DateValue = SimpleDisplay.extend`
    cursor: pointer;
    padding: 5px 20px;
    color:#1F1F1F;
    ${(props) =>
      !props.disabled &&
      css`
        &:hover {
          background-color: #27d7ab;
          color: #ffffff;
        }
      `}

    ${(props) =>
      props.disabled &&
      css`
        background-color: #f1f1f1;
        color: #d8d8d8;
        cursor: not-allowed;
      `}
    ${(props) =>
      props.selected &&
      css`
        background-color: #27d7ab;
        color: #ffffff;
      `}
`

export const SCDayRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > div {
    flex: 1;
  }
`
