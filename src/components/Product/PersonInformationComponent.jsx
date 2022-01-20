import "../../style/personinformation.css";
import CustomSmpButton from "../CustomSmpButton";

export default function PersonInformation({ response }) {
  return (
    <div className="person-information product-flex">
      <div className="product-text">
        <h4>{response?.first_name == "" ? "User" : response?.first_name}</h4>
        <h4>{response?.phone_number}</h4>
      </div>
      <div className="callback">
        <a href={`tel:${response?.phone_number}`}>
          <CustomSmpButton
            textBtn="Позвонить"
            background="#bb9de5"
            fonstsSize="16px"
            color="#fff"
            padding="10px 10px"
            border="none"
            borderRadius="5px"
            margin="0 0 5px 0"
            width="100px"
          />
        </a>

        <CustomSmpButton
          textBtn="Сообщения"
          background="none"
          color="#9a78cb"
          fonstSize="16px"
          padding="10px 10px"
          border="1px solid #9a78cb"
          borderRadius="5px"
          width="100px"
        />
      </div>
    </div>
  );
}
