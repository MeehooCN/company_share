/**
 * @description: 菜单公共 hook
 * @author: cnn
 * @createTime: 2021/3/29 15:43
 **/
import { useEffect, useState } from 'react';
import { MenuData } from '@utils/CommonInterface';
import { getActiveChildMenu, setActiveChildMenu } from '@utils/CommonFunc';

interface IProps {
  menuList: Array<MenuData>,
  defaultSelectedKeys: Array<string>
}

const useMenuHook = (props: IProps) => {
  const { menuList, defaultSelectedKeys } = props;
  const [selectedKeys, setSelectedKeys] = useState<Array<string>>(defaultSelectedKeys);
  const [openKeys, setOpenKeys] = useState<Array<string>>(menuList.map((menu: MenuData) => menu.key));
  useEffect(() => {
    const activeMenu = getActiveChildMenu();
    if (activeMenu) {
      setSelectedKeys([activeMenu]);
    }
  }, []);
  const setSelectedMenu = (selectedKeys: Array<string>) => {
    setSelectedKeys(selectedKeys);
    setActiveChildMenu(selectedKeys.length > 0 ? selectedKeys[0] : '');
  };
  return {
    selectedKeys, openKeys, setOpenKeys, setSelectedMenu
  };
};
export default useMenuHook;
