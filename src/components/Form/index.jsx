import React from "react";
import { useForm } from "react-hook-form";

export const Form = ({ setObj, setOpen }) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { dirtyFields, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  const onSubmit = async (data) => {
    let str = (data?.phone + "").trim();
    let phone =
      str.slice(0, 2) +
      " (" +
      str.slice(2, 5) +
      ") " +
      str.slice(5, 8) +
      " - " +
      str.slice(8, 10) +
      " - " +
      str.slice(10, 12);

    const randomNumber = Math.round(Math.random() * 1000);
    if (data.email) {
      setObj({ name: data.name, phone, randomNumber });

      await window.Email.send({
        SecureToken: "00bff8dd-3836-49bc-8ea4-91f311569ce1",
        To: data.email,
        From: "mechasop@gmail.com",
        Subject: `Тестовое задание, заказ №${randomNumber}`,
        Body: `${data.name}, заказ №${randomNumber} сформирован. В ближайшее время наш специалист свяжется с вами по телефону ${phone}.`,
      });
    }
    setOpen(true);
  };

  const isValidEmail = (email) =>
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );

  const handleEmailValidation = (email) => {
    const isValid = isValidEmail(email);

    const validityChanged =
      (errors.email && isValid) || (!errors.email && !isValid);
    if (validityChanged) {
      console.log("Fire tracker with", isValid ? "Valid" : "Invalid");
    }
    return isValid;
  };

  function validatePhone(phone) {
    return /(\+7)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})/g.test(
      phone
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label className="form__label">Пожалуйста, представьтесь</label>
        <input
          type="text"
          name="name"
          placeholder="Ваше имя"
          {...register("name")}
        />
        <input
          type="tel"
          name="phone"
          placeholder={errors.phone ? "+7(___) ___ - __ - __" : "Телефон"}
          {...register("phone", {
            required: true,
            validate: validatePhone,
            minLength: 12,
            maxLength: 12,
            pattern:
              /(\+7)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})/g,
          })}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          {...register("email", {
            required: true,
            minLength: 2,
            maxLength: 40,
            validate: handleEmailValidation,
          })}
        />
        {errors.email ? (
          <label className="error" htmlFor="error">
            <input type="text" name="error" placeholder={watch("email")} />
            Поле заполнено неверно
          </label>
        ) : (
          errors.phone && (
            <label className="error" htmlFor="error">
              <input type="text" name="error" placeholder={watch("phone")} />
              Поле заполнено неверно
            </label>
          )
        )}

        <input
          disabled={
            !(
              control._fields.email._f.ref.value &&
              control._fields.phone._f.ref.value &&
              control._fields.name._f.ref.value
            )
          }
          onClick={onSubmit}
          type="submit"
          placeholder="Оформить заказ"
        />
      </form>
    </>
  );
};
