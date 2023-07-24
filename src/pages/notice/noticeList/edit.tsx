import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DetailPage from "@/components/layout/detailPage";
import Form from "./form";
import { formData } from "./form";
import api from "@/common/API";
import Loading from "@/components/loading/loadSpinner";

export default function Edit() {
  const navigate = useNavigate();
  const { uuid } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [existingData, setExistingData] = useState<formData>();

  const handleSave = async (data: formData) => {
    setIsLoading(true);
    try {
      const params = new FormData();
      params.append("userUuid", uuid);
      params.append("nickname", data.nickname);
      params.append("userName", data.userName);
      if (data.password) {
        params.append("password", data.password);
      }
      params.append("telNo", data.telNo);
      params.append("email", data.email);
      await api.put("v1/adm/user/update", params);
      toast.success("변경사항이 저장되었습니다.");
      navigate(`../${uuid}`, { state: { jumpTo: -3 } });
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      setIsLoading(true);
      try {
        const {
          data: { data },
        } = await api.get(`v1/adm/users/${uuid}`);
        setExistingData({
          uuid,
          nickname: data.nickname,
          password: "",
          userName: data.userName,
          telNo: data.telNo,
          email: data.userEmail,
        });
      } catch (err) {}
      setIsLoading(false);
    };
    getUserInfo();
  }, [uuid]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <DetailPage title="회원정보 수정" backLink={`/user/userList/${uuid}`} fixUrl={false}>
      <Form buttons={[{ title: "수정하기", handleClick: handleSave }]} existingData={existingData} />
    </DetailPage>
  );
}
