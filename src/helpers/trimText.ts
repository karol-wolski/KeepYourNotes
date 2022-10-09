const trimText = (text: string, maxLength: number, separator: string) => {
  return text.length <= maxLength ? text : `${text.substring(0, text.lastIndexOf(separator, maxLength))}...`
}

export default trimText
