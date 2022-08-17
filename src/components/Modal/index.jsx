import React from "react";
import { useNavigate } from "react-router-dom";

export const Modal = ({ name, phone, randomNumber, open, setOpen }) => {
  let navigate = useNavigate();
  const onReplace = () => {
    setOpen(false);
    navigate("/", { replace: true });
  };
  return (
    <div className={`overlay animated ${open ? "show" : ""}`}>
      <div className="modal">
        <svg
          onClick={onReplace}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 1.61714L14.3829 0L8 6.38286L1.61714 0L0 1.61714L6.38286 8L0 14.3829L1.61714 16L8 9.61714L14.3829 16L16 14.3829L9.61714 8L16 1.61714Z"
            fill="black"
          />
        </svg>
        <h2>
          Спасибо <span>{name}</span>, ваш заказ <span>№{randomNumber}</span>{" "}
          оформлен.
        </h2>
        <p>
          В ближайшее время мы свяжемся с вами по телефону <span>{phone}</span>{" "}
          для его подтверждения.
        </p>
      </div>
    </div>
  );
};
