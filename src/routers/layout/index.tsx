import React from 'react';

interface IProps {
  children: React.ReactNode;
  dispatch: Function;
}

interface IState {

}

class Layout extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const { children } = this.props;
    const a = '';
    return (
      <div className="">布局{children}</div>
    );
  }
}

export default Layout;