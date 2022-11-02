import math from './math'

const NodeType = {
  ELEMENT: 1,
  ATTRIBUTE: 2,
  TEXT: 3,
  CDATA_SECTION: 4,
  ENTITY_REFERENCE: 5,
  ENTITY: 6,
  PROCESSING_INSTRUCTION: 7,
  COMMENT: 8,
  DOCUMENT: 9,
  DOCUMENT_TYPE: 10,
  DOCUMENT_FRAGMENT: 11,
  NOTATION: 12,
}

const getOwnerDocument = (node: Node) => {
  if (node) {
    return node.nodeType == NodeType.DOCUMENT
      ? node
      : node.ownerDocument || (node as any).document
  }
}

const getDocument = () => {
  return document
}

const removeNode = (node: Node) => {
  return node && node.parentNode ? node.parentNode.removeChild(node) : null
}

const insertSiblingBefore = (newNode: Node, refNode: Node) => {
  if (refNode.parentNode) {
    refNode.parentNode.insertBefore(newNode, refNode)
  }
}

const getDocumentScrollElement = (doc: Document) => {
  if (doc.scrollingElement) return doc.scrollingElement

  return doc.body || doc.documentElement
}

const getWindow = (doc: Document) => {
  return doc.defaultView
}

const getDocumentScroll = (doc: Document) => {
  const el = getDocumentScrollElement(doc)
  const win = getWindow(doc)

  // if (goog.userAgent.IE && goog.userAgent.isVersionOrHigher('10') &&
  //     win.pageYOffset != el.scrollTop) {
  //   // The keyboard on IE10 touch devices shifts the page using the pageYOffset
  //   // without modifying scrollTop. For this case, we want the body scroll
  //   // offsets.
  //   return new math.Coordinate(el.scrollLeft, el.scrollTop);
  // }

  return new math.Coordinate(
    win.scrollX || el.scrollLeft,
    win.scrollY || el.scrollTop
  )
}

export default {
  getOwnerDocument,
  getDocument,
  removeNode,
  getDocumentScroll,
  getDocumentScrollElement,
  getWindow,
  insertSiblingBefore,
}
