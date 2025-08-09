import { memo, type ReactNode } from 'react'
import { Provider } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createStore } from 'redux'

const AuthRedux = memo(({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()

  const initialState = { isAuth: JSON?.parse((localStorage?.getItem('ISAUTH') as any) || 'false') }

  const reducer = (state = initialState, action: any) => {
    switch (action?.type) {
      case 'LOG_IN':
        localStorage?.setItem('ISAUTH', 'true')
        return { isAuth: true }
      case 'LOG_OUT':
        localStorage?.removeItem('TOKEN')
        localStorage?.removeItem('lastRol')
        localStorage?.removeItem('storeHistory')
        localStorage?.setItem('ISAUTH', 'false')
        localStorage?.removeItem('oziqOvqatChiqim')
        localStorage?.removeItem('korxonaUchunChiqim')
        navigate('..')
        return { isAuth: false }
      default:
        return state
    }
  }
  const store = createStore(reducer)

  return <Provider store={store}>{children}</Provider>
})

export default AuthRedux