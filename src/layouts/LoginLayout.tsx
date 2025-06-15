
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/logo.png";
import { axiosInstance } from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth";
import { useMutation } from "@tanstack/react-query";

interface User {
  id: string;
  username: string;
  level: "sales" | "svp";
}

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const loginMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/users/login", credentials);
      return response.data;
    },

    onSuccess: ({ user, token }: { user: User; token: string }) => {
      // Simpan token & user di sessionStorage
      sessionStorage.setItem("auth_token", token);
      sessionStorage.setItem("user", JSON.stringify(user));

      // Update state global user
      setUser(user, token);

      // Reset form setelah login berhasil
      setCredentials({ username: "", password: "" });

      // Navigasi ke dashboard sesuai level
      navigate(user.level === "sales" ? "/sales/dashboard" : "/svp/dashboard");
    },

    onError: (err: Error) => {
      setError(
        err.message || "Login gagal. Periksa kembali username dan password."
      );
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));

    if (error) setError("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    loginMutation.mutate(); 
  };

  return (
    <section className="bg-[url(../src/assets/LoginBg.jpg)] w-full h-svh bg-center bg-cover bg-no-repeat flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center p-6 backdrop-blur bg-black/30 text-white rounded-md"
      >
        <div className="w-[340px] h-[343px] flex flex-col items-center">
          <img src={Logo} width={120} className="mx-auto pb-4" alt="Logo" />

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="pb-4 w-full">
            <label htmlFor="username" className="text-white uppercase text-[14px]">
              Username
            </label>
            <Input
              id="username"
              placeholder="Username"
              className="bg-white text-black"
              value={credentials.username}
              onChange={handleChange}
            />
          </div>

          <div className="pb-3 w-full">
            <label htmlFor="password" className="text-white uppercase text-[14px]">
              Password
            </label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              className="bg-white text-black"
              value={credentials.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              className="bg-black hover:bg-gray-900 mt-4 w-full py-4 transition-all ease-in-out duration-200"
            >
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
