import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>
        <h2 className="mb-8 text-2xl font-semibold text-gray-600">Sayfa Bulunamadı</h2>
        <p className="mb-8 text-gray-500">Aradığınız sayfa mevcut değil veya taşınmış olabilir.</p>
        <button
          onClick={() => navigate('/')}
          className="rounded-lg bg-blue-500 px-6 py-2 font-semibold text-white transition duration-300 hover:bg-blue-600"
        >
          Ana Sayfaya Dön
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
