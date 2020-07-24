/**
 * @description: 公共接口
 * @author: cnn
 * @createTime: 2020/7/22 9:30
 **/
export interface MenuData {
  name: string,
  key: string,
  children: Array<MenuData>
}

export interface IntroduceComponent {
  name: string,
  link: string
}

export interface Resource {
  type: string,
  introduceComponentList: Array<IntroduceComponent>
}
