import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";

function ViewDNSRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDNSRecords = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/records"); // Adjust the URL as needed
        setRecords(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch records");
      } finally {
        setLoading(false);
      }
    };

    fetchDNSRecords();
  }, []);

  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h4" component="h2" gutterBottom>
        View DNS Records
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Here you can see all your DNS records.
      </Typography>

      {loading ? (
        <Typography variant="body1">Loading records...</Typography>
      ) : error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>TTL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record._id}>
                  <TableCell>{record.name}</TableCell>
                  <TableCell>{record.type}</TableCell>
                  <TableCell>{record.data}</TableCell>
                  <TableCell>{record.ttl}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default ViewDNSRecords;
