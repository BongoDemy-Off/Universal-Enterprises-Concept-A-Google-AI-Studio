import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { BikeProvider } from './context/BikeContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { I18nProvider } from './context/I18nContext';
import {
  Home, Shop, ShopByBike, CategoryDetails, BrandDetails,
  SearchResults, ProductDetails, Cart, Checkout, Wishlist,
  OrderConfirmation,
  AccountDashboard, AccountOrders, OrderDetails, SavedAddresses, MyBike, Profile,
  TrackOrder, Wholesale, StaticPage,
  MarketingGrid, BlogIndex, BlogPost
} from './pages';

export default function App() {
  return (
    <BrowserRouter>
      <I18nProvider>
      <CartProvider>
      <WishlistProvider>
      <BikeProvider>
        <Layout>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop-by-bike" element={<ShopByBike />} />
          <Route path="/categories" element={<StaticPage title="Categories" />} />
          <Route path="/category/:slug" element={<CategoryDetails />} />
          <Route path="/brands" element={<StaticPage title="Brands" />} />
          <Route path="/brand/:slug" element={<BrandDetails />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/wishlist" element={<Wishlist />} />
          
          {/* Account Routes */}
          <Route path="/account" element={<AccountDashboard />} />
          <Route path="/account/orders" element={<AccountOrders />} />
          <Route path="/account/orders/:id" element={<OrderDetails />} />
          <Route path="/account/addresses" element={<SavedAddresses />} />
          <Route path="/account/my-bike" element={<MyBike />} />
          <Route path="/account/profile" element={<Profile />} />
          
          {/* Misc Routes */}
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/wholesale" element={<Wholesale />} />
          <Route path="/offers" element={<MarketingGrid title="Special Offers" filterType="offers" />} />
          <Route path="/new-arrivals" element={<MarketingGrid title="New Arrivals" filterType="new" />} />
          <Route path="/best-sellers" element={<MarketingGrid title="Best Sellers" filterType="best" />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          
          <Route path="/about" element={<StaticPage title="About Us" />} />
          <Route path="/contact" element={<StaticPage title="Contact Us" />} />
          <Route path="/faq" element={<StaticPage title="FAQ" />} />
          <Route path="/terms" element={<StaticPage title="Terms of Service" />} />
          <Route path="/privacy" element={<StaticPage title="Privacy Policy" />} />
          <Route path="/returns" element={<StaticPage title="Returns Policy" />} />
          <Route path="/shipping" element={<StaticPage title="Shipping Policy" />} />
        </Routes>
      </Layout>
      </BikeProvider>
      </WishlistProvider>
      </CartProvider>
      </I18nProvider>
    </BrowserRouter>
  );
}
