import React, { useContext, useState } from "react";
import login from "./services/login";
import { AuthContext } from "../../core/context/AuthContext";
import { useNavigate } from "react-router-dom";
import InputText from "../../core/components/InputText";
import InputPassword from "../../core/components/InputPassword";
import Loader from "../../core/components/Loader";

export default function Login() {
  const [email, setEmail] = useState("pedro@ejemplo.com");
  const [password, setPassword] = useState("contra123");
  const [loader, setLoader] = useState(false);

  const [invalid, setInvalid] = useState(false);
  const { setAccessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);

    login(email, password)
      .then((res) => {
        setInvalid(false);
        window.localStorage.setItem("accessToken", res.accessToken);
        setAccessToken(res.accessToken);
        navigate("/");
      })
      .catch(() => {
        setInvalid(true);
        setLoader(false);
      });
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="bg-gray-600 w-full md:w-5/12 my-auto text-white text-center flex flex-col items-center">
        <p className="pt-8 pb-8 text-4xl font-bold">Iniciar sesion</p>
        {invalid && (
          <p className="text-red-500 font-bold">Credenciales invalidas</p>
        )}
        <form
          className="flex flex-col items-center w-10/12"
          onSubmit={handleSubmit}
        >
          <InputText
            name="email"
            label="Email"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
            feedback="Ingresa un email válido"
            regex={
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            }
          />

          <InputPassword
            name="password"
            label="Contraseña"
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="my-8 py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded">
            {loader ? <Loader /> : "Iniciar sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}
