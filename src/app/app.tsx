import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/shared/lib/theming";
import { Toaster } from "@/shared/lib/toast";

import "./lib/quill/change-quill-icons";
import { ModalsProvider } from "./providers/modal";
import { router } from "./router";
import { store } from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ModalsProvider>
          <DndProvider backend={HTML5Backend}>
            <RouterProvider router={router} />
            {ReactDOM.createPortal(<Toaster />, document.body)}
          </DndProvider>
        </ModalsProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
