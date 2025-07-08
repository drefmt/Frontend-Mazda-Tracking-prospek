import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth";

import SalesLayout from "@/layouts/SalesLayout";
import SvpLayout from "@/layouts/SvpLayout";
import LoginLayout from "@/layouts/LoginLayout";


import { QueryClient, QueryClientProvider} from "@tanstack/react-query"

const queryClient = new QueryClient({
    defaultOptions: {
      queries :{
        refetchOnWindowFocus: false,
      }
    }
})

function App() {
  const { user } = useAuthStore();

  const getRedirectPath = () => {
    if (!user) return "/login";
    return user.level === "sales" || user.level === "svp" ? `/${user.level}/dashboard` : "/login";
  };

  return (
    <QueryClientProvider client={queryClient}>
    <Routes>
      <Route path="/" element={<Navigate to={getRedirectPath()} replace />} />
      <Route path="login" element={<LoginLayout />} />
      <Route path="sales/*" element={user?.level === "sales" ? (<SalesLayout />) : (<Navigate to="/login" replace />)}/>
      <Route path="svp/*" element={user?.level === "svp" ? (<SvpLayout />) : (<Navigate to="/login" replace />)}/>
    </Routes>
    </QueryClientProvider>

  );
}

export default App;
