import { Text } from '@vapor-ui/core';
import { ChevronDownOutlineIcon } from '@vapor-ui/icons';
import { useNavigate, useSearchParams } from 'react-router';
import { useState, useEffect } from 'react';
import FindingCard from '../components/FindingCard';
import PageHeader from '../components/PageHeader';
import { mockRecruitmentData } from '../data/mockData';
// import { usePost } from '../contexts/PostContext';

export default function List() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode'); // URL에서 mode 파라미터 읽기

  // 사용자가 참여한 모집글인지 여부를 관리 (예시: 사용자가 참여한 모집글 ID들)
  const [userJoinedRecruitments] = useState([1, 3]); // 예시: ID 1, 3번 모집글에 참여

  // URL 파라미터에 따라 초기 모드 설정
  const [showJoinedOnly, setShowJoinedOnly] = useState(mode === 'joined');

  useEffect(() => {
    // URL 파라미터가 변경될 때 모드 업데이트
    setShowJoinedOnly(mode === 'joined');
  }, [mode]);

  const Navigate = useNavigate();
  const handleBackClick = () => {
    Navigate(-1); // 이전 페이지로 이동
  };

  const handleCardClick = recruitmentId => {
    Navigate(`/detail/${recruitmentId}`); // Detail 페이지로 이동
  };

  const handleFinishedCardClick = recruitmentId => {
    Navigate(`/finished/${recruitmentId}`); // Finished 페이지로 이동
  };

  // 카드 클릭 핸들러 (isCompleted에 따라 다른 페이지로 이동)
  const handleRecruitmentCardClick = recruitment => {
    if (recruitment.isCompleted) {
      handleFinishedCardClick(recruitment.id); // 모집 완료 -> Finished 페이지
    } else {
      handleCardClick(recruitment.id); // 모집 중 -> Detail 페이지
    }
  };

  // 필터링된 데이터 (참여한 모집글만 보기 또는 참여하지 않은 모집글만 보기)
  const filteredData = showJoinedOnly
    ? mockRecruitmentData.filter(item =>
        userJoinedRecruitments.includes(item.id)
      )
    : mockRecruitmentData.filter(
        item => !userJoinedRecruitments.includes(item.id)
      );

  // 타이틀 결정 (참여한 모집글만 보는 경우 "예정된 냠냠단", 아니면 "모집글")
  const pageTitle = showJoinedOnly ? '예정된 냠냠단' : '모집글';
  const miniTitle = showJoinedOnly ? '냠냠단' : '모집글';

  return (
    <div className="w-full h-[100vh] overflow-scroll flex flex-col vapor-typography-fontFamily-sans">
      {/* 타이틀 */}
      <PageHeader title={pageTitle} onBackClick={handleBackClick} />
      {/* content body */}
      <div className="flex flex-col flex-1 px-4">
        <div className="flex flex-row h-[22px] my-3 justify-between items-center w-full">
          <div className="flex flex-row items-center">
            <Text typography="subtitle1" className="text-[#2B2D36]s">
              {miniTitle}{' '}
              <span className="text-[#D86100]">{filteredData.length}</span>
            </Text>
          </div>
          {/* 정렬 버튼 */}
          <div className="flex flex-row justify-end items-center">
            <Text typography="body3" className="text-[#2B2D36]">
              최신순
            </Text>
            <ChevronDownOutlineIcon className="w-[16px] h-[16px]" />
          </div>
        </div>

        {/* 모집글 리스트 */}
        <div className="flex flex-col gap-3 overflow-y-auto">
          {filteredData.map(recruitment => (
            <FindingCard
              key={recruitment.id}
              crewName={recruitment.crewName}
              crewDescription={recruitment.crewDescription}
              meetingDate={recruitment.meetingDate}
              closingDate={recruitment.closingDate}
              storeAddress={recruitment.storeAddress}
              storeName={recruitment.storeName}
              joinedcrewnumber={recruitment.joinedcrewnumber}
              crewnumber={recruitment.crewnumber}
              isCompleted={recruitment.isCompleted}
              onClick={() => handleRecruitmentCardClick(recruitment)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
