import { toast } from "react-toastify";

/**
 * Utility function to handle and display validation errors.
 * @param {Object} error - The error object from the API response.
 */
export const handleValidationErrors = (error) => {
  if (error.response?.data) {
    const validationErrors = error.response.data;

    // Display each validation error
    Object.values(validationErrors).forEach((errorMessages) => {
      errorMessages.forEach((message) => {
        toast.error(message);
      });
    });
  } else {
    // Fallback for unexpected error format
    toast.error("An unexpected error occurred");
  }
};
