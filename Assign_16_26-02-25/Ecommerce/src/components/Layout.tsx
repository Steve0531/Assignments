import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { state } = useContext(GlobalContext);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {state.user && (
            <AppSidebar />
        )}

        <div className="flex-1 flex flex-col p-4 font-bold">
          {state.user && <SidebarTrigger />}
          <main className="flex-1 w-full">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
