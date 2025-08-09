import { memo } from 'react'
import { StyledStatistics } from './StyledStatistics'
import { numSort } from 'hooks'

const Statistics = memo(() => {
  return (
    <StyledStatistics className='statistcs__wrapper'>
      {JSON?.parse(localStorage?.getItem('storeHistory') as any)?.map((i: any, idx: number) => (
        <div key={`${i?.mahsulotNomi?.replaceAll(' ', '')}-${idx}`} className='action__wrapper'>
          <div className='top'>
            <p>{i?.qachonSotildi || i?.qachonSotibOlindi}</p>
            <p>{i?.kimTomonidan}</p>
          </div>
          <div className='body'>
            <div className='left'>
              <h3 className='title'>{i?.mahsulotNomi?.toUpperCase() + ' '}</h3>
              <h4 className={i?.qanchaSotildi ? 'sotildi' : ''}>
                {numSort(i?.qanchaSotildi || i?.qanchaSotibOlindi) + ' '}
                <span>ta</span>
              </h4>
              <div className='current-cash'>
                <p>
                  Narxi: <span>{' ' + numSort(i?.narxi)}</span>
                </p>
                <p>
                  Jami narxi:
                  <span>{' ' + numSort(Number(i?.narxi) * Number(i?.qanchaSotildi || i?.qanchaSotibOlindi))}</span>
                </p>
              </div>
            </div>
            <div className='right'>
              <h4 className={i?.qanchaSotildi ? 'sotildi' : ''}>{i?.qanchaSotildi ? 'Sotildi' : 'Sotib olindi'}</h4>
              <i className={'icon icon-arrow-up-down' + (!i?.qanchaSotildi ? ' red' : '')}></i>
            </div>
          </div>
        </div>
      ))}
    </StyledStatistics>
  )
})

export default Statistics