import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
  } from "@react-pdf/renderer";
import axios from "axios";

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
  
import { useEffect, useState } from "react";

const PDFDocument = ({billingsOfReservation, reservation, billing}) => {
  const [servicesOfReservation, setServicesOfReservation] = useState([])

  const handlePayment = (e) => {
    e.preventDefault();
    const reservationId = reservation.reservationId;
    axios.put(`http://localhost:8080/api/billings/paid/${reservationId}`)
      .then(() => {
        window.location.reload();
      })
      .catch(e => {
        console.error("Error while editing: ", e)
      })
  }

  useEffect(() => {
    const id = reservation.reservationId;
    axios.get(`http://localhost:8080/api/sor/${id}`)
      .then(res => {
        setServicesOfReservation(res.data);
      })
      .catch(e => {
        console.error(e);
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
          
                        
                        <View>
                          {servicesOfReservation.map((sor) => {
                            return billingsOfReservation.map((bor) => {
                              if (sor[1] && bor[1] && sor.serviceId === bor[1].serviceId && sor.reservationId === bor[0].reservationId) {
                                return (
                                  <View key={bor[1].serviceId}>
                                    <Text>{bor[3].count} x {bor[1].name}</Text>
                                    <Text>Hinta: {bor[3].count * bor[1].price}€</Text>
                                  </View>
                                );
                              }
                              return null;
                            });
                          })}
                        </View>

                        <Text> </Text>

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
              <div>
                {billing.isPaid 
                  ?
                  <button type="button" onClick={handlePayment}>Merkitse maksamattomaksi</button>
                  :
                  <button type="button" onClick={handlePayment}>Merkitse maksetuksi</button>

                }
                <button type="button" onClick={() => setShowPDF(!showPDF)}>Näytä PDF</button>
              </div>
              
          }
        
          <br />
          <br />
          <br />
      </div>
     
    );
  }
  

  export default PDFDocument;