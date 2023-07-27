import { KeyboardEvent } from "react";
import ColoredCategory from "@/components/table/common/ColoredCategory";

export function replaceUrlParameter(url: string) {
  url = url.replace(/&/g, "%26").replace(/\+/g, "%2B");
  return url;
}

//일주일 날짜 배열 구하기 (D-7 ~ 오늘)
export function getCurrentWeek() {
  const day = new Date();
  day.setDate(day.getDate() - 6);
  const result = [day.toISOString().slice(0, 10)];

  for (let i = 1; i < 7; i++) {
    day.setTime(day.getTime() + 86400000);
    result.push(day.toISOString().slice(0, 10));
  }
  
  return result;
}

//유기동물 종류 반환
export function getTypeText(type: string) {
  if (type.startsWith("[개]")) {
    return <ColoredCategory text={type + " 🐶 "} theme={"green"} />;
  } else if (type.startsWith("[고양이]")) {
    return <ColoredCategory text={type + " 🐱 "} theme={"orange"} />;
  } else {
    return <ColoredCategory text={type + " 🐾 "} theme={"gray"} />;
  }
}

// 유기동물 성별정보 반환
export function getGenderText(gender: string) {
  if (gender === "F") {
    return <div className="tag_pink">암컷</div>;
  } else if (gender === "M") {
    return <div className="tag_blue">수컷</div>;
  } else {
    return <div className="tag_gray">정보없음</div>;
  }
}

//문자열 45자 이상 자르기
export function imgNameCut(imgName: string) {
  if (imgName !== undefined && imgName.length > 45) {
    const cutName = imgName.substring(0, 45);
    return cutName + "...";
  }

  return imgName;
}

// 배열 분리하기
export function arrDivision(arr: [], n: number) {
  const length = arr.length;
  const divide = Math.floor(length / n) + (Math.floor(length % n) > 0 ? 1 : 0);
  const newArray = [];

  for (let i = 0; i <= divide; i++) {
    // 배열 0부터 n개씩 잘라 새 배열에 넣기
    newArray.push(arr.splice(0, n));
  }
  return newArray;
}

// 두자리 숫자 만들기
export function doubleDigitNumber(variable: string | number) {
  variable = Number(variable).toString();
  if (Number(variable) < 10 && variable.length === 1) {
    variable = "0" + variable;
  }
  return variable;
}

//날짜 뽑아내기
export function splitDate(getDate: string | null) {
  if (getDate == null) {
    return "";
  }
  const dateFull = getDate.split("T");
  const outDate = dateFull[0];
  return outDate;
}

//남은 일자 계산
export function getDDay(expiry_date: string) {
  const setDate = new Date(expiry_date);
  const now = new Date();

  let distance = setDate.getTime() - now.getTime();

  if (expiry_date === null || expiry_date === undefined) {
    distance = -1;
  }

  const day = Math.floor(distance / (1000 * 60 * 60 * 24));

  return day + 1;
}

//날짜 String으로 출력하기(yyyy-mm-dd)
export function StringDate(d: Date) {
  const year = d.getFullYear();
  const month = ("0" + (d.getMonth() + 1)).slice(-2);
  const day = ("0" + d.getDate()).slice(-2);
  const dateStr = year + "-" + month + "-" + day;
  
  return dateStr;
}

//날짜 String으로 출력하기(yyyymmdd)
export function StringDateSimple(d: Date) {
  const year = d.getFullYear();
  const month = ("0" + (d.getMonth() + 1)).slice(-2);
  const day = ("0" + d.getDate()).slice(-2);
  const dateStr = year + month + day;
  
  return dateStr;
}

//20230705 → "yyy.mm.dd"
export function StringDateDot(d: string) {
  const year = d.substring(0, 4);
  const month = d.substring(4, 6);
  const day = d.substring(6, 8);
  const dateStr = year + "." + month + "." + day;

  return dateStr;
}

