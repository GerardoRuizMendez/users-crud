import { useState } from "react";

export default function InputPassword(props: {
  label: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  feedback?: string;
  regex?: RegExp;
}) {
  const [validInput, setValidInput] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    if (props.regex?.test(value)) {
      setValidInput(true);
    } else {
      setValidInput(false);
    }

    if (props.onChange) props.onChange(e);
  };

  return (
    <div className="flex flex-col pb-5 px-5 text-left w-full">
      <label className="pb-1">{props.label}</label>
      <div className="w-full relative flex flex-col">
        <input
          className="text-black rounded"
          type={showPassword ? "text" : "password"}
          name={props.name}
          onChange={changeHandler}
          defaultValue={props.defaultValue}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`text-black w-6 h-6 absolute right-2 top-2`}
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        >
          {showPassword ? (
            <>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </>
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          )}
        </svg>
      </div>
      <p className={`text-red-500 ${validInput ? "hidden" : ""}`}>
        {props.feedback}
      </p>
    </div>
  );
}
