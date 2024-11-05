import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 1 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CustomTabs = styled(Tabs)(({ theme }) => ({
  bgcolor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  "& .MuiTabs-indicator": {
    display: "none",
  },
}));

const CustomTab = styled(Tab)(({ theme }) => ({
  margin: "4px",
  textTransform: "none",
  fontWeight: "bold",
  borderRadius: "3px",
  width: "47.5%",
  "&:hover": {
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 20px rgba(255, 255, 255, 0.5)",
  },
  "&.Mui-selected": {
    background: "#FFFFFF",
    color: "black",
    boxShadow: "0 4px 20px rgba(255, 255, 255, 0.5)",
  },
}));

const CustomTabComponent = ({ tabs }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ backgroundColor: "#b0b0b2a5", borderRadius: "6px" }}>
        <CustomTabs centered value={value} onChange={handleChange}>
          {tabs.map((tab, index) => (
            <CustomTab label={tab.label} {...a11yProps(index)} key={index} />
          ))}
        </CustomTabs>
      </Box>
      {tabs.map((tab, index) => (
        <CustomTabPanel value={value} index={index} key={index}>
          {tab.content}
        </CustomTabPanel>
      ))}
    </Box>
  );
};

CustomTabComponent.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
};

export default CustomTabComponent;
