import { BrowserRouter } from "react-router-dom";

import { useSelector } from "react-redux";
import RouterConfig from "./config/RouterConfig";

function App() {
  const Token = useSelector((state) => state.login.token);

  return (
    <div>
      <BrowserRouter>
        <>
          <RouterConfig Token={Token}/>
        </>
      </BrowserRouter>
    </div>
  );
}

export default App;
