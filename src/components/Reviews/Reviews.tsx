const reviews = [
  {
    id: '0001',
    author: 'John Doe',
    review:
      'KeepYourNotes is my number 1 app. I keep a lot of different notes in it, as well as shopping lists and more. I recommend it to everyone.',
  },
  {
    id: '0002',
    author: 'Anna Kowalska',
    review:
      'I love this app. Thanks to it, I do not have to worry about forgetting to take important things with me, because I keep everything in it.',
  },
  {
    id: '0003',
    author: 'Pavel Kovacić',
    review:
      'I am a student. With the KeepYourNotes application, I am able to store all my notes. I can use the application everywhere, at home, at university, while riding the bus. I recommend to everyone.',
  },
]

const Reviews = () => {
  return (
    <section className='reviews d-flex flex-column align-items-center px-4'>
      <h2 className='text-[4rem] mb-[4rem] text-center'>What do people say about our product?</h2>
      <div id='carouselExampleControls' className='carousel slide reviews-carousel' data-bs-ride='carousel'>
        <div className='carousel-inner reviews-carousel-inner'>
          {reviews.map(({ id, author, review }, index) => (
            <div className={`carousel-item ${index === 0 && 'active'}`} key={id}>
              <p className='fs-5'>{author}</p>
              <p className='fs-5'>{review}</p>
            </div>
          ))}
        </div>
        <button
          className='carousel-control-prev reviews-carousel__mobile-btn'
          type='button'
          data-bs-target='#carouselExampleControls'
          data-bs-slide='prev'
        >
          <span className='carousel-control-prev-icon' aria-hidden='true' />
          <span className='visually-hidden'>Previous</span>
        </button>
        <button
          className='carousel-control-next reviews-carousel__mobile-btn'
          type='button'
          data-bs-target='#carouselExampleControls'
          data-bs-slide='next'
        >
          <span className='carousel-control-next-icon' aria-hidden='true' />
          <span className='visually-hidden'>Next</span>
        </button>
      </div>
    </section>
  )
}

export default Reviews
