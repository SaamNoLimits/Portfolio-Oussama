const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const nodemailer = require('nodemailer');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many contact form submissions, please try again later.',
});

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(express.json());
app.use('/api/contact', limiter);

// Initialize SQLite database
const dbPath = path.join(__dirname, 'contacts.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database at:', dbPath);
    
    // Create contacts table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT,
      message TEXT NOT NULL,
      ip_address TEXT,
      user_agent TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      status TEXT DEFAULT 'unread'
    )`, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Contacts table ready');
      }
    });
  }
});

// Email transporter (optional - configure if you want email notifications)
let transporter = null;

if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: 'gmail', // or your email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  
  console.log('Email transporter configured');
} else {
  console.log('Email not configured - messages will only be saved to database');
}

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }
    
    // Get client info
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');
    
    // Save to database
    const insertQuery = `INSERT INTO contacts (name, email, subject, message, ip_address, user_agent) 
                        VALUES (?, ?, ?, ?, ?, ?)`;
    
    db.run(insertQuery, [name, email, subject || 'Contact from Portfolio', message, ipAddress, userAgent], 
      function(err) {
        if (err) {
          console.error('Database error:', err.message);
          return res.status(500).json({
            success: false,
            message: 'Failed to save message'
          });
        }
        
        console.log(`New contact message saved with ID: ${this.lastID}`);
        console.log(`From: ${name} (${email})`);
        console.log(`Subject: ${subject || 'Contact from Portfolio'}`);
        console.log(`Message: ${message.substring(0, 100)}...`);
        console.log('---');
        
        // Send email notification if configured
        if (transporter) {
          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'ahjli.contact@gmail.com',
            subject: `Portfolio Contact: ${subject || 'New Message'}`,
            html: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject || 'Contact from Portfolio'}</p>
              <p><strong>Message:</strong></p>
              <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
              <hr>
              <p><small>Sent from Portfolio Contact Form</small></p>
              <p><small>IP: ${ipAddress}</small></p>
              <p><small>Time: ${new Date().toLocaleString()}</small></p>
            `
          };
          
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log('Email sending failed:', error);
            } else {
              console.log('Email sent:', info.response);
            }
          });
        }
        
        res.json({
          success: true,
          message: 'Message sent successfully!',
          id: this.lastID
        });
      });
    
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get all contacts (for admin purposes)
app.get('/api/contacts', (req, res) => {
  const query = `SELECT * FROM contacts ORDER BY created_at DESC`;
  
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({
        success: false,
        message: 'Failed to retrieve contacts'
      });
    }
    
    res.json({
      success: true,
      contacts: rows,
      count: rows.length
    });
  });
});

// Mark contact as read
app.patch('/api/contacts/:id/read', (req, res) => {
  const contactId = req.params.id;
  
  db.run('UPDATE contacts SET status = ? WHERE id = ?', ['read', contactId], function(err) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Failed to update contact status'
      });
    }
    
    res.json({
      success: true,
      message: 'Contact marked as read'
    });
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Portfolio backend is running',
    timestamp: new Date().toISOString(),
    database: 'Connected'
  });
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down gracefully...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed');
    }
    process.exit(0);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Portfolio backend running on http://localhost:${PORT}`);
  console.log(`📧 Contact form endpoint: http://localhost:${PORT}/api/contact`);
  console.log(`📊 Admin panel: http://localhost:${PORT}/api/contacts`);
  console.log(`💾 Database location: ${dbPath}`);
});
