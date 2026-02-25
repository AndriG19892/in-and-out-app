import './App.css'
import {Routes, Route, Navigate} from "react-router-dom";
import LoginPage from './pages/Login.page.jsx';
import DashboardPage from './pages/Dashboard.page.jsx';
import TransacationPage from './pages/Transaction.page.jsx'
import TransactionPage from "./pages/Transaction.page.jsx";

function App() {
    return (
        <div style={ {backgroundColor: '#1a3c4a', minHeight: '100vh'} }>
            <Routes>
                <Route path="/login" element={ <LoginPage/> }/>
                <Route path="/dashboard" element={ <DashboardPage/> }/>
                <Route path="/transaction/:type" element={ <TransactionPage/> }/>
                <Route path="*" element={ <Navigate to="/login"/> }/>
            </Routes>
        </div>
    )
}

export default App
