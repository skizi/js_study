import { useForm } from "react-hook-form";

export interface FormObject {
  title: string;
  body: string;
}

// UseFormTestにPropsを渡す場合のPropsの例
// export interface CurrentUserFormProps {
//   default?: CurrentUser;
//   onSubmit?: (value: CurrentUserFormObject) => Promise<void> | void;
//   onCancel?: () => Promise<void> | void;
// }

const UseFormTest: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<FormObject>();

  const onSubmit: (data: FormObject) => void = (data) => {
    console.log(data);
    //dispatch(updateData(data));
  };

  const GetValidationMessage: void | JSX.Element = (errors, type) => {
    const message = errors[type]?.message;
    if (message) {
      return (
        <>
          <style jsx>
            {`
              .error {
                display: block;
                margin-top: 0;
                color: #f00;
                font-size: 12px;
              }
            `}
          </style>
          <p className="error">{message}</p>
        </>
      );
    }
  };

  return (
    <>
      <style jsx>
        {`
          h3 {
            padding-left: 4px;
            border-left: 2px solid #333;
          }

          form .title {
            display: block;
          }
        `}
      </style>
      <h3>useState Test</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="title"
          name="title"
          ref={register({ required: "タイトル必須だよ", maxLength: 20 })}
          className="title"
        />
        {GetValidationMessage(errors, "title")}

        <input
          type="text"
          placeholder="body"
          name="body"
          ref={register({ required: "本文も必須だよ" })}
          className="body"
        />
        {GetValidationMessage(errors, "body")}

        <input type="submit" />
      </form>
    </>
  );
};

export default UseFormTest;
