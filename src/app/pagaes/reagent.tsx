import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { iReagent } from "../../types/Reagent";

function createData(
  Id: number,
  Name: string,
  Category: string,
  PacSize: string,
  Price: number
): iReagent {
  return {
    Id,
    Name,
    Category,
    PacSize,
    Price,
  };
}

const rows = [
  createData(1, "ALBUMIN", "Clinical Chemistry", "2x250 ml", 0),
  createData(2, "ALBUMIN", "Clinical Chemistry", "2x50 ml", 0),
  createData(3, "TOTAL BILIRUBIN DMSO", "Clinical Chemistry", "2x150 ml", 0),
  createData(
    4,
    "TOTAL & DIRECT BILIRUBIN DMSO",
    "Clinical Chemistry",
    "2x150 ml",
    0
  ),
  createData(
    5,
    "ALBCREATININE KINECTIC JAFFE UMIN",
    "Clinical Chemistry",
    "2x150 ml",
    0
  ),
  createData(
    6,
    "CREATININE KINECTIC JAFFE",
    "Clinical Chemistry",
    "2x250 ml",
    0
  ),
  createData(7, "GLUCOSE PAP", "Clinical Chemistry", "4x250 ml", 0),
  createData(
    8,
    "GLUCOSE PAP LIQUID MONO",
    "Clinical Chemistry",
    "1x1000 ml",
    0
  ),
  createData(
    9,
    "HAEMOGLOBIN (Reagent concentrated 50x)",
    "Clinical Chemistry",
    "4x5 ml",
    0
  ),
  createData(
    10,
    "HAEMOGLOBIN with standard",
    "Clinical Chemistry",
    "4x50 ml",
    0
  ),
  createData(11, "TOTAL PROTEIN", "Clinical Chemistry", "2x50 ml", 0),
  createData(12, "TOTAL PROTEIN", "Clinical Chemistry", "2x250 ml", 0),
  createData(
    13,
    "TOTAL PROTEIN(URINE&CSF)",
    "Clinical Chemistry",
    "2x50 ml",
    0
  ),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof iReagent;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "Name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "Category",
    numeric: true,
    disablePadding: false,
    label: "Category",
  },
  {
    id: "PacSize",
    numeric: true,
    disablePadding: false,
    label: "PacSize",
  },
  {
    id: "Price",
    numeric: true,
    disablePadding: false,
    label: "Price",
  },
];

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof iReagent
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof iReagent) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {}

export default function Reagent() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof iReagent>("Id");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof iReagent
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "80%", m: "auto" }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="small"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover tabIndex={-1} key={row.Name}>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.Name}
                      </TableCell>
                      <TableCell align="right">{row.Category}</TableCell>
                      <TableCell align="right">{row.PacSize}</TableCell>
                      <TableCell align="right">{row.Price}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
