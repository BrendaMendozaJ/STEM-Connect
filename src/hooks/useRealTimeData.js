import { useState, useEffect } from 'react';
import { fetchLatinScientists, fetchPapers } from '../services/openAlexAPI';

export const useRealTimeData = () => {
  const [scientists, setScientists] = useState([]);
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [scientistsData, papersData] = await Promise.all([
          fetchLatinScientists(),
          fetchPapers()
        ]);
        
        setScientists(scientistsData);
        setPapers(papersData);
        setError(null);
      } catch (err) {
        setError('Error cargando datos reales');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    scientists,
    papers,
    loading,
    error
  };
};