import Versions from './components/Versions'
import { useState } from 'react'

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('song')
  const handleClick = (): void => {
    window.version.ping().then(e => console.log(e))
  }
  const [titlealue, setTitlealue] = useState('')

  const changTitle = (): void => {
    window.version.setTitle(titlealue)
  }
  return (
    <>
      <div className="actions">
        <input type="text" value={titlealue}  onChange={e => setTitlealue(e.target.value)}/>
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
            Send IPC
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={handleClick}>
            test
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={changTitle}>
            设置标题
          </a>
        </div>
      </div>
      <Versions></Versions>
    </>
  )
}

export default App
