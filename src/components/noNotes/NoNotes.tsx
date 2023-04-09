import { useIntl } from 'react-intl'

const NoNotes = () => {
  const { formatMessage } = useIntl()
  return (
    <div className='container'>
      <div className='row'>
        <p className='fs-4 text-center'>
          {formatMessage({ id: 'app.noNote', defaultMessage: 'You do not have any notes yet.' })}
        </p>
        <p className='text-center'>
          {formatMessage({
            id: 'app.clickAddNoteBtn',
            defaultMessage: 'Click Add note button and add your first note.',
          })}
        </p>
      </div>
    </div>
  )
}

export default NoNotes
