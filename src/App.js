import './scss/App.scss';
import {Route, Routes} from "react-router-dom";
import {Layout} from "./Layouts";
import {Main} from "./pages/Main";


function App() {
  return (
    <div className="App">
      <div className="container">
        <Routes>
         <Route path='/' element={<Layout/>}>
          <Route index element={<Main/>}/>
         </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
