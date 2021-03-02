import styled from 'styled-components'
import { AnaRenkler } from '@tuik/renkler'
import { Colors } from '@blueprintjs/core'

export const WrapperListe = styled.div`
  padding: 70px 16px 0;
`
export const FiltreButonAlani = styled.div`
  display: flex;
`
export const ButonDurumAlani = styled.div`
  flex: 1;
`
export const ListeBaslik = styled.div`
  display: flex;
  align-items: baseline;
  margin: 24px 8px 8px;
`

export const SolaYasli = styled.div`
  flex: 1;
  font-weight: bold;
  color: ${AnaRenkler.koyuKirmizi};
`

export const SagaYasli = styled.div`

`
export const BaslikMetin = styled.div`
  display: inline-block;
  font-size: 0.9em;
  font-weight: 600;
  color: ${Colors.GRAY3};
  margin-right: 8px;
`
export const SayiGosterge = styled.div`
  display: inline-block;
  color: ${AnaRenkler.koyuKirmizi};
  font-weight: 600;
  font-size: 1.2em;
  margin-left: 4px;
  margin-right: 8px;

  &:last-child {
    margin-right: 0;
  }
`
export const DetayAlani = styled.div`
  margin-left: 10%;
`
export const IcerikAlani = styled.div`
  margin: 32px;
  display: flex;
`
export const DetayBaslik = styled.div`
  font-size: 1em;
  font-weight: 600;
  color: black;
  padding: 8px 8px ;
  flex: 0 1 50%;
`
export const Icerik = styled.div`
  font-size: 0.9em;
  color: black;
  padding-top: 8px;
  width: 100%;

  &:first-child {
    padding-top: 0;
  }
`