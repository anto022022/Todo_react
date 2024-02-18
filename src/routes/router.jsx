import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import App from "../App.jsx";

const ToDoList = lazy(() => import("../pages/todo_list.jsx"));
const Settings = lazy(() => import("../pages/settings.jsx"));

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route
            path=""
            element={
              <Suspense fallback="Loading...">
                <ToDoList />
              </Suspense>
            }
          />
          <Route
            path="settings"
            element={
              <Suspense fallback="Loading...">
                <Settings />
              </Suspense>
            }
          />
        </Route>
        <Route path="*" component={<>404 Not Found!</>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
