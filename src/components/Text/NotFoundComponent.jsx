import { Link } from "react-router-dom";
export default function Error() {
  return (
    <h1 style={{ textAlign: "center", margin: "128px" }}>
      Упс что то пошло не так :) <Link to="/">Главная страница</Link>
    </h1>
  );
}
