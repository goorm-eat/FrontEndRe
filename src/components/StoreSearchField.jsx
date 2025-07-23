import { useState } from 'react';
import { LocationOutlineIcon, InfoCircleOutlineIcon } from '@vapor-ui/icons';
import FormField from './FormField';
import {
  waitForKakaoAPI,
  debouncedSearchPlaces,
  checkKakaoAPIStatus,
} from '../utils/kakaoMap';

export default function StoreSearchField({
  storeAddress,
  storeName,
  onStoreAddressChange,
  onStoreNameChange,
}) {
  const [isSearchingStore, setIsSearchingStore] = useState(false);

  // 주소 입력 시 식당 이름 자동 검색
  const handleStoreAddressChange = async e => {
    const address = e.target.value;
    onStoreAddressChange(address);

    // 주소가 비어있으면 식당 이름도 초기화
    if (!address.trim()) {
      onStoreNameChange('');
      return;
    } // 주소 길이가 일정 이상일 때만 검색 (너무 빈번한 API 호출 방지)
    if (address.length >= 5) {
      setIsSearchingStore(true);
      try {
        // API 상태 확인
        checkKakaoAPIStatus();

        // Kakao Map API 로드 대기
        try {
          await waitForKakaoAPI();

          // 주소 검색 실행 (debounced)
          const results = await debouncedSearchPlaces(address);

          if (results && results.length > 0) {
            // 첫 번째 검색 결과의 장소명을 가게 이름으로 설정
            const firstResult = results[0];
            onStoreNameChange(firstResult.place_name);
            console.log('검색된 장소:', firstResult);
          } else {
            console.log('검색 결과가 없습니다.');
          }
        } catch (apiError) {
          console.warn(
            'Kakao API 사용 실패, 모의 데이터를 사용합니다:',
            apiError.message
          );
        }
      } catch (error) {
        console.error('주소 검색 중 오류 발생:', error);
      } finally {
        setIsSearchingStore(false);
      }
    }
  };

  return (
    <section className="flex flex-col items-start gap-1 py-7 self-stretch border-b-4 border-[#f0f0f5]">
      <FormField
        label="가게 주소"
        name="storeAddress"
        placeholder="탐방할 가게의 주소를 입력해주세요."
        icon={LocationOutlineIcon}
        sectionClassName="flex flex-col gap-1 w-full"
        value={storeAddress}
        onChange={handleStoreAddressChange}
      />
      <FormField
        label="가게 이름"
        name="storeName"
        placeholder={isSearchingStore ? '검색 중...' : '가게 이름'}
        infoText={
          isSearchingStore
            ? '주소를 기반으로 가게를 검색하고 있습니다.'
            : '가게 주소를 입력하면, 이름이 자동으로 완성돼요.'
        }
        infoIcon={InfoCircleOutlineIcon}
        sectionClassName="flex flex-col gap-1 w-full"
        value={storeName}
        onChange={e => onStoreNameChange(e.target.value)}
      />
    </section>
  );
}
