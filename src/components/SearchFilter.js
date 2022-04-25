import "./component.css";
import React, { useState, useCallback } from "react";
import debounce from "lodash.debounce";

const words = [
  "ability",
  "able",
  "about",
  "above",
  "accept",
  "according",
  "challenge",
  "chance",
  "change",
  "face",
  "fact"
];

export default function SearchFilter() {
  // const [wordList, setWordList] = useState(words);
  const [SerachedWord, setSerachedWord] = useState("");

  let filteredWord = words;

  if (SerachedWord !== "") {
    filteredWord = filteredWord.filter((name) => {
      return name.toLowerCase().includes(SerachedWord.toLowerCase());
    });
  }

  console.log(filteredWord);
  console.log(SerachedWord);
  const getList = () => {
    return filteredWord.map((el, i) => <li key={i}>{el}</li>);
  };
  const onSearch = (e) => {
    //console.log(e.target.value);
    if (e.target.value === "") {
      setSerachedWord("");
      return;
    }
    setSerachedWord(e.target.value);
    // const filteredValues = wordList.filter(
    //   (item) => item.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
    // );
    // setWordList(filteredValues);
  };

  const getSearchedData = (fn, d) => {
    let timer;
    return () => {
      let context = this,
        args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, d);
    };
  };

  // const onSearchDebounce = getSearchedData(onSearch, 300);
  const onSearchDebounce = useCallback(debounce(onSearch, 500));
  return (
    <div className="SearchFilter">
      Search
      <input onChange={onSearchDebounce} />
      <ul className="searchedList">{getList()}</ul>
    </div>
  );
}
