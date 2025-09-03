import React, { useState } from 'react';

function SimpleContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Let Formspree handle the form submission
    const form = e.target;
    const formData = new FormData(form);
    
    try {
      const response = await fetch('https://formspree.io/f/xdkogkpv', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setSubmitted(true);
        form.reset();
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="contact-form-container">
        <div className="success-message">
          <h2>Thank You!</h2>
          <p>Your message has been sent successfully. Rick will get back to you soon!</p>
          <p><strong>For fastest response:</strong></p>
          <p>📧 Email: <a href="mailto:info@themindseyestudio.com">info@themindseyestudio.com</a></p>
          <p>📞 Phone: <a href="tel:608-219-6066">608-219-6066</a></p>
          <button onClick={() => setSubmitted(false)} className="new-message-btn">
            Send Another Message
          </button>
        </div>
        <style jsx>{`
          .contact-form-container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background: #2a2a2a;
            border-radius: 10px;
            color: white;
            text-align: center;
          }
          .success-message {
            padding: 40px 20px;
          }
          .success-message h2 {
            color: #ff6b35;
            margin-bottom: 20px;
          }
          .success-message p {
            margin: 10px 0;
            font-size: 16px;
          }
          .success-message a {
            color: #ff6b35;
            text-decoration: none;
          }
          .success-message a:hover {
            text-decoration: underline;
          }
          .new-message-btn {
            background: #ff6b35;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 20px;
          }
          .new-message-btn:hover {
            background: #e55a2b;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="contact-form-container">
      <h2>Contact Mind's Eye Photography</h2>
      
      <div className="contact-info">
        <p><strong>📧 Email:</strong> <a href="mailto:info@themindseyestudio.com">info@themindseyestudio.com</a></p>
        <p><strong>📞 Phone:</strong> <a href="tel:608-219-6066">608-219-6066</a></p>
        <p><strong>📍 Location:</strong> Based in Madison, WI but can travel within the state</p>
        <p style={{color: '#ff6b35', fontSize: '18px', fontWeight: 'bold'}}>
          ⚡ For fastest response, call or email directly!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="contact-form">
        <input type="hidden" name="_to" value="info@themindseyestudio.com" />
        <input type="hidden" name="_subject" value="New Photography Inquiry from Website" />
        <input type="hidden" name="_next" value="thank-you" />
        
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input 
            type="text" 
            id="name"
            name="name"
            required
            placeholder="Your Name" 
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input 
            type="email" 
            id="email"
            name="email"
            required
            placeholder="Your Email" 
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input 
            type="tel" 
            id="phone"
            name="phone"
            placeholder="Your Phone Number" 
          />
        </div>

        <div className="form-group">
          <label htmlFor="eventDate">Event Date</label>
          <input 
            type="date" 
            id="eventDate"
            name="eventDate"
          />
        </div>

        <div className="form-group">
          <label htmlFor="photographyType">Photography Type</label>
          <select id="photographyType" name="photographyType">
            <option value="">Select Photography Type</option>
            <option value="Wedding">Wedding</option>
            <option value="Portrait">Portrait</option>
            <option value="Event">Event</option>
            <option value="Corporate">Corporate</option>
            <option value="Family">Family</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="budget">Budget Range</label>
          <select id="budget" name="budget">
            <option value="">Select Budget Range</option>
            <option value="Under $500">Under $500</option>
            <option value="$500 - $1000">$500 - $1000</option>
            <option value="$1000 - $1500">$1000 - $1500</option>
            <option value="$1500 - $2500">$1500 - $2500</option>
            <option value="$2500+">$2500+</option>
            <option value="Need a Quote">Need a Quote</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="hearAbout">How did you hear about us?</label>
          <select id="hearAbout" name="hearAbout">
            <option value="">Select an option</option>
            <option value="Google Search">Google Search</option>
            <option value="Social Media">Social Media</option>
            <option value="Referral">Referral</option>
            <option value="Website">Website</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="message">Project Description *</label>
          <textarea 
            id="message"
            name="message"
            required
            placeholder="Tell us about your photography needs, event details, timeline, and any specific requirements..." 
            rows="6"
          />
        </div>

        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? '📤 Sending...' : '📧 Send Inquiry'}
        </button>
      </form>

      <style jsx>{`
        .contact-form-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background: #2a2a2a;
          border-radius: 10px;
          color: white;
        }
        
        .contact-info {
          background: #1a1a1a;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 30px;
          text-align: center;
        }
        
        .contact-info p {
          margin: 12px 0;
          font-size: 16px;
        }
        
        .contact-info a {
          color: #ff6b35;
          text-decoration: none;
        }
        
        .contact-info a:hover {
          text-decoration: underline;
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: #ff6b35;
          font-weight: bold;
          font-size: 16px;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 12px;
          border: 2px solid #444;
          border-radius: 5px;
          background: #333;
          color: white;
          font-size: 16px;
          transition: border-color 0.3s;
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #ff6b35;
        }
        
        .submit-button {
          width: 100%;
          padding: 18px;
          background: #ff6b35;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .submit-button:hover:not(:disabled) {
          background: #e55a2b;
          transform: translateY(-2px);
        }
        
        .submit-button:disabled {
          background: #999;
          cursor: not-allowed;
          transform: none;
        }
      `}</style>
    </div>
  );
}

export default SimpleContactForm;

