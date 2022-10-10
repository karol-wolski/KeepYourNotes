import trimText from '../../helpers/trimText'

interface INote {
  id: string
  title: string
  desc: string
  img?: string
}

const Note = ({ title, desc, img }: INote) => {
  return (
    <div className='card'>
      {img && <img src={img} className='card-img-top' alt='' />}
      <div className='card-body'>
        <h2 className='card-title'>{title}</h2>
        <p className='card-text'>{trimText(desc, 120, ' ')}</p>
        <button className='btn btn-primary'>See full note</button>
      </div>
    </div>
  )
}

export default Note
