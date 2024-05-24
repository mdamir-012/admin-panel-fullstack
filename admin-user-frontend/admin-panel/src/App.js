import logo from "./logo.svg";
import "./App.css";
import AllRoutes from "./AllRoutes/AllRoutes";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <AllRoutes />
      <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">Admin Panel</h1>

    </div>
  );
}

export default App;