// 날짜 텍스트 변환
export function formattedDateTime(data: {
  date: string;
  type: "dot" | "kor" | "data";
  range: "year" | "month" | "date" | "hour" | "min" | "sec";
  dayOfWeek?: boolean;
  shortenYear?: boolean;
}) {
  const { date, type, range, dayOfWeek, shortenYear } = data;
  let _year, _month, _date, _hour, _min, _sec;

  if (date == null) {
    return "";
  }

  if (!date.includes("T")) {
    _year = parseInt(date.split("-")[0], 10);
    _month = parseInt(date.split("-")[1], 10);
    _date = parseInt(date.split("-")[2], 10);
    _hour = 0;
    _min = 0;
    _sec = 0;
  } else {
    _year = parseInt(date.split("T")[0].split("-")[0], 10);
    _month = parseInt(date.split("T")[0].split("-")[1], 10);
    _date = parseInt(date.split("T")[0].split("-")[2], 10);
    _hour = parseInt(date.split("T")[1].split(":")[0], 10);
    _min = parseInt(date.split("T")[1].split(":")[1], 10);
    _sec = parseInt(date.split("T")[1].split(":")[2], 10);
  }

  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const dow = week[new Date(_year, _month, _date, _hour, _min, _sec).getDay()];

  let result = "";
  if (type === "dot") {
    result += _year;
    if (shortenYear) {
      result = _year.toString().substring(2, 4);
    }
    if (range === "year") {
      return result;
    }

    result += "." + doubleDigitNumber(_month);
    if (range === "month") {
      return result;
    }

    result += "." + doubleDigitNumber(_date);
    if (dayOfWeek) {
      result += "(" + dow + ")";
    }
    if (range === "date") {
      return result;
    }

    result += " " + doubleDigitNumber(_hour);
    if (range === "hour") {
      return result;
    }

    result += ":" + doubleDigitNumber(_min);
    if (range === "min") {
      return result;
    }

    result += ":" + doubleDigitNumber(_sec);
    return result;
  } else if (type === "kor") {
    result += _year + "년";
    if (shortenYear) {
      result = _year.toString().substring(2, 4) + "년";
    }
    if (range === "year") {
      return result;
    }

    result += " " + _month + "월";
    if (range === "month") {
      return result;
    }

    result += " " + _date + "일";
    if (dayOfWeek) {
      result += "(" + dow + ")";
    }
    if (range === "date") {
      return result;
    }

    result += " " + doubleDigitNumber(_hour);
    if (range === "hour") {
      return result;
    }

    result += ":" + doubleDigitNumber(_min);
    if (range === "min") {
      return result;
    }

    result += ":" + doubleDigitNumber(_sec);
    return result;
  } else {
    result += _year;
    if (shortenYear) {
      result = _year.toString().substring(2, 4);
    }
    if (range === "year") {
      return result;
    }

    result += "-" + doubleDigitNumber(_month);
    if (range === "month") {
      return result;
    }

    result += "-" + doubleDigitNumber(_date);
    if (dayOfWeek) {
      result += "(" + dow + ")";
    }
    if (range === "date") {
      return result;
    }

    result += " " + doubleDigitNumber(_hour);
    if (range === "hour") {
      return result;
    }

    result += ":" + doubleDigitNumber(_min);
    if (range === "min") {
      return result;
    }

    result += ":" + doubleDigitNumber(_sec);
    return result;
  }
}

//숫자 comma 처리
export function CommaNumber(num: number) {
  if (!num) {
    return "0";
  }
  const result = num.toLocaleString("ko-KR");
  return result;
}

export function CommaToNumber(num: string) {
  const onlyNumber = num.replace(/[^0-9]/g, "");
  return parseInt(onlyNumber, 10);
}

export function onChangeOnlyNumber(e: React.ChangeEvent<HTMLInputElement>) {
  const { value } = e.target;
  const onlyNumber = value.replace(/[^0-9]/g, "");
  e.target.value = onlyNumber;
}

// 날짜(일수) 차이 반환
export function subtractDate(obj: Date, ref: Date) {
  const year = obj.getFullYear();
  const month = obj.getMonth();
  const date = obj.getDate();
  const _obj = new Date(year, month, date);

  const _year = ref.getFullYear();
  const _month = ref.getMonth();
  const _date = ref.getDate();
  const _ref = new Date(_year, _month, _date);

  const between = _obj.getTime() - _ref.getTime();
  return between / (1000 * 60 * 60 * 24);
}

// 월 차이
export const monthDiff = (startDate: Date, endDate: Date, roundUpFractionalMonths?: boolean) => {
  //Months will be calculated between start and end dates.
  //Make sure start date is less than end date.
  //But remember if the difference should be negative.
  let inverse = false;
  if (startDate > endDate) {
    startDate = endDate;
    endDate = startDate;
    inverse = true;
  }

  //Calculate the differences between the start and end dates
  var yearsDifference = endDate.getFullYear() - startDate.getFullYear();
  var monthsDifference = endDate.getMonth() - startDate.getMonth();
  var daysDifference = endDate.getDate() - startDate.getDate();

  var monthCorrection = 0;
  //If roundUpFractionalMonths is true, check if an extra month needs to be added from rounding up.
  //The difference is done by ceiling (round up), e.g. 3 months and 1 day will be 4 months.
  if (roundUpFractionalMonths === true && daysDifference >= 0) {
    monthCorrection = 1;
  }
  //If the day difference between the 2 months is negative, the last month is not a whole month.
  else if (roundUpFractionalMonths !== true && daysDifference < 0) {
    monthCorrection = -1;
  }

  return (inverse ? -1 : 1) * (yearsDifference * 12 + monthsDifference + monthCorrection);
};


// 이미지 파일 확장자 확인
export const isImageFile = (fileName: string) => {
  const _fileType = fileName.split(".")[1];
  if (!_fileType) return false;
  if (
    _fileType.includes("PNG") ||
    _fileType.includes("png") ||
    _fileType.includes("JPG") ||
    _fileType.includes("JPEG") ||
    _fileType.includes("jpg") ||
    _fileType.includes("jpeg") ||
    _fileType.includes("GIF") ||
    _fileType.includes("gif")
  ) {
    return true;
  }
  return false;
};

// default 값 설정
export const getBlankString = (value: string | number) => {
  if (value) {
    return value;
  }

  return "-";
};

export const isEnterPressed = (e: KeyboardEvent) => {
  if (e.nativeEvent.key === "Enter") {
    return true;
  }
  return false;
};
