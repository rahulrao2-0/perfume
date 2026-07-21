import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Product from './Pages/Product';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* /Products → home with featured section anchor */}
        <Route path="/Products" element={<Home />} />
        {/* /product/:id → detailed product page */}
        <Route path="/product/:id" element={<Product />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;