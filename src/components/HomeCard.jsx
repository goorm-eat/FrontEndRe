import { Text } from '@vapor-ui/core';
import bowl from '../img/empty.svg';

export default function HomeCard() {
  return (
    <div className="flex-shrink-0 flex flex-col items-center justify-center  w-full h-[10.625rem] p-[1.25rem] border border-[#E8E8EE] rounded-3xl">
      <img src={bowl} className="mb-[1.19rem]" />
      <Text typography="body2">예정된 냠냠단이 없어요</Text>
    </div>
  );
}
