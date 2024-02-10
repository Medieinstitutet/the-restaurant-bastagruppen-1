import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import background from "./assets/heroimg.jpg";
import "./scss/App.scss";
function App() {
  return (
    <>
      <div className="bg" style={{ backgroundImage: `url(${background})` }}>
        <RouterProvider router={router}></RouterProvider>
      </div>
    </>
  );
}

export default App;
