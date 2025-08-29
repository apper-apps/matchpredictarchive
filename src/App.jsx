import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import MatchPredictionPage from "@/components/pages/MatchPredictionPage";

function App() {
  return (
    <div className="min-h-screen bg-background text-white font-sans">
      <Layout>
        <Routes>
          <Route path="/" element={<MatchPredictionPage />} />
        </Routes>
      </Layout>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;