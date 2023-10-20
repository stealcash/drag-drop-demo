import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Header from './component/Header';
import NotFound from './component/NotFound';
import { BASE_PATH } from './app/constants';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <main>
            <Header />
            <Router>
                <div className="App">
                    <Routes>
                        <Route path={`${BASE_PATH}`} element={< Home />} />
                        <Route exact path={`${BASE_PATH}about`} element={< About />}></Route>
                        <Route path="/" element={<Navigate to={`${BASE_PATH}`} />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </Router>
        </main>

    );
}

export default App;