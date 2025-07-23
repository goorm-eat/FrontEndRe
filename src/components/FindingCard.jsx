import { Text } from '@vapor-ui/core';
import {
  CalendarIcon,
  CalendarOutlineIcon,
  GroupIcon,
  LocationOutlineIcon,
} from '@vapor-ui/icons';
import { useState, useEffect } from 'react';

export default function FindingCard({
  crewName,
  crewDescription,
  meetingDate,
  closingDate,
  // storeAddress, // 현재 사용하지 않음, 필요시 주소 표시용
  storeName,
  joinedcrewnumber = 0,
  crewnumber = 0,
  isCompleted = false, // 모집 완료 여부
  onClick,
}) {
  // isCompleted와 meetingDate를 기반으로 isDday와 dday 계산
  const [isDday, setIsDday] = useState(false);
  const [dday, setDday] = useState(0);

  useEffect(() => {
    const calculateDday = () => {
      if (!meetingDate) return;

      const today = new Date();
      const meeting = new Date(meetingDate);

      // 날짜만 비교하기 위해 시간을 00:00:00으로 설정
      today.setHours(0, 0, 0, 0);
      meeting.setHours(0, 0, 0, 0);

      const diffTime = meeting.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      setDday(diffDays);
      // 모집이 완료되고 만남일이 오늘 이후이면 isDday true (예정된 냠냠단)
      setIsDday(isCompleted && diffDays >= 0);
    };

    calculateDday();
  }, [meetingDate, isCompleted]);

  // 기존 props와의 호환성을 위한 변수들
  const title = crewName;
  const content = crewDescription;
  const date = isDday ? meetingDate : closingDate;

  return (
    <div
      className="flex flex-col w-90% p-5 justify-center items-start gap-3 
        border border-[#e8e8ee] rounded-md cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      {isDday ? (
        <div className="flex flex-row items-center justify-between self-stretch">
          <div className="flex flex-row items-center vapor-size-space-025">
            <CalendarIcon className="w-16 h-16" />
            <Text typography="body3">{date}</Text>
          </div>
          <div>
            <Text typography="heading6" className="text-[#D86100]">
              D-
              {dday}
            </Text>
            <Text typography="heading6" color="contrast">
              일전
            </Text>
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-between self-stretch">
          <div className="flex flex-row items-center vapor-size-space-025">
            <CalendarOutlineIcon className="w-16 h-16" />
            <Text typography="body3">마감일: {date}</Text>
          </div>
        </div>
      )}
      <div className="flex flex-col items-start self-stretch gap-1">
        <Text
          typography="heading6"
          color="contrast"
          className="overflow-hidden text-ellipsis whitespace-nowrap max-w-full"
        >
          {title && title.length > 20 ? `${title.slice(0, 20)}...` : title}
        </Text>
        <Text
          typography="body4"
          color="contrast"
          className="overflow-hidden text-ellipsis whitespace-nowrap max-w-full"
        >
          {content && content.length > 100
            ? `${content.slice(0, 100)}...`
            : content}
        </Text>
      </div>
      <div className="flex flex-row justify-between items-start self-stretch">
        <div className="flex flex-row items-center vapor-size-space-025">
          <GroupIcon className="w-16 h-16" />
          <Text typography="body3">
            냠냠단: <span className="text-[#d86100]">{joinedcrewnumber}</span>/
            {crewnumber}
          </Text>
        </div>
        <div className="flex flex-row items-center vapor-size-space-025">
          <LocationOutlineIcon className="w-16 h-16" />
          <Text typography="body3">{storeName}</Text>
        </div>
      </div>
    </div>
  );
}
