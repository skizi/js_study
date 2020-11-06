import { useState, useRef, useEffect } from "react";
import { College } from "../../domain/entity/college";
import { Profile } from "../../domain/entity/profile";



export const useCollege = ( profile:Profile, recalculateValidation:(profile:Profile)=>void ) => {

  const [college, setCollege] = useState<College>({
    name: "",
    faculty: "",
    department: "",
    result: []
  });

  //------------------文字列から学校検索------------------
  const handleSearchCollege = ( searchWord:string ) => {

    searchColleges( searchWord );

  }
  const mountedRef = useRef<boolean>(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  },[]);


  const [loadingFlag, setLoadingFlag] = useState(false);
  const searchColleges = ( name: string )=>{

    setLoadingFlag( true );

    const load = async ():Promise<void> => {
      try{
        const url = `http://localhost:18001/colleges?name=${name}`;
        const result = await fetch(url).then(res => res.json());

        if( !mountedRef.current ) return;
        
        setCollege({ ...college, result:result.results.school });

      }catch( error ){
        throw error;
      }finally{
        setLoadingFlag( false );
      }

    }
    void load();

  };


  //------------------学校更新------------------
  const handleChangeCollege = ( member:Partial<College> ) => {
    setCollege({ ...college, ...member });
    recalculateValidation({ ...profile, college:{ ...college, ...member } });
  }

  //------------------学校削除------------------
  const handleResetCollege = () => {

    handleChangeCollege( { name:"", faculty:"", department:"" } );

  }
  

  return { college, handleSearchCollege, handleChangeCollege, handleResetCollege, loadingFlag };
};