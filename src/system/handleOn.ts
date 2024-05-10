import { ipcMain, shell, BrowserWindow } from 'electron';

export default function sysControl() {
  const ThreadPool = new Set()
  // 打开默认浏览器
  ipcMain.on('openBrowser', (_, value) => {
    const reg = /^https/
    if (reg.test(value)) {
      shell.openExternal(value)
    }
  })
  // 打开子窗口
  ipcMain.on('showChild', () => {
    console.log(ThreadPool);
    const child = new CreateNewWindow()
    child.loadFile('https://www.ruanyifeng.com/blog/2023/08/typescript-tutorial.html')
    child.show()
  })
}

export class CreateNewWindow {
  private child: BrowserWindow;
  private parent: BrowserWindow;
  constructor() {
    this.parent = BrowserWindow.getFocusedWindow();
    this.child = new BrowserWindow({ parent: this.parent })
  }
  show() {
    this.child.show()
  }
  hide() {
    this.child.hide()
  }
  loadFile(url: string) {
    this.child.loadURL(url)
  }
}
