import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "@/common/cookie";
import { STR_ACCESS_TOKEN, STR_REFRESH_TOKEN } from '@/common/property/PropertyAuth';

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const id = formData.get("id");
  const password = formData.get("password");
  console.log(`login ${id}/${password}`);

  try {
    // 로그인 성공 시 access, refresh Token 반환 및 저장
    const accessToken = getCookie(STR_ACCESS_TOKEN);
    const refreshToken = localStorage.getItem(STR_REFRESH_TOKEN);
    console.log(accessToken, refreshToken);

    localStorage.setItem(STR_REFRESH_TOKEN, refreshToken);
    setCookie(STR_ACCESS_TOKEN, accessToken);

    return true;
  } catch (err) {
    console.log("error,", err);
  }
};

export default function LoginCheck(props: any) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return <></>;
}
