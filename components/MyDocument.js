import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  image: {
    margin:"auto",
    marginBottom: 10,
    width: 50,
    height: 50,
    borderRadius:50,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableCell: {
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 10,
    textAlign: "left",
    color: "#5d4e40",
  },
  evenTableCell: {
    backgroundColor: "#f6f6f6",
  },
});

// Create Document Component
const MyDocument = ({ profileData }) => {
  // console.log(profileData);
  const rows = [
    { field: "Vorname", value: profileData.vorname },
    { field: "Nachname", value: profileData.nachname},
    { field: "Straße", value: profileData.strabe },
    { field: "hausnummer", value: profileData.hausnummer },
    { field: "PLZ", value: profileData.PLZ },
    { field: "Ort", value: profileData.Ort },
    { field: "E-Mail", value: profileData.email },
    { field: "Tel. Mobil", value: profileData.tel },
    { field: "Geburtsdatum", value: profileData.geburtsdatum },
    { field: "Ausgeübter Beruf", value: profileData.ausgeübterBeruf },
    { field: "Arbeitgeber", value: profileData.arbeitgeber },
    { field: "Nettoeinkommen (€)", value: profileData.income },
    { field: "textarea1", value: profileData.textarea1 },
    { field: "textarea2", value: profileData.textarea2 },
    { field: "textarea3", value: profileData.textarea3 },
    { field: "textarea4", value: profileData.textarea4 },
    { field: "textarea5", value: profileData.textarea5 }
  ];
 
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Persönliche Daten: Mieter 1</Text>
          <Image
            style={styles.image}
            src={`${profileData.inputfoto}`}
            // src="/uploads/abCapture.PNG"
            alt="Description of the image"
          />
          <View style={styles.table}>
            {/* Table Headers */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}></Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Value1</Text>
              </View>
            </View>
            {/* Table Rows */}
            {rows.map((row, index) => (
              <View style={[styles.tableRow, index % 2 === 0 && styles.evenTableCell]} key={index}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{row.field}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{row.value}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
