import React from 'react';

import Toolbar from './components/Toolbar';
import Footer from './components/Footer';
import Content from './components/Content';

function App() {
  return (
    <div className="App">
      <div>
      <Toolbar>
        <main style = {{height:'100%'}}>
        <p> this is page content!</p>
        </main>
      </Toolbar>
    </div>
    <div>
        <Content>
       <p>jbskdbcsk</p>   
        </Content>
    </div>
    <div>
      <Footer> 
      <p>something goes herer</p>
    </Footer>
    </div> 
    </div> 
  );
};

export default App;
