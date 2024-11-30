import React, { useState, useEffect } from "react";
import { keys, values, map, isString, isArray } from "lodash";
import { Typography, Box, Grid, Button, Chip } from "@mui/material";
import PaperBox from "common/ui/PaperBox";
import { camelCaseToSpace } from "utils/textFormatUtils";
import FilterForData from "pages/components/assets/FilterForData";

const AssetDataReport = ({ reportData = {} }) => {
  const [labels, setLabels] = useState([]);
  const [reportValues, setReportValues] = useState([]);
  const [filteredReportValues, setFilteredReportValues] = useState([]);
  const [base64Pdf, setBase64Pdf] = useState("");

  useEffect(() => {
    setBase64Pdf(reportData?.dataErasurePdfFile);

    const data = map(reportData, (value, key) => {
      if (isString(value)) return;
      return { [key]: value };
    });

    let dataLabels = [];
    let dataReportValues = [];

    map(data, (value) => {
      dataLabels = [...dataLabels, ...keys(value)];
      dataReportValues = [...dataReportValues, ...values(value)];
    });

    setLabels(dataLabels);
    setReportValues(dataReportValues);
    setFilteredReportValues(dataReportValues);
  }, [reportData]);


  const DataBox = ({ id }) => {
    if (isArray(filteredReportValues[id])) {
      return (
        <Grid container spacing={1}>
        {filteredReportValues[id]?.map((valObj, key) => {
          const labels = Object.keys(valObj);
          const content = Object.values(valObj);
          let lgSize = 12;
          let mdSize = 12;
          if (filteredReportValues[id].length === 2) {
            lgSize = 6;
            mdSize = 6;
          } else if (filteredReportValues[id].length >= 3) {
            lgSize = 4;
            mdSize = 6;
          }

          return (
            <Grid item sm={12} md={mdSize} lg={lgSize} key={key}>
              <PaperBox
                sx={{
                  border: (theme) => `1px solid ${theme.palette.secondary.main}`,
                  backgroundColor: "white",
                }}
              >
                {labels?.map((label, key) => (
                  <Chip
                    key={key}
                    label={
                      <span style={{ display: "block", whiteSpace: "pre-line" }}>
                        <span style={{ color: "#696969" }}>
                          {camelCaseToSpace(label)}
                        </span>
                        {"\n"}
                        <span style={{ color: "black", fontWeight: "bold" }}>
                          {content?.[key] || ""}
                        </span>
                      </span>
                    }
                    variant="outlined"
                    color="secondary"
                    sx={{
                      margin: 0.5,
                      borderRadius: "3px",
                      bgcolor: "#e6e6ea",
                      border: "none",
                      py: "20px",
                      m: "5px",
                    }}
                  />
                ))}
              </PaperBox>
            </Grid>
          );
        })}
      </Grid>
      );
    }

    const labels = keys(filteredReportValues[id]);
    const content = values(filteredReportValues[id]);

    return (
      <PaperBox
        sx={{
          backgroundColor: "white",
          border: (theme) => `1px solid ${theme.palette.secondary.main}`,
        }}
      >
        {labels?.map((label, key) => (
          <Chip
          key={key}
          label={
            <span
              style={{ display: "block", whiteSpace: "pre-line" }}
            >
              <span style={{ color: "#696969" }}>
                {camelCaseToSpace(label)}
              </span>
              {"\n"}
              <span style={{ color: "black", fontWeight: "bold" }}>
                {content?.[key] || ""}
              </span>
            </span>
          }
          variant="outlined"
          color="secondary"
          sx={{
            margin: 0.5,
            borderRadius: "3px",
            bgcolor: "#e6e6ea",
            border: "none",
            py: "20px",
            m: "5px",
          }}
        />
        ))}
      </PaperBox>
    );
  };

  const openPdf = () => {
    const pdfData = atob(base64Pdf);
    let dataArray = new Uint8Array(pdfData.length);
    for (let i = 0; i < pdfData.length; i++) {
      dataArray[i] = pdfData.charCodeAt(i);
    }

    var url = URL.createObjectURL(
      new Blob([dataArray], { type: "application/pdf" })
    );
    window.open(url, "_blank");
  };

  return (
    <>
      <Box mb={1} sx={{ display: {sm:"flex" , xs:"block"}, justifyContent: "space-between" , flexWrap:"wrap" }}>
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          onClick={openPdf}
          sx={{mb:{sm:0,xs:0.5}}}
        >
          View PDF
        </Button>
        <FilterForData data={reportValues} onFilter={setFilteredReportValues} />
      </Box>
      <Grid spacing={1} container>
        {labels?.map((label, key) => (
          <Grid
            key={key}
            item
            sm={isArray(filteredReportValues[key]) ? 12 : 6}
            xs={12}
          >
            <PaperBox
              sx={{
                height: "100%",
                minHeight: "120px",
                pb: 2,
                overflow: "auto",
                px: 0,
              }}
              label={camelCaseToSpace(label)}
            >
              <DataBox id={key} />
            </PaperBox>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default AssetDataReport;
