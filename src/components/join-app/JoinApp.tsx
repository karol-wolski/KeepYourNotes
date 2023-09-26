import { Link } from 'react-router-dom'

const JoinApp = () => {
  return (
    <section className='container-fluid'>
      <div className='row'>
        <div className='join-us col-md-6 d-flex justify-content-center align-items-center flex-column'>
          <h2>The No. 1 note app</h2>
          <p>Join satisfied users</p>
          <Link className='btn btn-primary' to='/signup'>
            Join us now
          </Link>
        </div>
        <div className='join-us-bg-image col-md-6'></div>
      </div>
    </section>
  )
}

export default JoinApp
