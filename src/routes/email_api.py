from flask import Blueprint, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import logging
import os

# Create blueprint for email API
email_api = Blueprint('email_api', __name__)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@email_api.route('/api/send-email', methods=['POST'])
def send_email():
    try:
        # Get form data
        data = request.get_json()
        
        name = data.get('name', '')
        email = data.get('email', '')
        phone = data.get('phone', '')
        event_date = data.get('eventDate', '')
        photography_type = data.get('photographyType', '')
        budget = data.get('budget', '')
        hear_about = data.get('hearAbout', '')
        message = data.get('message', '')
        
        # Validate required fields
        if not name or not email or not message:
            return jsonify({
                'success': False,
                'error': 'Name, email, and message are required fields.'
            }), 400
        
        # Create email subject and body
        subject = f"New Photography Inquiry from {name}"
        
        body = f"""
New photography inquiry received:

Name: {name}
Email: {email}
Phone: {phone}
Event Date: {event_date}
Photography Type: {photography_type}
Budget Range: {budget}
How they heard about us: {hear_about}

Message:
{message}

---
Reply directly to this email to respond to the client.
        """
        
        # Gmail SMTP configuration
        smtp_server = "smtp.gmail.com"
        smtp_port = 587
        smtp_username = "rick@rickcorey.com"
        smtp_password = "ztht nmbi ytjg mzij"
        
        # Create message
        msg = MIMEMultipart()
        msg['From'] = smtp_username
        msg['To'] = "info@themindseyestudio.com"
        msg['Subject'] = subject
        msg['Reply-To'] = email  # Allow direct reply to client
        msg.attach(MIMEText(body, 'plain'))
        
        # Send email
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_username, smtp_password)
        server.send_message(msg)
        server.quit()
        
        logger.info(f"Email sent successfully for inquiry from {name} ({email})")
        
        return jsonify({
            'success': True,
            'message': 'Thank you for your inquiry! Rick will get back to you soon.'
        }), 200
        
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to send email. Please contact info@themindseyestudio.com directly.'
        }), 500

@email_api.route('/api/test-email', methods=['GET'])
def test_email():
    """Test endpoint to verify email functionality"""
    try:
        # Test SMTP connection
        smtp_server = "smtp.gmail.com"
        smtp_port = 587
        smtp_username = "rick@rickcorey.com"
        smtp_password = "ztht nmbi ytjg mzij"
        
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_username, smtp_password)
        server.quit()
        
        return jsonify({
            'success': True,
            'message': 'SMTP connection successful'
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'SMTP connection failed: {str(e)}'
        }), 500

