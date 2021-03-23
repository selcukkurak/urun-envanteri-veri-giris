import Axios from 'axios'
import { useQuery } from 'react-query'

export default function useIdariKayitTabloBilgileri(seciliIdariKayit){
  console.log("seciliIdariKayit", seciliIdariKayit)
  const getIdariKayitById = async () => {
    const { data } = await Axios.get(
      `/api/idari-kayitlar/${seciliIdariKayit.id}/tablo-bilgileri`
    );
    return data;
  };
  return useQuery(["seciliKayitTabloBilgileri", seciliIdariKayit], () => getIdariKayitById()
  );
}