import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import AppSidebar from "./AppSidebar";
// import { useContext } from "react";
// import { GlobalContext } from "../context/GlobalContext";

const Layout=({ children }: { children: React.ReactNode })=> {
//   const { state } = useContext(GlobalContext);

  return (
    <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <main>{children}</main>
    </SidebarProvider>
  );
}

export default Layout ;