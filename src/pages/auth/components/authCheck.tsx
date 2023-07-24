import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, removeCookie } from "@/common/cookie";
import { STR_ACCESS_TOKEN } from '@/common/property/PropertyAuth';
import jwt_decode, { JwtPayload } from "jwt-decode";

export default function AuthCheck() {
  const navigate = useNavigate();

  useEffect(() => {
    const tokenCheck = () => {
      
      const accessToken = getCookie(STR_ACCESS_TOKEN);
      
      if (!accessToken) {
        console.log("no AccessToken");
        navigate("/auth/login");
        return;
      }

      try {
        // 사용 가능한 Token인지 확인

        let isAvailableToken = false;

        if(accessToken !== undefined && accessToken != null){

          const { exp } = jwt_decode<JwtPayload>(accessToken);

          if (Date.now() <= (exp! * 1000)) {
            isAvailableToken = true;
          } 
        }

        if(!isAvailableToken) {
          removeCookie(STR_ACCESS_TOKEN);
          navigate("/auth/login");
        }

      } catch (err) {
        removeCookie(STR_ACCESS_TOKEN);
        navigate("/auth/login");
      }
    };

    tokenCheck();
  }, [navigate]);
  return <></>;
}
