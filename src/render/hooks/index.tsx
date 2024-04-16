import { useEffect, useState } from 'react';

interface Item {
  [key: string]: any;
}

const Category: Item = {
  '0': '沙发',
  '1': '床垫',
  '2': '床架',
  '3': '床头柜',
  '4': '餐桌',
  '5': '茶几',
  '6': '电视柜'
};

export function useSelect() {
  const optionsList = [];
  for (const categoryKey in Category) {
    optionsList.push({
      key: categoryKey,
      value: Category[categoryKey]
    });
  }
  return [optionsList];
}

export function useHeight(sub = 0) {
  const [innerHeight, setInnerHeight] = useState(0);
  useEffect(() => {
    const height = window.innerHeight - sub;
    setInnerHeight(height);
    window.addEventListener('resize', () => {
      setInnerHeight( window.innerHeight - sub);
    });
    return () => {
      window.removeEventListener('resize', () => {
        console.log('清除副作用');
      });
    };
  });
  return [innerHeight];
}
