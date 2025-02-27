import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "../components/ui/sidebar"
  import { Link } from "react-router-dom"
  import { GlobalContext } from "../context/GlobalContext"
  import { useContext } from "react";
  import { useNavigate } from "react-router-dom";
import { User2, Home, Inbox } from "lucide-react";
import { Button } from "./ui/button";
  
  export function AppSidebar() {
    const { state, dispatch } = useContext(GlobalContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/"); 
      };

      const items = [
        {
          title: "Home",
          url: "/home",
          icon: Home,
        },
        {
          title: "Cart",
          url: "/cart",
          icon: Inbox,
        },

    ]
    return (
        <Sidebar className=" min-h-screen fixed left-0 top-0 bg-gray">
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-xl font-bold text-black mb-4">Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-6">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title} className="p-4">
                    <SidebarMenuButton asChild className="flex items-center gap-4 text-lg text-black hover:text-blue-400">
                      <Link to={item.url} className="flex items-center space-x-3">
                        <item.icon className="w-7 h-7" /> 
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuButton asChild className="flex items-center gap-4 text-lg text-black hover:text-blue-400 p-5">
                
                {state.user?.role === "admin" && <Link to="/admin" className="flex items-center space-x-3">
                    <User2 className="w-7 h-7"/>
                    <span>Admin</span>
                </Link>}
                </SidebarMenuButton>
                <Button onClick={handleLogout} > Log  Out</Button>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      
    )
  }
  