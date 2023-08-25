import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App"
import Popup from "./Popup"

// TODO: change to createHashRouter after merging
// Zupass PR and deploying new version.
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/popup",
        element: <Popup />
    }
])

const root = createRoot(document.getElementById("app"))

root.render(<RouterProvider router={router} />)
