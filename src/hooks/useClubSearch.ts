import { useState, useCallback } from 'react';
import { supabase } from '../config/supabase';
import type { Club } from '../types/database';

const CLUBS_CACHE_KEY = 'club_link_clubs_v1';
const CLUBS_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

function readClubsCache(): Club[] | null {
  try {
    const raw = localStorage.getItem(CLUBS_CACHE_KEY);
    if (!raw) return null;
    const { ts, clubs } = JSON.parse(raw);
    if (Date.now() - ts > CLUBS_CACHE_TTL) return null;
    return clubs;
  } catch {
    return null;
  }
}

function writeClubsCache(clubs: Club[]) {
  try {
    localStorage.setItem(CLUBS_CACHE_KEY, JSON.stringify({ ts: Date.now(), clubs }));
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}

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
    const cached = readClubsCache();
    if (cached) {
      setClubs(cached);
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('clubs')
        .select('*')
        .order('name');
      if (error) throw error;
      const result = data || [];
      writeClubsCache(result);
      setClubs(result);
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
