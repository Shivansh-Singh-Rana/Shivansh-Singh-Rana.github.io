const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));

// Directory to store form submissions
const submissionsDir = path.join(__dirname, 'submissions');
if (!fs.existsSync(submissionsDir)) {
  fs.mkdirSync(submissionsDir);
}

// Handle form submissions
app.post('/api/contact', (req, res) => {
  try {
    const { firstName, lastName, countryCode, mobile, company, role, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !countryCode || !mobile || !company || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create submission object
    const submission = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      firstName,
      lastName,
      countryCode,
      mobile,
      company,
      role: role || 'Not specified',
      message
    };

    // Save to JSON file
    const filePath = path.join(submissionsDir, `submission_${submission.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(submission, null, 2));

    // Also append to a submissions log
    const logPath = path.join(submissionsDir, 'all_submissions.json');
    let allSubmissions = [];
    if (fs.existsSync(logPath)) {
      allSubmissions = JSON.parse(fs.readFileSync(logPath, 'utf8'));
    }
    allSubmissions.push(submission);
    fs.writeFileSync(logPath, JSON.stringify(allSubmissions, null, 2));

    // Send confirmation email (optional - requires email service setup)
    console.log('New submission received:', submission);

    res.json({ 
      success: true, 
      message: 'Thank you for your submission! I will get back to you soon.',
      submissionId: submission.id 
    });
  } catch (error) {
    console.error('Error processing form:', error);
    res.status(500).json({ error: 'Failed to process form submission' });
  }
});

// Get all submissions (for admin dashboard)
app.get('/api/submissions', (req, res) => {
  try {
    const logPath = path.join(submissionsDir, 'all_submissions.json');
    if (fs.existsSync(logPath)) {
      const submissions = JSON.parse(fs.readFileSync(logPath, 'utf8'));
      res.json(submissions);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve submissions' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
