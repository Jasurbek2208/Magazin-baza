import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const BossCard = memo(({ id, title, img, navLink }: any) => {
  const navigate = useNavigate()
  return (
    <StyledBossCard id={id} onClick={() => navigate(navLink)}>
      <h2>{title}</h2>
      <i className={'icon fa-solid ' + img}></i>
    </StyledBossCard>
  )
})

export default BossCard

const StyledBossCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 20px;
  width: 270px;
  height: 200px;
  border: 1px solid #1e90ff;
  background-color: #fff;
  transition: transform 300ms, background-color 100ms;

  h2 {
    max-width: 260px;
    text-align: center;
  }

  &:hover {
    color: #fff;
    border: none;
    background-color: #1e90ff;

    .icon {
      color: #fff;
    }
  }

  .icon {
    color: #ccc;
    font-size: 3.4rem;
    transition: 200ms;
  }
`