import { faker } from "@faker-js/faker/locale/ko";
import * as fs from 'fs';
import * as path from 'path';

interface MockDataParams {
  type: string;
  count?: number;
  locale?: string;
}

interface RequestContext {
  params: any;
}

// Mock 데이터 생성 함수
const generateMockData = (type: string, count: number = 1, locale: string = "ko"): any => {
  const generators: { [key: string]: () => any } = {
    user: () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(true)
    }),
    company: () => ({
      name: faker.company.name(),
      catchPhrase: faker.company.catchPhrase(),
      address: faker.location.streetAddress(true),
      phone: faker.phone.number()
    }),
    product: () => ({
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.commerce.productDescription(),
      category: faker.commerce.department()
    }),
    profile: () => ({
      name: faker.person.fullName(),
      age: faker.number.int({ min: 20, max: 60 }),
      company: faker.company.name(),
      address: faker.location.streetAddress(true)
    })
  };

  const generator = generators[type];
  if (!generator) {
    throw new Error(`지원하지 않는 데이터 타입입니다: ${type}`);
  }

  if (count === 1) {
    return generator();
  }

  return Array.from({ length: count }, generator);
};

// 데이터 저장 함수
const saveDataToJson = (data: any, filename: string) => {
  // 데이터 디렉토리 생성
  const dataDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }

  // 파일 저장
  const filepath = path.join(dataDir, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`데이터가 저장되었습니다: ${filepath}`);
  return filepath;
};

// 임시 서버 구현
const server = {
  name: "mock-data-server",
  version: "1.0.0",
  
  setRequestHandler(method: string, handler: (request: RequestContext) => Promise<any>) {
    console.log(`Handler registered for method: ${method}`);
  },
  
  async connect(transport: any) {
    console.log("Server connected");
  }
};

// 테스트용 데이터 생성 및 저장
const profiles = generateMockData("profile", 10);
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const filename = `profiles_${timestamp}.json`;
saveDataToJson(profiles, filename);

// 콘솔에도 출력
console.log("생성된 프로필 데이터:");
console.log(JSON.stringify(profiles, null, 2));