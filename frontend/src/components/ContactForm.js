import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        setSubmitMessage(result.message || 'Thank you! Your message has been sent successfully.');
        reset();
      } else {
        setSubmitMessage(result.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitMessage('An error occurred. Please contact info@themindseyestudio.com directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-container">
      <h2>Contact Mind's Eye Photography</h2>
      
      <div className="contact-info">
        <p><strong>Email:</strong> info@themindseyestudio.com</p>
        <p><strong>Phone:</strong> 608-219-6066</p>
        <p><strong>Location:</strong> Based in Madison, WI but can travel within the state</p>
        <p style={{color: '#ff6b35'}}><strong>For fastest response, call or email directly!</strong></p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input 
            type="text" 
            id="name"
            {...register('name', { required: 'Name is required' })} 
            placeholder="Your Name" 
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input 
            type="email" 
            id="email"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address'
              }
            })} 
            placeholder="Your Email" 
          />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input 
            type="tel" 
            id="phone"
            {...register('phone')} 
            placeholder="Your Phone Number" 
          />
        </div>

        <div className="form-group">
          <label htmlFor="eventDate">Event Date</label>
          <input 
            type="date" 
            id="eventDate"
            {...register('eventDate')} 
          />
        </div>

        <div className="form-group">
          <label htmlFor="photographyType">Photography Type</label>
          <select id="photographyType" {...register('photographyType')}>
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
          <select id="budget" {...register('budget')}>
            <option value="">Select Budget Range</option>
            <option value="Under $500">Under $500</option>
            <option value="$500 - $1000">$500 - $1000</option>
            <option value="$1000 - $1500">$1000 - $1500</option>
            <option value="Need a Quote">Need a Quote</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="hearAbout">How did you hear about us?</label>
          <select id="hearAbout" {...register('hearAbout')}>
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
            {...register('message', { required: 'Message is required' })} 
            placeholder="Tell us about your photography needs..." 
            rows="5"
          />
          {errors.message && <span className="error">{errors.message.message}</span>}
        </div>

        {submitMessage && (
          <div className={`message ${submitMessage.includes('Thank you') || submitMessage.includes('successfully') ? 'success' : 'error'}`}>
            {submitMessage}
          </div>
        )}

        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Inquiry'}
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
        }
        
        .contact-info p {
          margin: 8px 0;
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 5px;
          color: #ff6b35;
          font-weight: bold;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #444;
          border-radius: 5px;
          background: #333;
          color: white;
          font-size: 16px;
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #ff6b35;
        }
        
        .error {
          color: #ff4444;
          font-size: 14px;
          margin-top: 5px;
          display: block;
        }
        
        .submit-button {
          width: 100%;
          padding: 15px;
          background: #ff6b35;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s;
        }
        
        .submit-button:hover {
          background: #e55a2b;
        }
        
        .submit-button:disabled {
          background: #999;
          cursor: not-allowed;
        }
        
        .message {
          padding: 15px;
          border-radius: 5px;
          margin-bottom: 20px;
          font-weight: bold;
        }
        
        .message.success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        
        .message.error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
      `}</style>
    </div>
  );
}

export default ContactForm;

