import { GeoLocation } from '@mood-tracker/store';
import * as Location from 'expo-location';
import { useCallback, useState } from 'react';
import { Platform } from 'react-native';

interface UseLocationResult {
  fetchLocation: () => Promise<GeoLocation | null>;
  loading: boolean;
  error: string | null;
}

export function useLocation(): UseLocationResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLocation = useCallback(async (): Promise<GeoLocation | null> => {
    if (Platform.OS === 'web') return null;

    setLoading(true);
    setError(null);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission denied.');
        return null;
      }

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      // Reverse geocode to get city name (best-effort)
      let city: string | undefined;
      try {
        const [place] = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
        city = place?.city ?? place?.region ?? undefined;
      } catch {
        // Reverse geocode failure is non-fatal
      }

      return {
        latitude,
        longitude,
        city,
      };
    } catch (err) {
      setError('Could not retrieve location.');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchLocation, loading, error };
}
