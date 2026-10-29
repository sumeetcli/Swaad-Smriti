# Swaad Smriti — Archival Food Photo Directory

This directory stores authentic visual documentation for every food item in the student archive.

## Folder Structure

Each food item has its own dedicated folder matching its URL slug:

- `hyderabadi-biryani/` — Hyderabadi Biryani
- `mysore-pak/` — Mysore Pak
- `ragi-mudde/` — Ragi Mudde
- `dharwad-pedha/` — Dharwad Pedha
- `dal-baati-churma/` — Dal Baati Churma
- `pongal/` — Pongal
- `medu-vada/` — Medu Vada
- `ghewar/` — Ghewar
- `til-ke-laddu/` — Til ke Laddu
- `tekua/` — Tekua

## How to Add New Photos

1. **Drop your photo file** into the appropriate dish folder (e.g., `public/images/dishes/hyderabadi-biryani/new-photo.jpg`).
2. **Open `src/data/dishes.ts`** and find the corresponding dish object.
3. **Add an entry** to the `photos` array:

```typescript
{
  url: "/images/dishes/hyderabadi-biryani/new-photo.jpg",
  alt: "Brief description of the image",
  caption: "Handwritten polaroid caption describing the memory or cooking step",
  sourceCredit: "Source: Team Archive" // Or exact photographer & license for genuine internet photos
}
```

## Crediting Rules

- **Team Photos**: Always credit as `"Source: Team Archive"`.
- **Internet Sourced Photos**: Use only genuine, non-AI photographs from verified public domain or Creative Commons sources (e.g. Wikimedia Commons). Always provide the exact photographer name and license in `sourceCredit` and link via `sourceUrl`.
- **Zero AI Policy**: AI-generated images are strictly removed from this archive.
