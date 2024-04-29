import { SocketIOContextProvider } from "./contexts/socketIOContext.jsx";
import TestPage from "./pages/TestPage.jsx";


function App() {
  return (
    <SocketIOContextProvider>
      <TestPage />
    </SocketIOContextProvider>
  )
}

export default App;
