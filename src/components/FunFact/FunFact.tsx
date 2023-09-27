import React from 'react'

interface Props {
  content: string | React.ReactElement
}
const FunFact = ({ content }: Props) => {
  return <section className='fun-fact'>{content}</section>
}

export default FunFact
