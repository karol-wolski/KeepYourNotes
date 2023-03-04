import { useState } from 'react'
import LabelInput from '../labelInput/LabelInput'
import stylesBtn from '../../styles/buttons.module.scss'
import { useIntl } from 'react-intl'

interface ISearchForm {
  searchByTitle: (text: string) => void
}

const SearchForm = ({ searchByTitle }: ISearchForm) => {
  const [searchTitle, setSearchTitle] = useState<string>('')

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => setSearchTitle(event.target.value)

  const sendText = (event: React.FormEvent) => {
    event.preventDefault()
    searchByTitle(searchTitle)
  }

  const { formatMessage } = useIntl()

  return (
    <div className='container'>
      <div className='row'>
        <form className='d-inline-flex flex-row justify-content-center'>
          <div className='d-inline-flex col-8 m-3'>
            <LabelInput
              id='searchInput'
              type='text'
              placeholder={formatMessage({ id: 'app.searchNote', defaultMessage: 'Search Notethe note' })}
              onChange={onChangeInput}
              isLabelVisible={false}
              labelText={formatMessage({ id: 'app.searchNote', defaultMessage: 'Search the note' })}
            />
            <button type='submit' className={`btn btn-primary mx-1 ${stylesBtn.btn__secondary}`} onClick={sendText}>
              {formatMessage({ id: 'app.search', defaultMessage: 'Search' })}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SearchForm
