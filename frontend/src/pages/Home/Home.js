import React, { Children } from "react";
import BasicLayout from "../../layout/BasicLayout/BasicLayout";
import "./Home.scss";

export default function Home(props) {
  const { setCheckRefresh } = props;
  return (
    <BasicLayout className="home" setCheckRefresh={setCheckRefresh}>
      <h2>Estamos en Home</h2>
    </BasicLayout>
  );
}
