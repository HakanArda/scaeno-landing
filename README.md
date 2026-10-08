# Scaeno landing page

The public site for [Scaeno](https://apps.apple.com/app/id6796313306), a movie and TV guessing game: see three
stills from the same title, name it before the clock runs out.

**Live:** https://scaeno.trust-software.com/

A single static page: `index.html` (markup, styles and script in one file), the Tuffy font in `fonts/`, and
Fugaz One and Space Mono from Google Fonts. There is no build step.

The design direction is "Midnight Rental", a video rental store after closing time, built on the app's own
"Neon Rental" palette. The design spec lives in the app repo at
`docs/superpowers/specs/2026-09-27-scaeno-landing-design.md`.

## Preview locally

Open `index.html` in a browser. Everything works from disk. Fonts from Google need a connection, and the page falls
back to system fonts without one.

## Check before you push

```sh
node check.mjs
```

It confirms that every section in the map below exists on the page, that no placeholder text or point values are
published, and that the App Store link is correct.

## Deploy

Cloudflare Pages serves the `main` branch from the repository root (no build step) at scaeno.trust-software.com. Push
to `main` and the site updates within a minute or two.

GitHub Pages still serves the same files at the old address, hakanarda.github.io/scaeno-landing; the canonical tag
points search engines here.

## Keeping the page current (strict rule)

The page must describe the app as it ships. The Scaeno app repo's `AGENTS.md` ("Landing Page Sync (Strict)")
requires every user-facing change in the app to update the matching section here in the same piece of work. This
applies to Claude, Codex and people alike.

| Section (`id`) | What it shows | Source of truth in the app repo |
|---|---|---|
| `#top` | Hero and demo round: three stills, four answers, 10-second clock | `src/components/BackdropStack.tsx`, `strings.modeEasyDesc` |
| `#modes` | Easy and Hard rules, hints, rounds per game | `strings.modeEasyDesc` / `modeHardDesc`, `strings.hintLabels`, `supabase/functions/_shared/config.ts` |
| `#shelves` | Categories: genres, decades, curated lists, mixed | the live `collections` table (`is_active = true`) |
| `#daily` | Daily Challenge: 15 questions, weekday themes, streaks, freezes, ranking | `supabase/functions/_shared/daily-config.ts`, `strings.daily*` |
| `#challenges` | 1v1 and group challenges, invite codes and usernames, results | `app/challenges/*`, `strings.challenges*` |
| `#club` | Membership, leaderboards, achievement tiers and titles, guest limits | achievements seed migration, `theme.tiers`, `strings.membership*`, `session-start` guest limit |
| `#download` | Store badges and availability | App Store id6796313306; Google Play not live yet |

The footer's legal links follow `src/lib/legal.ts`, and its TMDB line follows `strings.aboutAttribution`.

Copy rules:

- Don't publish scoring numbers. Say that faster right answers score more.
- Only describe features that are live in the store build.
- Never use TMDB images or real film stills. The demo uses original illustrations of made-up films, and says so.
- Don't list brand-named collections (for example, the Marvel lists), so the page doesn't imply a partnership.
- The Google Play badges are disabled buttons with a "Coming soon" tooltip. When the Android listing is live, turn
  both into links to `https://play.google.com/store/apps/details?id=com.trustsoftware.scaeno` and change "Free on
  iPhone. Android is coming soon." to "Free on iPhone and Android."
- The FugazOne wordmark is the logo. Never change its font.

## Credits

Written, designed and produced by [HakanArda](https://github.com/HakanArda). Film and TV data in the app comes from
TMDB. This product uses the TMDB API but is not endorsed or certified by TMDB.
