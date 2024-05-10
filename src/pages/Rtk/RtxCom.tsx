import { Button, Input } from 'antd';
import { useAppSelector,useAppDispatch } from '@/render/hooks/redux-type'
import { selectCount, increment,incrementByAmount,decrement } from '@/render/store/counter/Slice';
import { useEffect, useRef, useState } from 'react';
const Rtk = () => {
  const count = useAppSelector(selectCount)
  const dispatch = useAppDispatch()
  const [innerValue, setInnerValue] = useState<number | string>();

  return (
    <div>
      <h1>{count}</h1>
      <Button onClick={() => dispatch(increment())}>+1</Button>
      <Button onClick={() => dispatch(decrement())}>-1</Button>
      <Input value={innerValue} onChange={e => setInnerValue(e.target.value)}/>
      <Button onClick={() => dispatch(incrementByAmount(innerValue))}>更新数据</Button>
    </div>
  );
};

export default Rtk;
