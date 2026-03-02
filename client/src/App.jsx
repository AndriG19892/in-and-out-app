import './App.css'
import React, { useState, useEffect } from "react"; // Aggiunto useState e useEffect
import {Routes, Route, Navigate} from "react-router-dom";
import {UserProvider} from "./Context/UserContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import LoginPage from './pages/Login.page.jsx';
import DashboardPage from './pages/Dashboard.page.jsx';
import TransacationPage from './pages/Transaction.page.jsx'
import TransactionsList from './pages/Transactions.page.jsx'
import ProfilePage from './pages/Profile.page.jsx'
import RegisterPage from './pages/Register.page.jsx'
import MainLayout from './Layouts/MainLayout';

function App() {

    // Usiamo 'pwa-update-available' (assicurati che sia identico ovunque)
    window.addEventListener('pwa-update-available', handleUpdate);
    
    return () => window.removeEventListener('pwa-update-available', handleUpdate);
}, []);

    const applyUpdate = () => {
        // Ricarica la pagina forzando il browser a leggere i nuovi file
        window.location.reload();
    };

    return (
        <div style={ {backgroundColor: '#1a3c4a', minHeight: '100vh'} }>
                  <div style={ {backgroundColor: '#1a3c4a', minHeight: '100vh', position: 'relative'} }>          {/* Il componente di feedback per l'aggiornamento è globale */}
                <StatusFeedback 
                    {...updateStatus}
                    onConfirm={applyUpdate}
                    onClose={() => setUpdateStatus({ loading: false, msg: "", type: "" })}
                />
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
        </div>
    )
}

export default App;
