import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'dva/router';
import { RouteComponentProps } from 'dva/router';
import { hot } from 'react-hot-loader';
import Layout from './routers/layout';
import routes from './routers/index';

interface IProps extends RouteComponentProps {
  getState?: any;
  dispatch?: any;
  app: any;
}

class App extends React.PureComponent<IProps> {
  public render() {
    return (
        <BrowserRouter basename="/web">
            <Layout dispatch={this.props.dispatch}>
              <Switch>
                {routes.map((item: any) => {
                  return <Route path={item.path} component={item.component} key={item.path} />;
                })}
              </Switch>
              <Redirect exact from="/*" to="/test" />
            </Layout>
        </BrowserRouter>
    );
  }
}

export default hot(module)(App);