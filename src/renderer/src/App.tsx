import Versions from './components/Versions'
import { useState } from 'react'

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('song')
  const handleClick = (): void => {
    // @ts-ignore
    window.version.ping().then(e => console.log(e))
  }
  const [titlealue, setTitlealue] = useState('')

  const changTitle = (): void => {
    window.version.setTitle(titlealue)
  }
  const [filePath, setFilePath] = useState('')
  const openFile = async () => {
    console.log(window.version.openFile())
    let res = await window.version.openFile()
    // @ts-ignore
    if (res){
      setFilePath(res)
    }
  }
  const [count, setCount] = useState(0)
  // @ts-ignore
  window.electronAPI.onUpdateCounter(value => {
    setCount(value+count)
  })
  const testBlueTooth = async () => {
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true
    })
    console.log(device,'testBlueTooth')

  }
  window.electronAPI.bluetoothPairingRequest((event, details) => {
    const response = {}

    switch (details.pairingKind) {
      case 'confirm': {
        response.confirmed = window.confirm(`Do you want to connect to device ${details.deviceId}?`)
        break
      }
      case 'confirmPin': {
        response.confirmed = window.confirm(`Does the pin ${details.pin} match the pin displayed on device ${details.deviceId}?`)
        break
      }
      case 'providePin': {
        const pin = window.prompt(`Please provide a pin for ${details.deviceId}.`)
        if (pin) {
          response.pin = pin
          response.confirmed = true
        } else {
          response.confirmed = false
        }
      }
    }

    window.electronAPI.bluetoothPairingResponse(response)
  })
  return (
    <>
      <div className="actions">
        <input type="text" value={titlealue} onChange={e => setTitlealue(e.target.value)} />
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
      <p>文件地址 {filePath}</p>
      <div className="action">
        <a target="_blank" rel="noreferrer" onClick={openFile}>
          打开文件
        </a>
      </div>
      <p> 当前的数量 {count} </p>
      <div className="action">
        <a target="_blank" rel="noreferrer" onClick={testBlueTooth}>
          蓝牙测试
        </a>
      </div>
      <Versions></Versions>
    </>
  )
}

export default App
