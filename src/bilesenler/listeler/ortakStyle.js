import styled from 'styled-components'
import { AnaRenkler } from '@tuik/renkler'
import { Button, Colors } from '@blueprintjs/core'

export const WrapperListe = styled.div`
  padding: 70px 12px;
`
export const FiltreButonAlani = styled.div`
  display: grid;
  justify-content: space-between;
  grid-template-columns: 50% 50%; 
`
export const EklemeButton = styled(Button)`
  float:right;
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
export const AramaAlani = styled.div`
  max-width: 50vw;
`
export const DetayAlani = styled.div`
  padding-top: 32px;
  
`
export const IcerikAlani = styled.div`
  padding: 16px 4px;
  display: flex;

  &:first-child {
    padding:0;
    margin: 0;
  }
  
  &:last-child {
    padding-bottom: 0;
  }
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