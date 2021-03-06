import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';
import { rootContext } from '../context/Root';
import { CollectionView } from '../pages/collections/Types';
import { PartitionView } from '../pages/partitions/Types';
import { StatusEnum } from '../components/status/Types';

// handle release and load dialog
export interface DialogHookProps {
  type: 'partition' | 'collection';
}

export const useDialogHook = (props: DialogHookProps) => {
  const { type } = props;
  const { setDialog } = useContext(rootContext);
  const { t: dialogTrans } = useTranslation('dialog');
  const { t: btnTrans } = useTranslation('btn');
  const { t: partitionTrans } = useTranslation('partition');
  const { t: collectionTrans } = useTranslation('collection');

  const name =
    type === 'collection'
      ? collectionTrans('collection')
      : partitionTrans('partition');

  const actionsMap = {
    release: {
      title: dialogTrans('releaseTitle', { type: name }),
      component: (
        <Typography className="dialog-content">
          {dialogTrans('releaseContent', { type: name })}
        </Typography>
      ),
      confirmLabel: btnTrans('release'),
    },
    load: {
      title: dialogTrans('loadTitle', { type: name }),
      component: (
        <Typography className="dialog-content">
          {dialogTrans('loadContent', { type: name })}
        </Typography>
      ),
      confirmLabel: btnTrans('load'),
    },
  };

  const handleAction = (
    data: PartitionView | CollectionView,
    cb: (data: any) => Promise<any>
  ) => {
    const actionType: 'release' | 'load' =
      data._status === StatusEnum.loaded ? 'release' : 'load';
    const { title, component, confirmLabel } = actionsMap[actionType];

    setDialog({
      open: true,
      type: 'notice',
      params: {
        title,
        component,
        confirmLabel,
        confirm: () => cb(data),
      },
    });
  };

  return {
    handleAction,
  };
};
