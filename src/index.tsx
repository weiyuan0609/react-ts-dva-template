import React from 'react';
import dva from 'dva';
import { ConfigProvider } from 'antd';
import { createBrowserHistory as createHistory } from 'history';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { AppContainer, setConfig } from 'react-hot-loader';
//@ts-ignore
import createLoading from 'dva-loading';
import App from './app';

setConfig({
  trackTailUpdates: false,  // 添加这个配置才能热更新 lazy 组件
  ignoreSFC: true,
  //@ts-ignore
  ignoreClases: false,
  disableHotRenderer: true,
  reloadHooks: false,
});

export const app = dva({
  history: createHistory(),
});
app.use(createLoading());

function renderWithHotReload(C: any) {
  app.router((obj: any) => (
      <ConfigProvider locale={zhCN}>
          <AppContainer>
              <C
                  history={obj.history}
                  match={obj.match}
                  location={obj.location}
                  getState={obj.app._store.getState}
                  dispatch={obj.app._store.dispatch}
                  app={obj.app}
              />
          </AppContainer>
      </ConfigProvider>
  ));
  app.start('#root');
}

renderWithHotReload(App);