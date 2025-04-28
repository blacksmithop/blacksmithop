import { createContext, useState, useEffect, ReactNode } from 'react';
import { ProfileData } from '../types';
import { fetchProfileData } from '../api';

interface ProfileContextType {
  profileData: ProfileData;
  isLoading: boolean;
  error: string | null;
}

export const ProfileContext = createContext<ProfileContextType>({
  profileData: {
    profileImage: '',
    description: '',
    resumeUrl: '',
    skills: []
  },
  isLoading: true,
  error: null
});

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profileData, setProfileData] = useState<ProfileData>({
    profileImage: '',
    description: '',
    resumeUrl: '',
    skills: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const data = await fetchProfileData();
        setProfileData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch profile data');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileData();
  }, []);

  return (
    <ProfileContext.Provider value={{ profileData, isLoading, error }}>
      {children}
    </ProfileContext.Provider>
  );
};