import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeType } from '@/lib/types';


const TheClassic = ({ details }: { details: ResumeType }) => {
  const styles = StyleSheet.create({
    page: {
      padding: 20,
      fontFamily: "Helvetica",
      fontSize: 12,
      color: "#333",
      backgroundColor: "#fff",
    },
    header: {
      textAlign: "center",
      marginBottom: 10,
      borderBottom: 1,
      paddingBottom: 5
    },
    name: {
      fontSize: 20,
      fontFamily: "Helvetica-Bold",
      fontWeight: "bold",
    },
    section: {
      marginVertical: 10,
      paddingBottom: 5,
      borderBottom: 1
    },
    sectionTitle: {
      fontSize: 16,
      fontFamily: "Helvetica-Bold",
      fontWeight: "bold",
      marginBottom: 5,
    },
    text: {
      marginBottom: 5,
    },
    link: {
      color: details.primaryColor,
      textDecoration: "underline",
    },
  });
  
  return (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{details.name}</Text>
        <Text>{details.profession}</Text>
        <Text>{details.location} | {details.email}</Text>
        <View style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center' }}>
          {details.links.map((link) => (
            <View key={link.name} style={{ display: 'flex', flexDirection: 'row' }}>
              <Link src={link.url} style={styles.link}>
                {link.name}
              </Link>
              {details.links.indexOf(link) !== details.links.length - 1 && (
                <Text>
                  {" "}|{" "}
                </Text>
              )}
            </View>
          )
          )}
        </View>
      </View>
      <View style={{display:"flex",flexDirection:"row",gap:2,justifyContent:"center"}}>
        {details.skills.map((skill) => (
          <Text key={skill} style={{backgroundColor:details.primaryColor,color:"#fff",padding:5,borderRadius:5}}>
            {skill}
          </Text>
        ))}
      </View>

      {/* Summary Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SUMMARY</Text>
        <Text style={styles.text}>
          {details.summary}
        </Text>
      </View>

      {/* Work Experience Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>WORK EXPERIENCE</Text>
        {details.experience.map((exp) => (
          <View key={exp.company} style={styles.text}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <Text style={{ fontFamily:"Helvetica-Bold",fontWeight: "bold" }}>
                <Text style={{color:details.primaryColor}}>{exp.title}</Text>
                ,{" "}
                <Text>{exp.company}</Text>
              </Text>
              <Text>{exp.startDate} - {exp.endDate}</Text>
            </View>
            {"\n"}
            <Text style={{ marginVertical: 5 }}>
              {exp.description}
            </Text>
          </View>
        ))}
      </View>

      {/* Education Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>EDUCATION</Text>
        {details.education.map((edu) => (
          <View key={edu.school} style={styles.text}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <Text style={{ fontFamily:"Helvetica-Bold",fontWeight: "bold" }}>
                <Text style={{color:details.primaryColor}}>{edu.title}</Text>
                ,{" "}
                <Text>{edu.school}</Text>
              </Text>
              <Text>{edu.startDate} - {edu.endDate}</Text>
            </View>
            {"\n"}
            <Text style={{ marginVertical: 5 }}>
              {edu.description}
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
)}

export default TheClassic