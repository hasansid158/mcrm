import React from "react";

import { Box, Typography } from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AvatarName from "common/dataDisplay/AvatarName";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import LeaderboardRoundedIcon from "@mui/icons-material/LeaderboardRounded";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import { transitions } from "core/animations";
import useScreenSize from "hooks/useScreenSize";
import ProgressiveCard from "./ProgressiveCard";

import format from "date-fns/format";

const LeadCard = ({ cardData = {}, onClick = () => {} }) => {
  const {
    leadTitle = '',
    leadOwner = '',
    company = '',
    leadId = '',
    created = new Date()
  } = cardData;

  const { isMobile } = useScreenSize();

  return (
    <ProgressiveCard
      icon1={LeaderboardRoundedIcon}
      top={leadId}
      secondsec={leadTitle}
      icon2={BusinessRoundedIcon}
      thirsec={company}
      foursec={format(new Date(created), 'dd MMM yy')}
      avatarName={leadOwner}
      onClick={onClick}
    />
  );
};

export default LeadCard;
