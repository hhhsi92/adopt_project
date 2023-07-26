import styled from "styled-components";

interface Props {
  children: any;
  textAlign?: "center" | "right" | "left";
  stickyHeader?: boolean;
}

export default function SmallTable(props: Props) {
  const { children, textAlign, stickyHeader } = props;
  const theme = {
    textAlign: textAlign,
    stickyHeader: stickyHeader && {
      position: "sticky",
      top: "-1px",
    },
  };

  return <SmallTableWrap theme={theme}>{children}</SmallTableWrap>;
}

const SmallTableWrap = styled.div`
  & table {
    border: solid 1px var(--darkgray-border);
    border-top: 0;
    position: relative;
    table-layout: fixed;

    @media screen and (max-width: 768px) {
      table-layout: auto;
    }

    & tr {
      & th,
      td {
        font-size: 13px;
        padding: 0.6em 1em;
        text-align: ${(props) => props.theme.textAlign};
        line-height: 1.5;

        &:not(:last-child) {
          border-right: solid 1px var(--darkgray-border);
        }
      }

      & th {
        background: var(--gray-bg);
        font-weight: 500;
        color: var(--gray-color);
      }
    }

    & thead {
      border-top: solid 1px var(--darkgray-border);
      ${(props) => props.theme.stickyHeader};

      & th {
        font-weight: 500;
        color: var(--gray-color);
      }
    }

    & tbody {
      & tr {
        border-top: solid 1px var(--darkgray-border);
      }
    }
  }
`;

SmallTableWrap.defaultProps = {
  theme: {
    textAlign: "left",
    stickyHeader: {},
  },
};
