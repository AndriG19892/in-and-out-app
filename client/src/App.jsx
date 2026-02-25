import './App.css'
import {Routes, Route, Navigate} from "react-router-dom";
import {UserProvider} from "./Context/UserContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import LoginPage from './pages/Login.page.jsx';
import DashboardPage from './pages/Dashboard.page.jsx';
import TransacationPage from './pages/Transaction.page.jsx'
import TransactionsList from './pages/Transactions.page.jsx'
import ProfilePage from './pages/Profile.page.jsx'
import RegisterPage from './pages/Register.page.jsx'
import MainLayout from './layouts/MainLayout';

function App() {
    return (
        <div style={ {backgroundColor: '#1a3c4a', minHeight: '100vh'} }>
            <UserProvider>
                <Routes>
                    <Route path="/login" element={ <LoginPage/> }/>
                    <Route path="/register" element={ <RegisterPage/> }/>
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <MainLayout>
                                <DashboardPage/>
                            </MainLayout>
                        </ProtectedRoute>
                    }/>
                    <Route path="/transaction/:type" element={ <ProtectedRoute> <TransacationPage/> </ProtectedRoute> }/>
                    <Route path="/transactions" element={
                        <ProtectedRoute>
                            <TransactionsList />
                        </ProtectedRoute>
                    } />
                    <Route path="/stats" element={ <MainLayout>
                        <div>Pagina Stats (Coming Soon)</div>
                    </MainLayout> }/>
                    <Route path="/profile" element={
                        <ProtectedRoute>
                            <MainLayout>
                                <ProfilePage/>
                            </MainLayout>
                        </ProtectedRoute>

                    }/>
                    <Route path="*" element={ <Navigate to="/login"/> }/>
                </Routes>
            </UserProvider>
        </div>
    )
}

export default App
