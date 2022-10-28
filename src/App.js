import { BrowserRouter } from "react-router-dom";

// Style
import { GlobalStyle } from "./assets/style/global";

// Components
import AuthRedux from "./redux/AuthRedux";
import Router from "./router/Router";

function App() {
  return (
    <BrowserRouter>
      <AuthRedux>
        <Router />
      </AuthRedux>
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
