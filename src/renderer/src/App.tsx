import Versions from './components/Versions'

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('song')
  const handleClick = (): void => {
    window.version.ping().then(e => console.log(e))
  }
  return (
    <>
      <div className="actions">
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
      </div>
      <Versions></Versions>
    </>
  )
}

export default App
