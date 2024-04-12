import { ipcMain } from 'electron'
import dbConfig from '../server';
export default function controller (){
  ipcMain.handle('save-value', (_, value)  =>{
    console.log('this value is transe!!');
    return dbConfig.save(value);
  })
}