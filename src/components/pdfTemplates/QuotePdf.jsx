import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from '@react-pdf/renderer';
import { useTheme } from '@mui/material';
import master_crm_logo from 'components/assets/master-crm-logo.png';

Font.register({
  family: 'Lora',
  src: 'https://fonts.gstatic.com/s/lora/v16/0QI6MX1D_JOuGQbT0gvTJPa787weuxJBkqg.ttf', // Link to the Lora font file
});

const QuotePdf = ({ data }) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Helvetica',
      padding: 30,
    },
    section: {
      marginBottom: 2,
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    sectionTitle: {
      fontSize: 14,
      marginBottom: 10,
      fontWeight: 'bold',
    },
    text: {
      fontSize: 12,
      marginBottom: 5,
    },
    table: {
      width: '100%',
      marginBottom: 10,
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#000',
      height: 'auto',
      fontSize: 8,
    },
    tableHeader: {
      backgroundColor: '#faf5f4',
      height: 30,
      fontSize: 8,
      fontWeight: 'bold',
    },
    tableCol: {
      flex: 1,
      marginTop: 8,
      marginBottom: 8,
      textAlign: 'center',
      flexWrap: 'wrap',
    },
    narrowCol: {
      flex: '0 0 15%',
    },
    wideCol: {
      flex: '0 0 45%',
    },
    divider: {
      backgroundColor: '#30344E',
      height: 2,
      marginBottom: '20px',
    },
    invoiceHeaderContainer: {
      backgroundColor: '#faf5f4',
      flexDirection: 'row',
      padding: 20,
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: '#FF5538',
      borderStyle: 'dashed',
    },
    logoContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    logoImage: {
      width: 40,
      marginRight: 8,
    },
    companyName: {
      fontFamily: 'Lora',
      color: '#FF5538',
      fontSize: 15,
      fontWeight: 'bold',
      marginTop: 12,
    },
    locationText: {
      marginTop: 6,
      fontSize: 12,
    },
    invoiceDetailsContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 15,
      width: '100%',
      marginBottom: 15,
      marginLeft: 15,
    },
    invoiceDetailsHeading: {
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 15,
    },
    invoiceDetailsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    invoiceDetailsColumn: {
      flex: 1,
      paddingHorizontal: 10,
    },
    logoName: {
      flexDirection: 'column',
    },
  });

  return (
    <Document title="Quote-Invoice.pdf">
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Quote Invoice</Text>

        <View style={styles.invoiceHeaderContainer}>
          <View style={styles.logoName}>
            <View style={styles.logoContainer}>
              <Image style={styles.logoImage} src={master_crm_logo} />
              <Text style={styles.companyName}>MASTER CRM</Text>
            </View>
            <Text style={styles.locationText}>Sydney, Australia</Text>
          </View>

          <View>
            {/* Customer Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Customer Information</Text>
              <Text style={styles.text}>
                Customer Name: {data?.customerName}
              </Text>
              <Text style={styles.text}>
                Contact Person: {data?.customerContactPersonName}
              </Text>
              <Text style={styles.text}>Phone: {data?.customerPhone}</Text>
              <Text style={styles.text}>Email: {data?.customerEmail}</Text>
              <Text style={styles.text}>
                Address: {data?.customerAddress} {data?.customerCity}{' '}
                {data?.customerState} {data?.customerZipCode}{' '}
                {data?.customerCountry}
              </Text>
            </View>
          </View>
        </View>

        {/* Quote Details */}
        <View style={styles.invoiceDetailsContainer}>
          <Text style={styles.invoiceDetailsHeading}>Quote Details</Text>
          <View style={styles.invoiceDetailsRow}>
            <View style={styles.invoiceDetailsColumn}>
              <Text style={styles.text}>
                Quote Date: {new Date(data?.quoteDate).toLocaleDateString()}
              </Text>
              <Text style={styles.text}>
                Quote Expiry Date:{' '}
                {new Date(data?.quoteExpiryDate).toLocaleDateString()}
              </Text>
              <Text style={styles.text}>Sales Person: {data?.salesPerson}</Text>
              <Text style={styles.text}>PO Number: {data?.poNumber}</Text>
              <Text style={styles.text}>Quantity: {data?.quantity}</Text>
              <Text style={styles.text}>Description: {data?.description}</Text>
              <Text style={styles.text}>Quote Type: {data?.quoteType}</Text>
            </View>

            <View style={styles.invoiceDetailsColumn}>
              <Text style={styles.text}>
                Unit Price: {data?.currency} {data?.unitPrice?.toFixed(2)}
              </Text>
              <Text style={styles.text}>
                Taxes: {data?.currency} {data?.taxes?.toFixed(2)}
              </Text>
              <Text style={styles.text}>
                Total Amount: {data?.currency} {data?.totalAmount?.toFixed(2)}
              </Text>
              <Text style={styles.text}>Discount: {data?.discount}%</Text>
              <Text style={styles.text}>
                Payment Method: {data?.paymentMethod}
              </Text>
              <Text style={styles.text}>
                Shipping Method: {data?.shippingMethod}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.divider} />

        {/* Quote Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quote Items</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCol, styles.narrowCol]}>Item ID</Text>
              <Text style={[styles.tableCol, styles.wideCol]}>Service</Text>
              <Text style={[styles.tableCol, styles.wideCol]}>Description</Text>
              <Text style={[styles.tableCol, styles.narrowCol]}>Quantity</Text>
              <Text style={[styles.tableCol, styles.narrowCol]}>
                Unit Price
              </Text>
              <Text style={[styles.tableCol, styles.narrowCol]}>
                Total Amount
              </Text>
            </View>
            {data?.quoteItems?.map((item, key) => (
              <View key={key} style={styles.tableRow}>
                <Text style={[styles.tableCol, styles.narrowCol]}>
                  {item?.quoteItemID}
                </Text>
                <Text style={[styles.tableCol, styles.wideCol]}>
                  {item?.service}
                </Text>
                <Text style={[styles.tableCol, styles.wideCol]}>
                  {item?.serviceDescription}
                </Text>
                <Text style={[styles.tableCol, styles.narrowCol]}>
                  {item?.quantity}
                </Text>
                <Text style={[styles.tableCol, styles.narrowCol]}>
                  {data?.currency} {item?.unitPrice?.toFixed(2)}
                </Text>
                <Text style={[styles.tableCol, styles.narrowCol]}>
                  {data?.currency} {item?.totalAmount?.toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default QuotePdf;
