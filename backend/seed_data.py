"""
Seed Data Script - Populate OpsMind AI Database with Sample Data
Run this once to populate realistic sample data for demo purposes
"""

import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from database import SessionLocal, engine
from models import (
    Base, User, Operation, Resource, Prediction, 
    RiskAnalysis, Recommendation, AnomalyDetection, 
    HealthScore, AIAssistantLog, DigitalTwin, Report, Notification
)
from datetime import datetime, timedelta

# Create all tables
Base.metadata.create_all(bind=engine)

db = SessionLocal()

def clear_database():
    """Clear all existing data"""
    db.query(Notification).delete()
    db.query(Report).delete()
    db.query(DigitalTwin).delete()
    db.query(AIAssistantLog).delete()
    db.query(HealthScore).delete()
    db.query(AnomalyDetection).delete()
    db.query(Recommendation).delete()
    db.query(RiskAnalysis).delete()
    db.query(Prediction).delete()
    db.query(Resource).delete()
    db.query(Operation).delete()
    db.query(User).delete()
    db.commit()
    print("✅ Database cleared")

def seed_users():
    """Create sample users"""
    users = [
        User(name="Admin User", email="admin@opsmind.com", password="admin123", role="Admin"),
        User(name="Manager John", email="john@opsmind.com", password="pass123", role="Manager"),
        User(name="Employee Sarah", email="sarah@opsmind.com", password="pass123", role="Employee"),
        User(name="Employee Mike", email="mike@opsmind.com", password="pass123", role="Employee"),
        User(name="Manager Alice", email="alice@opsmind.com", password="pass123", role="Manager"),
    ]
    db.add_all(users)
    db.commit()
    print(f"✅ Created {len(users)} users")
    return users

def seed_operations():
    """Create sample operations"""
    operations = [
        Operation(
            operation_name="Q1 Production Run",
            workflow_status="Completed",
            start_date="2024-01-01",
            end_date="2024-03-31",
            performance_score=92.5,
            user_id=1
        ),
        Operation(
            operation_name="Q2 Supply Chain",
            workflow_status="InProgress",
            start_date="2024-04-01",
            end_date="2024-06-30",
            performance_score=85.3,
            user_id=2
        ),
        Operation(
            operation_name="Q3 Distribution",
            workflow_status="Pending",
            start_date="2024-07-01",
            end_date="2024-09-30",
            performance_score=0.0,
            user_id=3
        ),
        Operation(
            operation_name="Maintenance Operations",
            workflow_status="InProgress",
            start_date="2024-05-15",
            end_date="2024-08-15",
            performance_score=78.9,
            user_id=2
        ),
        Operation(
            operation_name="Customer Service Ops",
            workflow_status="Completed",
            start_date="2024-02-01",
            end_date="2024-04-30",
            performance_score=88.7,
            user_id=1
        ),
        Operation(
            operation_name="Data Analysis Project",
            workflow_status="InProgress",
            start_date="2024-06-01",
            end_date="2024-08-31",
            performance_score=91.2,
            user_id=3
        ),
        Operation(
            operation_name="Infrastructure Upgrade",
            workflow_status="Pending",
            start_date="2024-08-01",
            end_date="2024-10-31",
            performance_score=0.0,
            user_id=2
        ),
        Operation(
            operation_name="Quality Assurance",
            workflow_status="Completed",
            start_date="2024-03-15",
            end_date="2024-05-15",
            performance_score=95.1,
            user_id=1
        ),
    ]
    db.add_all(operations)
    db.commit()
    print(f"✅ Created {len(operations)} operations")
    return operations

