import Navbar from '../components/Navbar'
import ProductList from '../components/ProductList'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      <Navbar />

      <div className="pt-20">
        <ProductList />
      </div>

      <footer className="border-t bg-white px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-sm text-gray-500">© 2026 LUXE SHOP. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="font-medium text-gray-400 transition hover:text-gray-900">
              Terms
            </a>
            <a href="#" className="font-medium text-gray-400 transition hover:text-gray-900">
              Privacy
            </a>
            <a href="#" className="font-medium text-gray-400 transition hover:text-gray-900">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
