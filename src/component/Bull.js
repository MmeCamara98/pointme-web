// src/components/Bull.jsx
import React from "react";

const Bull = ({ src, className = "" }) => {
  return (
    <img
      src={src}
      alt="Bull décoratif"
      className={`absolute pointer-events-none ${className}`}
    />
  );
};

export default Bull;
