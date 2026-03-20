import axios from "axios";
import Diabetes from "../models/diabetes.js";

export const predictDiabetes = async (req, res) => {
  try {
    // ✅ Auth check
    if (!req.user?.id) {
      return res.status(401).json({
        error: "Missing user id in token. Please sign in again."
      });
    }
    console.log("REQ BODY:", req.body);

    const data = req.body;

    const featureNames = [
      "age", "sex", "bmi", "bp",
      "s1", "s2", "s3", "s4", "s5", "s6"
    ];

    if (!data || typeof data !== "object" || Object.keys(data).length === 0) {
      return res.status(400).json({
        error: "Invalid or missing JSON body"
      });
    }

    const missing = featureNames.filter(
      (name) => data[name] === undefined || data[name] === null
    );

    if (missing.length > 0) {
      return res.status(400).json({
        error: `Missing fields: ${missing.join(", ")}`
      });
    }

    const nonNumeric = featureNames.filter(
      (name) => Number.isNaN(Number(data[name]))
    );

    if (nonNumeric.length > 0) {
      return res.status(400).json({
        error: `Non-numeric fields: ${nonNumeric.join(", ")}`
      });
    }

    
    const response = await axios.post(
      process.env.ML_API_URL +"/predict",
      data,
      {
        headers: {
          "Content-Type": "application/json"
        },
        timeout: 10000
      }
    );

    const parsed = response.data;

    if (
      parsed === null ||
      parsed === undefined ||
      parsed.prediction === undefined ||
      parsed.probability === undefined
    ) {
      return res.status(500).json({
        error: "Invalid response from ML service"
      });
    }

    const record = new Diabetes({
      ...data,
      prediction: parsed.prediction,
      probability: parsed.probability,
      user: req.user.id
    });

    await record.save();

    return res.json(parsed);

  } catch (err) {
    console.error("🔥 Prediction error:", err.response?.data || err.message);

    return res.status(err.response?.status || 500).json({
      error: err.response?.data?.error || "Prediction failed"
    });
  }
};


export const getUserRecords = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        error: "Missing user id in token. Please sign in again."
      });
    }

    const records = await Diabetes.find({ user: req.user.id });

    res.json(records);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRecordById = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        error: "Missing user id in token. Please sign in again."
      });
    }

    const record = await Diabetes.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json(record);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};