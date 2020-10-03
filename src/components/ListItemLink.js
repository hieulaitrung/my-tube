import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import { Link as RouterLink } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


const ListItemLink = (props) => {
  const { icon, primary, to } = props;
  const showText = (props.showText != null) ? props.showText : true;
  const iconOnlyStyle = { minWidth: 'auto', margin: '0 auto' };
  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon style={showText ? {} : iconOnlyStyle} >{icon}</ListItemIcon> : null}
        {showText && <ListItemText primary={primary} />}
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default ListItemLink