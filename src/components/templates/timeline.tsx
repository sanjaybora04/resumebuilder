import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeType } from '@/lib/types';

const CenteredTimelineResume = ({ details }: { details: ResumeType }) => {
    const styles = StyleSheet.create({
        page: {
            padding: 40,
            fontFamily: "Helvetica",
            fontSize: 12,
            color: "#333",
            backgroundColor: "#fff",
        },
        header: {
            textAlign: "center",
            marginBottom: 20,
        },
        name: {
            fontSize: 28,
            fontFamily: "Helvetica-Bold",
            marginBottom: 4,
        },
        profession: {
            fontSize: 14,
            color: "#555",
            marginBottom: 8,
        },
        contact: {
            fontSize: 10,
            color: "#777",
        },
        timeline: {
            marginTop: 20,
            paddingHorizontal: 10,
            borderLeft: `2px solid ${details.primaryColor}`,
        },
        timelineItem: {
            marginBottom: 20,
            paddingLeft: 20,
            position: "relative",
        },
        timelineDot: {
            width: 10,
            height: 10,
            backgroundColor: details.primaryColor,
            borderRadius: 5,
            position: "absolute",
            left: -6,
            top: 2,
        },
        sectionTitle: {
            fontSize: 16,
            fontFamily: "Helvetica-Bold",
            color: details.primaryColor,
            marginBottom: 10,
        },
        text: {
            marginBottom: 5,
        },
        skillsContainer: {
            marginTop: 20,
            textAlign: "center",
        },
        skillChip: {
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
                        {details.links.map((link,index) => (
                            <Link key={index} src={link.url} style={styles.link}>
                                {link.name}
                            </Link>
                        ))}
                    </View>
                </View>

                {/* Timeline Section */}
                <View style={styles.timeline}>
                    {/* Summary */}
                    <View style={styles.timelineItem}>
                        <View style={styles.timelineDot}></View>
                        <Text style={styles.sectionTitle}>Summary</Text>
                        <Text style={styles.text}>{details.summary}</Text>
                    </View>

                    {/* Work Experience */}
                    <View style={styles.timelineItem}>
                        <View style={styles.timelineDot}></View>
                        <Text style={styles.sectionTitle}>Work Experience</Text>
                        {details.experience.map((exp,index) => (
                            <View key={index} style={{ marginBottom: 10 }}>
                                <Text style={{ fontFamily: "Helvetica-Bold", marginBottom: 2 }}>
                                    {exp.title}, {exp.company}
                                </Text>
                                <Text style={{ fontSize: 10, color: "#555" }}>{exp.startDate} - {exp.endDate}</Text>
                                <Text>{exp.description}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Education */}
                    <View style={styles.timelineItem}>
                        <View style={styles.timelineDot}></View>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {details.education.map((edu,index) => (
                            <View key={index} style={{ marginBottom: 10 }}>
                                <Text style={{ fontFamily: "Helvetica-Bold", marginBottom: 2 }}>
                                    {edu.title}, {edu.school}
                                </Text>
                                <Text style={{ fontSize: 10, color: "#555" }}>{edu.startDate} - {edu.endDate}</Text>
                                <Text>{edu.description}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Skills Section */}
                <View style={styles.skillsContainer}>
                    <Text style={styles.sectionTitle}>Skills</Text>
                    <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                        {details.skills.map((skill,index) => (
                            <Text key={index} style={styles.skillChip}>{skill}</Text>
                        ))}
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default CenteredTimelineResume;
