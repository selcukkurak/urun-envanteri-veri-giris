import Axios from 'axios'
import { useQuery } from 'react-query'

export default function useIdariKayitTabloBilgileri(seciliIdariKayit){

  const getIdariKayitById = async () => {
    const { data } = await Axios.get(
      `/api/idari-kayit/tablolar/${seciliIdariKayit.id}`
    );
    return data;
  };
  return useQuery(["seciliKayitTabloBilgileri", seciliIdariKayit], () => getIdariKayitById()
  );
}