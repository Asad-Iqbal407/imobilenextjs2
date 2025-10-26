# Cart System Implementation Plan

## Current Issues
- Phones page: "Add to Cart" buttons have no functionality
- Accessories page: Uses custom cart logic instead of centralized `addToCartItem`
- Inconsistent cart implementation across pages

## Tasks
- [x] Update phones page to import and use `addToCartItem` function
- [x] Add onClick handlers to "Add to Cart" buttons in phones page
- [x] Update accessories page to use centralized `addToCartItem` instead of custom logic
- [ ] Ensure all pages consistently use the cart system
- [ ] Test cart functionality across all pages

## Files to Modify
- src/app/phones/page.tsx
- src/app/accessories/page.tsx

# Admin Panel Implementation Plan

## Tasks
- [x] Extend products API with DELETE and PUT methods
- [x] Add GET method to contact API for viewing submissions
- [ ] Create admin components for product management, contact list, cart list
- [ ] Create /admin page with basic authentication
- [ ] Update navigation to include admin link
- [ ] Test admin functionalities

## Files to Modify/Create
- src/app/api/products/route.ts (extend with DELETE, PUT)
- src/app/api/contact/route.ts (add GET)
- src/app/admin/page.tsx (new)
- src/app/components/AdminProductForm.tsx (new)
- src/app/components/AdminProductList.tsx (new)
- src/app/components/AdminContactList.tsx (new)
- src/app/components/AdminCartList.tsx (new)
- src/app/components/Navigation.tsx (add admin link)

## Implementation Steps
- [x] Step 1: Extend products API with DELETE and PUT methods
- [x] Step 2: Add GET method to contact API
- [ ] Step 3: Create AdminProductForm component
- [ ] Step 4: Create AdminProductList component
- [ ] Step 5: Create AdminContactList component
- [ ] Step 6: Create AdminCartList component
- [ ] Step 7: Create /admin page with authentication
- [ ] Step 8: Update Navigation component
- [ ] Step 9: Test admin functionalities
