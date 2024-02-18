import { Outlet } from "react-router-dom";
import "./assets/styles/layout.scss";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

function App() {
  return (
    <div className="wrapper">
      <section className="outlet-wrapper">
        <section className="header">
          <PlaylistAddCheckIcon className="icon" /> <h2>To-Do list</h2>
        </section>
        <section className="outlet">
          <Outlet />
        </section>
      </section>
    </div>
  );
}

export default App;
