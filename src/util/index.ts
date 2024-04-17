// 移除对象的空属性
export function removeEmpty(obj:any) {
  Object.keys(obj).forEach((k) => obj[k] == null && delete obj[k]);
}

