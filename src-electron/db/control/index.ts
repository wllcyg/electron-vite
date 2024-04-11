import { ipcMain } from 'electron'
import dbConfig from 'app/src-electron/db/serve_option';
export default function controller (){
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ipcMain.handle('save-value', (_, value)  =>{
    console.log('this value is transe!!');
    return dbConfig.save(value);
  })
}
