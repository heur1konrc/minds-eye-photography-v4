import React, { useState } from 'react';

function WorkingContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    photographyType: '',
    budget: '',
    hearAbout: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create email content
    const subject = `Photography Inquiry from ${formData.name}`;
    const body = `
New photography inquiry:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Event Date: ${formData.eventDate || 'Not provided'}
Photography Type: ${formData.photographyType || 'Not specified'}
Budget Range: ${formData.budget || 'Not specified'}
How they heard about us: ${formData.hearAbout || 'Not specified'}

Message:
${formData.message}

---
This inquiry was sent from the Mind's Eye Photography website.
    `;

    // Create mailto link
    const mailtoLink = `mailto:info@themindseyestudio.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    alert('Your email client will open with the message pre-filled. Just click Send!');
  };

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
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input 
            type="text" 
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
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
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email" 
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input 
            type="tel" 
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your Phone Number" 
          />
        </div>

        <div className="form-group">
          <label htmlFor="eventDate">Event Date</label>
          <input 
            type="date" 
            id="eventDate"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="photographyType">Photography Type</label>
          <select 
            id="photographyType" 
            name="photographyType"
            value={formData.photographyType}
            onChange={handleChange}
          >
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
          <select 
            id="budget" 
            name="budget"
            value={formData.budget}
            onChange={handleChange}
          >
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
          <select 
            id="hearAbout" 
            name="hearAbout"
            value={formData.hearAbout}
            onChange={handleChange}
          >
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
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your photography needs, event details, timeline, and any specific requirements..." 
            rows="6"
          />
        </div>

        <button type="submit" className="submit-button">
          📧 Send Email
        </button>
        
        <div className="quick-contact">
          <p style={{textAlign: 'center', margin: '20px 0', color: '#ccc'}}>Or contact directly:</p>
          <div style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
            <a href="mailto:info@themindseyestudio.com" className="quick-btn">
              📧 Email
            </a>
            <a href="tel:608-219-6066" className="quick-btn">
              📞 Call
            </a>
          </div>
        </div>
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
        
        .submit-button:hover {
          background: #e55a2b;
          transform: translateY(-2px);
        }
        
        .quick-btn {
          display: inline-block;
          padding: 12px 20px;
          background: #444;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          transition: background 0.3s;
        }
        
        .quick-btn:hover {
          background: #ff6b35;
        }
      `}</style>
    </div>
  );
}

export default WorkingContactForm;

