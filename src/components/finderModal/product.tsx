import styled from "styled-components";
import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import Button from "../button/Button";
import SmallTable from "../table/common/smallTable";
import NoContent from "../empty/noContent";
import Modal from "../modal/modal";
import { SearchBar } from "@components/form/form";

export interface product {
  uuid: string;
  name: string;
  seller: string;
}

interface FormProps {
  showModal: () => void;
  selected: product;
}

export const Form = (props: FormProps) => {
  const { showModal, selected } = props;
  return (
    <StyledForm>
      <Button title="상품 선택" narrow onClick={showModal} />
      {selected.uuid && (
        <div className="selected">
          <em>선택된 항목</em>
          <a
            href={`/board/notice/${selected.uuid}`}
            target="_blank"
            rel="noreferrer"
          >
            {selected.name}
          </a>
        </div>
      )}
    </StyledForm>
  );
};

const StyledForm = styled.div`
  & .selected {
    background: var(--main-bg);
    margin-top: 10px;
    padding: 0.6em 0.8em;
    font-size: 13px;
    & em {
      margin-right: 10px;
      color: var(--main-color);
      font-weight: 600;
    }
    & a {
      color: var(--darkgray-color);
    }
  }
`;

interface FinderProps {
  visible: boolean;
  handleVisible: (visible: boolean) => void;
  onSelect: (product: product) => void;
}
export default function ProductFinder(props: FinderProps) {
  const { visible, handleVisible, onSelect } = props;

  const [keyword, setKeyword] = useState("");
  const [newKeyword, setNewKeyword] = useState("");
  const [products, setProducts] = useState<product[]>([]);

  useEffect(() => {
    const getProducts = () => {
      try {
        const _products: product[] = [];
        for (let i = 0; i < 15; i++) {
          _products.push({
            uuid: faker.datatype.uuid(),
            name: faker.name.jobTitle(),
            seller: faker.name.middleName(),
          });
        }
        setProducts(_products);
      } catch (err) {}
    };

    getProducts();
  }, [newKeyword]);

  return (
    <Modal
      visible={visible}
      handleVisible={handleVisible}
      title="공지사항 게시글을 선택하세요."
      headerComponent={
        <div style={{ marginTop: 20 }}>
          <SearchBar
            name="keyword"
            value={keyword}
            handleValue={setKeyword}
            placeholder="제목으로 검색하세요."
            onSearch={() => setNewKeyword(keyword)}
          />
        </div>
      }
    >
      <SmallTable textAlign="center">
        <Table>
          <colgroup>
            <col width="*" />
            <col width="25%" />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell>제품명</TableCell>
              <TableCell>판매자</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length > 0 ? (
              products.map((product) => {
                return (
                  <TableRow
                    key={`productFinder_product_${product.uuid}`}
                    hover
                    style={{ cursor: "pointer" }}
                    onClick={() => onSelect(product)}
                  >
                    <TableCell style={{ textAlign: "left" }}>
                      {product.name}
                    </TableCell>
                    <TableCell>{product.seller}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={2}>
                  <NoContent />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </SmallTable>
    </Modal>
  );
}
