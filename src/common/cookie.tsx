import Cookies from 'js-cookie';

export const setCookie = (name: string, value: string, option?: any) => {
  
  const expires = option?.expires || new Date(Date.now() + 60 * 60 * 1000);

  const cookieOption = {
    ...option,
    expires,
    sameSite: 'lax', // 쿠키가 최초 발급된 도메인과 같은 도메인에서만 전송됩니다.
    secure: true, // HTTPS 프로토콜을 사용하는 경우에만 쿠키가 전송됩니다.
  };
  return Cookies.set(name, value, cookieOption);
};

export const getCookie = (name: string) => {
  return Cookies.get(name);
};

export const removeCookie = (name: string) => {
  return Cookies.remove(name);
};
