import PropTypes from "prop-types";
import { IconChoice } from "../../utils/IconChoice";

export function ButtonIcon({iconName, ...rest}) {
  return <IconChoice icon={iconName} {...rest}/>;
}

ButtonIcon.propTypes = {
  iconName: PropTypes.string
};
