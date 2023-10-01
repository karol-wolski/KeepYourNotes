interface Props {
  title: string
  desc: string | React.ReactElement
}
const AboutApp = ({ title, desc }: Props) => {
  return (
    <section className='about-app d-flex flex-column align-items-center px-4'>
      <h2>{title}</h2>
      <p className='fs-5 about-app__desc'>{desc}</p>
    </section>
  )
}

export default AboutApp
