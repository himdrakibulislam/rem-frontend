import CustomTabComponent from "../components/CustomTab";
import UserTable from "../components/UserTable";
import { useAuth } from "../context/AuthContext";

export default function UsersPermission() {
  const { hasPermission } = useAuth();
  return (
    <CustomTabComponent
      tabs={[
        hasPermission("users_list") && {
          label: "Users",
          content: <UserTable />,
        } ,
        { label: "Roles & Permissions", content: "Roles And Permissions" },
      ].filter(Boolean)}
    />
  );
}
