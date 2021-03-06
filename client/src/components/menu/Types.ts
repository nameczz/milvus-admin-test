import { ButtonProps } from '@material-ui/core/Button';
import { ReactElement } from 'react';

export type SimpleMenuType = {
  label: string;
  menuItems: { label: string | ReactElement; callback?: () => void }[];
  buttonProps?: ButtonProps;
  className?: string;
};

export type NavMenuItem = {
  icon: (
    props?: any
  ) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  iconActiveClass?: string;
  iconNormalClass?: string;
  label: string;
  onClick?: () => void;
  children?: NavMenuItem[];
};

export type NavMenuType = {
  defaultActive?: string;
  defaultOpen?: { [x: string]: boolean };
  width: string;
  data: NavMenuItem[];
};
