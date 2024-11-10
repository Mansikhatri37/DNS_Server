const mongoose = require('mongoose');

// Define the DNS record schema
const dnsRecordSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true // Ensure no duplicate domain names
    },
    type: {
        type: String,
        enum: ['A', 'CNAME', 'MX', 'TXT'], // Allowed record types
        required: true
    },
    data: {
        type: String,
        required: true // The data associated with the DNS record
    },
    ttl: {
        type: Number,
        default: 3600 // Time-to-live in seconds (optional)
    }
});

// Create the model
const DNSRecord = mongoose.model('DNSRecord', dnsRecordSchema);

module.exports = DNSRecord; // Export the model
