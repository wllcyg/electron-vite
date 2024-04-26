import { ipcMain,shell } from 'electron';

export default function sysControl (){
  // 打开默认浏览器
  ipcMain.on('openBrowser',(_,value) =>{
    const reg = /^https/
    if(reg.test(value)){
      shell.openExternal(value)
    }
  })
}
