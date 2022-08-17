import React from "react";
import { useForm } from "react-hook-form";

export const Form = () => {
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
  const onSubmit = (data) => {
    const randomNumber = Math.round(Math.random() * 1000);
    if (data.email) {
      console.log(
        `Спасибо ${data.name}, ваш заказ №${randomNumber} оформлен. В ближайшее время мы свяжемся с вами по телефону +7(999)999-99-99 для его подтверждения.`
      );
      window.Email.send({
        SecureToken: "00bff8dd-3836-49bc-8ea4-91f311569ce1",
        To: data.email,
        From: "mechasop@gmail.com",
        Subject: `Тестовое задание, заказ №${randomNumber}`,
        Body: `Спасибо ${data.name}, ваш заказ №${randomNumber} оформлен. В ближайшее время мы свяжемся с вами по телефону +7(999)999-99-99 для его подтверждения.`,
      }).then((message) => alert(message));
    }
  };

  const isValidEmail = (email) =>
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );

  const handleEmailValidation = (email) => {
    console.log("ValidateEmail was called with", email);

    const isValid = isValidEmail(email);

    const validityChanged =
      (errors.email && isValid) || (!errors.email && !isValid);
    if (validityChanged) {
      console.log("Fire tracker with", isValid ? "Valid" : "Invalid");
    }
    return isValid;
  };

  function validatePhone(phone) {
    let regex =
      /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    return regex.test(phone);
  }

  return (
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
  );
};
