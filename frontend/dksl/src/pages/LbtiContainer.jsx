// React
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// Component
import LoadingComponent from '../components/common/LoadingComponent';
import HeaderComponent from "../components/common/HeaderComponent";
import LbtiMainComponent from "../components/lbti/LbtiMainComponent";
import LbtiTestComponent from "../components/lbti/LbtiTestComponent";
import LbtiResultComponent from "../components/lbti/LbtiResultComponent";
// Service
import { getQuestionList, getLbti } from '../services/LbtiService';

const LbtiContainer = () => {
  const navigate = useNavigate();
  const [path, setPath] = useState(null);
  const url = useLocation();
  const [index, setIndex] = useState(0);
  const [questionList, setQuestionList] = useState(null);
  const [lbti, setLbti] = useState(null); 
  const [selectList, setSelectList] = useState([]);

  useEffect(() => {
    const fetchAllQuestionData = async () => {
      setQuestionList(await getQuestionList());
    };

    setPath(url.pathname);
    if(url.pathname == '/lbti/test' && !questionList) {
      fetchAllQuestionData();
    }
  }, [url]);

  useEffect(() => {
    if(lbti) {
      navigate('/lbti/result');
    }
  }, [lbti]);

  const fetchLbtiData  = async () => {
    setLbti(await getLbti(selectList));
  };


  return path == '/lbti/test' ? (
    <>
      <HeaderComponent />
      <LbtiTestComponent questionList={questionList} index={index} setIndex={setIndex} fetchLbtiData={fetchLbtiData} selectList={selectList} setSelectList={setSelectList} />
    </>
  ) : '/lbti/result' && lbti ? (
    <>
      <HeaderComponent />
      <LbtiResultComponent lbti={lbti} />
    </>
  ) : '/lbti/main' ? (
    <>
      <HeaderComponent />
      <LbtiMainComponent />
    </>
  ): (
    <LoadingComponent />
  );
}

export default LbtiContainer;