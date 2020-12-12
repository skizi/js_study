import Btn from "../atoms/btn";
import { toggleLoading } from "~/store/current-user";

import { useAppDispatch, AppDispatch } from "~/store";
import { useSelector } from "react-redux";
import { isLoadingSelector } from "~/store/current-user";

type Props = {
  title: string;
};

const LoadingToggle: React.FC<Props> = (props: Props) => {
  const dispatch: AppDispatch = useAppDispatch();

  const click: () => void = (): void => {
    dispatch(toggleLoading());
  };

  const isLoading: boolean = useSelector(isLoadingSelector);

  return (
    <>
      <style jsx>
        {`
          h3 {
            padding-left: 4px;
            border-left: 2px solid #333;
          }
          .loading-container {
            display: flex;
          }

          .loading-status {
            height: 30px;
            line-height: 30px;
            margin: 0;
          }

          //:globalの左に必ずスペースがないと動作しない
          .loading-container :global(.toggle-btn) {
            margin-right: 20px;
          }
        `}
      </style>
      <h3>{props.title}</h3>
      <div className="loading-container">
        <Btn optionClassName="toggle-btn" btnClick={click}>
          ローディングをトグル
        </Btn>
        <p className="loading-status">{isLoading + ""}</p>
      </div>
    </>
  );
};

export default LoadingToggle;
