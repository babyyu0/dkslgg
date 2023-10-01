// React
import { useMemo } from 'react';
// Styled
import * as S from '@/styles/record/profile.style';
// Component
import LoadingComponent from '../common/LoadingComponent';

const ProfileComponent = ({ data }) => {
  const num = useMemo(() => Math.floor(Math.random() * 6) + 1, []);

  return (
    <S.ProfileLayout bgnum={num}>
      {data ? (
        <S.ProfileContainer>
          <img
            className="logo"
            src={`http://ddragon.leagueoflegends.com/cdn/10.6.1/img/profileicon/${data.iconId}.png`}
          />
          <div className="userBox">
            <div className="title">
              <h1>{data.name}</h1>
              <img src={`/image/rank-icons/${data.tier}.png`} />
            </div>
            <p className="lbti">{data.lbti}</p>
            <div className="record-update">
              <button>전적 갱신</button>
              <p className="desc">최근 업데이트 : 5분 전</p>
            </div>
          </div>
        </S.ProfileContainer>
      ) : (
        <S.ProfileContainer>
          <LoadingComponent white={true} />
        </S.ProfileContainer>
      )}
    </S.ProfileLayout>
  );
};

export default ProfileComponent;
