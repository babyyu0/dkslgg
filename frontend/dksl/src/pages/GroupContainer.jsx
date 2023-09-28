// React
import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
// Swal
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// Component
import HeaderComponent from '../components/common/HeaderComponent';
import GroupMainComponent from '../components/group/GroupMainComponent';
import GroupCreateComponent from '../components/group/GroupCreateComponent';
import GroupDetailComponent from '../components/group/GroupDetailComponent';
import LoadingComponent from '../components/common/LoadingComponent';
// Service
import {
  getGroupList,
  setNewGroup,
  searchGroup,
  groupDetail,
} from '../services/GroupService';

const MySWal = withReactContent(Swal);

const GroupContainer = () => {
  const [teamList, setTeamList] = useState();
  const [detailList, setDetailList] = useState();
  const [path, setPath] = useState(null);
  const url = useLocation();

  useEffect(() => {
    const fetchAllGroupData = async () => {
      setTeamList(await getGroupList());
    };

    const fetchDetailGroupData = async (name) => {
      setDetailList(
        await groupDetail(
          name,
          sessionStorage.getItem('accessToken') ? true : false
        )
      );
    };
    setPath(url.pathname);
    if (path == '/group/main' && teamList == null) {
      fetchAllGroupData();
    } else {
      console.log(url.search.split('=')[1]);
      fetchDetailGroupData(url.search.split('=')[1]);
    }
  }, [teamList, url, path]);

  const getByteToImage = useCallback((imgSrc) => {
    const binaryString = atob(imgSrc);
    const bytes = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const img = new Blob([bytes], {
      type: 'image/jpg',
    });

    return URL.createObjectURL(img);
  }, []);

  const onSearch = useCallback(
    async (word) => {
      const data = await searchGroup(word);

      if (data.status == 200) {
        Swal.fire({
          title: '검색 완료',
          text: '검색 요청이 완료되었습니다.',
          icon: 'success',
          iconColor: '#6E8387',
          confirmButtonColor: '#6E8387',
          confirmButtonText: '확인',
        });
        setTeamList({
          teamList: data.data,
          recentTeamList: teamList.recentTeamList,
        });
      }
    },
    [teamList]
  );

  const getNewGroup = useCallback(() => {
    MySWal.fire({
      title: '<b>&#129309; 소속 만들기</b>',
      html: <GroupCreateComponent />,
      width: '60%',
      heightAuto: true,
      padding: '2.5% 5%',
      confirmButtonColor: 'var(--maincolor-depth1)',
      confirmButtonText: '생성 요청',
      focusConfirm: false,
      preConfirm: async () => {
        const formData = new FormData();
        const blob = new Blob(
          [
            JSON.stringify({
              name: document.getElementById('name').value,
              description: document.getElementById('description').value,
            }),
          ],
          {
            type: 'application/json',
          }
        );

        formData.append('team', blob);
        formData.append('img', document.getElementById('img').files[0]);
        for (const [key, value] of formData.entries()) {
          console.log(key, value);
          console.log(typeof value);
        }

        const data = await setNewGroup(formData);

        return data;
      },
    }).then((res) => {
      if (res.value) {
        Swal.fire({
          title: '요청 성공',
          text: '소속 생성이 요청되었습니다.',
          iconColor: 'var(--maincolor-depth1)',
          icon: 'success',
          confirmButtonColor: 'var(--maincolor-depth1)',
          confirmButtonText: '확인',
        });
      }
    });
  }, []);

  return path == '/group/main' ? (
    <>
      <HeaderComponent />
      <GroupMainComponent
        groupList={teamList}
        createGroup={getNewGroup}
        onSearch={onSearch}
        getByteToImage={getByteToImage}
      />
    </>
  ) : detailList ? (
    <>
      <HeaderComponent />
      <GroupDetailComponent
        detailList={detailList}
        getByteToImage={getByteToImage}
      />
    </>
  ) : (
    <LoadingComponent />
  );
};

export default GroupContainer;
