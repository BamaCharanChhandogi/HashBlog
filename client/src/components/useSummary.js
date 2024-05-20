import { useState, useEffect } from 'react';
import { useSummary } from 'use-react-summary';

const useSummarize = (post, numWords) => {

const { summarizeText, isLoading, error } = useSummary({
  text: post.desc ?? "",
  words: numWords,
});

  return { summarizeText, isLoading, error };
};

export default useSummarize;
