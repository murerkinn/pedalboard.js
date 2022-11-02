import dom from './dom'
import math from './math'

const getBoundingClientRect = (el: HTMLElement) => {
  try {
    return el.getBoundingClientRect()
  } catch (e) {
    // In IE, calling getBoundingClientRect on an orphan element raises an
    // "Unspecified Error". All other browsers return zeros.
    return { left: 0, top: 0, right: 0, bottom: 0 }
  }
}

const getClientViewportElement = (opt_node?: Node) => {
  let doc: Document

  if (opt_node) doc = dom.getOwnerDocument(opt_node)
  else doc = dom.getDocument()

  // In old IE versions the document.body represented the viewport
  // if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9) &&
  //     !dom.getDomHelper(doc).isCss1CompatMode()) {
  //   return doc.body;
  // }
  return doc.documentElement
}

const getPageOffset = (el: HTMLElement) => {
  const doc = dom.getOwnerDocument(el)

  // NOTE(arv): If element is hidden (display none or disconnected or any the
  // ancestors are hidden) we get (0,0) by default but we still do the
  // accumulation of scroll position.
  // TODO(arv): Should we check if the node is disconnected and in that case
  //            return (0,0)?

  const pos = new math.Coordinate(0, 0)

  const viewportElement = getClientViewportElement(doc)

  if (el == viewportElement) {
    // viewport is always at 0,0 as that defined the coordinate system for this
    // function - this avoids special case checks in the code below
    return pos
  }

  const box = getBoundingClientRect(el)

  // Must add the scroll coordinates in to get the absolute page offset
  // of element since getBoundingClientRect returns relative coordinates to
  // the viewport.

  const scrollCoord = dom.getDocumentScroll(doc)
  pos.x = box.left + scrollCoord.x
  pos.y = box.top + scrollCoord.y

  return pos
}

export default {
  getBoundingClientRect,
  getClientViewportElement,
  getPageOffset,
}
