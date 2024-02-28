import {useContext, useEffect, useState} from "react";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import DiaryList from "../components/DiaryList";

import {DiaryStateContext} from "../App";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`

  useEffect(() => {
    // curDate 값이 변할 때마다 수행
    // 해당 월의 첫째 날과 마지막 날 사이의 일기 추려내기

    // 다이어리 리스트가 빈배열이 아닐 경우에 실행
    if (diaryList.length >= 1) {
      // curDate 월의 첫번째 날
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      // curDate 월의 마지막 날 -> 중요!! 시, 분, 초 까지 명시
      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();

      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    }
  }, [diaryList, curDate]);

  // 다음 달
  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };

  // 이전 달
  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  return (
    <div>
      <MyHeader headText={headText}
                leftChild={<MyButton text={"<"} onClick={decreaseMonth}/>}
                rightChild={<MyButton text={">"} onClick={increaseMonth}/>}
      />
      <DiaryList diaryList={data}/>
    </div>
  );
};

export default Home;