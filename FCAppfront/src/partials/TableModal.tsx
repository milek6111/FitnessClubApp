import { Modal, Typography, Box } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  isOpen: boolean;
  header: string;
  children: ReactNode;
  onClose: () => void;
};

export const TableModal = (props: Props) => {
  const { isOpen, header, children, onClose } = props;

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50vh',
    height: '50vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    
  };

  return (
    <Modal 
    onClose={onClose}
    open={isOpen}>
      <Box sx={style}>
        <Typography variant="h6" component="h1" className="modal-header">
          {header}
        </Typography>
          {children}
      </Box>
    </Modal>
  );
};