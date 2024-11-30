import React from "react";
import { Box, Typography } from "@mui/material";
import { transitions } from "core/animations";
import useScreenSize from "hooks/useScreenSize";
import AvatarName from "common/dataDisplay/AvatarName";

const ProgressiveCard = ({
  icon1: Icon1,
  icon2: Icon2,
  top,
  secondsec,
  thirsec,
  avatarName,
  foursec,
  dealExsec,
  onClick = () => {},
}) => {
  const { isMobile } = useScreenSize();

  return (
    <Box
      onClick={onClick}
      sx={{
        width: "100%",
        minHeight: "100px",
        backgroundColor: "white",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        my: 0.5,
        p: { md: 2, xs: 1.5 },
        cursor: "pointer",
        "&:hover": {
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        },
        transition: transitions("box-shadow").short,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box display="flex" alignItems="center" mb={1}>
        <Icon1 sx={{ fontSize: 16, color: "#333" }} />
        <Typography
          sx={{
            ml: 0.5,
            typography: {
              xs: "p3",
              md: "p2",
            },
            fontWeight: "bold !important",
          }}
        >
          {top}
        </Typography>
      </Box>

      <Typography
        sx={{
          typography: {
            xs: "p3",
            md: "p2",
          },
          fontWeight: "600 !important",
          mb: 1,
          overflow: "hidden",
          width: "100%",
          display: "-webkit-box",
          WebkitLineClamp: "3",
          WebkitBoxOrient: "vertical",
        }}
      >
        {secondsec}
      </Typography>

      <Box
        mb={1}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" alignItems="center">
          {Icon2 && <Icon2 sx={{ fontSize: "22px", ml: "1px", mr: "2px" }} />}
          <Typography typography="p3" fontWeight="500">
            {thirsec}
          </Typography>
        </Box>
        {dealExsec && (
          <Typography typography="p3" fontWeight="500">
            {dealExsec}
          </Typography>
        )}
      </Box>


      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box
          pr={1}
          display="flex"
          alignItems="center"
          flexWrap="wrap"
          gap={0.5}
        >
          <Typography
            variant="p3"
            fontWeight="500"
            sx={{
              overflow: "hidden",
              width: "100%",
              display: "-webkit-box",
              WebkitLineClamp: "3",
              WebkitBoxOrient: "vertical",
            }}
          >
            {foursec}
          </Typography>
        </Box>
        <AvatarName name={avatarName} scale={isMobile ? 1 : 1.25} />
      </Box>
    </Box>
  );
};

export default ProgressiveCard;
