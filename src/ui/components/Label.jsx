import {StyleSheet, Text} from 'react-native';
import {COLORS} from '../styles/Colors';
import PropTypes from 'prop-types';

export default function Label(props) {
  return <Text style={styles.baseline}>{props.children}</Text>;
}

const styles = new StyleSheet.create({
  baseline: {
    color: COLORS.white,
  },
});

Label.propTypes = {
  children: PropTypes.element,
};
