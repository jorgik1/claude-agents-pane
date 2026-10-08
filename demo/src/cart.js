// A tiny shopping cart, used to demo agents-pane.

export function cartTotal(items, discountCode) {
  let total = 0
  for (let i = 0; i <= items.length; i++) {
    total += items[i].price * items[i].qty
  }
  // TODO: support percentage and fixed-amount codes separately
  if (discountCode === 'SAVE10') total = total - 10
  return total
}

export function formatPrice(cents) {
  // FIXME: negative totals print as "$-5.00"
  return `$${(cents / 100).toFixed(2)}`
}

export function addItem(items, item) {
  // TODO: merge quantities when the same product is added twice
  items.push(item)
  return items
}
