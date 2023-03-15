import { useIntl } from 'react-intl'
import { Link, useLocation } from 'react-router-dom'
import { linkArray } from '../../constants/settingLinksArray'
import stylesBtn from '../../styles/buttons.module.scss'
import styles from './LinkItemGroup.module.scss'

interface ILinkItemGroup {
  linkArray: linkArray
}

const LinkItemGroup = ({ linkArray }: ILinkItemGroup) => {
  const { pathname } = useLocation()
  const isListLinkActive = (path: string) => pathname.includes(path)
  const { formatMessage } = useIntl()

  return (
    <div className={`list-group ${styles.list}`}>
      {linkArray.map((link, index) => (
        <Link
          key={index}
          to={link.path}
          className={`list-group-item list-group-item-action  ${
            isListLinkActive(link.path) && stylesBtn.btn__secondary
          }`}
          aria-current={isListLinkActive(link.path)}
        >
          {formatMessage({ id: link.translateId, defaultMessage: link.name })}
        </Link>
      ))}
    </div>
  )
}

export default LinkItemGroup
