import React from "react";
import { Modal, Box } from "@mui/material";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #DCDCDC',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
  };
const CustomModal = ({ open, handleClose, children}) => {
  return (
    <Modal
    keepMounted
    open={open}
    onClose={handleClose}
    aria-labelledby="keep-mounted-modal-title"
    aria-describedby="keep-mounted-modal-description"
  >
    <Box sx={style}>
      {children}
    </Box>
  </Modal>
  );
};

export default CustomModal;
