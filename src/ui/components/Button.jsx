import {Pressable, StyleSheet} from 'react-native';
import {COLORS} from '../styles/Colors';
import Label from './Label';
import PropTypes from 'prop-types';

export default function Button(props) {
  return (
    <Pressable onPress={() => {}} style={[styles.baseline, styles.primary]}>
      <Label>{props.children}</Label>
    </Pressable>
  );
}

const styles = new StyleSheet.create({
  baseline: {
    padding: 8,
    width: 80,
    height: 40,
    borderRadius: 4,
  },
  primary: {
    backgroundColor: COLORS.cta,
  },
});

Button.propTypes = {
  children: PropTypes.string,
};
