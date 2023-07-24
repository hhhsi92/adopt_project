import ButtonList from '@/components/button/buttonList';
import Selectbox from '@/components/form/selectbox';
import TextInput from '@/components/form/textInput';
import Button from '@components/button/Button';
import { Table, TableBody, TableRow } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const locationData = [
  { value: "서울", label: "서울" },
  { value: "경기", label: "경기" },
  { value: "인천", label: "인천" },
  { value: "강원", label: "강원" },
  { value: "충북", label: "충북" },
  { value: "충남", label: "충남" },
  { value: "세종", label: "세종" },
  { value: "대전", label: "대전" },
  { value: "전북", label: "전북" },
  { value: "전남", label: "전남" },
  { value: "광주", label: "광주" },
  { value: "경북", label: "경북" },
  { value: "경남", label: "경남" },
  { value: "대구", label: "대구" },
  { value: "울산", label: "울산" },
  { value: "부산", label: "부산" },
  { value: "제주", label: "제주" },
];


export interface formData {
  modUuid: string;
  location: string;
  name: string;
  contactTel: string;
  reportTel: string;
}

interface Props {
  buttons: {
    title: string;
    handleClick: (formData: formData) => void;
  }[];
  existingData?: formData;
}

export default function Form(props: Props) {
  const { buttons, existingData } = props;

  const [modUuid, setmodUuid] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [contactTel, setContactTel] = useState("");
  const [reportTel, setReportTel] = useState("");

  useEffect(() => {
    if (!existingData) {
      return;
    }

    setmodUuid(existingData.modUuid);
    setLocation(existingData.location);
    setName(existingData.name);
    setContactTel(existingData.contactTel);
    setReportTel(existingData.reportTel);
  }, [existingData]);

  const validateForms = () => {
    if (!location) {
      toast.error("지역을 선택해주세요.");
      return;
    }
    if (!name) {
      toast.error("조합명을 입력해주세요.");
      return;
    }

    if (!contactTel) {
      toast.error("문의번호를 입력해주세요.");
      return;
    }

    return true;
  };

  const handleSubmit = (submit: (formData: formData) => void) => {
    if (!validateForms()) {
      return;
    }
    submit({
      modUuid,
      location,
      name,
      contactTel,
      reportTel
    });
  };

  return (
    <>
      <div className="component">
        <Table size="small" className="SimpleTable">
          <TableBody>
            <TableRow>
              <th>지역선택</th>
              <td>
                <Selectbox
                  name="location"
                  value={location}
                  options={locationData}
                  onChange={setLocation}
                  usePlaceholder
                />
              </td>
            </TableRow>
            <TableRow>
              <th>조합명</th>
              <td>
                <TextInput
                  name="name"
                  value={name}
                  onChange={setName}
                  placeholder="조합명을 입력하세요"
                  maxLength={20}
                />
              </td>
            </TableRow>
            <TableRow>
              <th>문의 번호</th>
              <td>
                <TextInput
                  name="contactTel"
                  value={contactTel}
                  onChange={setContactTel}
                  placeholder="문의번호를 입력하세요"
                  maxLength={20}
                />
              </td>
            </TableRow>
            <TableRow>
              <th>신고 번호</th>
              <td>
                <TextInput
                    name="reportTel"
                    value={reportTel}
                    onChange={setReportTel}
                    placeholder="신고번호를 입력하세요"
                    maxLength={20}
                  />
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
                onClick={() => handleSubmit(button.handleClick)}
              />
            );
          })}
        </ButtonList>
      </div>
    </>
  );
}
