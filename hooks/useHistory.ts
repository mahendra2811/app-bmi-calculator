import { useState, useEffect, useCallback } from 'react';
import { HistoryEntry } from '../types';
import { storeData, getData } from '../utils/storage';
import { STORAGE_KEYS } from '../utils/constants';

export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshHistory = useCallback(async () => {
    setLoading(true);
    const data = await getData<HistoryEntry[]>(STORAGE_KEYS.HISTORY);
    setHistory(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshHistory();
  }, [refreshHistory]);

  const addEntry = useCallback(async (entry: HistoryEntry) => {
    const updated = [entry, ...history];
    setHistory(updated);
    await storeData(STORAGE_KEYS.HISTORY, updated);
  }, [history]);

  const deleteEntry = useCallback(async (id: string) => {
    const updated = history.filter((e) => e.id !== id);
    setHistory(updated);
    await storeData(STORAGE_KEYS.HISTORY, updated);
  }, [history]);

  const clearHistory = useCallback(async () => {
    setHistory([]);
    await storeData(STORAGE_KEYS.HISTORY, []);
  }, []);

  return { history, loading, addEntry, deleteEntry, clearHistory, refreshHistory };
}
