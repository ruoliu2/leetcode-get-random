'use client';
import React, {useEffect, useMemo} from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, LinearProgress, Chip, ChipProps } from '@mui/material';
import amazonStore from "@/app/stores/amazonStore";
import {amazonStorageKey, difficultyChipColors, difficulties,} from "@/app/components/constants";
import amazonQuestions from "../../../public/data/amazon.json";

const AmazonProblemList = () => {
  const {
    filter,
    questionSelection,
    setFilter,
    toggleQuestionSelection,
    setQuestionSelection,
    resetQuestionSelection,
    clearSelection,
  } = amazonStore();

  useEffect(() => {
    const savedSelection = localStorage.getItem(amazonStorageKey);
    if (savedSelection) {
      setQuestionSelection(JSON.parse(savedSelection));
    }
  }, [setQuestionSelection]);

  useEffect(() => {
    localStorage.setItem(amazonStorageKey, JSON.stringify(questionSelection));
  }, [questionSelection]);

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
            {amazonQuestions.map((problem) => (
              <TableRow key={problem.number}>
                <TableCell>{problem.number}</TableCell>
                <TableCell>
                  <Typography color="primary">{problem.title}</Typography>
                </TableCell>
                <TableCell>
                  <Chip label={problem.difficulty} color={difficultyChipColors[problem.difficulty] as ChipProps['color']} />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: '100%', mr: 1 }}>
                      <LinearProgress variant="determinate" value={Number(problem.frequency) / 3.076 * 100} />
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                      <Typography variant="body2" color="textSecondary">{`${Math.round(Number(problem.frequency) / 3.076 * 100)}%`}</Typography>
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

export default AmazonProblemList;
