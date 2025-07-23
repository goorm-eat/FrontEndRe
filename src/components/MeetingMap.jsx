import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useState, useEffect } from 'react';
import { waitForKakaoAPI, getCoordinatesFromAddress } from '../utils/kakaoMap';

export default function MeetingMap({ address }) {
  console.log(address);
  const [coordinates, setCoordinates] = useState({
    lat: 37.5665, // 서울 기본 좌표
    lng: 126.978,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 주소가 변경될 때마다 좌표를 업데이트
  useEffect(() => {
    if (!address || address.trim() === '') {
      // 주소가 없으면 서울 기본 좌표로 설정
      setCoordinates({
        lat: 37.5665,
        lng: 126.978,
      });
      setError(null);
      return;
    }

    const updateCoordinates = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Kakao API 준비 대기
        await waitForKakaoAPI();

        // 주소를 좌표로 변환
        const coords = await getCoordinatesFromAddress(address);
        setCoordinates(coords);
        console.log('지도 좌표 업데이트:', coords);
      } catch (err) {
        console.error('주소 변환 실패:', err);
        setError(err.message);
        // 에러 시 기본 좌표 유지
      } finally {
        setIsLoading(false);
      }
    };

    updateCoordinates();
  }, [address]);

  return (
    <div style={{ position: 'relative' }}>
      {/* 로딩 오버레이 */}
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            borderRadius: '12px',
          }}
        >
          <div
            style={{
              fontSize: '14px',
              color: '#666',
              fontWeight: '500',
            }}
          >
            위치 검색 중...
          </div>
        </div>
      )}

      {/* 지도 */}
      <div className="relative" style={{ zIndex: 0 }}>
        <Map
          center={coordinates}
          style={{
            width: '343px',
            height: '150px',
            borderRadius: '12px',
            border: '1px solid #E5E5E5',
            zIndex: 'auto',
          }}
          level={3}
        >
          <MapMarker position={coordinates} />
        </Map>
      </div>
      {/* 에러 메시지 */}
      {error && (
        <div
          style={{
            marginTop: '8px',
            padding: '8px 12px',
            backgroundColor: '#FFF3F3',
            border: '1px solid #FFD6D6',
            borderRadius: '8px',
            fontSize: '12px',
            color: '#D32F2F',
          }}
        >
          위치를 찾을 수 없습니다: {error}
        </div>
      )}
    </div>
  );
}
