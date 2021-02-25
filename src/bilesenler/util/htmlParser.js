import React from "react";
import ReactHtmlParser, {
    convertNodeToElement,
    processNodes
} from "react-html-parser";

function transform(node, index) {
    // belirli öğeleri engellemek için null döndür
    // <span> öğelerine izin verme
    if (node.type === "tag" && node.name === "span") {
        return null;
    }

    if (node.type === "tag" && node.name === "ul") {
        node.name = "ol";
        return convertNodeToElement(node, index, transform);
    }

    // her <b> elementi için bir <i> öğesi döndür
    // tüm elementler için bir anahtar dahil edilmelidir
    if (node.type === "tag" && node.name === "b") {
        return <i key={index}>{processNodes(node.children, transform)}</i>;
    }

    // tüm bağlantılar yeni bir pencerede açılmalıdır
    if (node.type === "tag" && node.name === "a") {
        node.attribs.target = "_blank";
        return convertNodeToElement(node, index, transform);
    }
}

const options = {
    decodeEntities: true,
    transform
};

export default function htmlParser(htmlText) {
    return ReactHtmlParser(htmlText, options)
}