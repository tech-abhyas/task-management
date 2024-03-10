import Header from './components/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import AllRoute from './AllRoute';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
    <div className="container main-container py-4 vh-100">
      <Router>
        <Header />
        <section className="mt-4 py-3">
          <div className="row ">
            <div className="all-component d-flex justify-content-center">
              <AllRoute />
            </div>
          </div>
        </section>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
