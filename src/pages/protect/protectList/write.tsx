import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DetailPage from "@/components/layout/detailPage";
import Form from "./form";
import { formData } from "./form";
import api from "@/common/API";
import Loading from "@/components/loading/loadSpinner";

export default function Write() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (data: formData) => {
    setIsLoading(true);
    try {
      const params = new FormData();
      // params.append("userId", data.userId);
      params.append("password", data.password);
      params.append("userName", data.userName);
      params.append("telNo", data.telNo);

      await api.post("v1/adm/users/add", params);

      toast.success("관리자가 등록되었습니다.");
      navigate("..");
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <DetailPage title="관리자 계정 등록" backLink="/user/userList" fixUrl={false}>
      <Form buttons={[{ title: "등록하기", handleClick: handleSave }]} />
    </DetailPage>
  );
}
