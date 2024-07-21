import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <Stack spacing={2} alignItems="center" marginTop={2}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ "& .MuiPaginationItem-root": { color: "#1eb2a6" } }}
      />
    </Stack>
  );
};

export default CustomPagination;
