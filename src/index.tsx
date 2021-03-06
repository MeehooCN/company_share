/**
 * @description: 路由
 * @author: cnn
 * @createTime: 2020/7/16 15:42
 **/
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// @ts-ignore
import Loadable from 'react-loadable';
import { ErrorBoundary, Loading } from '@components/index';
import { NotFound, Home, Welcome } from '@views/index';
import { platform } from '@utils/CommonVars';

const RenderLoading = () => {
  return <Loading loading={true} />;
};

// 组件列表
const ComponentList = Loadable({
  loader: () => import('@views/components/ComponentList'),
  loading: RenderLoading
});
// 技巧列表
const TipList = Loadable({
  loader: () => import('@views/tips/TipList'),
  loading: RenderLoading
});
// 资源列表
const ResourceList = Loadable({
  loader: () => import('@views/resources/ResourceList'),
  loading: RenderLoading
});
// Debug 列表
const DebugList = Loadable({
  loader: () => import('@views/debug/DebugList'),
  loading: RenderLoading
});
// 设计规范列表
const DesignRulesList = Loadable({
  loader: () => import('@views/designRules/DesignRulesList'),
  loading: Loading
});
const App = () => {
  return (
    <Router>
      <Switch>
        <Home>
          <Switch>
            <ErrorBoundary>
              <Route exact path={platform} component={Welcome} />
              <Route path={platform + 'components'} component={ComponentList} />
              <Route path={platform + 'tips'} component={TipList} />
              <Route path={platform + 'resources'} component={ResourceList} />
              <Route path={platform + 'debugs'} component={DebugList} />
              <Route path={platform + 'designRules'} component={DesignRulesList} />
            </ErrorBoundary>
            <Route component={NotFound} />
          </Switch>
        </Home>
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};
export default App;
