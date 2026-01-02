# Contact Form Backend Setup

> Note: GitHub Pages cannot run Node/Express backends. If you host this site on GitHub Pages, use the Formspree setup already in `website.html`, or deploy `server.js` on Render/Railway/Fly/etc. and update the form submission URL to your deployed backend.
## Installation

1. Make sure you have Node.js installed on your system
2. Navigate to this directory in your terminal
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Server

Start the server:
```bash
npm start
```

The server will run on `http://localhost:3000`

## How It Works

1. **Form Submission** - When users submit the form, the data is sent to your backend server
2. **Data Storage** - Form submissions are saved in the `submissions/` folder as JSON files
3. **Confirmation** - Users see a success message after submission
4. **Access Data** - You can:
   - Check the `submissions/` folder for individual submission files
   - View all submissions at `http://localhost:3000/api/submissions` (JSON format)

## File Structure

- `server.js` - Backend server (Express.js)
- `website.html` - Updated form that sends data to the backend
- `submissions/` - Folder where form data is stored (auto-created)
  - `all_submissions.json` - Log of all submissions
  - `submission_[timestamp].json` - Individual submission files

## Optional Enhancements

To add email notifications when forms are submitted, you can integrate:
- **SendGrid** - Email service API
- **Nodemailer** - SMTP-based emails
- **Gmail** - Using your Gmail account

## Deployment

1. GitHub Pages is frontend-only (static). It will not run `server.js`.
2. To use the Express backend, deploy it to Render/Railway/Fly/DigitalOcean (or similar).
3. After deploying, update the form submission in `website.html` to point to your live backend endpoint (e.g., `https://your-backend-domain.com/api/contact`).
4. If you prefer no backend, keep using Formspree (already wired in the current `website.html`).

---

For questions or help, check the server logs in your terminal for debugging.
