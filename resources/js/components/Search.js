import React from "react";
import { Link } from "react-router-dom";

export default function Search({
  base_url,
  search,
  response,
}) {
  return (
    //axios.get(props.base_url)
    <div>
      <p>{base_url}</p>
      <p>コンソールにサーバ経由で取得したAPIのresponseを表示中</p>
    </div>
  );
}