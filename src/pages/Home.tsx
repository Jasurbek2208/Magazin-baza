import { memo } from 'react'
import { TabTitle } from 'utils'

// Components
import { Boss } from 'pages'

const Home = memo(() => {
  TabTitle('Magazin Baza')

  return (
    <div className='container'>
      <Boss />
    </div>
  )
})

export default Home