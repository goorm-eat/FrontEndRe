import { Text } from '@vapor-ui/core';
import { useNavigate } from 'react-router';
import HomeCard from '../components/HomeCard';
import FindingCard from '../components/FindingCard';
import {
  getJoinedRecruitments,
  getAvailableRecruitments,
} from '../data/mockData';
//arrow는 vapor에 없어서 그냥 두었습니다.
import rightArrowIcon from '../img/rightArrow.svg';
// import { usePost } from '../contexts/PostContext.jsx';
// import { instance } from '../hooks/api.js';
import catIcon from '../img/catIcon2.svg';
import stringLogo from '../img/logoForHome.svg';
// import { useEffect, useState } from 'react';
// import instance from '../utils/baseInstance';

export default function Home() {
  const text = 'Test';
  const navigate = useNavigate();

  // Mock 데이터 사용
  const joinedRecruitments = getJoinedRecruitments();
  const availableRecruitments = getAvailableRecruitments();

  // // API 데이터를 위한 state (Mock 데이터로 대체)
  // // const [postList, setPostList] = useState([]); // 전체 리스트 (필요시 사용)
  // const [joinedRecruitments, setJoinedRecruitments] = useState([]);
  // const [availableRecruitments, setAvailableRecruitments] = useState([]);

  // useEffect(() => {
  //   const handlePostList = async () => {
  //     try {
  //       const response = await instance.get('/main/postlist');

  //       console.log('Post List:', response.data); // 데이터 확인
  //       const data = response.data || {};
  //       const posts = data.posts || [];
  //       const totalCount = data.count || 0;

  //       // 사용자가 참여한 모집글 ID들 (예시: 실제로는 사용자 정보에서 가져와야 함)
  //       const userJoinedIds = [1, 3];

  //       // 참여한 모집글과 참여하지 않은 모집글 분리
  //       const joined = posts.filter(item => userJoinedIds.includes(item.id));
  //       const available = posts.filter(
  //         item => !userJoinedIds.includes(item.id)
  //       );

  //       setJoinedRecruitments(joined);
  //       setAvailableRecruitments(available);

  //       console.log('Total posts count:', totalCount);
  //       return data;
  //     } catch (error) {
  //       console.error('Error fetching post list:', error);
  //       return []; // 에러 발생 시 빈 배열 반환
  //     }
  //   };
  //   handlePostList();
  // }, []); // 컴포넌트가 마운트될 때 한 번만 실행
  const listCount = availableRecruitments.length;

  const handleReMoreClick = () => {
    // 예정된 냠냠단 더보기 - 참여한 모집글만 보기 모드로 이동
    navigate('/list?mode=joined');
  };

  const handleMoreClick = () => {
    // 모집글 더보기 - 참여하지 않은 모집글만 보기 모드로 이동
    navigate('/list?mode=notjoined');
  };

  const handleMakeClick = () => {
    navigate('/create');
  };

  const handleCardClick = recruitmentId => {
    navigate(`/detail/${recruitmentId}`); // Detail 페이지로 이동
  };

  const handleFinishedCardClick = recruitmentId => {
    navigate(`/finished/${recruitmentId}`); // Finished 페이지로 이동
  };

  // 카드 클릭 핸들러 (isCompleted에 따라 다른 페이지로 이동)
  const handleRecruitmentCardClick = recruitment => {
    if (recruitment.isCompleted) {
      handleFinishedCardClick(recruitment.id); // 모집 완료 -> Finished 페이지
    } else {
      handleCardClick(recruitment.id); // 모집 중 -> Detail 페이지
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
        <div
          onClick={() => {
            handleReMoreClick();
          }}
          className="flex items-center"
        >
          <Text typography="body2">더보기</Text>
          <img src={rightArrowIcon} className="align-middle" />
        </div>
      </section>
      {/* 예정된 냠냠단 리스트 */}
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
        onClick={() => {
          handleMakeClick();
        }}
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
        <div
          onClick={() => {
            handleMoreClick();
          }}
          className="flex items-center"
        >
          <Text typography="body2">더보기</Text>
          <img src={rightArrowIcon} className="align-middle" />
        </div>
      </section>

      {/* 모집글 미리보기 */}
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
