import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, LinearProgress, Chip } from '@mui/material';

const problems = [
  { id: 2340, title: 'Minimum Adjacent Swaps to Make a Valid Array', difficulty: 'Medium', completion: 72.6 },
  { id: 2781, title: 'Length of the Longest Valid Substring', difficulty: 'Hard', completion: 37.6 },
  { id: 1152, title: 'Analyze User Website Visit Pattern', difficulty: 'Medium', completion: 42.7 },
  { id: 2055, title: 'Plates Between Candles', difficulty: 'Medium', completion: 44.9 },
  { id: 2268, title: 'Minimum Number of Keypresses', difficulty: 'Medium', completion: 71.3 },
  { id: 472, title: 'Concatenated Words', difficulty: 'Hard', completion: 49.4 },
  { id: 146, title: 'LRU Cache', difficulty: 'Medium', completion: 42.8 },
];

const ProblemList = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: 1000, mx: 'auto', mt: 4 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Difficulty</TableCell>
              <TableCell>Frequency</TableCell>
              <TableCell>Acceptance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {problems.map((problem) => (
              <TableRow key={problem.id}>
                <TableCell>{problem.id}</TableCell>
                <TableCell>
                  <Typography color="primary">{problem.title}</Typography>
                </TableCell>
                <TableCell>
                  <Chip label={problem.difficulty} color={problem.difficulty === 'Hard' ? 'error' : 'warning'} />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: '100%', mr: 1 }}>
                      <LinearProgress variant="determinate" value={problem.completion} />
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                      <Typography variant="body2" color="textSecondary">{`${Math.round(problem.completion)}%`}</Typography>
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProblemList;
