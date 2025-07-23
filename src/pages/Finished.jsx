import { Dialog, Text, Button } from '@vapor-ui/core';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  GroupIcon,
  CalendarOutlineIcon,
  TimeOutlineIcon,
  CalendarIcon,
  TimeIcon,
  KakaoIcon,
} from '@vapor-ui/icons';
//추후 참여하기 버튼에 사용해야한다.
import PageHeader from '../components/PageHeader';
import MeetingMap from '../components/MeetingMap';
import { getRecruitmentById, formatJejuAddress } from '../data/mockData';
// import { usePost } from '../contexts/PostContext';
import avatar from '../img/avatar.png';

export default function Finished() {
  const { id } = useParams(); // URL에서 모집글 ID 가져오기
  const [isGetApi, setGetApi] = useState(false);
  const [recruitment, setRecruitment] = useState(null);

  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/home'); // 홈으로 이동
  };

  // 모집글 데이터 로드
  useEffect(() => {
    const recruitmentId = parseInt(id) || 1; // 기본값 1
    const data = getRecruitmentById(recruitmentId);
    setRecruitment(data);
  }, [id]);

  //다이어로그 통신 후에 true로 바꿔주면 됩니다.
  const handleModalBtnClick = () => {
    setGetApi(true);
  };

  // 데이터 로딩 중이면 로딩 표시
  if (!recruitment) {
    return <div>로딩 중...</div>;
  }

  const naverId = '네이버 아이디';
  const title = recruitment.crewName;
  const memo = recruitment.crewDescription;
  const joinedcrewnumber = recruitment.joinedcrewnumber;
  const crewnumber = recruitment.crewnumber;
  const closingDate = recruitment.closingDate;
  const closingTime = recruitment.closingTime;
  const meetingDate = recruitment.meetingDate;
  const meetingTime = recruitment.meetingTime;
  const address = recruitment.storeAddress;
  const storeName = recruitment.storeName;
  const kakaoLink = recruitment.chatLink;

  return (
    <div className="flex flex-col items-start h-[100%] overflow-y-scroll">
      <PageHeader title="모집글" />
      <img className="w-[21.4375rem] h-[21.4375rem] mt-[0.94rem] rounded-[1.5rem]" />
      <section className="flex items-center gap-[0.5rem] mt-[0.75rem]">
        <img src={avatar} className="w-[1.5rem] h-[1.5rem]" />
        <Text typography="subtitle1">{naverId}</Text>
      </section>
      <Text typography="heading4" className="mt-[0.75rem]">
        {title}
      </Text>
      <Text typography="body2" className="break-words mt-[0.75rem]">
        {memo}
      </Text>
      <section className="flex gap-[0.25rem] items-center mt-[0.75rem]">
        <GroupIcon />
        <Text typography="body2">모집인원</Text>
        <Text typography="subtitle1" foreground="primary">
          {joinedcrewnumber}/{crewnumber}
        </Text>
      </section>
      <Text typography="heading6" className="mt-[2rem]">
        상세 일정
      </Text>
      <section className="grid grid-cols-2 auto-rows-min gap-x-[2.5rem] gap-y-[0.2rem] mt-[0.25rem]">
        <span className="flex items-center gap-[0.25rem] mt-[0.25rem]">
          <CalendarOutlineIcon />
          <Text typography="body2">마감일</Text>
        </span>
        <Text typography="body2">{closingDate}</Text>
        <span className="flex items-center gap-[0.25rem]">
          <TimeOutlineIcon />
          <Text typography="body2">마감 시간</Text>
        </span>
        <Text typography="body2">{closingTime}</Text>
        <div className="col-span-2 h-[0.1rem]" />
        <span className="flex items-center gap-[0.25rem] mt-[0.25rem]">
          <CalendarIcon />
          <Text typography="body2">만남일</Text>
        </span>
        <Text typography="body2">{meetingDate}</Text>
        <span className="flex items-center gap-[0.25rem]">
          <TimeIcon />
          <Text typography="body2">만남 시간</Text>
        </span>
        <Text typography="body2">{meetingTime}</Text>
      </section>
      <section className="flex flex-col gap-[12px]">
        <Text typography="heading6" className="mt-[1.75rem]">
          위치 정보
        </Text>
        <MeetingMap address={address} />
        <Text typography="subtitle1">{formatJejuAddress(address)}</Text>
        <Text typography="subtitle1">{storeName}</Text>
      </section>
      <Text typography="heading6" className="mt-[1.75rem]">
        여기서 대화해요
      </Text>
      <section className="flex items-center mt-[0.75rem] mb-[5.1875rem]">
        <KakaoIcon />
        <Text typography="body2">
          오픈 채팅방 : <a href={kakaoLink}>{kakaoLink}</a>
        </Text>
      </section>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button
            stretch
            disabled
            color="primary"
            size="xl"
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[22.1875rem] text-white rounded-xl"
            onClick={() => {
              handleModalBtnClick();
            }}
          >
            모집이 완료된 냠냠단이에요.
          </Button>
        </Dialog.Trigger>
        {/* isGetApi를 통신 후에 true로 만들어주면 됩니다. */}
        {isGetApi && (
          <Dialog.CombinedContent className="w-[21.4375rem]">
            <Dialog.Header
              className="flex justify-center items-center px-6 pt-6 pb-3"
              stretch
            >
              <Dialog.Title>
                <Text typography="heading5">참여 예약 완료!</Text>
              </Dialog.Title>
              <Dialog.Close aria-label="Close" />
            </Dialog.Header>
            <Dialog.Body className="flex px-6 text-center">
              <Dialog.Description className="px-16">
                <Text typography="body2">
                  곧 냠냠단과 함께<br></br> 맛있는 시간을 보낼거예요.
                </Text>
              </Dialog.Description>
            </Dialog.Body>
            <Dialog.Footer className="pt-3 pb-6">
              <Button
                stretch
                color="primary"
                size="xl"
                className="w-full text-white rounded-[12px]"
                onClick={handleHomeClick}
              >
                <Text typography="heading6" className="text-inherit">
                  홈으로 돌아가기
                </Text>
              </Button>
            </Dialog.Footer>
          </Dialog.CombinedContent>
        )}
      </Dialog.Root>
    </div>
  );
}
