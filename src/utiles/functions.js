export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp); // Parse the timestamp
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

export const formatCurrency = (currency, amount) => {
  return `${currency} ${amount}`;
};
