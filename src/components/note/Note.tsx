import { useState } from 'react'
import trimText from '../../helpers/trimText'
import SingleNoteModal from '../singleNoteModal/SingleNoteModal'

export interface INote {
  id?: string
  title: string
  desc: string
  img?: string
}

const Note = ({ title, desc, img }: INote) => {
  const [displayModal, setDisplayModal] = useState<boolean>(false)

  const handleClose = () => setDisplayModal(false)
  const openModal = () => setDisplayModal(true)

  return (
    <>
      <div className='card'>
        {img && <img src={img} className='card-img-top' alt='' />}
        <div className='card-body'>
          <h2 className='card-title'>{title}</h2>
          <p className='card-text'>{trimText(desc, 120, ' ')}</p>
          <button type='button' className='btn btn-primary' onClick={openModal}>
            See full note
          </button>
        </div>
      </div>
      {displayModal && <SingleNoteModal title={title} desc={desc} img={img} handleClose={handleClose} />}
    </>
  )
}

export default Note
