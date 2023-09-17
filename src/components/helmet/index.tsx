import React from 'react'
import { Helmet as ReactHelmet } from 'react-helmet-async'
import { useAppSelector } from 'src/hooks/useActionStore'

interface HelmetProps {
  title?: string,
  favicon?: string
}
const Helmet:React.FC<HelmetProps> = ({ favicon, title }) => {
  const store = useAppSelector(state => state.app.store)
  return (
    <ReactHelmet>
      <title>{title}</title>
      <link rel="icon" type="image/svg+xml" href={favicon || store.logo_xs || 'favicon.png'} />
    </ReactHelmet>
  )
}

export default Helmet
