import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import '../../ckEditor.css'

interface IEditorWysiwyg {
  content: string
  updateTextDescription: (data: string) => void
}

const EditorWysiwyg = ({ content, updateTextDescription }: IEditorWysiwyg) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={content}
      onChange={(event, editor) => {
        const data = editor.getData()
        updateTextDescription(data)
      }}
      config={{
        heading: {
          options: [
            { model: 'paragraph', title: 'Paragraph', class: '.my-class' },
            {
              model: 'heading1',
              view: {
                name: 'h1',
                classes: ['h1'],
              },
              title: 'H1',
              class: 'h1',
            },
            {
              model: 'heading2',
              view: {
                name: 'h2',
                classes: ['h2'],
              },
              title: 'H2',
              class: 'h2',
            },
            {
              model: 'heading3',
              view: {
                name: 'h3',
                classes: ['h3'],
              },
              title: 'H3',
              class: 'h3',
            },
            {
              model: 'heading4',
              view: {
                name: 'h4',
                classes: ['h4'],
              },
              title: 'H4',
              class: 'ck-heading_heading4',
            },
            {
              model: 'heading5',
              view: {
                name: 'h5',
                classes: ['h5'],
              },
              title: 'H5',
              class: 'ck-heading_heading5',
            },
            {
              model: 'heading6',
              view: {
                name: 'h6',
                classes: ['h6'],
              },
              title: 'H6',
              class: 'ck-heading_heading6',
            },
          ],
        },
        toolbar: {
          items: [
            'heading',
            '|',
            'bold',
            'italic',
            '|',
            'bulletedList',
            'numberedList',
            '|',
            'insertTable',
            '|',
            'undo',
            'redo',
          ],
        },
      }}
    />
  )
}

export default EditorWysiwyg
