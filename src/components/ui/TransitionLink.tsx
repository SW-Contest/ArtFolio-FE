import React from "react";
import { Link } from "react-router-dom";
import { useTransitionStore } from "../../store/store";
import { useNavigate } from "react-router-dom";

interface TransitionLinkProps {
  children: React.ReactNode;
  to: string;
  backWard?: boolean;
}

const TransitionLink = (props: TransitionLinkProps) => {
  const { transitionForward, transitionBackward } = useTransitionStore();
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
  return <button onClick={onClickHandler}>{props.children}</button>;
};

export default TransitionLink;
