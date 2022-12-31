import React, { SetStateAction } from 'react'
import { Editor, EditorState } from 'react-draft-wysiwyg'

interface IEditorWysiwyg {
  editorState: EditorState
  updateTextDescription: React.Dispatch<SetStateAction<EditorState>>
}

const EditorWysiwyg = ({ editorState, updateTextDescription }: IEditorWysiwyg) => {
  return (
    <Editor
      editorState={editorState}
      editorClassName='wysywig-editor'
      onEditorStateChange={updateTextDescription}
      toolbar={{
        options: ['inline', 'list'],
        inline: {
          options: ['bold', 'italic', 'underline'],
        },
        list: { options: ['unordered', 'ordered'] },
      }}
    />
  )
}

export default EditorWysiwyg