def seed_resources():
    """Create sample resources"""
    resources = [
        Resource(
            operation_id=1,
            resource_name="Server-01",
            resource_type="Computing",
            utilization_rate=85.5,
            availability_status="InUse"
        ),
        Resource(
            operation_id=1,
            resource_name="Database-Primary",
            resource_type="Storage",
            utilization_rate=72.3,
            availability_status="InUse"
        ),
        Resource(
            operation_id=2,
            resource_name="LoadBalancer-01",
            resource_type="Networking",
            utilization_rate=65.0,
            availability_status="InUse"
        ),
        Resource(
            operation_id=2,
            resource_name="Backup-Storage",
            resource_type="Storage",
            utilization_rate=45.2,
            availability_status="Available"
        ),
        Resource(
            operation_id=3,
            resource_name="Worker-Pool-01",
            resource_type="Computing",
            utilization_rate=0.0,
            availability_status="Unavailable"
        ),
        Resource(
            operation_id=4,
            resource_name="Cache-Server",
            resource_type="Memory",
            utilization_rate=78.9,
            availability_status="InUse"
        ),
        Resource(
            operation_id=5,
            resource_name="API-Gateway",
            resource_type="Networking",
            utilization_rate=82.1,
            availability_status="InUse"
        ),
        Resource(
            operation_id=6,
            resource_name="Analytics-Engine",
            resource_type="Computing",
            utilization_rate=88.5,
            availability_status="InUse"
        ),
    ]
    db.add_all(resources)
    db.commit()
    print(f"✅ Created {len(resources)} resources")
    return resources

def seed_predictions():
    """Create sample predictions"""
    predictions = [
        Prediction(
            operation_id=1,
            prediction_type="Performance",
            predicted_value=94.2,
            prediction_date="2024-07-10",
            model_used="RandomForest"
        ),
        Prediction(
            operation_id=2,
            prediction_type="Resource Demand",
            predicted_value=78.5,
            prediction_date="2024-07-10",
            model_used="RandomForest"
        ),
        Prediction(
            operation_id=3,
            prediction_type="Completion Time",
            predicted_value=62.3,
            prediction_date="2024-07-10",
            model_used="RandomForest"
        ),
        Prediction(
            operation_id=4,
            prediction_type="Efficiency",
            predicted_value=85.0,
            prediction_date="2024-07-10",
            model_used="RandomForest"
        ),
        Prediction(
            operation_id=5,
            prediction_type="Cost Overrun",
            predicted_value=15.2,
            prediction_date="2024-07-10",
            model_used="RandomForest"
        ),
        Prediction(
            operation_id=6,
            prediction_type="Success Rate",
            predicted_value=92.8,
            prediction_date="2024-07-10",
            model_used="RandomForest"
        ),
    ]
    db.add_all(predictions)
    db.commit()
    print(f"✅ Created {len(predictions)} predictions")
    return predictions

def seed_risks():
    """Create sample risk analyses"""
    risks = [
        RiskAnalysis(
            prediction_id=1,
            risk_level="Low",
            risk_description="Performance stable, minor optimization possible",
            risk_score=15.5
        ),
        RiskAnalysis(
            prediction_id=2,
            risk_level="Medium",
            risk_description="Resource demand increase detected, monitor closely",
            risk_score=45.3
        ),
        RiskAnalysis(
            prediction_id=3,
            risk_level="High",
            risk_description="Delays expected, resource allocation critical",
            risk_score=72.8
        ),
        RiskAnalysis(
            prediction_id=4,
            risk_level="Medium",
            risk_description="Maintenance needs attention in next phase",
            risk_score=52.1
        ),
        RiskAnalysis(
            prediction_id=5,
            risk_level="Low",
            risk_description="Budget on track, no significant overrun expected",
            risk_score=22.5
        ),
        RiskAnalysis(
            prediction_id=6,
            risk_level="Low",
            risk_description="Project tracking well against objectives",
            risk_score=18.9
        ),
    ]
    db.add_all(risks)
    db.commit()
    print(f"✅ Created {len(risks)} risk analyses")
    return risks

def seed_recommendations():
    """Create sample recommendations"""
    recommendations = [
        Recommendation(
            risk_id=1,
            recommendation_text="Continue current optimization strategy",
            priority="Low",
            generated_date="2024-07-10"
        ),
        Recommendation(
            risk_id=2,
            recommendation_text="Allocate additional resources immediately",
            priority="High",
            generated_date="2024-07-10"
        ),
        Recommendation(
            risk_id=2,
            recommendation_text="Implement load balancing for better distribution",
            priority="High",
            generated_date="2024-07-10"
        ),
        Recommendation(
            risk_id=3,
            recommendation_text="Expedite critical path activities",
            priority="High",
            generated_date="2024-07-10"
        ),
        Recommendation(
            risk_id=3,
            recommendation_text="Consider parallel processing options",
            priority="High",
            generated_date="2024-07-10"
        ),
        Recommendation(
            risk_id=4,
            recommendation_text="Schedule preventive maintenance",
            priority="Medium",
            generated_date="2024-07-10"
        ),
        Recommendation(
            risk_id=5,
            recommendation_text="Maintain current spending levels",
            priority="Low",
            generated_date="2024-07-10"
        ),
        Recommendation(
            risk_id=6,
            recommendation_text="Document current best practices",
            priority="Low",
            generated_date="2024-07-10"
        ),
    ]
    db.add_all(recommendations)
    db.commit()
    print(f"✅ Created {len(recommendations)} recommendations")
    return recommendations

