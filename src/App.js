import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import "./index.css";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { Dashboard } from "./pages/Dashboard";
import { useAuth } from "./firebase-config";

function App() {
  // const auth = getAuth();
  const users = useAuth();
  // const user = auth.currentUser;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "*",
      element: <Home />,
    },
    {
      path: "/category/:categoryID",
      element: <Home />,
    },
    {
      path: "/admin/dashboard",
      element: <Dashboard />,
      loader: () => {
        if (users) {
          return null;
        } else {
          return redirect("/admin/signin");
        }
      },
    },
    {
      path: "/admin/dashboard/:categoryID",
      element: <Dashboard />,
      loader: () => {
        if (users) {
          return null;
        } else {
          return redirect("/admin/signin");
        }
      },
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/admin/signin",
      element: <SignIn />,
      loader: () => {
        if (!users) {
          return null;
        } else {
          return redirect("/admin/dashboard");
        }
      },
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
