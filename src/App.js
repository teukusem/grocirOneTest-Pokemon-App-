import "./App.css";
import Home from "./Page/Home";
import Detail from "./Page/Detail";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Mypokemon from "./Page/Mypokemon";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/mypokemon" element={<Mypokemon />} />
        </Routes>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
