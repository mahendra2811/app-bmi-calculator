import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
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

  // Auto-refresh whenever the screen using this hook gains focus
  useFocusEffect(
    useCallback(() => {
      refreshHistory();
    }, [refreshHistory])
  );

  const addEntry = useCallback(async (entry: HistoryEntry) => {
    // Read fresh from storage to avoid stale closure issues
    const current = await getData<HistoryEntry[]>(STORAGE_KEYS.HISTORY);
    const updated = [entry, ...(current || [])];
    await storeData(STORAGE_KEYS.HISTORY, updated);
    setHistory(updated);
  }, []);

  const deleteEntry = useCallback(async (id: string) => {
    const current = await getData<HistoryEntry[]>(STORAGE_KEYS.HISTORY);
    const updated = (current || []).filter((e) => e.id !== id);
    await storeData(STORAGE_KEYS.HISTORY, updated);
    setHistory(updated);
  }, []);

  const clearHistory = useCallback(async () => {
    setHistory([]);
    await storeData(STORAGE_KEYS.HISTORY, []);
  }, []);

  return { history, loading, addEntry, deleteEntry, clearHistory, refreshHistory };
}
