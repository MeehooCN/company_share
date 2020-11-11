/**
 * @description: reducer
 * @author: cnn
 * @createTime: 2020/11/11 9:53
 **/
interface MyReduxInit {
  name: string
}

export const myReduxInit: MyReduxInit = {
  name: '小花'
};

const myReduxReducer = (state = myReduxInit, action: any) => {
  const map: Map<string, MyReduxInit> = new Map([
    ['setName', { ...state, name: action.name }]
  ]);
  return map.get(action.type) || myReduxInit;
};
export default myReduxReducer;
