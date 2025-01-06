import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';

import format from 'date-fns/format';

const BarcodePdf = ({ barcodeData, labelSize }) => {
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: 'Helvetica',
    },
    barcodeImage: {
      width: `${labelSize.width}in`,
      height: 'auto',
      objectFit: 'contain',
      marginTop: '3px',
    },
  });

  return (
    <Document>
      {barcodeData.map((item, index) => (
        <Page key={index} size="A4" style={styles.page}>
          <View style={styles.barcodeContainer}>
            {item?.ssn && (
              <Text style={{ fontSize: labelSize.fontSize }}>
                SSN: {item?.ssn}
              </Text>
            )}
            {item?.serialNo && (
              <Text
                style={{
                  fontSize: labelSize.fontSize,
                  marginTop: '3px',
                }}
              >
                SNO: {item?.serialNo}
              </Text>
            )}

            <Image style={styles.barcodeImage} src={item?.barcode} />

            {item?.dateReceived && (
              <Text
                style={{
                  fontSize: labelSize.fontSize,
                  marginTop: '3px',
                }}
              >
                Date received:{' '}
                {format(new Date(item?.dateReceived), 'MM/dd/yyyy')}
              </Text>
            )}
          </View>
        </Page>
      ))}
    </Document>
  );
};

export default BarcodePdf;
