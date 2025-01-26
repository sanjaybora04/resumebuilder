import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeType } from '@/lib/types';

const MinimalGridResume = ({ details }: { details: ResumeType }) => {
  const styles = StyleSheet.create({
    page: {
      padding: 40,
      fontFamily: "Helvetica",
      fontSize: 12,
      color: "#333",
      backgroundColor: "#fff",
    },
    header: {
      marginBottom: 30,
    },
    name: {
      fontSize: 26,
      fontFamily: "Helvetica-Bold",
      color: details.primaryColor,
      marginBottom: 4,
    },
    profession: {
      fontSize: 14,
      color: "#555",
      marginBottom: 10,
    },
    contact: {
      fontSize: 10,
      color: "#777",
      marginBottom: 20,
    },
    gridContainer: {
      display: "flex",
      flexDirection: "row",
      gap: 20,
    },
    gridColumn: {
      flex: 1,
    },
    sectionTitle: {
      fontSize: 16,
      fontFamily: "Helvetica-Bold",
      color: details.primaryColor,
      marginBottom: 8,
    },
    sectionContent: {
      marginBottom: 15,
    },
    text: {
      marginBottom: 5,
    },
    skillChip: {
      // display: "inline-block",
      backgroundColor: details.primaryColor,
      color: "#fff",
      fontSize: 10,
      padding: "5px 10px",
      borderRadius: 15,
      margin: "0 5px 5px 0",
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
          <Text style={styles.profession}>{details.profession}</Text>
          <Text style={styles.contact}>{details.location} | {details.email}</Text>
          <View>
            {details.links.map((link) => (
              <Link key={link.url} src={link.url} style={styles.link}>
                {link.name}
              </Link>
            ))}
          </View>
        </View>

        {/* Grid Layout */}
        <View style={styles.gridContainer}>
          {/* Left Column */}
          <View style={styles.gridColumn}>
            {/* Summary */}
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>Summary</Text>
              <Text>{details.summary}</Text>
            </View>

            {/* Skills */}
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
              {details.skills.map((skill) => (
                <Text key={skill} style={styles.skillChip}>{skill}</Text>
              ))}
              </View>
            </View>
          </View>

          {/* Right Column */}
          <View style={styles.gridColumn}>
            {/* Work Experience */}
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>Work Experience</Text>
              {details.experience.map((exp) => (
                <View key={exp.title} style={{ marginBottom: 10 }}>
                  <Text style={{ fontFamily: "Helvetica-Bold", marginBottom: 2 }}>
                    {exp.title}, {exp.company}
                  </Text>
                  <Text style={{ fontSize: 10, color: "#555" }}>{exp.startDate} - {exp.endDate}</Text>
                  <Text>{exp.description}</Text>
                </View>
              ))}
            </View>

            {/* Education */}
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>Education</Text>
              {details.education.map((edu) => (
                <View key={edu.title} style={{ marginBottom: 10 }}>
                  <Text style={{ fontFamily: "Helvetica-Bold", marginBottom: 2 }}>
                    {edu.title}, {edu.school}
                  </Text>
                  <Text style={{ fontSize: 10, color: "#555" }}>{edu.startDate} - {edu.endDate}</Text>
                  <Text>{edu.description}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MinimalGridResume;
