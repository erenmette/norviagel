import { NextResponse } from 'next/server';
import { createCart, addToCart, updateCartLine, removeFromCart, getCart } from '@/lib/shopify';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, cartId, variantId, quantity, lineId, lineIds } = body;

    let cart;

    switch (action) {
      case 'create':
        cart = await createCart(variantId, quantity || 1);
        break;
      case 'add':
        cart = await addToCart(cartId, variantId, quantity || 1);
        break;
      case 'update':
        cart = await updateCartLine(cartId, lineId, quantity);
        break;
      case 'remove':
        cart = await removeFromCart(cartId, lineIds);
        break;
      case 'get':
        cart = await getCart(cartId);
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    return NextResponse.json({ cart });
  } catch (error) {
    console.error('Cart API error:', error);
    return NextResponse.json(
      { error: 'Failed to process cart operation' },
      { status: 500 }
    );
  }
}
