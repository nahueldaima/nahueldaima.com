// utils/sanitize.js
export function sanitizeHTML(html) {
  // Create a dummy DOM element to leverage the browser's parsing capabilities
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html

  // List of allowed tags and attributes
  const allowedTags = ['b', 'i', 'em', 'strong', 'a', 'p', 'ul', 'ol', 'li', 'br', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  const allowedAttributes = {
    a: ['href', 'title'],
  }

  // Function to sanitize a node
  function sanitizeNode(node) {
    // Remove disallowed tags
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (!allowedTags.includes(node.tagName.toLowerCase())) {
        node.remove()
        return
      }

      // Remove disallowed attributes
      for (const attr of Array.from(node.attributes)) {
        if (!allowedAttributes[node.tagName.toLowerCase()]?.includes(attr.name))
          node.removeAttribute(attr.name)
      }
    }

    // Recursively sanitize child nodes
    for (const child of Array.from(node.childNodes))
      sanitizeNode(child)
  }

  // Sanitize the temporary div
  for (const child of Array.from(tempDiv.childNodes))
    sanitizeNode(child)

  // Return sanitized HTML
  return tempDiv.innerHTML
}
