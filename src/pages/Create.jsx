import { Text, Button } from '@vapor-ui/core';
import {
  CalendarOutlineIcon,
  TimeOutlineIcon,
  CalendarIcon,
  TimeIcon,
} from '@vapor-ui/icons';
import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import FormField from '../components/FormField';
import StoreSearchField from '../components/StoreSearchField';

export default function Create() {
  const [crewName, setCrewName] = useState('');
  const maxCrewNameLength = 20;

  // 오늘 날짜를 YYYY-MM-DD 형태로 계산
  const today = new Date().toISOString().split('T')[0];

  // 날짜/시간 상태 추가
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [closingDate, setClosingDate] = useState('');
  const [closingTime, setClosingTime] = useState('');

  // 주소 및 식당 이름 상태 추가
  const [storeAddress, setStoreAddress] = useState('');
  const [storeName, setStoreName] = useState('');

  const handleCrewNameChange = e => {
    const value = e.target.value;
    if (value.length <= maxCrewNameLength) {
      setCrewName(value);
    }
  };

  const [crewDescription, setCrewDescription] = useState('');
  const maxCrewDescriptionLength = 100;

  const handleCrewDescriptionChange = e => {
    const value = e.target.value;
    if (value.length <= maxCrewDescriptionLength) {
      setCrewDescription(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    // 폼 데이터 수집
    const formData = new FormData(e.target);
    const data = {
      crewName,
      storeAddress,
      storeName,
      meetingDate,
      meetingTime,
      closingDate,
      closingTime,
      chatLink: formData.get('chatLink'),
      crewDescription,
    };

    console.log('제출된 데이터:', data);
    // 여기에 실제 제출 로직을 추가할 수 있습니다
  };

  return (
    <div className="flex flex-col items-start gap-7 h-full pt-[40px] overflow-scroll">
      <PageHeader title="모집글 만들기" />
      <form className="flex flex-col w-full" onSubmit={handleSubmit}>
        <FormField
          label="냠냠단 이름"
          name="crewName"
          placeholder="모집할 냠냠단의 이름을 작성해주세요."
          value={crewName}
          onChange={handleCrewNameChange}
          maxLength={maxCrewNameLength}
        />

        <StoreSearchField
          storeAddress={storeAddress}
          storeName={storeName}
          onStoreAddressChange={setStoreAddress}
          onStoreNameChange={setStoreName}
        />

        <section className="flex flex-col items-start gap-1 py-7 self-stretch border-b-4 border-[#f0f0f5]">
          <FormField
            label="만남일"
            name="meetingDate"
            inputType="date"
            min={today} // 오늘 이전 날짜 선택 불가
            icon={CalendarIcon}
            sectionClassName="flex flex-col gap-1 w-full"
            value={meetingDate}
            onChange={e => setMeetingDate(e.target.value)}
          />
          <FormField
            label="만남 시간"
            name="meetingTime"
            inputType="time"
            icon={TimeIcon}
            sectionClassName="flex flex-col gap-1 w-full"
            value={meetingTime}
            onChange={e => setMeetingTime(e.target.value)}
          />
        </section>
        <section className="flex flex-col items-start gap-1 py-7 self-stretch border-b-4 border-[#f0f0f5]">
          <FormField
            label="마감일"
            name="closingDate"
            inputType="date"
            min={today} // 오늘 이전 날짜 선택 불가
            icon={CalendarOutlineIcon}
            sectionClassName="flex flex-col gap-1 w-full"
            value={closingDate}
            onChange={e => setClosingDate(e.target.value)}
          />
          <FormField
            label="마감 시간"
            name="closingTime"
            icon={TimeOutlineIcon}
            inputType="time"
            sectionClassName="flex flex-col gap-1 w-full"
            value={closingTime}
            onChange={e => setClosingTime(e.target.value)}
          />
        </section>

        <FormField
          label="오픈 채팅방 링크"
          name="chatLink"
          placeholder="오픈 채팅방 링크를 첨부해주세요."
        />

        <FormField
          label="냠냠단 설명"
          name="crewDescription"
          placeholder="어떤 음식을 함께 먹을지 자세히 설명해주세요."
          value={crewDescription}
          onChange={handleCrewDescriptionChange}
          maxLength={maxCrewDescriptionLength}
          isLarge={true}
        />

        {/* 제출 버튼 */}
        <div className="px-4 py-6">
          <Button
            stretch
            type="submit"
            color="primary"
            size="xl"
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[22.1875rem] text-white rounded-xl"
          >
            <Text typography="heading6" className="text-inherit">
              만들기
            </Text>
          </Button>
        </div>
      </form>
    </div>
  );
}
