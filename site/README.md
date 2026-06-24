# Maa Saraswati Ice Factory — website

Plain, framework-free website. Just HTML, CSS and JS — no build step.

```
site/
├─ index.html      ← markup
├─ styles.css      ← all styles (light + dark theme)
├─ script.js       ← theme toggle, mobile menu, frost particles, counters, reveals
├─ vercel.json     ← Vercel config (clean URLs + safe headers)
└─ images/         ← product & hero photos
```

## Edit your details in ONE place
Open `script.js` and change the `DETAILS` object at the top:
```js
var DETAILS = {
  phone:   '+91 81969 66511',
  address: 'RXV9+63G, Sahnewal, Ludhiana, Punjab',
  hours:   '4:00 AM – 8:00 PM, every day'
};
```
Every phone number, address and hours line on the page updates automatically.
(The `tel:` links live in `index.html` — search for `+918196966511` if the number changes.)

## Deploy to Vercel
**Drag & drop:** go to https://vercel.com/new → drag this `site/` folder in → Deploy.
**Or CLI:**
```
npm i -g vercel
cd site
vercel --prod
```

## Turn on view tracking
The analytics scripts are already in `index.html`. After deploying:
1. Open your project on vercel.com
2. **Analytics** tab → Enable Web Analytics
3. (optional) **Speed Insights** tab → Enable

Views, visitors, top pages and devices then appear in the Analytics tab.
