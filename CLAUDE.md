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

## Environment Variables (.env.local)
```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Shopify Setup (Gebruiker)
1. Shopify store aanmaken
2. Product toevoegen: Norvia Gel Glove, €28,95
3. Storefront API app aanmaken → token ophalen
4. Sendcloud app installeren
5. Betalingen instellen (iDEAL, Bancontact, etc.)
6. Bulk kortingen configureren voor B2B

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
