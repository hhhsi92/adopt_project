import Wrapper from "@/components/layout/wrapper";
import Reactions from "./components/connectSite";
import Section from "./components/section";
import UpkindCount from "./components/upkindCount";
import WeeklyAccess from "./components/weeklyAccess";
import "./main.css";
import Tab from "./tab";

export default function Main() {
  return (
    <>
      <div className="mainWrap">
        <Wrapper>
          
          <Section>
            <UpkindCount />
          </Section>

          <Section>
            <WeeklyAccess />
          </Section>

          <Section>
            <div className="board">
              <div className="left">
                <Reactions />
              </div>
              <div className="right">
                <Tab />
              </div>
            </div>
          </Section>

        </Wrapper>
      </div>
    </>
  );
}
