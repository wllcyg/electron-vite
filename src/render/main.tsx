import React from 'react';

const App = () => {
  const handleClick = () => {
    console.log('click',window);
  };
  return (
    <div>
      this is render
      <button onClick={() => handleClick()}>点击操作</button>
    </div>
  );
};

export default App;
