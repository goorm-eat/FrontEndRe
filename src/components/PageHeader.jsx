import { IconButton, Text } from '@vapor-ui/core';
import { BackPageOutlineIcon } from '@vapor-ui/icons';
import { useNavigate } from 'react-router';

export default function PageHeader({ title, onBackClick }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1); // 기본 동작: 이전 페이지로 이동
    }
  };

  return (
    <div className="flex flex-row justify-between items-center w-full h-[60px] flex-shrink-0">
      <button onClick={handleBackClick} className="p-1">
        <BackPageOutlineIcon className="w-[24px] h-[24px]" />
      </button>
      <Text typography="heading4" className="">
        {title}
      </Text>
      <IconButton color="white" className="w-[16px] h-[16px]">
        <BackPageOutlineIcon className="w-[16px] h-[16px]" color="white" />
      </IconButton>
    </div>
  );
}
