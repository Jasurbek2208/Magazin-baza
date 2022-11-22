import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Style
import { GlobalStyle } from "./assets/style/global";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';

// Components
import AuthRedux from "./redux/AuthRedux";
import Router from "./router/Router";

function App() {
  return (
    <BrowserRouter>
      <AuthRedux>
        <ToastContainer />
        <Router />
      </AuthRedux>
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
