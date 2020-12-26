import { useState, useRef, useEffect } from "react";
import { College } from "../../domain/entity/college";
import { Profile } from "../../domain/entity/profile";

export const useCollege = (
  profile: Profile,
  recalculateValidation: (profile: Profile) => void
): {
  college: College;
  handleSearchCollege: (searchWord: string) => void;
  handleChangeCollege: (member: Partial<College>) => void;
  handleResetCollege: () => void;
  loadingFlag: boolean;
} => {
  const [college, setCollege] = useState<College>(profile.college);

  //------------------文字列から学校検索------------------
  const mountedRef = useRef<boolean>(false);
  useEffect(() => {
    mountedRef.current = true;
    return (): void => {
      mountedRef.current = false;
    };
  }, []);

  const [loadingFlag, setLoadingFlag] = useState(false);
  const searchColleges = (name: string): void => {
    setLoadingFlag(true);

    const load = async (): Promise<void> => {
      try {
        const url = `http://localhost:18001/colleges?name=${name}`;
        const result = await fetch(url).then((res) => res.json());

        if (!mountedRef.current) return;

        setCollege({ ...college, result: result.results.school });
      } catch (error) {
        throw error;
      } finally {
        setLoadingFlag(false);
      }
    };
    void load();
  };

  const handleSearchCollege = (searchWord: string): void => {
    searchColleges(searchWord);
  };

  //------------------学校更新------------------
  const handleChangeCollege = (member: Partial<College>): void => {
    setCollege({ ...college, ...member });
    recalculateValidation({ ...profile, college: { ...college, ...member } });
  };

  //------------------学校削除------------------
  const handleResetCollege = (): void => {
    handleChangeCollege({ name: "", faculty: "", department: "" });
  };

  return {
    college,
    handleSearchCollege,
    handleChangeCollege,
    handleResetCollege,
    loadingFlag,
  };
};
