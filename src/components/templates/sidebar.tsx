import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeType } from '@/lib/types';

const SidebarResume = ({ details }: { details: ResumeType }) => {
  const styles = StyleSheet.create({
    page: {
      padding: 20,
      fontFamily: "Helvetica",
      fontSize: 12,
      color: "#333",
      backgroundColor: "#fff",
      display: "flex",
      flexDirection: "row",
    },
    sidebar: {
      width: "35%",
      backgroundColor: details.primaryColor,
      color: "#fff",
      padding: 15,
      display: "flex",
      flexDirection: "column",
      gap:7
    },
    main: {
      width: "70%",
      padding: 20,
    },
    name: {
      fontSize: 24,
      fontFamily: "Helvetica-Bold",
      marginBottom: 10,
    },
    contact: {
      fontSize: 10,
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 14,
      fontFamily: "Helvetica-Bold",
      color: details.primaryColor,
      marginBottom: 5,
      textTransform: "uppercase",
    },
    text: {
      marginBottom: 8,
    },
    skillChip: {
      backgroundColor: "#fff",
      color: details.primaryColor,
      fontSize: 10,
      padding: "5px 10px",
      borderRadius: 15,
      marginBottom: 5,
    },
    link: {
      color: "#fff",
      textDecoration: "underline",
      fontSize: 10,
      marginBottom: 5,
    },
    experienceContainer: {
      marginBottom: 20,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <View>
            <Text style={styles.name}>{details.name}</Text>
            <Text style={{ fontSize: 14, marginBottom: 10 }}>{details.profession}</Text>
            <Text style={styles.contact}>{details.location}</Text>
            <Text style={styles.contact}>{details.email}</Text>
          </View>
          <View>
            <Text style={[styles.sectionTitle,{color:'#fff'}]}>Links</Text>
            {details.links.map((link,index) => (
              <Link src={link.url} style={styles.link} key={index}>
                {link.name}
              </Link>
            ))}
          </View>
          <View>
            <Text style={[styles.sectionTitle,{color:'#fff'}]}>Skills</Text>
            {details.skills.map((skill,index) => (
              <Text style={styles.skillChip} key={index}>{skill}</Text>
            ))}
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.main}>
          {/* Summary Section */}
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.text}>{details.summary}</Text>
          </View>

          {/* Work Experience Section */}
          <View style={styles.experienceContainer}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {details.experience.map((exp,index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={{ fontFamily: "Helvetica-Bold", marginBottom: 2 }}>
                  {exp.title}, {exp.company}
                </Text>
                <Text style={{ fontSize: 10, color: "#555", marginBottom:5 }}>{exp.startDate} - {exp.endDate}</Text>
                <Text style={styles.text}>{exp.description}</Text>
              </View>
            ))}
          </View>

          {/* Education Section */}
          <View>
            <Text style={styles.sectionTitle}>Education</Text>
            {details.education.map((edu,index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={{ fontFamily: "Helvetica-Bold", marginBottom: 2 }}>
                  {edu.title}, {edu.school}
                </Text>
                <Text style={{ fontSize: 10, color: "#555,",marginBottom:5 }}>{edu.startDate} - {edu.endDate}</Text>
                <Text style={styles.text}>{edu.description}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default SidebarResume;
