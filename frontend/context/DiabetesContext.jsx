import { createContext, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const DiabetesContext = createContext();

export const DiabetesProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [predictions, setPredictions] = useState([]);

  const addPrediction = async (data) => {
    if (!user) return;

    try {
      const res = await axios.post(
        "https://diabetes-predictor-2-llkg.onrender.com/api/diabetes/predict",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setPredictions((prev) => [...prev, res.data]);

    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <DiabetesContext.Provider value={{ predictions, addPrediction }}>
      {children}
    </DiabetesContext.Provider>
  );
};