def seed_anomalies():
    """Create sample anomalies"""
    anomalies = [
        AnomalyDetection(
            operation_id=1,
            anomaly_type="Performance Spike",
            anomaly_description="Unexpected performance increase detected",
            severity="Medium"
        ),
        AnomalyDetection(
            operation_id=2,
            anomaly_type="Resource Bottleneck",
            anomaly_description="CPU usage exceeding threshold",
            severity="High"
        ),
        AnomalyDetection(
            operation_id=3,
            anomaly_type="Schedule Deviation",
            anomaly_description="Project behind schedule by 3 days",
            severity="High"
        ),
        AnomalyDetection(
            operation_id=4,
            anomaly_type="Memory Leak",
            anomaly_description="Memory consumption growing abnormally",
            severity="Medium"
        ),
        AnomalyDetection(
            operation_id=5,
            anomaly_type="Cost Anomaly",
            anomaly_description="Unexpected cost spikes detected",
            severity="Low"
        ),
        AnomalyDetection(
            operation_id=6,
            anomaly_type="Data Inconsistency",
            anomaly_description="Possible data corruption detected",
            severity="Medium"
        ),
    ]
    db.add_all(anomalies)
    db.commit()
    print(f"✅ Created {len(anomalies)} anomalies")
    return anomalies

def seed_health_scores():
    """Create sample health scores"""
    health_scores = [
        HealthScore(
            operation_id=1,
            efficiency_score=92.5,
            productivity_score=90.1,
            overall_score=91.3
        ),
        HealthScore(
            operation_id=2,
            efficiency_score=85.3,
            productivity_score=82.7,
            overall_score=84.0
        ),
        HealthScore(
            operation_id=3,
            efficiency_score=65.0,
            productivity_score=60.5,
            overall_score=62.8
        ),
        HealthScore(
            operation_id=4,
            efficiency_score=78.9,
            productivity_score=80.2,
            overall_score=79.5
        ),
        HealthScore(
            operation_id=5,
            efficiency_score=88.7,
            productivity_score=89.2,
            overall_score=89.0
        ),
        HealthScore(
            operation_id=6,
            efficiency_score=91.2,
            productivity_score=93.5,
            overall_score=92.4
        ),
        HealthScore(
            operation_id=7,
            efficiency_score=70.0,
            productivity_score=68.5,
            overall_score=69.3
        ),
        HealthScore(
            operation_id=8,
            efficiency_score=95.1,
            productivity_score=94.8,
            overall_score=95.0
        ),
    ]
    db.add_all(health_scores)
    db.commit()
    print(f"✅ Created {len(health_scores)} health scores")
    return health_scores

def seed_reports():
    """Create sample reports"""
    reports = [
        Report(
            user_id=1,
            report_title="Q1 Operations Summary",
            report_content="Q1 achieved 92.5% performance score. All major operations completed on time. Resources utilized efficiently."
        ),
        Report(
            user_id=2,
            report_title="Q2 Performance Analysis",
            report_content="Q2 shows 85.3% efficiency. Some resource bottlenecks observed. Recommendations: allocate additional computing resources."
        ),
        Report(
            user_id=3,
            report_title="Risk Assessment Report",
            report_content="Current risk level: Medium. Identified 6 potential issues. Mitigation strategies recommended."
        ),
        Report(
            user_id=1,
            report_title="ML Predictions Overview",
            report_content="ML model predicting 94.2% success rate for ongoing operations. Anomalies detected in 3 operations."
        ),
    ]
    db.add_all(reports)
    db.commit()
    print(f"✅ Created {len(reports)} reports")
    return reports

