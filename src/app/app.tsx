import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/shared/lib/theming";
import { Toaster } from "@/shared/lib/toast";

import { ModalsProvider } from "./providers/modal";
import { router } from "./router";
import { store } from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ModalsProvider>
          <RouterProvider router={router} />
          {ReactDOM.createPortal(<Toaster />, document.body)}
        </ModalsProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
