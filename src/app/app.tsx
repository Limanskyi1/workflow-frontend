import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/features/theming";
import { Toaster } from "@/features/toast";

import { router } from "./router";
import { store } from "./store";

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
