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

const TransitionLink = (props: TransitionLinkProps) => {
  const { transitionForward, transitionBackward } = useTransitionStore();
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const onClickHandler = () => {
    // scrollToTop();
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
