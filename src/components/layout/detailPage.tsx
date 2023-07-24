import { useLocation, useNavigate } from "react-router-dom";
import Wrapper from "@/components/layout/wrapper";
import img_arrow_right from "@common/img/arrow-right.svg";

interface Props {
  title: string;
  backLink?: string;
  children: any;
  fixUrl?: boolean;
}
export default function DetailPage({ title, backLink, children, fixUrl }: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="content_right detail">
      <Wrapper left>
        <div className="flex_between">
          <div className="title">{title}</div>
          {backLink !== undefined ? (
            <button
              className="back_list"
              onClick={() => {
                fixUrl === true
                  ? navigate(backLink)
                  : location.state && location.state.jumpTo
                  ? navigate(location.state.jumpTo)
                  : navigate(-1);
              }}
            >
              이전으로 <img src={img_arrow_right} alt="arrow Icon" />
            </button>
          ) : (
            <></>
          )}
        </div>
        {children}
      </Wrapper>
    </div>
  );
}
