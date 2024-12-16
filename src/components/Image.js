import React, { useState } from "react";

/**
 * Reusable Image Component with default fallback, lazy loading, and customizable styles.
 * @param {string} src - The main image URL.
 * @param {string} defaultSrc - Fallback image URL if `src` fails to load.
 * @param {string} alt - Alternative text for the image.
 * @param {string} className - Tailwind CSS or other styles for the image.
 * @param {boolean} lazy - Enable lazy loading for the image (default: true).
 */
const Image = ({
  src,
  defaultSrc = "https://static.thenounproject.com/png/4595376-200.png",
  alt = "Image",
  className = "",
  lazy = true,
  style = {}
}) => {
  const [imgSrc, setImgSrc] = useState(src || defaultSrc);

  const handleError = () => {
    setImgSrc(defaultSrc); // Replace with fallback image on error.
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      style = {style}
      loading={lazy ? "lazy" : "eager"} // Enables lazy loading for better performance.
    />
  );
};

export default Image;
