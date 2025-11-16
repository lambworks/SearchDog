# SearchDog

SearchDog is now a runnable Vite + React + Tailwind prototype that renders the cinematic recon dashboard found in `src/SearchDogFrontMock.tsx`.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (default http://localhost:5173) to interact with the mock UI. Use `npm run build` to produce a production bundle and `npm run preview` to test it.

### Optional SFX

Drop `tick.mp3` and `perkUnlock.mp3` files into `public/sfx/` if you want the UI to play sounds when initiating scans or toggling packs. The component fails gracefully when the files are absent.
