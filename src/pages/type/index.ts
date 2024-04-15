export interface SaveInter{
  type:'OrderList' | 'OrderLog';
  data:any[]
}

export interface ResType {
  code: 200 | 201 | 500 | 203,
  msg: string
}
