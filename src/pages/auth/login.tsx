import { useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import api, { Axios } from "@/common/API";
import { setCookie } from "@/common/cookie";
import { ApiResponse, Token } from "@/common/Types";
import { STR_ACCESS_TOKEN, STR_REFRESH_TOKEN } from "@/common/property/PropertyAuth";
import { toast } from "react-toastify";

export default function Login() {
  const idInput = useRef<HTMLInputElement>();
  const pwInput = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  const login = async () => {
    var userId = idInput.current?.value as string;
    var userPw = pwInput.current?.value as string;

    if (userId === "" || userPw === "") {
      return;
    }

    const formData = new FormData();

    formData.append("userId", userId);
    formData.append("userPw", userPw);

    try {
      let response = await api.post<ApiResponse<Token>>("/v1/adm/login", formData);

      if (response.status === 200) {
        const data = response.data.data;

        setCookie(STR_ACCESS_TOKEN, data.accessToken);
        localStorage.setItem(STR_REFRESH_TOKEN, data.refreshToken);

        navigate("/");
      }
    } catch (error) {
      if (Axios.isAxiosError(error)) {
        const apiError = error.response.data as ApiResponse<string>;
        toast.error(apiError.message);
      }
    }
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login();
  };

  return (
    <Container>
      <div className="box">
        <h1>
          Login
        </h1>
        <form onSubmit={onFormSubmit}>
          <ul className="form">
            <li>
              <h5>USERID</h5>
              <input type="text" name="id" autoComplete="userId" ref={idInput} />
            </li>
            <li>
              <h5>PASSWORD</h5>
              <input type="password" name="password" autoComplete="current-password" ref={pwInput} />
            </li>
          </ul>
          <button type="submit" onClick={() => login}>
            Login
          </button>
        </form>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;

  & .box {
    max-width: 400px;
    width: 80%;

    & h1 {
      margin-bottom: 2em;
      letter-spacing: -0.02em;
    }

    & .form {
      & li:not(:last-child) {
        margin-bottom: 3em;
      }

      & h5 {
        font-size: 13px;
        font-weight: normal;
        letter-spacing: 0.1em;
        opacity: 0.5;
        margin-bottom: 0.5em;
      }

      & input {
        width: 100%;
        padding: 0.5em 0;
        border-bottom: solid 2px var(--darkgray-border);
        font-size: 15px;
      }
    }

    & button {
      width: 100%;
      background: var(--main-color);
      height: 50px;
      border-radius: 5px;
      font-size: 15px;
      color: var(--white-color);
      text-transform: uppercase;
      margin-top: 60px;
      box-shadow: 0 10px 20px rgb(23 142 119 / 40%);
    }
  }
`;
