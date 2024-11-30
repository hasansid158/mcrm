import React from "react";
import { parseISO, format, isValid, isPast } from "date-fns";

import { Box, Typography } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

import AvatarName from "common/dataDisplay/AvatarName";
import { toCurrency } from "utils/textFormatUtils";
import ProgressiveCard from "./ProgressiveCard";

const DealCard = ({ cardData = {}, onClick = () => {} }) => {
  const { dealName, amount, closingDate, contactName, dealId, probability } =
    cardData;

  const dateObject = parseISO(closingDate);
  const formattedCloseDate = isValid(dateObject)
    ? format(dateObject, "MMM/yy")
    : "";
  const formattedProbability = probability
    ? `${probability}${probability[probability?.length - 1] === "%" ? "" : "%"}`
    : "";

  return (
    <ProgressiveCard
      icon1={LocalOfferIcon}
      top={dealId}
      secondsec={dealName}
      thirsec={`${
        isPast(dateObject) ? "Closed" : "Closes"
      } in ${formattedCloseDate}`}
      dealExsec={formattedProbability}
      foursec={toCurrency(amount)}
      avatarName={contactName}
      onClick={onClick}
    />
  );
};

export default DealCard;
