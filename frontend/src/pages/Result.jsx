import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state || state.probability === undefined || state.probability === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No result found. Please try again.</p>
      </div>
    );
  }

  const { probability } = state;
  let percentage;
  if (probability <= 1) {
    percentage = Math.round(probability * 100);
  } else {
    percentage = Math.round(probability);
  }

  percentage = Math.min(100, Math.max(0, percentage));

  let riskLabel = "";
  let riskColor = "";
  let circleColor = "";

  if (percentage < 40) {
    riskLabel = "Low Risk";
    riskColor = "text-green-600";
    circleColor = "#16a34a";
  } else if (percentage < 70) {
    riskLabel = "Moderate Risk";
    riskColor = "text-yellow-600";
    circleColor = "#ca8a04";
  } else {
    riskLabel = "High Risk";
    riskColor = "text-red-600";
    circleColor = "#dc2626";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-emerald-50 px-4 py-10">
      <div className="bg-white w-full max-w-xl p-10 rounded-3xl shadow-xl border border-gray-100">

      
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-10">
          Diabetes Risk Analysis
        </h1>

        
        <div className="flex justify-center mb-10">
          <div
            className="relative w-48 h-48 rounded-full flex items-center justify-center"
            style={{
              background: `conic-gradient(
                ${circleColor} ${percentage * 3.6}deg,
                #e5e7eb 0deg
              )`,
            }}
          >
            <div className="w-36 h-36 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
              <p className={`text-3xl font-bold ${riskColor}`}>
                {percentage}%
              </p>
              <p className="text-gray-500 text-sm">{riskLabel}</p>
            </div>
          </div>
        </div>

      
        <div className="bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow-inner mb-8">
          <h2 className="text-xl font-semibold text-gray-700 text-center mb-3">
            Prediction Summary
          </h2>

          <p className="text-gray-600 text-center leading-relaxed">
            Based on the machine learning model, your estimated diabetes risk is{" "}
            <span className={`font-semibold ${riskColor}`}>
              {riskLabel.toUpperCase()}
            </span>{" "}
            with a confidence score of{" "}
            <span className="font-semibold text-emerald-600">
              {percentage}%
            </span>.
          </p>
        </div>

       
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700 mb-6">
          ⚠️ <span className="font-semibold">Note:</span> This prediction is generated
          by a machine learning model and is not a medical diagnosis. Please
          consult a healthcare professional for medical advice.
        </div>

     
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/predict")}
            className="px-8 py-3 bg-emerald-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-emerald-700 hover:scale-105 active:scale-95 transition-all"
          >
            Try Again
          </button>
        </div>

      </div>
    </div>
  );
}

export default Result;
