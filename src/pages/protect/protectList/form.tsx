import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Table, TableBody, TableRow } from "@material-ui/core";
import TextInput from "@/components/form/textInput";
import Button from "@components/button/Button";
import ButtonList from "@/components/button/buttonList";
import Guide from "@/components/guide/guide";
import RadioList from "@/components/form/radioList";

export interface formData {
  uuid: string;
  nickname: string;
  password: string;
  userName: string;
  telNo: string;
  email: string;
}

interface Props {
  buttons: {
    title: string;
    handleClick: (formData: formData) => void;
  }[];
  existingData?: formData;
}

const editPasswordData = [
  { value: "미변경", label: "미변경" },
  { value: "변경", label: "변경" },
];

export default function Form(props: Props) {
  const { buttons, existingData } = props;

  const nicknameRegex = /^[ㄱ-ㅎ가-힣a-zA-Z]+$/;
  const uuid = existingData?.uuid || "";

  const [nickname, setNickname] = useState(existingData?.nickname || "");
  const [editPassword, setEditPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [userName, setUserName] = useState(existingData?.userName || "");
  const [telNo, setTelNo] = useState(existingData?.telNo || "");
  const [email, setEmail] = useState(existingData?.email || "");
  const [passwordError, setPasswordError] = useState(false);

  const verifyForm = () => {
    if (!nickname) {
      toast.error("닉네임을 입력해주세요.");
      return;
    }
    if (!nicknameRegex.test(nickname)) {
      toast.error("닉네임은 숫자 및 영문만 입력할 수 있습니다.");
      return;
    }
    if (!userName) {
      toast.error("유저명을 입력해주세요.");
      return;
    }
    if (editPassword) {
      if (!password) {
        toast.error("비밀번호를 입력해주세요.");
        return;
      }
      if (!rePassword) {
        toast.error("비밀번호를 다시 입력해주세요.");
        return;
      }
      if (password !== rePassword) {
        toast.error("비밀번호가 일치하지 않습니다.");
        return;
      }
    }
    if (!telNo) {
      toast.error("핸드폰 번호를 입력해주세요.");
      return;
    }

    return true;
  };

  const handleSave = (func: (formData: formData) => void) => {
    if (!verifyForm()) {
      return;
    }
    let formData: any = {
      uuid,
      nickname,
      userName,
      telNo,
      email,
    };
    if (editPassword) {
      formData.password = password;
    }
    func(formData);
  };

  const checkPassword = useCallback(() => {
    if (password === rePassword) {
      setPasswordError(false);
      return;
    }
    setPasswordError(true);
  }, [password, rePassword]);

  useEffect(() => {
    if (!password || !rePassword) {
      return;
    }
    checkPassword();
  }, [checkPassword, password, rePassword]);

  useEffect(() => {
    setRePassword("");
  }, [password]);

  return (
    <>
      <div className="component">
        <br />
        <Table size="small" className="SimpleTable">
          <TableBody>
            <TableRow>
              <th>닉네임</th>
              <td colSpan={3}>
                <TextInput
                  name="nickname"
                  value={nickname}
                  onChange={setNickname}
                  placeholder="닉네임을 입력하세요"
                  maxLength={8}
                />
              </td>
            </TableRow>
            <TableRow>
              <th>유저명</th>
              <td colSpan={3}>
                <TextInput
                  name="userName"
                  value={userName}
                  onChange={setUserName}
                  placeholder="유저명을 입력하세요"
                  maxLength={8}
                />
              </td>
            </TableRow>
            <TableRow>
              <th>비밀번호 변경 여부</th>
              <td colSpan={3}>
                <RadioList
                  name="editPassword"
                  data={editPasswordData}
                  value={editPassword ? "변경" : "미변경"}
                  onChange={(val) => setEditPassword(val === "변경")}
                />
              </td>
            </TableRow>
            {editPassword && (
              <>
                <TableRow>
                  <th>비밀번호</th>
                  <td colSpan={3}>
                    <TextInput
                      type="password"
                      name="password"
                      value={password}
                      onChange={setPassword}
                      placeholder="비밀번호를 입력하세요"
                      maxLength={16}
                    />
                  </td>
                </TableRow>
                <TableRow>
                  <th>비밀번호 확인</th>
                  <td colSpan={3}>
                    <TextInput
                      type="password"
                      name="rePassword"
                      value={rePassword}
                      onChange={setRePassword}
                      placeholder="비밀번호를 한 번 더 입력하세요"
                    />
                    {passwordError && (
                      <Guide noBox marginTop theme="red">
                        비밀번호가 일치하지 않습니다.
                      </Guide>
                    )}
                  </td>
                </TableRow>
              </>
            )}
            <TableRow>
              <th>연락처</th>
              <td colSpan={3}>
                <TextInput name="telNo" value={telNo} onChange={setTelNo} placeholder="연락처를 입력하세요" />
              </td>
            </TableRow>
            <TableRow>
              <th>이메일</th>
              <td colSpan={3}>
                <TextInput name="email" value={email} onChange={setEmail} placeholder="이메일을 입력하세요" />
              </td>
            </TableRow>
          </TableBody>
        </Table>

        <ButtonList justifyContent="flex-end" marginTop>
          {buttons.map((button) => {
            return (
              <Button
                key={`bannerForm_button_${button.title}`}
                title={button.title}
                onClick={() => handleSave(button.handleClick)}
              />
            );
          })}
        </ButtonList>
      </div>
    </>
  );
}
