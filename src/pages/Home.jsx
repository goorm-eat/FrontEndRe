// src/pages/Home.jsx
import { Text } from '@vapor-ui/core';
import { useNavigate } from 'react-router';
import HomeCard from '../components/HomeCard';
import FindingCard from '../components/FindingCard';
import { useAtom } from 'jotai';
import { recruitmentAtom, userJoinedRecruitments } from '../data/mockData';
import rightArrowIcon from '../img/rightArrow.svg';
import catIcon from '../img/catIcon2.svg';
import stringLogo from '../img/logoForHome.svg';

export default function Home() {
  const text = 'Test';
  const navigate = useNavigate();
  const [recruitments] = useAtom(recruitmentAtom);

  // 필터링된 모집글 목록
  const joinedRecruitments = recruitments.filter(item =>
    userJoinedRecruitments.includes(item.id)
  );

  const availableRecruitments = recruitments.filter(
    item => !userJoinedRecruitments.includes(item.id) && !item.isCompleted
  );

  const listCount = availableRecruitments.length;

  const handleReMoreClick = () => {
    navigate('/list?mode=joined');
  };

  const handleMoreClick = () => {
    navigate('/list?mode=notjoined');
  };

  const handleMakeClick = () => {
    navigate('/create');
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

  return (
    <div className="h-[100vh] overflow-scroll">
      <section className="flex justify-between items-center h-[3.75rem]">
        <img src={stringLogo} />
        <Text typography="subtitle1">{text}</Text>
      </section>

      <section className="flex justify-between items-center my-[0.75rem]">
        <span>
          <Text typography="heading4">예정된 냠냠단</Text>
        </span>
        <div onClick={handleReMoreClick} className="flex items-center">
          <Text typography="body2">더보기</Text>
          <img src={rightArrowIcon} className="align-middle" />
        </div>
      </section>

      <section className="flex gap-[0.75rem] overflow-scroll w-full">
        {joinedRecruitments.length > 0 ? (
          joinedRecruitments.slice(0, 3).map(recruitment => (
            <div key={recruitment.id} className="flex-shrink-0 w-[280px]">
              <FindingCard
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
            </div>
          ))
        ) : (
          <HomeCard />
        )}
      </section>

      <section
        className="flex justify-center gap-[1.1rem] items-center w-90% p-[1.25rem] bg-[#FAEDE6] rounded-3xl my-[2rem]"
        onClick={handleMakeClick}
      >
        <img src={catIcon} />
        <div className="flex gap-[0.44rem]">
          <section className="flex flex-col gap-[0.25rem]">
            <Text typography="heading5">모집글 만들러 가기</Text>
            <Text typography="body2">모집글로 냠냠단을 직접 꾸려보세요!</Text>
          </section>
          <img src={rightArrowIcon} />
        </div>
      </section>

      <section className="flex justify-between items-center">
        <span>
          <Text typography="heading4" foreground="primary">
            {listCount}개
          </Text>
          <Text typography="heading4">의 모집글</Text>
        </span>
        <div onClick={handleMoreClick} className="flex items-center">
          <Text typography="body2">더보기</Text>
          <img src={rightArrowIcon} className="align-middle" />
        </div>
      </section>

      <section className="flex flex-col gap-3 mt-4 pb-4">
        {availableRecruitments.slice(0, 2).map(recruitment => (
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
      </section>
    </div>
  );
}
