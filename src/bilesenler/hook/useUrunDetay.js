import Axios from 'axios'
import { useQuery } from 'react-query'

export default function useUrunDetay (seciliUrun) {
  const getUrunById = async (seciliUrun) => {
    const { data } = await Axios.get(
      `/api/urunler/${seciliUrun}`
    );
    return data;
  };
  return useQuery(["seciliUrun", seciliUrun], () => getUrunById(seciliUrun), {
    enabled: !!seciliUrun,
  });
}