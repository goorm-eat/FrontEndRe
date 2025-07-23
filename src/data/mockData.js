// src/store/recruitmentAtom.ts
import { atom } from 'jotai';

export const mockRecruitmentData = [
  {
    id: 1,
    crewName: '제주도 맛집 탐방 같이해요!',
    storeAddress: '제주특별자치도 제주시 은남4길 29',
    storeName: '산우정',
    meetingDate: '2025-07-12',
    meetingTime: '18:00',
    closingDate: '2025-07-11',
    closingTime: '23:59',
    chatLink: 'https://open.kakao.com/o/sample1',
    crewDescription: '산우정에서 고기먹자! 맛있는 제주 흑돼지를 함께 즐겨요.',
    joinedcrewnumber: 6,
    crewnumber: 6,
    isCompleted: true,
  },
  {
    id: 2,
    crewName: '몸국 투어',
    storeAddress: '제주특별자치도 제주시 광양10길 17',
    storeName: '호근동',
    meetingDate: '2025-07-08',
    meetingTime: '12:00',
    closingDate: '2025-07-07',
    closingTime: '18:00',
    chatLink: 'https://open.kakao.com/o/sample2',
    crewDescription: '제주도 몸국 맛집 함께 방문해봐요. 따뜻한 국물이 일품!',
    joinedcrewnumber: 2,
    crewnumber: 4,
    isCompleted: false,
  },
  {
    id: 3,
    crewName: '제주 회 파티',
    storeAddress: '제주특별자치도 제주시 국기로2길 2-9',
    storeName: '만베 회 센타',
    meetingDate: '2025-07-18',
    meetingTime: '19:30',
    closingDate: '2025-07-17',
    closingTime: '15:00',
    chatLink: 'https://open.kakao.com/o/sample3',
    crewDescription:
      '싱싱한 제철 생선을 먹으면서 야경을 감상해요. 바다 뷰 최고!',
    joinedcrewnumber: 8,
    crewnumber: 8,
    isCompleted: true,
  },
  {
    id: 4,
    crewName: '제주도 커피 투어',
    storeAddress: '제주특별자치도 제주시 서광로32길 20',
    storeName: '커피 파인더',
    meetingDate: '2025-07-20',
    meetingTime: '14:00',
    closingDate: '2025-07-19',
    closingTime: '12:00',
    chatLink: 'https://open.kakao.com/o/sample4',
    crewDescription:
      '세계의 다양한 커피를 맛보는 투어에 함께해요. 원두부터 디저트까지!',
    joinedcrewnumber: 1,
    crewnumber: 5,
    isCompleted: false,
  },
];

export const recruitmentAtom = atom(mockRecruitmentData);

// 사용자가 참여한 모집글 ID들 (예시 데이터)
export const userJoinedRecruitments = [1, 3];

// 특정 ID로 모집글 찾기
export const getRecruitmentById = id => {
  return mockRecruitmentData.find(item => item.id === id);
};

// 참여한 모집글만 필터링
export const getJoinedRecruitments = () => {
  return mockRecruitmentData.filter(item =>
    userJoinedRecruitments.includes(item.id)
  );
};

// 참여하지 않은 모집글만 필터링
export const getAvailableRecruitments = () => {
  return mockRecruitmentData.filter(
    item => !userJoinedRecruitments.includes(item.id)
  );
};

export const formatJejuAddress = address => {
  if (!address) return '';
  // 혹시 "제주특별자치도 " 부분이 있다면 제거
  return address.replace(/^제주특별자치도\s+/, '');
};
