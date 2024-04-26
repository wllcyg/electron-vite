import { ipcMain } from 'electron'
import dbConfig from '../server';
export default function controller (){
  ipcMain.handle('saveValue', (_, value) => {
    console.log('this is saveValue');
    return dbConfig.save(value)
  })
  ipcMain.handle('updateValue', (_, value) => {
    console.log('updateValue this is update');
    return dbConfig.updateValue(value)
  })
  ipcMain.handle('findValue', (_, value) => {
    return dbConfig.findValue(value)
  })
  ipcMain.handle('findOne', (_, value) => {
    return dbConfig.findOne(value)
  })
  ipcMain.handle('deleteItem', (_, value) => {
    return dbConfig.deleteItem(value)
  })

}
