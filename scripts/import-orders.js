const fs = require('fs');
const path = require('path');

// Shopify Admin API config
const SHOP_DOMAIN = process.env.SHOPIFY_SHOP_DOMAIN || 'norvia-6321.myshopify.com';
const ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
const API_VERSION = '2024-01';
const VARIANT_ID = 57354473570688;
const PRODUCT_PRICE = 28.95;

if (!ACCESS_TOKEN) {
  console.error('Error: SHOPIFY_ADMIN_ACCESS_TOKEN environment variable is required');
  console.error('Run with: SHOPIFY_ADMIN_ACCESS_TOKEN=shpat_xxx node scripts/import-orders.js');
  process.exit(1);
}

// Country code mapping
const countryCodeMap = {
  'Nederland': 'NL',
  'België': 'BE',
  'Duitsland': 'DE',
  'Frankrijk': 'FR',
  'Spanje': 'ES',
  'Portugal': 'PT',
  'Italië': 'IT',
  'Verenigd Koninkrijk': 'GB',
  'Oostenrijk': 'AT',
  'Polen': 'PL',
  'Tsjechië': 'CZ',
  'Hongarije': 'HU',
  'Kroatië': 'HR',
  'Roemenië': 'RO',
  'Bulgarije': 'BG',
  'Finland': 'FI',
  'Zweden': 'SE',
  'Denemarken': 'DK',
  'Noorwegen': 'NO',
  'Zwitserland': 'CH',
  'Ierland': 'IE',
  'Griekenland': 'GR',
  'Luxemburg': 'LU',
};

// Status mapping
const statusMap = {
  'Betaald': { financial: 'paid', fulfillment: null },
  'Verzonden': { financial: 'paid', fulfillment: 'fulfilled' },
  'Afgehaald': { financial: 'paid', fulfillment: 'fulfilled' },
  'Klaar om af te halen': { financial: 'paid', fulfillment: null },
  'In behandeling': { financial: 'pending', fulfillment: null },
  'Geannuleerd': { financial: 'refunded', fulfillment: null },
};

// Parse CSV
function parseCSV(content) {
  const lines = content.trim().split('\n');
  const headers = parseCSVLine(lines[0]);
  const orders = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const values = parseCSVLine(lines[i]);
    const order = {};
    headers.forEach((header, idx) => {
      order[header] = values[idx] || '';
    });
    orders.push(order);
  }
  return orders;
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

// Parse Dutch date format (d-m-yyyy) to ISO
function parseDate(dateStr) {
  const parts = dateStr.split('-');
  if (parts.length !== 3) return new Date().toISOString();
  const [day, month, year] = parts;
  return new Date(year, month - 1, day).toISOString();
}

// Calculate quantity from total
function calculateQuantity(total, shipping) {
  const productTotal = parseFloat(total.replace(',', '.')) - parseFloat(shipping.replace(',', '.') || 0);
  const quantity = Math.round(productTotal / PRODUCT_PRICE);
  return Math.max(1, quantity);
}

// Get country code
function getCountryCode(country) {
  return countryCodeMap[country] || 'NL';
}

// Make API request
async function shopifyRequest(endpoint, method = 'GET', data = null) {
  const url = `https://${SHOP_DOMAIN}/admin/api/${API_VERSION}${endpoint}`;

  const options = {
    method,
    headers: {
      'X-Shopify-Access-Token': ACCESS_TOKEN,
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);

  // Rate limiting
  if (response.status === 429) {
    console.log('Rate limited, waiting 2 seconds...');
    await new Promise(r => setTimeout(r, 2000));
    return shopifyRequest(endpoint, method, data);
  }

  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    console.error('Failed to parse response:', text);
    return null;
  }
}

