# MCP Mock Data Server

Faker.js 기반 Mock 데이터 생성 MCP 서버

## 기능

- 다양한 타입의 Mock 데이터 생성
  - 사용자 프로필
  - 회사 정보
  - 제품 정보
- JSON 형식으로 데이터 저장
- 한국어/영어 지원

## 설치

```bash
npm install
```

## 실행

개발 모드:
```bash
npm run dev
```

프로덕션 모드:
```bash
npm run build
npm start
```

## 사용 예시

```typescript
// 사용자 프로필 생성
const profiles = generateMockData('profile', 10);

// 회사 정보 생성
const companies = generateMockData('company', 5);

// 영어로 제품 정보 생성
const products = generateMockData('product', 3, 'en');
```