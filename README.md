# OneGym Strength Tracker

A mobile-first, static workout tracker designed around OneGym Ryhope. It runs on GitHub Pages and stores data in the browser using `localStorage`. No paid backend or account is required.

## Features
- Workout logging: exercise, sets, load, reps and RIR.
- Exercise/equipment catalogue with primary and secondary muscle mappings.
- Muscle recovery estimates based on logged hard sets and configurable time windows.
- Session history, volume totals and best logged weight per exercise.
- Custom exercise creation.
- JSON export/import backups.
- Offline caching after the first successful visit (service worker requires HTTPS/localhost).
- Responsive iPhone layout.

## Important equipment accuracy note
The gym does not publish a complete machine-by-machine inventory for the Ryhope branch. The catalogue marks equipment previously identified by the user as **Known at Ryhope** and marks broader categories as **Category / confirm on floor**. Do not interpret unverified categories as a confirmed exact machine list. Add or edit custom exercises as needed.

Known user-reported equipment included:
- Panatta decline chest press, chest press, shoulder press and seated super incline press.
- Panatta multi-station cable station.
- Hoist ROC-IT lat pulldown and chest press.
- Atlantis Smith machine.

General branch equipment categories reported in public gym listings include dumbbells, barbells, platforms/racks, treadmills, bikes, rowers, cross trainers/ellipticals, steppers and battle ropes. Some functional-training items are brand-level categories and are explicitly marked for on-floor confirmation.

## Deploy to GitHub Pages
1. On GitHub, create a new public repository, for example `onegym-tracker`.
2. Upload **all files and folders** from this project. Keep `index.html` in the repository root.
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then save.
6. Wait for GitHub Pages to publish the site. The Pages panel will show the public URL.
7. Open that URL in Safari on your iPhone.

## Add to iPhone Home Screen
1. Open the published site in Safari.
2. Tap the Share icon.
3. Choose **Add to Home Screen**.
4. Tap **Add**.

For offline use, open the site once while online, then revisit it. Safari storage and service-worker behaviour can vary; keep JSON backups.

## Data and privacy
All workout records are stored locally in the browser on the device. The project does not transmit workout data to a server. Clearing Safari website data may erase records. Use **Data & settings → Export backup** regularly and keep the JSON file somewhere safe. Importing a backup replaces the current local dataset.

## Recovery model
The recovery percentage is a simple planning heuristic. It decays recent hard-set exposure over user-configurable muscle-specific time windows. It is not a physiological measurement, does not diagnose readiness, and should not override pain, illness, poor sleep, or how you feel. RIR is used to distinguish hard sets from easier sets, but all set counting is approximate.

## Local preview
Because this is a static site, no Python server or package installation is needed. Open `index.html` in a browser. For reliable service-worker testing, use a local HTTP server or GitHub Pages HTTPS.

## Sources used for the starter catalogue
- OneGym official site: https://www.onegymfitness.com/
- OneGym Ryhope listing and general equipment categories: https://gymdirectory.co.uk/gym/onegym-ryhope
- OneGym Ryhope public posts: https://www.localgymsandfitness.com/GB/Ryhope/100439089504963/OneGym-Sunderland-Ryhope
- Hoist Fitness UK announcement on OneGym's Hoist ROC-IT equipment: https://www.linkedin.com/posts/hoist-fitness-uk_onegym-adds-hoist-roc-it-strength-equipment-activity-7138497422292344832-hwFV

These sources do not establish every exact machine currently on the Ryhope gym floor.
