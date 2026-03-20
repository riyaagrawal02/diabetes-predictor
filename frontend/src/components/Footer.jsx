import React from 'react'

function Footer() {
  return (
    <footer className="mt-auto bg-gray-100 text-center py-4 text-gray-600 mb-0">
      © {new Date().getFullYear()} Diabetes Predictor
    </footer>
  )
}

export default Footer;
