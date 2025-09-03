from flask import Blueprint, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import logging

simple_contact_bp = Blueprint('simple_contact', __name__)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@simple_contact_bp.route('/simple-contact', methods=['POST'])
def handle_simple_contact():
    """Simple contact form handler that actually works"""
    try:
        data = request.get_json()
        
        # Extract form data
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        phone = data.get('phone', '').strip()
        photography_type = data.get('photography_type', '').strip()
        budget = data.get('budget', '').strip()
        message = data.get('message', '').strip()
        
        # Validate required fields
        if not name or not email:
            return jsonify({'success': False, 'error': 'Name and email are required'}), 400
        
        # Create email content
        subject = f"New Photography Inquiry from {name}"
        
        body = f"""
New photography inquiry received from Mind's Eye Photography website:

Name: {name}
Email: {email}
Phone: {phone}
Photography Type: {photography_type}
Budget: {budget}

Message:
{message}

Submitted on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

---
Reply directly to this email to respond to the client.
        """
        
        # Send email using Google SMTP
        try:
            # SMTP configuration
            smtp_server = "smtp.gmail.com"
            smtp_port = 587
            smtp_login = "rick@themindseyestudio.com"
            smtp_password = "dvke joyj ydge qcma"
            sender_email = "rick@themindseyestudio.com"
            recipient_email = "rick@themindseyestudio.com"
            
            # Create message
            msg = MIMEMultipart()
            msg['From'] = sender_email
            msg['To'] = recipient_email
            msg['Subject'] = subject
            msg['Reply-To'] = email
            msg.attach(MIMEText(body, 'plain'))
            
            # Send email
            server = smtplib.SMTP(smtp_server, smtp_port)
            server.starttls()
            server.login(smtp_login, smtp_password)
            text = msg.as_string()
            server.sendmail(sender_email, recipient_email, text)
            server.quit()
            
            logger.info(f"Email sent successfully for inquiry from {name} ({email})")
            return jsonify({
                'success': True, 
                'message': 'Thank you for your inquiry! Rick will get back to you soon.'
            }), 200
            
        except Exception as email_error:
            logger.error(f"Failed to send email: {str(email_error)}")
            return jsonify({
                'success': False, 
                'error': f'Failed to send email. Please contact rick@themindseyestudio.com directly.'
            }), 500
            
    except Exception as e:
        logger.error(f"Contact form error: {str(e)}")
        return jsonify({
            'success': False, 
            'error': 'Sorry, there was an error processing your request.'
        }), 500

