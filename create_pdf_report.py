import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, HRFlowable, KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    """Two-pass canvas to dynamically calculate total page count and draw running header/footer."""
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#64748B"))
        
        # Header (pages > 1)
        if self._pageNumber > 1:
            self.drawString(54, 750, "OpsMind AI — Technical & Executive Project Report")
            self.setStrokeColor(colors.HexColor("#CBD5E1"))
            self.setLineWidth(0.5)
            self.line(54, 742, 612 - 54, 742)

        # Footer (all pages)
        self.setStrokeColor(colors.HexColor("#CBD5E1"))
        self.setLineWidth(0.5)
        self.line(54, 45, 612 - 54, 45)
        
        self.setFont("Helvetica", 8)
        self.drawString(54, 32, "Confidential & Proprietary — OpsMind AI System")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(612 - 54, 32, page_str)
        self.restoreState()

def build_pdf_report(filename="OpsMind_AI_Project_Report.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=60,
        bottomMargin=60
    )

    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=colors.HexColor('#0F172A'),
        spaceAfter=6
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#2563EB'),
        spaceAfter=15
    )

    h1_style = ParagraphStyle(
        'SectionH1',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=18,
        textColor=colors.HexColor('#0F172A'),
        spaceBefore=14,
        spaceAfter=8,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'SectionH2',
        parent=styles['Heading3'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=colors.HexColor('#1E293B'),
        spaceBefore=8,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor('#334155'),
        spaceAfter=6
    )

    bullet_style = ParagraphStyle(
        'BulletText',
        parent=body_style,
        leftIndent=12,
        spaceAfter=4
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=11,
        textColor=colors.white,
        alignment=0
    )

    table_cell_style = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor('#1E293B')
    )

    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor('#0F172A')
    )

    elements = []

    # Title Header Block
    elements.append(Paragraph("⚙️ OpsMind AI", title_style))
    elements.append(Paragraph("AI Powered Operational Management System with Predictive Intelligence & Autonomous Decision Support", subtitle_style))
    elements.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#2563EB'), spaceAfter=15))

    # Metadata Box
    meta_data = [
        [Paragraph("<b>Project Title:</b> OpsMind AI", table_cell_style), Paragraph("<b>Version:</b> 1.0.0 Production", table_cell_style)],
        [Paragraph("<b>Author / Lead:</b> Operational Engineering Team", table_cell_style), Paragraph("<b>Status:</b> Fully Implemented & Deployed", table_cell_style)],
        [Paragraph("<b>Repository:</b> GitHub / Ragavimurugesh / opsmindai", table_cell_style), Paragraph("<b>Database:</b> SQLite (12 Tables Seeded)", table_cell_style)]
    ]
    t_meta = Table(meta_data, colWidths=[250, 254])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F8FAFC')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#E2E8F0')),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('PADDING', (0,0), (-1,-1), 6),
    ]))
    elements.append(t_meta)
    elements.append(Spacer(1, 15))

    # Section 1: Executive Summary & Problem Statement
    elements.append(Paragraph("1. Executive Summary & Problem Statement", h1_style))
    elements.append(Paragraph(
        "Modern enterprises face major operational challenges including bottleneck delays, resource underutilization, "
        "unforeseen workflow risks, and delayed decision-making. Conventional operations tools function strictly as passive databases "
        "without offering proactive risk forecasting or predictive suggestions.",
        body_style
    ))
    elements.append(Paragraph(
        "<b>OpsMind AI</b> solves this problem by combining <b>Artificial Intelligence</b>, <b>Predictive Analytics</b>, "
        "<b>Digital Twin Simulation</b>, and <b>Autonomous Decision Support</b>. The system dynamically predicts operational risks, "
        "simulates scenario changes, flags abnormal behaviors, and gives managers real-time actionable recommendations.",
        body_style
    ))
    elements.append(Spacer(1, 10))

    # Section 2: Core Objectives & Innovations
    elements.append(Paragraph("2. System Objectives & Key Innovations", h1_style))
    innovations = [
        "<b>🔮 Digital Twin Simulation:</b> Virtual environment allowing managers to run 'what-if' resource allocation scenarios before committing physical assets.",
        "<b>🤖 AI Risk Prediction:</b> Machine learning models forecasting operational completion probabilities, efficiency scores, and potential delays.",
        "<b>💡 Autonomous Decision Support:</b> Auto-generated actionable recommendations for load balancing, cost optimization, and preventative maintenance.",
        "<b>💚 Operational Health Index:</b> Real-time 0–100 composite scoring dashboard assessing overall enterprise health.",
        "<b>🔍 Anomaly Detection Engine:</b> Continuous monitoring algorithm detecting unusual resource usage spikes and schedule delays.",
        "<b>🧠 Generative AI Assistant:</b> Intelligent conversational chatbot providing real-time operational query responses."
    ]
    for item in innovations:
        elements.append(Paragraph(f"• {item}", bullet_style))
    elements.append(Spacer(1, 10))

    # Section 3: Architecture & Technology Stack
    elements.append(Paragraph("3. System Architecture & Tech Stack", h1_style))
    tech_table_data = [
        [Paragraph("Layer", table_header_style), Paragraph("Technologies", table_header_style), Paragraph("Purpose & Details", table_header_style)],
        [Paragraph("Frontend UI", table_cell_bold), Paragraph("React 18, React Router v6, Axios, Custom Dark CSS", table_cell_style), Paragraph("Interactive dashboard, telemetry widgets, glassmorphism UI layout", table_cell_style)],
        [Paragraph("Backend API", table_cell_bold), Paragraph("Python 3.11, FastAPI, Uvicorn, Pydantic", table_cell_style), Paragraph("RESTful micro-service API endpoints, CORS support, router modules", table_cell_style)],
        [Paragraph("Machine Learning", table_cell_bold), Paragraph("Scikit-Learn, RandomForest, NumPy, Pandas", table_cell_style), Paragraph("Predictive modeling for performance & risk scoring", table_cell_style)],
        [Paragraph("Database Layer", table_cell_bold), Paragraph("SQLite 3, SQLAlchemy ORM", table_cell_style), Paragraph("12 relational tables storing operational entities and system logs", table_cell_style)],
    ]
    t_tech = Table(tech_table_data, colWidths=[90, 190, 224])
    t_tech.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0F172A')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor('#F8FAFC')]),
        ('PADDING', (0,0), (-1,-1), 5),
    ]))
    elements.append(t_tech)
    elements.append(Spacer(1, 15))

    # Section 4: Relational Database Schema (12 Tables)
    elements.append(Paragraph("4. Database Architecture (12 Relational Tables)", h1_style))
    db_table_data = [
        [Paragraph("Table Name", table_header_style), Paragraph("Primary Key", table_header_style), Paragraph("Description & Attributes", table_header_style)],
        [Paragraph("Users", table_cell_bold), Paragraph("user_id", table_cell_style), Paragraph("User credentials, emails, passwords, and RBAC roles (Admin, Manager, Employee)", table_cell_style)],
        [Paragraph("Operations", table_cell_bold), Paragraph("operation_id", table_cell_style), Paragraph("Operational workflows, status (Pending/InProgress/Completed), performance scores", table_cell_style)],
        [Paragraph("Resources", table_cell_bold), Paragraph("resource_id", table_cell_style), Paragraph("Hardware/Cloud assets, utilization rates (%), and availability statuses", table_cell_style)],
        [Paragraph("Digital_Twin", table_cell_bold), Paragraph("twin_id", table_cell_style), Paragraph("Simulation scenarios, virtual environment parameters, and outcome outputs", table_cell_style)],
        [Paragraph("Predictions", table_cell_bold), Paragraph("prediction_id", table_cell_style), Paragraph("ML prediction outputs, target metrics, prediction dates, and model names", table_cell_style)],
        [Paragraph("Risk_Analysis", table_cell_bold), Paragraph("risk_id", table_cell_style), Paragraph("Risk level classifications (Low/Medium/High/Critical) and risk scores", table_cell_style)],
        [Paragraph("Recommendations", table_cell_bold), Paragraph("recommendation_id", table_cell_style), Paragraph("Autonomous AI suggestions, priority flags, and action dates", table_cell_style)],
        [Paragraph("Anomaly_Detection", table_cell_bold), Paragraph("anomaly_id", table_cell_style), Paragraph("Detected anomalies, severity flags, and automated system alerts", table_cell_style)],
        [Paragraph("Health_Score", table_cell_bold), Paragraph("score_id", table_cell_style), Paragraph("Efficiency score, productivity score, and overall composite score", table_cell_style)],
        [Paragraph("Reports", table_cell_bold), Paragraph("report_id", table_cell_style), Paragraph("Generated operational executive reports and analytics content", table_cell_style)],
        [Paragraph("Notifications", table_cell_bold), Paragraph("notification_id", table_cell_style), Paragraph("Event-driven system alerts, unread states, and timestamp logs", table_cell_style)],
        [Paragraph("AI_Assistant_Logs", table_cell_bold), Paragraph("log_id", table_cell_style), Paragraph("Conversational history, user queries, and AI assistant response logs", table_cell_style)],
    ]
    t_db = Table(db_table_data, colWidths=[110, 80, 314])
    t_db.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#1E293B')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor('#F8FAFC')]),
        ('PADDING', (0,0), (-1,-1), 4.5),
    ]))
    elements.append(t_db)
    elements.append(Spacer(1, 15))

    # Section 5: Verification & Deployment Results
    elements.append(Paragraph("5. Verification & Deployment Results", h1_style))
    results = [
        "<b>Backend Server Health:</b> FastAPI running on <code>http://127.0.0.1:8000</code> with CORS enabled.",
        "<b>Frontend Build Status:</b> React application compiled successfully into optimized production build.",
        "<b>Database Seeding:</b> Automated <code>seed_data.py</code> script populated 12 database tables with 80+ records.",
        "<b>API Telemetry Test:</b> All 13 module endpoints responding with <b>HTTP 200 OK</b>.",
        "<b>GitHub Repository:</b> Code committed and pushed to <code>https://github.com/Ragavimurugesh/ai-powered-operational-management-system</code>."
    ]
    for r in results:
        elements.append(Paragraph(f"✓ {r}", bullet_style))

    elements.append(Spacer(1, 20))
    elements.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#CBD5E1'), spaceAfter=10))
    elements.append(Paragraph("<b>End of Report — OpsMind AI System Documentation</b>", ParagraphStyle('End', parent=body_style, alignment=1, fontName='Helvetica-Oblique', textColor=colors.HexColor('#64748B'))))

    # Build PDF with NumberedCanvas
    doc.build(elements, canvasmaker=NumberedCanvas)
    print(f"PDF Report generated successfully: {filename}")

if __name__ == "__main__":
    build_pdf_report()
