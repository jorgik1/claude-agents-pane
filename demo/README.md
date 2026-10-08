# Cart demo

A tiny project for trying [agents-pane](../README.md). Open a Claude Code session in this folder, run `/agents-pane`, and press **▶ run** on one of the three project agents in `.claude/agents`.

## The cart

- `cartTotal(items, discountCode)` returns the total in cents and applies a 10% discount for `SAVE10`.
- `formatPrice(cents)` formats cents as dollars.
- `addItem(items, item)` adds an item, merging quantities for the same product.
