/*
 * Copyright 2019-2020 The Kale Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import CircularProgress from '@mui/material/CircularProgress';

interface ISplitDeployButton {
  running: boolean;
  handleClick: Function;
  katibRun: boolean;
}

export const SplitDeployButton: React.FunctionComponent<ISplitDeployButton> = props => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const options = [
    {
      label: 'Compile and Run' + (props.katibRun ? ' Katib Job' : ''),
      value: 'run',
    },
    { label: 'Compile and Upload', value: 'upload' },
    { label: 'Compile and Save', value: 'compile' },
  ];

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent ) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="deploy-button">
      <Grid container>
        <Grid item xs={12} style={{ padding: '4px 10px' }}>
          <ButtonGroup
            style={{ width: '100%' }}
            variant="contained"
            color="primary"
            ref={anchorRef}
            aria-label="split button"
          >
            <Button
              color="primary"
              style={{ width: '100%' }}
              onClick={_ => props.handleClick(options[selectedIndex].value)}
            >
              {props.running ? (
                <CircularProgress thickness={6} size={14} color={'secondary'} />
              ) : (
                options[selectedIndex].label
              )}
              {/*{"  " + options[selectedIndex].label}*/}
            </Button>
            <Button
              color="primary"
              size="small"
              aria-owns={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              style={{ width: 'auto' }}
            >
              <MoreVertIcon />
            </Button>
          </ButtonGroup>
          <Popper
            color="primary"
            style={{ zIndex: 2 }}
            open={open}
            anchorEl={anchorRef.current}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <Paper id="menu-list-grow">
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList>
                      {options.map((option, index) => (
                        <MenuItem
                          key={option.value}
                          // disabled={index === 2}
                          selected={index === selectedIndex}
                          onClick={event => handleMenuItemClick(event, index)}
                        >
                          {option.label}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Grid>
      </Grid>
    </div>
  );
};
