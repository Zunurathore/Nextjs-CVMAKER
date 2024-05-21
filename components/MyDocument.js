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
    marginBottom: 10,
    width: 9,
    height: 14,
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
    width: "33.3333333333%",
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
  const rows = [
    { field: "Vorname", value: profileData.vorname, value2: "Test" },
    { field: "Nachname", value: profileData.nachname, value2: "Test" },
    { field: "hausnummer", value: profileData.hausnummer, value2: "Test" },
    { field: "Straße", value: profileData.strabe, value2: "Test" },
    { field: "PLZ", value: profileData.PLZ, value2: "Test" },
    { field: "Ort", value: profileData.Ort, value2: "Test" },
    { field: "E-Mail", value: profileData.email, value2: "Test" },
    { field: "Tel. Mobil", value: profileData.tel, value2: "Test" },
    { field: "Geburtsdatum", value: profileData.geburtsdatum, value2: "Test" },
    { field: "Ausgeübter Beruf", value: profileData.ausgeübterBeruf, value2: "Test" },
    { field: "Arbeitgeber", value: profileData.arbeitgeber, value2: "Test" },
    { field: "Nettoeinkommen (€)", value: profileData.income, value2: "Test" }
  ];

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Persönliche Daten: Mieter 1</Text>
          <Image
            style={styles.image}
            src="/arrow.png"
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
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Value2</Text>
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
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{row.value2}</Text>
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
