import React from "react";
import { parseISO, format, isValid, isPast } from "date-fns";

// import { Box, Typography } from "@mui/material";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
// import useScreenSize from "hooks/useScreenSize";

// import AvatarName from "common/dataDisplay/AvatarName";
import { toCurrency } from "utils/textFormatUtils";
// import { transitions } from "core/animations";
import ProgressiveCard from "./ProgressiveCard";

const QuoteCard = ({ cardData = {}, onClick = () => {} }) => {
  const {
    contactName,
    quoteNO,
    totalAmount,
    // taxes,
    // contactName,
    salesPerson,
    quoteExpiryDate,
  } = cardData;

  const dateObject = parseISO(quoteExpiryDate);
  const formattedCloseDate = isValid(dateObject)
    ? format(dateObject, "MMM/yy")
    : "";

  // const { isMobile } = useScreenSize();

  return (
    <ProgressiveCard
      icon1={ReceiptRoundedIcon}
      top={quoteNO}
      secondsec={contactName}
      thirsec={`${
        isPast(dateObject) ? "Expired" : "Expires"
      } ${formattedCloseDate}`}
      foursec={totalAmount && toCurrency(totalAmount || 0)}
      avatarName={salesPerson}
      onClick={onClick}
    />
  );
};

export default QuoteCard;
