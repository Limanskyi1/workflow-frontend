import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ThemeProvider } from "@/features/theming";
import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "@/shared/ui/toast/toaster";
import ReactDOM from "react-dom";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        {ReactDOM.createPortal(<Toaster />, document.body)}
      </ThemeProvider>
    </Provider>
  );
};

export default App;
