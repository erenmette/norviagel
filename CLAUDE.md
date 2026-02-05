# Norvia Gel Glove - Shopify Storefront

## Project Overzicht
Futuristische webshop voor Norvia Gel Glove — een innovatieve gel die een onzichtbare beschermlaag vormt op de handen.
Gebouwd met Next.js als headless frontend, Shopify als backend (producten, checkout, betalingen), gedeployed op Vercel.

## Product Info
- **Product**: Norvia Gel Glove (Gel Handschoen)
- **Prijs**: €28,95 (introductieprijs)
- **Bescherming**: Tot 4 uur tegen olie, verf, vuil, chemicaliën
- **Siliconenvrij**, huidverzorgend, afwasbaar met water
- **Doelgroep**: Automotive, bouw, schilders, kappers, industrie, dakdekkers
- **B2B Focus**: Volumekorting, betaling op factuur

## Tech Stack
- **Framework**: Next.js 14+ (App Router, TypeScript)
- **Commerce**: Shopify Storefront API (GraphQL)
- **Styling**: Tailwind CSS v4
- **3D**: Three.js / React Three Fiber / Drei
- **Animaties**: GSAP + ScrollTrigger (gepland), CSS animaties
- **i18n**: next-intl (NL + EN, auto-detectie browsertaal)
- **Deployment**: Vercel (auto-deploy via GitHub)
- **Shipping**: Sendcloud (Shopify app)

## Kleurenpalet
- Primary: #0A1628 (deep industrial blue)
- Accent: #00A3FF (electric blue)
- Surface: #0F1D32
- Glow effecten: rgba(0, 163, 255, 0.4)
- Design: Dark industrieel theme, glassmorphism, grid patterns

## Development
```bash
npm run dev     # Start development server
npm run build   # Production build
npm run lint    # Lint code
```

## Shopify Store Info
- **Store URL**: norvia-6321.myshopify.com
- **Product ID**: gid://shopify/Product/15549218750848
- **Variant ID**: gid://shopify/ProductVariant/57354473570688
- **Product handle**: norvia-gel-glove

## Environment Variables (.env.local)
```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=norvia-6321.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=<public-storefront-token>
NEXT_PUBLIC_SITE_URL=https://norviagel.vercel.app
```
Vercel env vars staan ook ingesteld voor production.

## Shopify Dev Informatie (2026)

### Nieuw systeem: Dev Dashboard (dev.shopify.com)
Sinds 1 januari 2026 worden nieuwe custom apps aangemaakt via het **Shopify Developer Dashboard** op `dev.shopify.com`, niet meer via Shopify Admin → Settings → Apps.

### Storefront API Token ophalen
De makkelijkste manier voor een headless storefront:
1. Installeer het **Headless** kanaal vanuit de Shopify App Store
2. Ga in Shopify Admin naar het Headless kanaal
3. Klik **Create storefront** → geef het een naam
4. Je krijgt automatisch een **public** en **private** access token
5. Bij **Storefront API permissions** → Edit → vink alles aan
6. De **public token** wordt gebruikt in de frontend (NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN)

### Wat NIET te doen
- Het Dev Dashboard (`dev.shopify.com`) is voor het bouwen van Shopify apps met CLI — **niet** voor headless storefronts
- `npm init @shopify/app@latest` is voor Shopify app development, niet voor ons project
- De Client ID en API Secret op het Dev Dashboard zijn voor OAuth flows, niet voor Storefront API

### Referenties
- Headless channel: https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/manage-headless-channels
- Storefront API getting started: https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/getting-started
- API versie: 2024-01 (in src/lib/shopify.ts)

## Shopify Setup Checklist
- [x] Shopify store aangemaakt (norvia-6321.myshopify.com)
- [x] Product aangemaakt: Norvia Gel Glove, €28,95
- [x] Headless kanaal geïnstalleerd → Storefront API token opgehaald
- [x] Storefront API connectie getest en werkend
- [ ] Sendcloud app installeren
- [ ] Betalingen instellen (iDEAL, Bancontact, etc.)
- [ ] Bulk kortingen configureren voor B2B

## Project Structuur
```
src/
├── app/
│   ├── [locale]/           # i18n routing (nl/en)
│   │   ├── page.tsx        # Homepage
│   │   ├── product/        # Productpagina
│   │   ├── about/          # Over ons
│   │   └── contact/        # Contact
│   └── api/shopify/        # Cart API routes
├── components/
│   ├── hero/               # Hero sectie met 3D
│   ├── sections/           # Homepage secties
│   ├── layout/             # Header, Footer
│   ├── cart/               # Cart drawer
│   └── three/              # 3D componenten
├── lib/
│   ├── shopify.ts          # Shopify API client
│   ├── cart-context.tsx     # Cart state management
│   └── utils.ts            # Utility functies
├── i18n/                   # Internationalisatie config
└── messages/               # NL + EN vertalingen
```

## Toekomstige Features / Roadmap
- [ ] **Veo 3 / NanoBanana Visualisatie**: Foto/video van gelpot die gel over een hand giet en een onzichtbare handschoen vormt. Dit wordt een scroll-triggered animatie op de homepage (How It Works sectie).
- [ ] **GSAP ScrollTrigger**: Geavanceerde scroll-animaties toevoegen met GSAP voor parallax en reveal effecten
- [ ] **Product 3D Model**: Interactief 3D model van de gelpot (React Three Fiber)
- [ ] **Meer talen**: Duits, Frans, Spaans etc.
- [ ] **Blog/Content**: SEO-content over handbescherming
- [ ] **Klanten portal**: B2B klanten login voor herhaalde bestellingen
- [ ] **Reviews integratie**: Shopify reviews of Trustpilot
- [ ] **Custom domein**: Overschakelen van Shopify standaard domein naar eigen domein

## Contactgegevens
- **Email**: gelgloves@carpartsroosendaal.nl
- **Telefoon**: +31 16585222
- **Adres**: Gastelseweg 59, Roosendaal
