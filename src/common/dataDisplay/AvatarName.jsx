import * as React from 'react';
import Avatar from '@mui/material/Avatar';

import { isString, isEmpty } from 'lodash';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  if (!isString(name) || isEmpty(name)) return;

  return {
    bgcolor: stringToColor(name),
    children: name.split(' ').length > 1 ? `${name?.split(' ')[0][0]?.toUpperCase()}${name?.split(' ')[1][0]?.toUpperCase()}` : name?.slice(0, 2)?.toUpperCase(),
  };
}

export default function AvatarName({
  name,
  src,
  scale = 1,
  sx,
  ...rest
}) {

  return (
    <Avatar
      children={!src ? stringAvatar(name)?.children || null : null}
      sx={{
        bgcolor: stringAvatar(name)?.bgcolor || '',
        width: 25,
        height: 25,
        fontSize: 12,
        transform: `scale(${scale})`,
        ...sx,
      }}
      src={src}
      {...rest}
    />
  );
}
