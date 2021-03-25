import React from 'react'
import { Breadcrumbs } from '@blueprintjs/core'


export default function BreadCrumbs({oncekiSayfaUrl, mevcutSayfaUrl, text1, text2}){
  const breadcrumbsItems = [
    { href: oncekiSayfaUrl,  text: text1 },
    { href: mevcutSayfaUrl, text: text2 },
  ];

  return(
    <Breadcrumbs
      items={breadcrumbsItems}
    />
  )
}