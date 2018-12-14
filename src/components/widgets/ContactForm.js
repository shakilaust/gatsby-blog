import React from 'react'
export default props => (
  <div>
    <form
      className="form-wrapper"
      action="https://formspree.io/your@email.com"
      method="POST"
    >
      <h4>Contact me</h4>
      <input type="email" name="email" id="email" placeholder="Your email" />
      <textarea
        name="message"
        id="message"
        rows="5"
        placeholder="Your message..."
      />
      <input type="submit" className="submit" value="Leave a message" />
    </form>
  </div>
)
