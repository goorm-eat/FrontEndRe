// Kakao Map API 준비 확인 함수
export const waitForKakaoAPI = () => {
  return new Promise((resolve, reject) => {
    // 이미 로드된 경우
    if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
      console.log('Kakao Map API 이미 로드됨');
      resolve(window.kakao);
      return;
    }

    // API 로드 대기 (최대 10초)
    let attempts = 0;
    const maxAttempts = 100; // 10초 (100ms * 100)
    
    const checkAPI = () => {
      attempts++;
      
      if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
        console.log('Kakao Map API 로드 완료');
        resolve(window.kakao);
      } else if (attempts >= maxAttempts) {
        console.error('Kakao Map API 로드 타임아웃');
        reject(new Error('Kakao Map API 로드 타임아웃 - index.html에서 API 스크립트를 확인해주세요.'));
      } else {
        setTimeout(checkAPI, 100);
      }
    };

    checkAPI();
  });
};

// 장소 검색 함수
export const searchPlacesByKeyword = (keyword) => {
  return new Promise((resolve, reject) => {
    console.log('검색 시작:', keyword);
    
    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
      console.error('Kakao Maps API 객체 상태:', {
        kakao: !!window.kakao,
        maps: !!(window.kakao && window.kakao.maps),
        services: !!(window.kakao && window.kakao.maps && window.kakao.maps.services)
      });
      reject(new Error('Kakao Maps API가 로드되지 않았습니다.'));
      return;
    }

    try {
      const ps = new window.kakao.maps.services.Places();
      
      ps.keywordSearch(keyword, (data, status) => {
        console.log('검색 완료:', { data, status });
        
        if (status === window.kakao.maps.services.Status.OK) {
          resolve(data);
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
          resolve([]);
        } else {
          console.error('검색 실패 상태:', status);
          reject(new Error(`장소 검색에 실패했습니다. 상태: ${status}`));
        }
      });
    } catch (error) {
      console.error('Places 객체 생성 실패:', error);
      reject(new Error('Places 객체를 생성할 수 없습니다.'));
    }
  });
};

// API 상태 확인 함수
export const checkKakaoAPIStatus = () => {
  console.log('Kakao API 상태 확인:');
  console.log('- kakao 객체:', !!window.kakao);
  console.log('- kakao.maps 객체:', !!(window.kakao && window.kakao.maps));
  console.log('- kakao.maps.services 객체:', !!(window.kakao && window.kakao.maps && window.kakao.maps.services));
  console.log('- 현재 도메인:', window.location.hostname);
  console.log('- 현재 포트:', window.location.port);
  
  return !!(window.kakao && window.kakao.maps && window.kakao.maps.services);
};

// 주소를 좌표로 변환하는 geocoding 함수
export const getCoordinatesFromAddress = (address) => {
  return new Promise((resolve, reject) => {
    console.log('주소를 좌표로 변환 시작:', address);
    
    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
      console.error('Kakao Maps API가 로드되지 않았습니다.');
      reject(new Error('Kakao Maps API가 로드되지 않았습니다.'));
      return;
    }

    try {
      const geocoder = new window.kakao.maps.services.Geocoder();
      
      geocoder.addressSearch(address, (result, status) => {
        console.log('주소 검색 완료:', { result, status });
        
        if (status === window.kakao.maps.services.Status.OK) {
          if (result.length > 0) {
            const coords = {
              lat: parseFloat(result[0].y),
              lng: parseFloat(result[0].x)
            };
            console.log('변환된 좌표:', coords);
            resolve(coords);
          } else {
            reject(new Error('주소에 해당하는 좌표를 찾을 수 없습니다.'));
          }
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
          reject(new Error('주소에 해당하는 좌표를 찾을 수 없습니다.'));
        } else {
          console.error('주소 검색 실패 상태:', status);
          reject(new Error(`주소 검색에 실패했습니다. 상태: ${status}`));
        }
      });
    } catch (error) {
      console.error('Geocoder 객체 생성 실패:', error);
      reject(new Error('Geocoder 객체를 생성할 수 없습니다.'));
    }
  });
};

// Debounced 검색 함수 생성 (Promise 지원)
let searchTimeout;

export const debouncedSearchPlaces = (keyword, delay = 300) => {
  return new Promise((resolve, reject) => {
    // 이전 타이머 취소
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    // 새로운 타이머 설정
    searchTimeout = setTimeout(async () => {
      try {
        const result = await searchPlacesByKeyword(keyword);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    }, delay);
  });
};
