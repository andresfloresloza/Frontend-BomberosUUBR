import React from "react";
import { FaSpinner } from "react-icons/fa";
import "../styles/components/loadingView.css"
const LoadingView = () => {
  return (
    <div className="loading-view">
      <FaSpinner className="loading-icon" />
      <p className="loading">Cargando</p>
    </div>
  );
};

export default LoadingView;