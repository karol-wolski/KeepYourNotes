import Note from '../note/Note'

const Notes = () => {
  return (
    <div className='container'>
      <div className='row g-3'>
        <div className='col-12 col-sm-6 col-md-4 col-xl-3'>
          <Note id='note0001' title='Note 01' desc='This is note' />
        </div>
        <div className='col-12 col-sm-6 col-md-4 col-xl-3'>
          <Note
            id='note0002'
            title='Note 02'
            desc='This is note'
            img='https://pixabay.com/get/g68e094ec2e8cc52ca41892dc70806fd1432bfb3f56aba70c38a43a3c873ba0b30a7a4d350552d4f3280b6d476a8ef291_1280.jpg'
          />
        </div>
        <div className='col-12 col-sm-6 col-md-4 col-xl-3'>
          <Note
            id='note0003'
            title='Note 03'
            desc='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor, esse temporibus sequi molestias minima minus asperiores ab molestiae adipisci excepturi aspernatur expedita. Cum incidunt libero asperiores corrupti vero nesciunt, id accusamus eos minima, quaerat error, aut officiis adipisci consectetur facilis.'
          />
        </div>
        <div className='col-12 col-sm-6 col-md-4 col-xl-3'>
          <Note id='note0004' title='Note 04' desc='This is note' />
        </div>
        <div className='col-12 col-sm-6 col-md-4 col-xl-3'>
          <Note id='note0005' title='Note 05' desc='This is note' />
        </div>
        <div className='col-12 col-sm-6 col-md-4 col-xl-3'>
          <Note id='note0006' title='Note 06' desc='This is note' />
        </div>
        <div className='col-12 col-sm-6 col-md-4 col-xl-3'>
          <Note id='note0007' title='Note 07' desc='This is note' />
        </div>
        <div className='col-12 col-sm-6 col-md-4 col-xl-3'>
          <Note id='note0008' title='Note 08' desc='This is note' />
        </div>
        <div className='col-12 col-sm-6 col-md-4 col-xl-3'>
          <Note id='note0009' title='Note 09' desc='This is note' />
        </div>
      </div>
    </div>
  )
}

export default Notes
