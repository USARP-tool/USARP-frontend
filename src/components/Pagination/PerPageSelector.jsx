import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import { Text } from "../Text";

export function PerPageSelector({
  limitOptions,
  currentLimit,
  onLimitChange,
}) {
  return (
    <div className={styles.limitSelector}>
      <Text.Root htmlFor="limitSelect">
        <Text.Body data-type="small" text="Itens por página:" />
      </Text.Root>
      <select
        id="limitSelect"
        value={currentLimit}
        onChange={(e) => onLimitChange(Number(e.target.value))}
      >
        {limitOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

PerPageSelector.propTypes = {
  limitOptions: PropTypes.arrayOf(PropTypes.number),
  currentLimit: PropTypes.number.isRequired,
  onLimitChange: PropTypes.func.isRequired,
};

PerPageSelector.defaultProps = {
  limitOptions: [5, 10, 25, 50],
};
