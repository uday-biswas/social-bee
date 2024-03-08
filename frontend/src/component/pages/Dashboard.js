//show the Sidebar component and the outlet component(child components of the dashboard route)

import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function Dashboard() {
  const { loading: profileLoading } = useSelector((store) => store.profile);
  const { loading: authLoading } = useSelector((store) => store.auth);

  if (profileLoading || authLoading) {
    return (
      <div className="grid place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)]">
          <Outlet />
    </div>
  );
}

export default Dashboard;
