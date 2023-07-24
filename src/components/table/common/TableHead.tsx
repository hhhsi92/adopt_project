import TableCell from "@mui/material/TableCell";
import MUITableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { useLocation, useNavigate } from "react-router-dom";
import { getSortPageURL } from "./Func";

interface HeadCell {
  id?: string;
  label: string;
}

interface Props {
  readonly headCells: HeadCell[];
  order: "asc" | "desc";
  orderCate?: string;
}

export default function TableHead(props: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  const { headCells, order, orderCate } = props;

  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    const sortURL = getSortPageURL(location, property, order, orderCate);
    navigate(sortURL);
  };

  return (
    <MUITableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.label} sortDirection={orderCate === headCell.id ? order : "desc"}>
            {headCell.id ? (
              <TableSortLabel
                active={orderCate === headCell.id}
                direction={orderCate === headCell.id ? order : "desc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </MUITableHead>
  );
}
