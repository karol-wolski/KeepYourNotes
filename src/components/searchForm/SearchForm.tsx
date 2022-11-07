import { useState } from 'react'

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

  return (
    <div className='container'>
      <div className='row'>
        <form className='d-inline-flex flex-row justify-content-center'>
          <div className='d-inline-flex col-8 m-3'>
            <input
              type='text'
              className='form-control'
              id='searchInput'
              placeholder='Search the note'
              onChange={onChangeInput}
            />
            <button type='submit' className='btn btn-primary' onClick={sendText}>
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SearchForm
