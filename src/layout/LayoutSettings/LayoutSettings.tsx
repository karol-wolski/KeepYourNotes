import { ReactNode } from 'react'
import ListItemGroup from '../../components/LinkItemGroup/LinkItemGroup'
import Navigation from '../../components/navigation/Navigation'
import { linkArray } from '../../constants/settingLinksArray'

interface ILayoutSettings {
  children: ReactNode
  linksArray: linkArray
}

const LayoutSettings = ({ children, linksArray }: ILayoutSettings) => {
  return (
    <>
      <Navigation />
      <div className='container mt-3'>
        <div className='row'>
          <div className='col-sm-12 col-md-3'>
            <ListItemGroup linkArray={linksArray} />
          </div>
          <div className='col-sm-12 col-md-9'>{children}</div>
        </div>
      </div>
    </>
  )
}

export default LayoutSettings
