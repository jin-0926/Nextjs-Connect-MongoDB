'use client'

import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import ProductList from '../components/ProductList'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check for login state in localStorage
    const user = localStorage.getItem('user')
    if (user) {
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    alert('로그아웃 되었습니다.')
  }

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

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8fafc;
  color: #1e293b;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 10;
`

const Logo = styled.div`
  display: flex;
  align-items: center;
`

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`

const ButtonBase = styled.button`
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
`

const LoginButton = styled(ButtonBase)`
  background-color: #2563eb;
  color: white;
  border: none;

  &:hover {
    background-color: #1d4ed8;
  }
`

const LogoutButton = styled(ButtonBase)`
  background-color: white;
  color: #ef4444;
  border: 1px solid #ef4444;

  &:hover {
    background-color: #fef2f2;
  }
`

const Main = styled.main`
  flex: 1;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`

const HeroSection = styled.section`
  text-align: center;
`

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #2563eb, #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #64748b;
  margin-bottom: 3rem;
`

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`

const ProductCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`

const ProductImagePlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background-color: #e2e8f0;
  border-radius: 12px;
  margin-bottom: 1rem;
`

const ProductName = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`

const ProductPrice = styled.p`
  font-weight: 700;
  color: #2563eb;
`

const Footer = styled.footer`
  padding: 2rem;
  text-align: center;
  color: #94a3b8;
  font-size: 0.875rem;
  border-top: 1px solid #e2e8f0;
`
