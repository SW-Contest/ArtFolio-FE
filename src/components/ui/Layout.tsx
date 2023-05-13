interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  return (
    <section className=" flex flex-col w-full h-full max-w-[400px] bg-white overflow-y-scroll">
      {props.children}
    </section>
  );
};

export default Layout;
