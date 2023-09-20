// React
import { useState } from 'react';
// Component
import ProfileComponent from '../components/record/ProfileComponent';
import HeaderComponent from '../components/common/HeaderComponent';
import RecordBodyComponent from '../components/record/RecordBodyComponent';

const data = [
  {
    "id": "승리",
    "label": "승리",
    "value": 9,
    "color": "#5393CA"
  },
  {
    "id": "패배",
    "label": "패배",
    "value": 11,
    "color": "#ff5858"
  }
]

const RecordContainer = () => {
  const [recordTab, setRecordTab] = useState(0);
  return (
    <>
      <HeaderComponent />
      <ProfileComponent />
      <RecordBodyComponent data={data} tab={recordTab} setTab={setRecordTab} />
    </>
  );
}

export default RecordContainer;