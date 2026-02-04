'use client';

import { useTranslations } from 'next-intl';
import { useCart } from '@/lib/cart-context';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';

export default function CartDrawer() {
  const t = useTranslations('cart');
  const { cart, isOpen, closeCart, updateItem, removeItem, isLoading } = useCart();

  if (!isOpen) return null;

  const lines = cart?.lines.edges.map((edge) => edge.node) || [];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md z-50 glass border-l border-border flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-accent" />
            <h2 className="text-lg font-semibold">{t('title')}</h2>
            {cart && cart.totalQuantity > 0 && (
              <span className="bg-accent/20 text-accent text-xs font-bold px-2 py-0.5 rounded-full">
                {cart.totalQuantity}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-text-muted hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {lines.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-text-muted/30 mb-4" />
              <p className="text-text-muted">{t('empty')}</p>
              <button
                onClick={closeCart}
                className="mt-4 btn-secondary text-sm"
              >
                {t('continueShopping')}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {lines.map((line) => {
                const image = line.merchandise.product.images.edges[0]?.node;
                return (
                  <div
                    key={line.id}
                    className="flex gap-4 p-4 rounded-xl glass-light"
                  >
                    {/* Product Image */}
                    <div className="w-20 h-20 rounded-lg bg-surface overflow-hidden flex-shrink-0">
                      {image ? (
                        <Image
                          src={image.url}
                          alt={image.altText || line.merchandise.product.title}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-text-muted">
                          <ShoppingBag size={24} />
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-white truncate">
                        {line.merchandise.product.title}
                      </h3>
                      <p className="text-sm text-accent font-semibold mt-1">
                        {formatPrice(line.cost.totalAmount.amount, line.cost.totalAmount.currencyCode)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-border rounded-lg">
                          <button
                            onClick={() => updateItem(line.id, Math.max(0, line.quantity - 1))}
                            disabled={isLoading}
                            className="p-1.5 hover:text-accent transition-colors disabled:opacity-50"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 text-sm font-medium min-w-[2rem] text-center">
                            {line.quantity}
                          </span>
                          <button
                            onClick={() => updateItem(line.id, line.quantity + 1)}
                            disabled={isLoading}
                            className="p-1.5 hover:text-accent transition-colors disabled:opacity-50"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem([line.id])}
                          disabled={isLoading}
                          className="p-1.5 text-text-muted hover:text-red-400 transition-colors disabled:opacity-50"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {lines.length > 0 && cart && (
          <div className="p-6 border-t border-border space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">{t('subtotal')}</span>
              <span className="text-lg font-bold text-white">
                {formatPrice(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode)}
              </span>
            </div>
            <a
              href={cart.checkoutUrl}
              className="block w-full btn-primary text-center text-base py-4"
            >
              {t('checkout')}
            </a>
          </div>
        )}
      </div>
    </>
  );
}
