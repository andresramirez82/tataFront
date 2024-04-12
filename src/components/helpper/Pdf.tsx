// PDFComponent.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

interface PDFComponentProps {
    content: string; // Definimos que content debe ser de tipo string
}

// Crear estilos
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    header: {
        fontSize: 24,
        marginBottom: 10
    },
    paragraph: {
        fontSize: 12,
        marginBottom: 10
    }
});

// Crear el componente PDF
const PDFComponent: React.FC<PDFComponentProps> = ({ content }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.header}>Contenido del PDF</Text>
                <Text style={styles.paragraph}>{content}</Text>
            </View>
        </Page>
    </Document>
);

export default PDFComponent;