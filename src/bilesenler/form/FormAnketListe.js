import React from 'react'
import { Col, Row } from 'react-grid-system'
import { Card, H5, Menu, MenuItem } from '@blueprintjs/core'
import AnketDetayDialog from '../detaylar/AnketDetayDialog'


function FormAnketListe(props){

  if(props.anketler.length === 0 ) return null

  return(
    <Row>
      <Col>
        <div>
          <H5>Seçilen Anketler</H5>
          <Card style={{ padding: 0 }}>
            <Menu>
              {props.anketler.map(anket => (
                <MenuItem
                  key={anket.value}
                  text={anket.label}
                  onClick={() => props.handleAnketItem(anket)}
                />
              ))}
              <AnketDetayDialog anket={props.seciliAnketItem} open={props.open}
                                handleClickCloseModal={props.handleClickCloseModal}/>
            </Menu>
          </Card>
        </div>
      </Col>
    </Row>
  )
}

export default React.memo(FormAnketListe)