// Create order in Shopify
async function createOrder(jouwwebOrder) {
  const orderNumber = jouwwebOrder['Ordernummer'];
  const status = statusMap[jouwwebOrder['Status']] || { financial: 'pending', fulfillment: null };

  // Skip cancelled orders
  if (jouwwebOrder['Status'] === 'Geannuleerd') {
    console.log(`Skipping cancelled order #${orderNumber}`);
    return null;
  }

  const quantity = calculateQuantity(
    jouwwebOrder['Totaal ex BTW'] || jouwwebOrder['Totaal'],
    jouwwebOrder['Verzendkosten']
  );

  const shippingCost = parseFloat((jouwwebOrder['Verzendkosten'] || '0').replace(',', '.')) || 0;

  const orderData = {
    order: {
      name: `#JW-${orderNumber}`,
      email: jouwwebOrder['E-mail'],
      phone: jouwwebOrder['Telefoon'] || null,
      created_at: parseDate(jouwwebOrder['Geplaatst']),
      financial_status: status.financial,
      fulfillment_status: status.fulfillment,
      send_receipt: false,
      send_fulfillment_receipt: false,
      tags: 'jouwweb-import',
      note: `Geïmporteerd van JouwWeb. Origineel ordernummer: ${orderNumber}. Betaalwijze: ${jouwwebOrder['Betaalwijze']}`,
      line_items: [
        {
          variant_id: VARIANT_ID,
          quantity: quantity,
          price: PRODUCT_PRICE.toString(),
        }
      ],
      shipping_lines: shippingCost > 0 ? [
        {
          title: 'Verzending',
          price: shippingCost.toString(),
          code: 'SHIPPING',
        }
      ] : [],
      billing_address: {
        first_name: jouwwebOrder['Naam'].split(' ')[0],
        last_name: jouwwebOrder['Naam'].split(' ').slice(1).join(' ') || jouwwebOrder['Naam'],
        company: jouwwebOrder['Bedrijf'] || null,
        address1: `${jouwwebOrder['Fact. straat']} ${jouwwebOrder['Fact. huisnummer']}`.trim(),
        city: jouwwebOrder['Fact. plaats'],
        zip: jouwwebOrder['Fact. postcode'],
        country_code: getCountryCode(jouwwebOrder['Fact. land']),
        phone: jouwwebOrder['Telefoon'] || null,
      },
      shipping_address: {
        first_name: (jouwwebOrder['Aflever naam'] || jouwwebOrder['Naam']).split(' ')[0],
        last_name: (jouwwebOrder['Aflever naam'] || jouwwebOrder['Naam']).split(' ').slice(1).join(' ') || (jouwwebOrder['Aflever naam'] || jouwwebOrder['Naam']),
        company: jouwwebOrder['Aflever bedrijf'] || null,
        address1: `${jouwwebOrder['Aflever straat']} ${jouwwebOrder['Aflever huisnummer']}`.trim(),
        city: jouwwebOrder['Aflever plaats'],
        zip: jouwwebOrder['Aflever postcode'],
        country_code: getCountryCode(jouwwebOrder['Aflever land']),
        phone: jouwwebOrder['Telefoon'] || null,
      },
      customer: {
        email: jouwwebOrder['E-mail'],
        first_name: jouwwebOrder['Naam'].split(' ')[0],
        last_name: jouwwebOrder['Naam'].split(' ').slice(1).join(' ') || jouwwebOrder['Naam'],
        phone: jouwwebOrder['Telefoon'] || null,
      },
    }
  };

  try {
    const result = await shopifyRequest('/orders.json', 'POST', orderData);

    if (result && result.order) {
      console.log(`✓ Order #JW-${orderNumber} created (Shopify ID: ${result.order.id}, ${quantity}x Norvia Gel)`);
      return result.order;
    } else if (result && result.errors) {
      console.error(`✗ Order #${orderNumber} failed:`, JSON.stringify(result.errors));
      return null;
    }
  } catch (error) {
    console.error(`✗ Order #${orderNumber} error:`, error.message);
    return null;
  }
}

// Main import function
async function importOrders() {
  console.log('=== JouwWeb naar Shopify Order Import ===\n');

  // Read CSV file
  const csvPath = '/Users/erenmete/Downloads/bestellingen (2).csv';

  if (!fs.existsSync(csvPath)) {
    console.error('CSV bestand niet gevonden:', csvPath);
    process.exit(1);
  }

  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const orders = parseCSV(csvContent);

  console.log(`Gevonden: ${orders.length} bestellingen\n`);

  // Process orders (oldest first)
  const reversedOrders = orders.reverse();

  let success = 0;
  let failed = 0;
  let skipped = 0;

  for (let i = 0; i < reversedOrders.length; i++) {
    const order = reversedOrders[i];

    // Small delay between requests to avoid rate limiting
    if (i > 0) {
      await new Promise(r => setTimeout(r, 500));
    }

    const result = await createOrder(order);

    if (result) {
      success++;
    } else if (order['Status'] === 'Geannuleerd') {
      skipped++;
    } else {
      failed++;
    }

    // Progress update every 10 orders
    if ((i + 1) % 10 === 0) {
      console.log(`\nProgress: ${i + 1}/${reversedOrders.length}\n`);
    }
  }

  console.log('\n=== Import Voltooid ===');
  console.log(`Succesvol: ${success}`);
  console.log(`Mislukt: ${failed}`);
  console.log(`Overgeslagen (geannuleerd): ${skipped}`);
}

// Run
importOrders().catch(console.error);
