import {BrowserRouter as  Router, Route, Routes} from "react-router-dom";
import Join from "./component/join/Join"
import Chat from "./component/chat/Chat"

import './App.css';
import './component/join/join.css'
import './component/chat/chat.css';
import './component/message/message.css';

function App() {
 
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route exact path="/" element={<Join/>}/>

        <Route path="/Chat" element={<Chat/>}/>
        </Routes>
      </Router>
    </div>
  ); 
}

export default App;
