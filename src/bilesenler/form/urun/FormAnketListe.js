import React from 'react'
import { Col, Row } from 'react-grid-system'
import { Card, H5, Menu, MenuItem, Tooltip } from '@blueprintjs/core'
import AnketDetayDialog from '../../detaylar/AnketDetayDialog'

function FormAnketListe ({ anketler, handleAnketItem, open, seciliAnketItem, handleClickCloseModal }) {

  if (anketler.length === 0) return null
  return (
    <Row>
      <Col>
        <div>
          <H5>Seçilen Anketler</H5>
          <Card style={{ padding: 0 }}>
            <Menu>
              {anketler.map(anket => (
                <MenuItem
                  key={anket.value}
                  text={(<Tooltip position={'bottom'}
                                  content={'Detaylarını Görmek İçin Tıklayınız...'}>{anket.label}</Tooltip>)}
                  onClick={() => handleAnketItem(anket)}
                />
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