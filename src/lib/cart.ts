export async function addToCartItem(item: any, quantity = 1) {
  if (typeof window === 'undefined') return;

  try {
    // Add to database
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: item.id,
        quantity
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to add item to cart');
    }

    // Also update localStorage for immediate UI updates
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = currentCart.find((i: any) => i.id === item.id);

    if (existing) {
      existing.quantity = (existing.quantity || 0) + quantity;
    } else {
      currentCart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        originalPrice: item.originalPrice,
        brand: item.brand,
        image: item.image,
        quantity: quantity,
        category: item.category
      });
    }

    localStorage.setItem('cart', JSON.stringify(currentCart));
    // dispatch custom event so other parts of the app can react
    window.dispatchEvent(new Event('cartUpdated'));

    // Show alert to confirm item was added
    alert(`${item.name} added to cart!`);
  } catch (e) {
    // swallow errors but log for debugging
    // eslint-disable-next-line no-console
    console.error('addToCartItem error', e);
  }
}
