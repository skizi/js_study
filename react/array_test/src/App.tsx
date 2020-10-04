import React from 'react';

import Button from "./components/organisms/array-test";

function App() {

  const clickHandler = () => {

    console.log( "click!!" );

  }


  return (
    <div className="App">
      <Button />
    </div>
  );
}

export default App;
