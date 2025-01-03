import { useEffect, useState } from 'react'
import './App.css'
import { translate } from './function/translate'
import FolderSelector from './component/FolderSelector'
import FileReaderExample from './component/FileReaderExample'

function App() {

  return (
    <>
      <FolderSelector />
      <FileReaderExample />
    </>
  )
}

export default App
