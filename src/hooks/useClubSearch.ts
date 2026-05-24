import { useState, useCallback } from 'react';
import { supabase } from '../config/supabase';
import type { Club } from '../types/database';

export function useClubSearch() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(false);

  const searchClubs = useCallback(async (query: string, maxResults = 20) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('search_clubs', {
        query,
        max_results: maxResults,
      });
      if (error) throw error;
      setClubs(data || []);
    } catch (err) {
      console.error('Club search error:', err);
      setClubs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getAllClubs = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('clubs')
        .select('*')
        .order('name');
      if (error) throw error;
      setClubs(data || []);
    } catch (err) {
      console.error('Get all clubs error:', err);
      setClubs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getRandomClub = useCallback(async (): Promise<Club | null> => {
    try {
      const { data, error } = await supabase.rpc('get_random_club');
      if (error) throw error;
      return (Array.isArray(data) ? data[0] : data) ?? null;
    } catch (err) {
      console.error('Random club error:', err);
      return null;
    }
  }, []);

  /** Returns a random club guaranteed to share at least one player with chosenClubId. */
  const getCompatibleClub = useCallback(async (chosenClubId: number): Promise<Club | null> => {
    try {
      const { data, error } = await supabase.rpc('get_compatible_club', { chosen_club_id: chosenClubId });
      if (error) throw error;
      return (Array.isArray(data) ? data[0] : data) ?? null;
    } catch (err) {
      console.error('Compatible club error:', err);
      return null;
    }
  }, []);

  return { clubs, loading, searchClubs, getAllClubs, getRandomClub, getCompatibleClub };
}
