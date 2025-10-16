import { Outlet } from "react-router-dom";
import AdminSideBar from "./sidebar";
import AdminHeader from "./header";
import { useState } from "react";

function AdminLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen w-full max-w-screen-2xl mx-auto">
      {/* admin sidebar */}
      <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} />
      <div className="flex flex-col w-full min-w-0">
        {/* admin header */}
        <AdminHeader setOpen={setOpenSidebar} />
        <main className="flex flex-col bg-muted/40 p-4 md:p-6 w-full min-w-0">
          <div className="w-full max-w-full overflow-x-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
