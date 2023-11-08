import { BrowserRouter } from "react-router-dom";

import { useSelector } from "react-redux";
import RouterConfig from "./config/RouterConfig";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const Token = useSelector((state) => state.login.token);
  console.log(Token);
  return (
    <div>
      <BrowserRouter>
        <>
          <RouterConfig Token={Token} />
          <ToastContainer />
        </>
      </BrowserRouter>
    </div>
  );
}

export default App;
