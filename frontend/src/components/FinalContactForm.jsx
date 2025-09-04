import React, { useState } from 'react';

function FinalContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    photographyType: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          photographyType: '',
          budget: '',
          message: ''
        });
      } else {
        setError(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Network error. Please try again or contact info@themindseyestudio.com directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="contact-container">
        <div className="success-card">
          <h2>Thank You!</h2>
          <p>Your message has been sent successfully. Rick will get back to you soon!</p>
          <div className="contact-info">
            <p>📧 <a href="mailto:info@themindseyestudio.com">info@themindseyestudio.com</a></p>
            <p>📞 <a href="tel:608-219-6066">608-219-6066</a></p>
          </div>
          <button onClick={() => setSubmitted(false)} className="new-message-btn">
            Send Another Message
          </button>
        </div>
        <style jsx>{`
          .contact-container {
            max-width: 600px;
            margin: 0 auto;
            padding: 40px 20px;
          }
          .success-card {
            background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
            padding: 40px;
            border-radius: 15px;
            text-align: center;
            color: white;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          }
          .success-card h2 {
            color: #fb923c;
            font-size: 2.5rem;
            margin-bottom: 20px;
            font-weight: bold;
          }
          .success-card p {
            font-size: 1.2rem;
            margin-bottom: 30px;
            line-height: 1.6;
          }
          .contact-info {
            background: rgba(251, 146, 60, 0.1);
            padding: 20px;
            border-radius: 10px;
            margin: 30px 0;
          }
          .contact-info p {
            margin: 10px 0;
            font-size: 1.1rem;
          }
          .contact-info a {
            color: #fb923c;
            text-decoration: none;
            font-weight: bold;
          }
          .contact-info a:hover {
            text-decoration: underline;
          }
          .new-message-btn {
            background: #fb923c;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 8px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
          }
          .new-message-btn:hover {
            background: #ea580c;
            transform: translateY(-2px);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="contact-container">
      <div className="contact-card">
        <h2>Contact Mind's Eye Photography</h2>
        
        <div className="contact-info">
          <p>📧 <a href="mailto:info@themindseyestudio.com">info@themindseyestudio.com</a></p>
          <p>📞 <a href="tel:608-219-6066">608-219-6066</a></p>
          <p>📍 Madison, WI (travels within state)</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-row">
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
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input 
                type="tel" 
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your Phone" 
              />
            </div>
            <div className="form-group">
              <label htmlFor="photographyType">Photography Type *</label>
              <select 
                id="photographyType" 
                name="photographyType"
                required
                value={formData.photographyType}
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                <option value="Portrait">Portrait</option>
                <option value="Pro Headshots (Business)">Pro Headshots (Business)</option>
                <option value="Performer/Band Promotion">Performer/Band Promotion</option>
                <option value="Family Session">Family Session</option>
                <option value="Corporate/Event">Corporate/Event</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="budget">Budget Range *</label>
            <select 
              id="budget" 
              name="budget"
              required
              value={formData.budget}
              onChange={handleChange}
            >
                <option value="">Select Budget</option>
                <option value="Under $500">Under $500</option>
                <option value="$500-$800">$500-$800</option>
                <option value="$800-$1000">$800-$1000</option>
                <option value="$1000+">$1000+</option>
                <option value="Request a Quote">Request a Quote</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea 
              id="message"
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your photography needs..." 
              rows="5"
            />
          </div>

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? '📧 Sending...' : '📧 Send Message'}
          </button>
        </form>
      </div>

      <style jsx>{`
        .contact-container {
          max-width: 700px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        
        .contact-card {
          background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
          padding: 40px;
          border-radius: 15px;
          color: white;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        
        .contact-card h2 {
          color: #fb923c;
          font-size: 2.2rem;
          margin-bottom: 30px;
          text-align: center;
          font-weight: bold;
        }
        
        .contact-info {
          background: rgba(251, 146, 60, 0.1);
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 30px;
          text-align: center;
        }
        
        .contact-info p {
          margin: 8px 0;
          font-size: 1.1rem;
        }
        
        .contact-info a {
          color: #fb923c;
          text-decoration: none;
          font-weight: bold;
        }
        
        .contact-info a:hover {
          text-decoration: underline;
        }
        
        .error-message {
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid #ef4444;
          color: #fecaca;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
          text-align: center;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        
        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: #fb923c;
          font-weight: bold;
          font-size: 1.1rem;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 15px;
          border: 2px solid rgba(251, 146, 60, 0.3);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 1rem;
          transition: all 0.3s;
        }
        
        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #fb923c;
          background: rgba(255, 255, 255, 0.15);
        }
        
        .form-group select {
          cursor: pointer;
        }
        
        .form-group select option {
          background: #1e40af;
          color: white;
        }
        
        .submit-button {
          width: 100%;
          padding: 18px;
          background: #fb923c;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.2rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 10px;
        }
        
        .submit-button:hover:not(:disabled) {
          background: #ea580c;
          transform: translateY(-2px);
        }
        
        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
      `}</style>
    </div>
  );
}

export default FinalContactForm;

