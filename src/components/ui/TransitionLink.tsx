import React from "react";
import { Link } from "react-router-dom";
import { useTransitionStore } from "../../store/store";
import { useNavigate } from "react-router-dom";

interface TransitionLinkProps {
  children: React.ReactNode;
  to: string;
  backWard?: boolean;
  className?: string;
}

// Link를 대신하여 페이지를 이동시키는 버튼으로 사용하는 컴포넌트입니다.
// 페이지 이동시 , 뒤로가기 버튼을 누른 경우와 다른 페이지 버튼을 누른 경우에
// 각각 다른 애니메이션을 보여줍니다.
const TransitionLink = (props: TransitionLinkProps) => {
  const { scrollY, setScrollY, transitionForward, transitionBackward } =
    useTransitionStore();
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (props.backWard) {
      transitionBackward();
      navigate(-1);
    } else {
      transitionForward();
      navigate(props.to);
    }
  };
  return (
    <div className={props.className} onClick={onClickHandler}>
      {props.children}
    </div>
  );
};

export default TransitionLink;
