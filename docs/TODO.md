# 📝 Shopping Mall Development Roadmap

이 문서는 프로젝트의 향후 작업 단계를 정리한 로드맵입니다.

## 🚀 Upcoming Tasks

### Phase 1: Product Detail & Navigation
- [ ] **1. 상품 상세 페이지 구현 (`/product/[id]`)**
  - 개별 상품 정보를 서버(MongoDB)에서 불러와 출력하는 페이지 생성
  
- [ ] **2. 사용자 이동 로직 연결**
  - 메인 페이지나 상품 목록에서 클릭 시 해당 상세 페이지로 이동하도록 설정

### Phase 2: Cart Functionality
- [ ] **3. 장바구니 담기 토글 (상세 페이지)**
  - 상세 페이지에서 '장바구니 담기' 버튼 클릭 시 추가/삭제 토글 기능 (Database 연동)
- [ ] **4. 장바구니 페이지 이동 로직**
  - 헤더의 카트 아이콘(Cart Icon) 클릭 시 `/cart` 주소로 이동
- [ ] **5. 장바구니 목록 확인 (`/cart`)**
  - 사용자가 담은 상품 리스트를 한눈에 볼 수 있는 페이지 구현

### Phase 3: Checkout & Seller Integration
- [ ] **6. 결제 기능 구현 (Payment Logic)**
  - 실제 결제 프로세스 연동 (결제 정보 처리)
- [ ] **7. 판매자 인증/알림 로직**
  - 사용자가 결제 완료 시 해당 상품의 판매자에게 판매 알림 및 인증 처리

---
*Last updated: 2026-04-01*
