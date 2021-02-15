import React from 'react'
import { Col, Row } from 'react-grid-system'
import { Card, H5, Menu, MenuItem, Tooltip } from '@blueprintjs/core'
import AnketDetayDialog from '../detaylar/AnketDetayDialog'


function FormAnketListe({anketler, handleAnketItem, open, seciliAnketItem,handleClickCloseModal}){

  if(anketler.length === 0 ) return null

  return(
    <Row>
      <Col>
        <div>
          <H5>Seçilen Anketler</H5>
          <Card style={{ padding: 0 }}>
            <Menu>
              {anketler.map(anket => (
                <Tooltip position={'bottom'} key={anket.value} content={"Detaylarını Görmek İçin Tıklayınız..."}>
                  <MenuItem
                    text={anket.label}
                    onClick={() => handleAnketItem(anket)}
                  />
                </Tooltip>

              ))}
              <AnketDetayDialog anket={seciliAnketItem} open={open}
                                handleClickCloseModal={handleClickCloseModal}/>
            </Menu>
          </Card>
        </div>
      </Col>
    </Row>
  )
}

export default React.memo(FormAnketListe)