from flask import Blueprint, request, jsonify, render_template_string
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import logging

simple_contact_bp = Blueprint('simple_contact', __name__)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

CONTACT_FORM_HTML = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact - Mind's Eye Photography</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: Arial, sans-serif; 
            background: linear-gradient(135deg, #1e293b, #334155);
            color: white;
            min-height: 100vh;
            padding: 20px;
        }
        .container { 
            max-width: 800px; 
            margin: 0 auto; 
            background: rgba(30, 41, 59, 0.9);
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        h1 { 
            color: #f97316; 
            text-align: center; 
            margin-bottom: 30px; 
            font-size: 2.5em;
        }
        .form-group { 
            margin-bottom: 20px; 
        }
        label { 
            display: block; 
            margin-bottom: 5px; 
            font-weight: bold;
            color: #e2e8f0;
        }
        input, select, textarea { 
            width: 100%; 
            padding: 12px; 
            border: 1px solid #475569;
            border-radius: 5px; 
            background: #334155;
            color: white;
            font-size: 16px;
        }
        input:focus, select:focus, textarea:focus {
            outline: none;
            border-color: #f97316;
            box-shadow: 0 0 5px rgba(249, 115, 22, 0.3);
        }
        textarea { 
            height: 120px; 
            resize: vertical; 
        }
        .btn { 
            background: #f97316; 
            color: white; 
            padding: 15px 30px; 
            border: none; 
            border-radius: 5px; 
            cursor: pointer; 
            font-size: 18px;
            font-weight: bold;
            width: 100%;
            transition: background 0.3s;
        }
        .btn:hover { 
            background: #ea580c; 
        }
        .btn:disabled {
            background: #64748b;
            cursor: not-allowed;
        }
        .message { 
            padding: 15px; 
            margin: 20px 0; 
            border-radius: 5px; 
            text-align: center;
            font-weight: bold;
        }
        .success { 
            background: #10b981; 
            color: white; 
        }
        .error { 
            background: #ef4444; 
            color: white; 
        }
        .contact-info {
            background: rgba(51, 65, 85, 0.5);
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
        }
        .contact-info h2 {
            color: #f97316;
            margin-bottom: 15px;
        }
        .contact-info p {
            margin-bottom: 10px;
            font-size: 16px;
        }
        .required { color: #ef4444; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Contact Mind's Eye Photography</h1>
        
        <div class="contact-info">
            <h2>Get In Touch</h2>
            <p><strong>Email:</strong> info@themindseyestudio.com</p>
            <p><strong>Phone:</strong> 608-219-6066</p>
            <p><strong>Location:</strong> Based in Madison, WI but can travel within the state</p>
        </div>

        <div id="message"></div>
        
        <form id="contactForm">
            <div class="form-group">
                <label for="name">Name <span class="required">*</span></label>
                <input type="text" id="name" name="name" required>
            </div>
            
            <div class="form-group">
                <label for="email">Email <span class="required">*</span></label>
                <input type="email" id="email" name="email" required>
            </div>
            
            <div class="form-group">
                <label for="phone">Phone</label>
                <input type="tel" id="phone" name="phone">
            </div>
            
            <div class="form-group">
                <label for="event_date">Event Date</label>
                <input type="date" id="event_date" name="event_date">
            </div>
            
            <div class="form-group">
                <label for="photography_type">Photography Type</label>
                <select id="photography_type" name="photography_type">
                    <option value="">Select type</option>
                    <option value="Band Promotions">Band Promotions</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Event">Event</option>
                    <option value="Landscape">Landscape</option>
                    <option value="Nature">Nature</option>
                    <option value="Portrait">Portrait</option>
                    <option value="Products">Products</option>
                    <option value="Real Estate">Real Estate</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="budget">Budget Range</label>
                <select id="budget" name="budget">
                    <option value="">Select budget</option>
                    <option value="Under $500">Under $500</option>
                    <option value="$500 - $1000">$500 - $1000</option>
                    <option value="$1000 - $1500">$1000 - $1500</option>
                    <option value="Need a Quote">Need a Quote</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="message">Project Description</label>
                <textarea id="message" name="message" placeholder="Tell us about your project..."></textarea>
            </div>
            
            <div class="form-group">
                <label for="referral">How did you hear about us?</label>
                <input type="text" id="referral" name="referral" placeholder="Google, referral, social media, etc.">
            </div>
            
            <button type="submit" class="btn" id="submitBtn">Send Inquiry</button>
        </form>
    </div>

    <script>
        document.getElementById('contactForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const messageDiv = document.getElementById('message');
            
            // Disable button and show loading
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            messageDiv.innerHTML = '';
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                event_date: document.getElementById('event_date').value,
                photography_type: document.getElementById('photography_type').value,
                budget: document.getElementById('budget').value,
                message: document.getElementById('message').value,
                referral: document.getElementById('referral').value
            };
            
            try {
                const response = await fetch('/simple-contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    messageDiv.innerHTML = '<div class="message success">' + result.message + '</div>';
                    document.getElementById('contactForm').reset();
                } else {
                    messageDiv.innerHTML = '<div class="message error">' + (result.error || 'An error occurred. Please try again.') + '</div>';
                }
            } catch (error) {
                messageDiv.innerHTML = '<div class="message error">Network error. Please contact us directly at rick@themindseyestudio.com</div>';
            }
            
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Inquiry';
        });
    </script>
</body>
</html>
"""

@simple_contact_bp.route('/contact-form')
def show_contact_form():
    """Serve the contact form HTML"""
    return render_template_string(CONTACT_FORM_HTML)

@simple_contact_bp.route('/simple-contact', methods=['POST'])
def handle_simple_contact():
    """Simple contact form handler that actually works"""
    try:
        data = request.get_json()
        
        # Extract form data
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        phone = data.get('phone', '').strip()
        event_date = data.get('event_date', '').strip()
        photography_type = data.get('photography_type', '').strip()
        budget = data.get('budget', '').strip()
        message = data.get('message', '').strip()
        referral = data.get('referral', '').strip()
        
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
Event Date: {event_date}
Photography Type: {photography_type}
Budget: {budget}
How did you hear about us: {referral}

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
            sender_email = "info@themindseyestudio.com"
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

