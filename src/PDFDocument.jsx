import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
  } from "@react-pdf/renderer";

  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#d11fb6",
      color: "white",
    },
    section: {
      margin: 10,
      padding: 10,
    },
    viewer: {
      width: window.innerWidth-200,
      height: window.innerHeight-200,
    },
  });

const PDFDocument = () => {
    return (
      <PDFViewer style={styles.viewer}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text>Maksa laskut</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    );
  }
  export default PDFDocument;