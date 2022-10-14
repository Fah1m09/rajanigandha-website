import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { iReagent } from "../../types/Reagent";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

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
  createData(14, "ASO Turbilatex", "Immuno Chemistry", "2x50 ml", 0),
  createData(15, "RA Turbilatex", "Immuno Chemistry", "2x50 ml", 0),
  createData(16, "PT", "Blood Grouping", "2x50 ml", 0),
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
    disablePadding: false,
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
          <StyledTableCell
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
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function Reagent() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof iReagent>("Id");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [reagentList, setReagentList] = useState([]);
  const [filter, setFilter] = useState("");

  const Categories = [
    { Name: "All", Value: "" },
    { Name: "Clinical Chemistry", Value: "Clinical Chemistry" },
    { Name: "Serology", Value: "Serology" },
    { Name: "Immuno Chemistry", Value: "Immuno Chemistry" },
    { Name: "Blood Grouping", Value: "Blood Grouping" },
  ];

  useEffect(() => {
    setReagentList(rows);
  }, []);

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

  function getFilteredList() {
    // Avoid filter when selectedCategory is null
    if (filter === "") {
      return reagentList;
    }
    return reagentList.filter((item) => item.Category === filter);
  }

  // Avoid duplicate function calls with useMemo
  var filteredList = useMemo(getFilteredList, [filter, reagentList]);

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={2} sx={{ width: "80%", m: "1rem auto" }}>
        <Grid item xs={9}></Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              label="Filter"
              onChange={handleChange}
            >
              {Categories.map((cat) => (
                <MenuItem value={cat.Value}>{cat.Name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Paper>
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
                  rowCount={filteredList.length}
                />
                <TableBody>
                  {stableSort(filteredList, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <StyledTableRow hover tabIndex={-1} key={row.Id}>
                          <StyledTableCell
                            component="th"
                            id={labelId}
                            scope="row"
                          >
                            {row.Name}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.Category}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.PacSize}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.Price}
                          </StyledTableCell>
                        </StyledTableRow>
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
              rowsPerPageOptions={[10, 20, 30]}
              component="div"
              count={filteredList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
