// 지출 내역
export type TransactionType = {
  id: string; // uuid4
  date: Date; // 달력 라이브러리
  list: ListType[];
};

export type ListType = {
  title: string; // 지출 제목
  items: ItemType[]; // 지출한 상품과 서비스 항목
  diary?: string[]; // 그날 있었던 일 간단 기록 (문자열 배열, optional)
};

// 지출 내역 변수
export const transactions: TransactionType[] = [];

// 각 장소에서 쓴 항목
export type ItemType = {
  id: string;
  name: string; // 상품이나 서비스 이름
  price: number; // 금액
  tag: string; // 태그: 까페, 밥, 화장품, 옷 등 (**작성자가 직접 태그 설정**)
  description?: string;
};

export const savedTags: TagType[] = [];

export type TagType = {
  id: string;
  name: string;
};

export type TabMenuIdType = 'all' | 'byWeek' | 'byDate' | 'byTag';
export type TabMenuStringType = '전체' | '주별' | '날짜별' | '태그별';
