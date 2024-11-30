import React from "react";
import { Typography, Box } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineContent,
  TimelineConnector,
  TimelineOppositeContent,
} from "@mui/lab";
import AvatarName from "common/dataDisplay/AvatarName";

const AssetHistory = ({ historyData = [] }) => {
  return (
    <Box>
      <Typography variant="h6" fontWeight="bold">
        Asset History
      </Typography>
      <Timeline sx={{ pl: 10 }}>
        {historyData.map((history) => (
          <TimelineItem
            key={history.assetHistoryId}
            sx={{
              "&::before": {
                display: "none",
              },
              mb:2
            }}
          >
            <TimelineOppositeContent color="text.secondary">
              <Typography variant="p2">
                {history.eventDate}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Box>
                <Typography variant="body1">
                  <strong>{history.eventType}</strong>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "grey", fontWeight: "bold", mt: 2 }}
                >
                  {history.event}
                </Typography>
                <Typography variant="body2">
                  <Box sx={{ display: "flex", mt: 2 }}>
                    <AvatarName name={history.userName} />
                    <Box sx={{ ml: 1, mt: 0.2 }}>{history.userName}</Box>
                  </Box>
                </Typography>
              </Box>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};

export default AssetHistory;
