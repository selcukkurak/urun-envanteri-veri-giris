import React from 'react'
import { Col, Row } from 'react-grid-system'
import { Card, H5, Menu, MenuItem } from '@blueprintjs/core'
import IdariKayitDialog from '../detaylar/IdariKayitDialog'



function FormIdariKayitListe({idariKayitlar, handleKayitItem, seciliIdariKayitItem, open, handleClickCloseModal}){

  if(idariKayitlar.length === 0) return null
  return(
    <Row>
      <Col>
        <div>
          <H5>Seçilen İdari Kayıtlar</H5>
          <Card style={{ padding: 0 }}>
            <Menu>
              {idariKayitlar.map(kayit => (
                <MenuItem
                  key={kayit.value}
                  text={kayit.label}
                  onClick={() => handleKayitItem(kayit)}
                />
              ))}
              <IdariKayitDialog idariKayit={seciliIdariKayitItem} open={open}
                                handleClickCloseModal={handleClickCloseModal}/>
            </Menu>
          </Card>
        </div>
      </Col>
    </Row>
  )
}

export default React.memo(FormIdariKayitListe)