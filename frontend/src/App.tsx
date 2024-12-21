import { Provider } from "react-redux";
import Routing from "./components/routing/Routing"
import { UserContext } from "./core/UserContext"
import { useState } from "react"
import store from "./core/Store";

function App() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const value = { name, setName, password, setPassword }

  return (
    <>
      <UserContext.Provider value={value}>        
      <Provider store={store}>
        <Routing />
      </Provider>
      </UserContext.Provider>
    </>
  )
}

export default App