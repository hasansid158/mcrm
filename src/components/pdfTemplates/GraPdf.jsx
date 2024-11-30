import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import logo from "../assets/master-crm-logo.png";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  section: {
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  table: {
    width: "100%",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    height: "auto",
    fontSize: 6,
  },
  tableHeader: {
    backgroundColor: "#f7e9ce",
    height: 35,
    fontSize: 8,
    fontWeight: "bold",
  },
  tableCol: {
    flex: 1,
    marginTop: 8,
    marginBottom: 8,
    textAlign: "center",
    flexWrap: "wrap", // allow text wrapping
  },
  narrowCol: {
    flex: "0 0 15%", // Adjust the width as needed
  },
  wideCol: {
    flex: "0 0 45%", // Adjust the width as needed
  },
  divider: {
    backgroundColor: "#F5deb3",
    height: 2,
    margin: "5px 0px 20px 0px",
  },
  logo: {
    width: 50,
    height: 50,
  },
  flexContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexSection: {
    flex: 1,
    marginRight: 10,
  },
  bottomSection: {
    marginTop: 60,
  },
});

const GraPdf = ({ data = {} }) => {
  return (
    <Document title="GRA.pdf">
      <Page size="A4" style={styles.page}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} src={logo} />
        </View>
        <Text style={styles.title}>Goods Receipt Advice</Text>

        {/* Flex container for side-by-side sections */}
        <View style={styles.flexContainer}>
          <View style={styles.flexSection}>
            <Text style={styles.subtitle}>Sender & Receiver Information</Text>
            <Text style={styles.text}>Receiver: {data?.receiver}</Text>
            <Text style={styles.text}>Sender: {data?.sender}</Text>
            <Text style={styles.text}>
              Warehouse Information: {data?.warehouseInformation}
            </Text>
            <Text style={styles.text}>
              Shipping Information: {data?.shippingInformation}
            </Text>
          </View>

          <View style={styles.flexSection}>
            <Text style={styles.subtitle}>Project Information</Text>
            <Text style={styles.text}>Project: {data?.projectId}</Text>
            <Text style={styles.text}>Load: {data?.load}</Text>
            <Text style={styles.text}>
              GRA Date: {new Date(data?.graDate).toLocaleDateString()}
            </Text>
            <Text style={styles.text}>Work Order: {data?.workOrder}</Text>
            <Text style={styles.text}>GRA Comments: {data?.graComments}</Text>
          </View>
        </View>
        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.subtitle}>GRA Assets</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCol}>SSN</Text>
              <Text style={styles.tableCol}>Make</Text>
              <Text style={styles.tableCol}>Model</Text>
              <Text style={styles.tableCol}>Item Type</Text>
              <Text style={styles.tableCol}>Product</Text>
              <Text style={styles.tableCol}>Grade</Text>
              <Text style={styles.tableCol}>Asset Status</Text>
              <Text style={styles.tableCol}>Date Received</Text>
              <Text style={styles.tableCol}>Buy Price</Text>
              <Text style={styles.tableCol}>Sell Price</Text>
              <Text style={styles.tableCol}>Qty On Hand</Text>
              <Text style={styles.tableCol}>Warehouse</Text>
              <Text style={styles.tableCol}>Pallet No</Text>
              <Text style={styles.tableCol}>Serial No</Text>
            </View>
            {data?.grAdassets?.map((asset, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCol}>{asset?.ssn || "-"}</Text>
                <Text style={styles.tableCol}>{asset?.make || "-"}</Text>
                <Text style={styles.tableCol}>{asset?.model || "-"}</Text>
                <Text style={styles.tableCol}>{asset?.itemType || "-"}</Text>
                <Text style={styles.tableCol}>{asset?.product || "-"}</Text>
                <Text style={styles.tableCol}>{asset?.grade || "-"}</Text>
                <Text style={styles.tableCol}>{asset?.assetStatus || "-"}</Text>
                <Text style={styles.tableCol}>
                  {new Date(asset?.dateReceived)?.toLocaleDateString() || "-"}
                </Text>
                <Text style={styles.tableCol}>{asset?.buyPrice || "-"}</Text>
                <Text style={styles.tableCol}>{asset?.sellPrice || "-"}</Text>
                <Text style={styles.tableCol}>{asset?.warehouse || "-"}</Text>
                <Text style={styles.tableCol}>{asset?.palletNo || "-"}</Text>
                <Text style={styles.tableCol}>{asset?.serialNo || "-"}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.divider} />

        <View style={styles.bottomSection}>
          <Text style={styles.subtitle}>Quality Inspection & Signature</Text>
          <Text style={styles.text}>
            Quality Inspection: {data?.qualityInspection}
          </Text>
          <Text style={styles.text}>
            Authorized Signature: {data?.authorisedSignature}
          </Text>
        </View>

      </Page>
    </Document>
  );
};

export default GraPdf;