import CustomTabComponent from "../components/CustomTab";
import RolePermission from "../components/RolePermission";
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
        hasPermission("manage_role_permission") && {
          label: "Roles & Permissions",
          content: <RolePermission/>,
        } 
      ].filter(Boolean)}
    />
  );
}
