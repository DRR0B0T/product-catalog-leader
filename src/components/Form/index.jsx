import React from "react";
import { useForm } from "react-hook-form";

export const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (data) => console.log(data);

  const isValidEmail = (email) =>
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
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
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <label>Пожалуйста, представьтесь</label>
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
          validate: "+79999999999",
          minLength: 12,
        })}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        {...register("email", {
          required: true,
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

      <button type="submit">Оформить заказ</button>
    </form>
  );
};