def seed_notifications():
    """Create sample notifications"""
    notifications = [
        Notification(
            user_id=1,
            message="Operation Q1 Production Run completed successfully",
            is_read=True
        ),
        Notification(
            user_id=2,
            message="Resource allocation warning: Server-01 utilization at 85.5%",
            is_read=False
        ),
        Notification(
            user_id=3,
            message="Anomaly detected: Schedule deviation in Q3 Distribution",
            is_read=False
        ),
        Notification(
            user_id=1,
            message="New prediction available: Performance forecast 94.2%",
            is_read=True
        ),
        Notification(
            user_id=2,
            message="Risk level updated to High for operation Q3",
            is_read=False
        ),
        Notification(
            user_id=3,
            message="Recommendation: Implement load balancing",
            is_read=False
        ),
        Notification(
            user_id=1,
            message="Health score updated: Overall operation health 91.3%",
            is_read=True
        ),
    ]
    db.add_all(notifications)
    db.commit()
    print(f"✅ Created {len(notifications)} notifications")
    return notifications

def seed_ai_logs():
    """Create sample AI assistant logs"""
    logs = [
        AIAssistantLog(
            user_id=1,
            user_query="What is the performance of Q1 operations?",
            ai_response="Q1 Production Run achieved 92.5% performance score and was completed successfully on schedule."
        ),
        AIAssistantLog(
            user_id=2,
            user_query="Which resources need attention?",
            ai_response="Server-01 utilization is at 85.5% and Database-Primary at 72.3%. Consider load balancing."
        ),
        AIAssistantLog(
            user_id=3,
            user_query="What are the high-risk operations?",
            ai_response="Q3 Distribution and Infrastructure Upgrade are flagged as high-risk. See recommendations for mitigation."
        ),
        AIAssistantLog(
            user_id=1,
            user_query="Predict next quarter performance",
            ai_response="ML model predicts 94.2% success rate for Q2 Supply Chain based on current trajectory and resource allocation."
        ),
    ]
    db.add_all(logs)
    db.commit()
    print(f"✅ Created {len(logs)} AI assistant logs")
    return logs

def seed_digital_twins():
    """Create sample digital twins"""
    twins = [
        DigitalTwin(
            operation_id=1,
            simulation_name="Q1 Best Case Scenario",
            scenario_data='{"resources": "optimal", "timeline": "accelerated"}',
            simulation_result='{"outcome": "success", "efficiency": 98.5}'
        ),
        DigitalTwin(
            operation_id=2,
            simulation_name="Q2 Risk Mitigation",
            scenario_data='{"resources": "increased", "risk_level": "reduced"}',
            simulation_result='{"outcome": "improved", "efficiency": 89.3}'
        ),
        DigitalTwin(
            operation_id=3,
            simulation_name="Q3 Recovery Plan",
            scenario_data='{"resources": "doubled", "timeline": "extended"}',
            simulation_result='{"outcome": "recovery", "efficiency": 75.5}'
        ),
    ]
    db.add_all(twins)
    db.commit()
    print(f"✅ Created {len(twins)} digital twins")
    return twins

def main():
    """Main function to seed all data"""
    try:
        print("\n" + "="*50)
        print("🌱 OpsMind AI - Database Seeding Started!")
        print("="*50 + "\n")
        
        # Clear existing data
        clear_database()
        
        # Seed all data
        seed_users()
        seed_operations()
        seed_resources()
        seed_predictions()
        seed_risks()
        seed_recommendations()
        seed_anomalies()
        seed_health_scores()
        seed_reports()
        seed_notifications()
        seed_ai_logs()
        seed_digital_twins()
        
        print("\n" + "="*50)
        print("✅ Database Seeding Completed Successfully!")
        print("="*50)
        print("\n📊 Sample Data Added:")
        print("   ✅ 5 Users (Admin, Managers, Employees)")
        print("   ✅ 8 Operations")
        print("   ✅ 8 Resources")
        print("   ✅ 6 Predictions")
        print("   ✅ 6 Risk Analyses")
        print("   ✅ 8 Recommendations")
        print("   ✅ 6 Anomalies")
        print("   ✅ 8 Health Scores")
        print("   ✅ 4 Reports")
        print("   ✅ 7 Notifications")
        print("   ✅ 4 AI Assistant Logs")
        print("   ✅ 3 Digital Twins")
        print("\n🎯 Now you can:")
        print("   • Login with: admin@opsmind.com / admin123")
        print("   • See full project with data!")
        print("   • Test all features")
        print("   • Deploy to Render\n")
        
        db.close()
        
    except Exception as e:
        print(f"❌ Error during seeding: {str(e)}")
        db.close()
        raise

if __name__ == "__main__":
    main()