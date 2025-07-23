import { useAtom } from 'jotai';
import { useState } from 'react';
import { recruitmentAtom } from '../data/mockData';
import { Text, Button } from '@vapor-ui/core';
import {
  CalendarOutlineIcon,
  TimeOutlineIcon,
  CalendarIcon,
  TimeIcon,
} from '@vapor-ui/icons';
import PageHeader from '../components/PageHeader';
import FormField from '../components/FormField';
import StoreSearchField from '../components/StoreSearchField';

export default function Create() {
  const [recruitments, setRecruitments] = useAtom(recruitmentAtom);

  const [crewName, setCrewName] = useState('');
  const today = new Date().toISOString().split('T')[0];
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [closingDate, setClosingDate] = useState('');
  const [closingTime, setClosingTime] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [storeName, setStoreName] = useState('');
  const [crewDescription, setCrewDescription] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newRecruitment = {
      id: recruitments.length + 1,
      crewName,
      storeAddress,
      storeName,
      meetingDate,
      meetingTime,
      closingDate,
      closingTime,
      chatLink: formData.get('chatLink'),
      crewDescription,
      joinedcrewnumber: 1,
      crewnumber: 5,
      isCompleted: false,
    };

    setRecruitments(prev => [...prev, newRecruitment]);
    console.log('새 모집글:', newRecruitment);
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
          onChange={e => setCrewName(e.target.value)}
          maxLength={20}
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
            min={today}
            icon={CalendarIcon}
            value={meetingDate}
            onChange={e => setMeetingDate(e.target.value)}
          />
          <FormField
            label="만남 시간"
            name="meetingTime"
            inputType="time"
            icon={TimeIcon}
            value={meetingTime}
            onChange={e => setMeetingTime(e.target.value)}
          />
        </section>
        <section className="flex flex-col items-start gap-1 py-7 self-stretch border-b-4 border-[#f0f0f5]">
          <FormField
            label="마감일"
            name="closingDate"
            inputType="date"
            min={today}
            icon={CalendarOutlineIcon}
            value={closingDate}
            onChange={e => setClosingDate(e.target.value)}
          />
          <FormField
            label="마감 시간"
            name="closingTime"
            inputType="time"
            icon={TimeOutlineIcon}
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
          onChange={e => setCrewDescription(e.target.value)}
          maxLength={100}
          isLarge={true}
        />
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
