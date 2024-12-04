import { Typography } from "@mui/material";
import { useMyProperties } from "../hooks/react-query/auth";
import CustomTabComponent from "./CustomTab";
import { flatPaymentStyles, paymentColumns, renderPaymentActions } from "./PaymentList";
import { useSettings } from "../hooks/react-query/role-permission";
import DataTable from "./TableData";
import ProgressBar from "./ProgressBar";

function MyProperties() {
  const { data, isLoading } = useMyProperties();
  const {data : settings} = useSettings();
  const columns = paymentColumns(settings)
  if(isLoading){
    return <ProgressBar/>
  }
  return (
    <CustomTabComponent
      tabs={[
        {
          label: "Projects",
          content: <Typography variant="h4">{data.property.name}</Typography>,
        },
        {
          label: "Flat",
          content: <Typography variant="h4">{data.flat.name}</Typography>,
        },
        {
          label: "Payments",
          content: <DataTable
          title="Payments"
          columns={columns}
          data={data.payments}
          actions={renderPaymentActions}
          currency={settings.currency}
          getStatusStyles={flatPaymentStyles}
        />,
        },
      ]}
    />
  );
}

export default MyProperties;
