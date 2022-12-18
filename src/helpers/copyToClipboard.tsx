export const copyToClipboard = (text: string, cb: () => void) =>
  navigator.clipboard
    .writeText(text.replace(/(<([^>]+)>)/gi, ''))
    .then(() => cb())
    .catch(err => console.error(err))
