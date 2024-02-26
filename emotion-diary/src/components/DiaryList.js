import {useState} from "react";
import MyButton from "./MyButton";
import {useNavigate} from "react-router-dom";
import DiaryItem from "./DiaryItem";


const sortOptionList = [
  {value:"latest", name:"최신순"},
  {value:"oldest", name:"오래된 순"},
];

const filterOptionList = [
  {value:"all", name:"모든 감정"},
  {value:"good", name:"좋은 감정"},
  {value:"bad", name:"나쁜 감정"},
];

const ControlMenu = ({value, onChange, optionList}) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  )
};

const DiaryList = ({diaryList}) => {
  const navigate = useNavigate();

  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");
  const getProcessedDiaryList = () => {

    const filterCallBack = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else if (filter === "bad") {
        return parseInt(item.emotion) > 3;
      }
    };

    const compare = (a, b) => {
      if (sortType === 'latest') {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    }

    // 원본 다이어리 리스트를 정렬하는 것이 아닌 깊은 복사하여 복사된 객체를 정렬
    const copyList = JSON.parse(JSON.stringify(diaryList));

    const filteredList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));

    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">

      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"새 일기쓰기"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>

      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it}/>
        ))}
    </div>
  );
};

// diaryList가 전달 안되는 상황이 발생할 수 있으니 defaultProps 설정
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;