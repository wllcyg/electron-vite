import { app, shell, BrowserWindow, ipcMain ,Menu} from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { eventMap } from '../evet'
let bluetoothPinCallback
let selectBluetoothCallback
function createWindow(): void {
  const mainWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: 'rgba(0,0,0,0)',
      height: 35,
      symbolColor: 'white'
    },
    width: 900,
    height: 670,
    show: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    },
  })
  // 蓝牙
  mainWindow.webContents.on('select-bluetooth-device', (event, deviceList, callback) => {
    event.preventDefault()
    console.log('Device list:', deviceList);
    let result = deviceList[0];
    if (result) {
      callback(result.deviceId)
    } else {
      callback('');
      // The device wasn't found so we need to either wait longer (eg until the
      // device is turned on) or until the user cancels the request
    }
  })
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
  ipcMain.on('cancel-bluetooth-request', (event) => {
    selectBluetoothCallback('')
  })
  ipcMain.on('bluetooth-pairing-response', (event, response) => {
    bluetoothPinCallback(response)
  })
  mainWindow.webContents.session.setBluetoothPairingHandler((details, callback) => {
    bluetoothPinCallback = callback
    // Send a message to the renderer to prompt the user to confirm the pairing.
    mainWindow.webContents.send('bluetooth-pairing-request', details)
  })
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
  // 添加计算按钮
   const menu = Menu.buildFromTemplate([
    {
      label: '菜单',
      submenu: [
        {
          click: () => mainWindow.webContents.send('update-counter', 1),
          label: '添加'
        },
        {
          click: () => mainWindow.webContents.send('update-counter', -1),
          label: '减少'
        }
      ]
    },
     {
       label: '菜单2',
       submenu: [
         {
           click: () => mainWindow.webContents.send('update-counter', 1),
           label: '添加'
         },
         {
           click: () => mainWindow.webContents.send('update-counter', -1),
           label: '减少'
         }
       ]
     }
  ])
  Menu.setApplicationMenu(null)
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}
app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  // IPC test
  ipcMain.on('printer', () => console.log('pong'))
  ipcMain.on('song', () => console.log('song')) // 定义响应事件
  ipcMain.handle('ping', () => 'pong')
  ipcMain.on('set-title', eventMap.handleSetTitle)
  // 打开文件上传
  ipcMain.handle('dialog-open', eventMap.handleFileOpen)
  createWindow()
  /**
   * 获取版本
   * */
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
