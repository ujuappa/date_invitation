# Date Invitation

A phone-first, six-slide site asking my wife out for the weekend.

**Live:** https://ujuappa.github.io/date_invitation/

## The slides

1. **Intro** — "Hey you."
2. **The ask** — a big *Yes*, and a *No* button that runs away from your cursor
3. **Friday** — dinner picks, multi-select, plus a free-text "something else"
4. **Saturday** — the main event
5. **Sunday** — the slow one
6. **Recap** — the weekend, with falling hearts

Answers live only in the browser. Nothing is sent or stored anywhere, so
her picks don't come back to me — she has to screenshot the recap.

## Tweakable props

At the top of `app.js`:

| Constant | Default | Effect |
| --- | --- | --- |
| `NO_BUTTON_DODGES` | `true` | `false` makes *No* a real choice that jumps to the recap |
| `HEARTS_ENABLED` | `true` | `false` turns off the falling hearts |

## Files

```
index.html   markup shell + nav bar
styles.css   Organic design tokens, components, layout
app.js       all six slides, state, and rendering
image/       the four drawings
```

No build step, no dependencies. Fonts (Caprasimo, Figtree, Caveat) load
from Google Fonts, so it needs a connection to look right.

The drawings in `image/` are processed versions with their white
backgrounds converted to transparency, so they sit on the cream ground
instead of in white boxes. Originals are kept locally and not committed.

## Running it locally

```bash
python3 -m http.server 4173
```

Then open http://localhost:4173. Add your machine's LAN IP
(`ipconfig getifaddr en0`) to open it from a phone on the same wifi.

## Deploying

GitHub Pages serves `main` from the repo root. Push and it rebuilds:

```bash
git add -A && git commit -m "your message" && git push
```

The site is `noindex`ed so it stays out of search results, but the repo
is public — treat the URL as unlisted, not private.
