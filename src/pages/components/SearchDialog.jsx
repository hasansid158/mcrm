import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
  InputAdornment,
  DialogTitle,
  Grid,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { searchData } from "enum/searchData";
import SearchIcon from "@mui/icons-material/Search";
import PaperBox from "common/ui/PaperBox";

const SearchDialog = ({ open, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target?.value?.toLowerCase());
  };

  const handleItemClick = (path) => {
    navigate(path);
    onClose();
  };

  useEffect(() => {
    !open && setSearchTerm('');
  }, [open]);

  const filteredData = searchData.filter(
    (item) =>
      item?.label?.toLowerCase()?.includes(searchTerm) ||
      item.path?.toLowerCase().includes(searchTerm) ||
      item.description?.toLowerCase().includes(searchTerm)
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogContent
        sx={{
          backgroundColor: "#f7f8fc",
          px: 2,
          py: 3,
        }}
      >
        <TextField
          fullWidth
          placeholder="Search..."
          variant="outlined"
          onChange={handleSearchChange}
          autoFocus
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{
                    fontSize: 20,
                    scale: 1.2,
                    color: "text.secondary",
                  }}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            marginBottom: "16px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              backgroundColor: "background.default",
            },
          }}
        />

        <Box width='100%' textAlign='center'>
          <Typography
            variant="p"
            sx={{
              color: "text.secondary",
              marginTop: 2,
            }}
          >
            {!searchTerm && 'Start typing to search...'}
            {searchTerm && searchTerm?.length <= 1 &&
              'Keep typing...'
            }
            {searchTerm && filteredData.length === 0 &&
              'No results found. Please try a different search term.'
            }
          </Typography>
        </Box>

        {searchTerm?.length > 1 && filteredData.length > 0 && (
          <Grid container spacing={1}>
            {filteredData.map((item, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <PaperBox
                  elevation={0}
                  enableBorder
                  white
                  sx={{
                    height: "100%",
                    "&:hover": {
                      backgroundColor: "secondary.light",
                    },
                    cursor: "pointer",
                    border: (theme) => `1px solid ${theme.palette.secondary.main}`,
                    pb: 2.5,
                  }}
                  onClick={() => handleItemClick(item.path)}
                >
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: "primary.main",
                    }}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    sx={{ color: "secondary.main" }}
                    variant='p2'
                  >
                    {item.description}
                  </Typography>
                </PaperBox>
              </Grid>
            ))}
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
