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
      backgroundColor: "white",
      color: "black",
    },
    section: {
      margin: 10,
      padding: 10,
    },
    viewer: {
      width: window.innerWidth-200,
      height: window.innerHeight-200,
    },
    h1: {
      fontSize: 40
    }
  });
  
import { useState } from "react";

const PDFDocument = ({billingsOfReservation, reservation, service, billing}) => {
  const [showPDF, setShowPDF] = useState(false);
    return (
      <div key={billing.billingId}>
          {
              showPDF
              ?
              <div>
                <PDFViewer style={styles.viewer}>
                  <Document>
                    <Page size="A4" style={styles.page}>
                      <View style={styles.section}>
                        <Text style={styles.h1}>Lasku</Text>
                        <Text> </Text>
          
                        <Text>Asiakas:</Text>
                        <Text>
                        {reservation.customer.firstname} {reservation.customer.lastname}
                        </Text>
                        <Text>
                        {reservation.customer.phonenumber} 
                        </Text>
                        <Text>
                        {reservation.customer.email} 
                        </Text>
                        <Text>
                        {reservation.customer.address}, {reservation.customer.postal.postalcode} {reservation.customer.postal.position} 
                        </Text>
                        <Text> </Text>
          
                        <Text>Varattu mökki:</Text>
                        <Text>{reservation.cottage.name}</Text>
                        <Text>{reservation.cottage.address}, {reservation.cottage.postal.postalcode} {reservation.cottage.postal.position}</Text>
                        <Text>Hinta: {reservation.cottage.price}€</Text>
                        <Text> </Text>
          
                        <Text>Ostetut palvelut:</Text>
                        <Text> </Text>
                        {
                          billingsOfReservation.map(bor => {
                            if(bor[1].reservationId == service.reservationId) {
                              return (
                                <View key={service.serviceId}>
                                  <Text>{bor[3].count} x {bor[1].name}</Text>
                                  <Text>Hinta: {bor[3].count * bor[1].price}€</Text>
                                  <Text> </Text>
                                </View>
                              )
                            }
                          })
                        }

                        <Text>Maksettava kokonaissumma:</Text>
                        <Text>{billing.sum}€</Text>
                        <Text> </Text>
          
          
                      </View>
                    </Page>
                  </Document>
                </PDFViewer>                  
                <button type="button" onClick={() => setShowPDF(!showPDF)}>Sulje</button>
              </div>
              :
              <button type="button" onClick={() => setShowPDF(!showPDF)}>Näytä PDF</button>
          }
        
          <br />
          <br />
          <br />
      </div>
     
    );
  }
  

  export default PDFDocument;