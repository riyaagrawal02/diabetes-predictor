import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FIELDS = [
  {
    name: "age",
    label: "Age",
    placeholder: "Enter age in years",
    helper: "Example: 35",
  },
  {
    name: "sex",
    label: "Sex (0 = Female, 1 = Male)",
    placeholder: "0 or 1",
    helper: "0 = Female, 1 = Male",
  },
  {
    name: "bmi",
    label: "BMI (Body Mass Index)",
    placeholder: "e.g. 25.3",
    helper: "BMI = weight/height²",
  },
  {
    name: "bp",
    label: "Blood Pressure (BP)",
    placeholder: "Enter BP",
    helper: "Normal systolic: 120, diastolic: 80",
  },
  {
    name: "s1",
    label: "S1 – Total Cholesterol",
    placeholder: "Enter Total Cholesterol",
    helper: "Higher values mean high cholesterol",
  },
  {
    name: "s2",
    label: "S2 – LDL Cholesterol",
    placeholder: "Enter LDL value",
    helper: "High LDL increases risk",
  },
  {
    name: "s3",
    label: "S3 – HDL Cholesterol",
    placeholder: "Enter HDL value",
    helper: "Good cholesterol",
  },
  {
    name: "s4",
    label: "S4 – Cholesterol Ratio",
    placeholder: "TC / HDL ratio",
    helper: "Higher ratio = higher risk",
  },
  {
    name: "s5",
    label: "S5 – Triglycerides (log)",
    placeholder: "Enter triglycerides",
    helper: "Higher values = higher risk",
  },
  {
    name: "s6",
    label: "S6 – Glucose Level",
    placeholder: "Enter glucose level",
    helper: "Fasting glucose normal: <100",
  },
];

function Predictpage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    bmi: "",
    bp: "",
    s1: "",
    s2: "",
    s3: "",
    s4: "",
    s5: "",
    s6: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, []);

 
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    FIELDS.forEach((field) => {
      const value = formData[field.name];

      if (!value && value !== 0) {
        newErrors[field.name] = "This field is required";
      } else if (isNaN(Number(value))) {
        newErrors[field.name] = "Enter a valid number";
      }
    });

    return newErrors;
  };

  const normalize = (v) => Number(v) / 21;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const normalizedPayload = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [
          key,
          normalize(value),
        ])
      );

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/diabetes/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(normalizedPayload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Prediction failed");
        return;
      }

      navigate("/result", { state: data });
    } catch (error) {
      console.log(error.message);
      alert("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-emerald-50 px-4 py-10">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-3xl p-10 border border-gray-100">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
          Diabetes Risk Predictor
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FIELDS.map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="font-medium text-gray-700 mb-1">
                {field.label}
              </label>

              <input
                type="number"
                step="any"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className={`p-3 border rounded-xl focus:ring-2 ${
                  errors[field.name]
                    ? "border-red-400 bg-red-50 focus:ring-red-300"
                    : "border-gray-300 focus:ring-emerald-400"
                }`}
              />

              <p className="text-xs text-gray-400">{field.helper}</p>

              {errors[field.name] && (
                <p className="text-xs text-red-500 mt-1">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}

          <div className="col-span-full flex justify-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`px-10 py-3 bg-emerald-600 text-white text-lg font-semibold rounded-full shadow-lg transition-all ${
                loading
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:bg-emerald-700 hover:scale-105 active:scale-95"
              }`}
            >
              {loading ? "Predicting..." : "Predict Diabetes Risk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Predictpage;
