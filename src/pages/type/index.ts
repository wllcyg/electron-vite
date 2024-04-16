export interface SaveInter{
  type:'OrderList' | 'OrderLog';
  data:any[]
}

export interface ResType {
  code: 200 | 201 | 500 | 203,
  msg: string,
  data?:any[]
}
export interface DataType {
  id: number;
  ordername: string;
  specification: string;
  category: string;
  price: number;
  count: number;
  createdAt: string;
}