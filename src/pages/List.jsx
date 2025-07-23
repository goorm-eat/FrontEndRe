// src/pages/List.jsx
import { Text } from '@vapor-ui/core';
import { ChevronDownOutlineIcon } from '@vapor-ui/icons';
import { useNavigate, useSearchParams } from 'react-router';
import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import FindingCard from '../components/FindingCard';
import PageHeader from '../components/PageHeader';
import { recruitmentAtom, userJoinedRecruitments } from '../data/mockData';

export default function List() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');

  const [recruitments] = useAtom(recruitmentAtom);

  const [showJoinedOnly, setShowJoinedOnly] = useState(mode === 'joined');

  useEffect(() => {
    setShowJoinedOnly(mode === 'joined');
  }, [mode]);

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCardClick = recruitmentId => {
    navigate(`/detail/${recruitmentId}`);
  };

  const handleFinishedCardClick = recruitmentId => {
    navigate(`/finished/${recruitmentId}`);
  };

  const handleRecruitmentCardClick = recruitment => {
    if (recruitment.isCompleted) {
      handleFinishedCardClick(recruitment.id);
    } else {
      handleCardClick(recruitment.id);
    }
  };

  const filteredData = showJoinedOnly
    ? recruitments.filter(item => userJoinedRecruitments.includes(item.id))
    : recruitments.filter(
        item => !userJoinedRecruitments.includes(item.id) && !item.isCompleted
      );

  const pageTitle = showJoinedOnly ? '예정된 냠냠단' : '모집글';
  const miniTitle = showJoinedOnly ? '냠냠단' : '모집글';

  return (
    <div className="w-full h-[100vh] overflow-scroll flex flex-col vapor-typography-fontFamily-sans">
      <PageHeader title={pageTitle} onBackClick={handleBackClick} />
      <div className="flex flex-col flex-1 px-4">
        <div className="flex flex-row h-[22px] my-3 justify-between items-center w-full">
          <div className="flex flex-row items-center">
            <Text typography="subtitle1" className="text-[#2B2D36]">
              {miniTitle}{' '}
              <span className="text-[#D86100]">{filteredData.length}</span>
            </Text>
          </div>
          <div className="flex flex-row justify-end items-center">
            <Text typography="body3" className="text-[#2B2D36]">
              최신순
            </Text>
            <ChevronDownOutlineIcon className="w-[16px] h-[16px]" />
          </div>
        </div>

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
