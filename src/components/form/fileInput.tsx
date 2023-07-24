import styled from "styled-components";
import { useRef } from "react";
import Button, { ButtonProps } from "../button/Button";
import { imgNameCut } from "@/common/Func";
import Guide from "../guide/guide";

export interface existFile {
  uuid: string;
  fileName: string;
}

interface fileInputProps {
  max: number;
  name: string;
  uploadedFiles: FileList | File[];
  handleUploadedFiles: (Files: FileList) => void;
  subButton?: ButtonProps[];
  exist?: existFile[];
  removeExist?: (uuid: string) => void;
  disabled?: boolean;
}
export default function FileInput(props: fileInputProps) {
  const { max, name, uploadedFiles, handleUploadedFiles, subButton, exist, removeExist, disabled } = props;
  const input = useRef<HTMLInputElement>(null);

  const removeInput = (file: File) => {
    const dt = new DataTransfer();

    for (let _file of uploadedFiles) {
      if (_file !== file) {
        dt.items.add(_file);
      }
    }

    input.current.files = dt.files;
    handleUploadedFiles(dt.files);
  };

  const handleChange = (files: FileList) => {
    console.log(exist);
    console.log(uploadedFiles);

    const existFileCount = exist ? exist.length : 0;
    if (uploadedFiles && uploadedFiles.length + files.length + existFileCount > max) {
      alert(`선택 가능한 최대 파일 개수는 ${max}개 입니다.`);
      return;
    }

    const dt = new DataTransfer();

    if (uploadedFiles) {
      for (let _file of uploadedFiles) {
        dt.items.add(_file);
      }
    }

    for (const file of files) {
      dt.items.add(file);
    }

    handleUploadedFiles(dt.files);
  };

  return (
    <Container>
      <div className="buttonArea">
        <input
          ref={input}
          type="file"
          id={`fileInput_${name}`}
          onChange={(e) => handleChange(e.target.files)}
          name={name}
          multiple={max > 1}
          disabled={disabled}
        />
        <label htmlFor={`fileInput_${name}`}>
          <p>파일 선택</p>
        </label>

        {subButton?.length > 0 &&
          subButton.map((button) => {
            return (
              <Button
                key={`files_button_${button.title}`}
                title={button.title}
                onClick={() => button.onClick()}
                theme={button.theme}
                lightColor={button.lightColor}
              />
            );
          })}
      </div>

      {exist?.length > 0 &&
        exist.map((item, index) => (
          <div key={`files_exist_${index}`} className="fileWrap">
            <div className="file">
              <p>{item.fileName}</p>
              <Button
                title="삭제"
                onClick={() => removeExist(item.uuid)}
                theme="gray"
                style={{ marginLeft: 4 }}
                lightColor
              />
            </div>
          </div>
        ))}

      {uploadedFiles?.length > 0 &&
        Array.from(uploadedFiles).map((item, index) => {
          return (
            <div key={`files_${index}`} className="fileWrap">
              <div className="file">
                <p>{imgNameCut(item.name)}</p>
                <Button
                  title="삭제"
                  onClick={() => removeInput(item)}
                  theme="gray"
                  style={{ marginLeft: 4 }}
                  lightColor
                />
              </div>
            </div>
          );
        })}
    </Container>
  );
}

const Container = styled.div`
  & .buttonArea {
    display: flex;
    align-items: center;

    & *:not(:last-child) {
      margin-right: 8px;
    }
  }
  & input {
    display: none;
  }
  & label {
    font-size: 12px;
    font-weight: normal;
    color: var(--white-color);
    background: var(--blue-color);
    display: flex;
    transition: 0.2s;
    align-items: center;
    justify-content: center;
    padding: 0 0.8em;
    height: 30px;
  }
  & label:hover {
    opacity: 0.5;
  }
  & .fileWrap {
    display: flex;
    align-items: center;

    & .file {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: space-between;
      background: var(--gray-bg);
      padding-left: 10px;
      max-width: 400px;
      margin-top: 10px;
      height: 30px;

      & p {
        font-size: 14px;
      }
    }
  }
`;
