import WelcomeSection from '../components/WelcomeSection/WelcomeSection'
import AboutApp from '../components/AboutApp/AboutApp'
import FunFact from '../components/FunFact/FunFact'
import Reviews from '../components/Reviews/Reviews'
import JoinApp from '../components/join-app/JoinApp'
import Footer from '../components/footer/Footer'

const Homepage = () => {
  return (
    <>
      <WelcomeSection
        title='Keep Your Notes'
        desc='Your favourite place to store all of your notes'
        btnOneText='Log in now'
        btnOnePath='/login'
        btnTwoText='Sign up now'
        btnTwoPath='/signup'
      />
      <AboutApp
        title='Find out more'
        desc={
          <>
            <b>Keep Your Notes</b> is an app that allows you to keep all of your notes in one place. With this
            application you will never forget to take important notes together with you. And with the function of{' '}
            <b>pinning note</b>, your most important notes will always be at the top of your notebook. What is more, you
            can <b>highlight</b> each of your note with a specific <b>background color</b> or <b>categories tags</b>. Do
            not wait any longer, sign up and check more features.
          </>
        }
      />
      <FunFact
        content={
          <span>
            Do not hesitate, sign up and ... <br /> ... Make your life better.
          </span>
        }
      />
      <Reviews />
      <JoinApp />
      <Footer />
    </>
  )
}

export default Homepage
